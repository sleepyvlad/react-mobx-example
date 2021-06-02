import { IRootStore } from '../RootStore';
import { Todo } from '../TodosStore/TodoStore.types';
import { User } from '../UsersStore/UsersStore.types';
import { StoreState } from '../../global';

export interface ICurrentUserStore {
    root: IRootStore;
    todos: Todo[];
    data: User | undefined;
    currentUserId: number;
    state: StoreState;
    setCurrentUserId: (id: number) => void;
}
