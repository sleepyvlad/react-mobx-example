import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { StoreState } from '../../global';
import { ITodosStore, Todo } from './TodoStore.types';
import { IRootStore } from '../RootStore';

class TodosStore implements ITodosStore {
    todos: Todo[] = [];
    state = StoreState.pending;
    root: IRootStore;

    constructor(root: IRootStore) {
        this.root = root;
        makeAutoObservable(this);
        autorun(async () => await this.fetchTodos());
    }

    async fetchTodos(): Promise<void> {
        try {
            const todos = await fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
                res.json().then((data) => data),
            );
            runInAction(() => {
                this.todos = todos;
                this.state = StoreState.done;
            });
        } catch (error) {
            runInAction(() => {
                this.state = StoreState.error;
            });
        }
    }

    getTodosByUserId(userId: number): Todo[] {
        return this.todos.filter((todo) => todo.userId === userId);
    }

    toggleTodoCompleteById(id: number): void {
        const togglingTodo = this.todos.find((todo) => todo.id === id);
        if (togglingTodo) {
            togglingTodo.completed = !togglingTodo.completed;
        }
    }
}

export default TodosStore;
