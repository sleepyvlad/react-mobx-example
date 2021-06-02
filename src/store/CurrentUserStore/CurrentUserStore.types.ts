import { IRootStore } from '../RootStore';
import { Todo } from '../TodosStore/TodoStore.types';
import { User } from '../UsersStore/UsersStore.types';

export interface ICurrentUserStore {
    root: IRootStore;
    todos: Todo[];
    data: User | undefined;
}
