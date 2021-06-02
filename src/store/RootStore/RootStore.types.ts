import { IUsersStore } from '../UsersStore';
import { ITodosStore } from '../TodosStore';
import { ICurrentUserStore } from '../CurrentUserStore';

export interface IRootStore {
    usersStore: IUsersStore;
    todosStore: ITodosStore;
    currentUserStore: ICurrentUserStore;
}
