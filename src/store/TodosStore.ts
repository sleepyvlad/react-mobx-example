import { makeAutoObservable } from 'mobx';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

class TodosStore {
    todos: Todo[] = [];
    fetched = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchTodos() {
        fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
            res.json().then((data) => {
                this.todos = data;
                this.fetched = true;
            }),
        );
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
