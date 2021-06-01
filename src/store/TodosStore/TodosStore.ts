import { autorun, makeAutoObservable, runInAction } from 'mobx';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

class TodosStore {
    todos: Todo[] = [];
    state = 'pending';

    constructor() {
        makeAutoObservable(this);
        autorun(async () => await this.fetchTodos());
    }

    async fetchTodos() {
        try {
            const todos = await fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
                res.json().then((data) => data),
            );
            runInAction(() => {
                this.todos = todos;
                this.state = 'done';
            });
        } catch (error) {
            runInAction(() => {
                this.state = 'error';
            });
        }
    }

    getTodosByUserId(userId: number) {
        return this.todos.filter((todo) => todo.userId === userId);
    }

    toggleTodoCompleteById(id: number) {
        const togglingTodo = this.todos.find((todo) => todo.id === id);
        if (togglingTodo) {
            togglingTodo.completed = !togglingTodo.completed;
        }
    }
}

export default new TodosStore();
