import { StoreState } from '../../global';
import { IRootStore } from '../RootStore';

export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export interface ITodosStore {
    root: IRootStore;
    todos: Todo[];
    state: StoreState;
    fetchTodos: () => Promise<void>;
    getTodosByUserId: (id: number) => Todo[];
    toggleTodoCompleteById: (id: number) => void;
}
