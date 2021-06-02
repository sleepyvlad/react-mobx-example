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
    fetchTodos: (userId: number) => Promise<void>;
    toggleTodoCompleteById: (id: number) => void;
}
