import { IRootStore } from './RootStore.types';
import UsersStore, { IUsersStore } from '../UsersStore';
import TodosStore, { ITodosStore } from '../TodosStore';
import CurrentUserStore, { ICurrentUserStore } from '../CurrentUserStore';

class RootStore implements IRootStore {
    usersStore: IUsersStore;
    todosStore: ITodosStore;
    currentUserStore: ICurrentUserStore;

    constructor() {
        this.usersStore = new UsersStore(this);
        this.todosStore = new TodosStore(this);
        this.currentUserStore = new CurrentUserStore(this);
    }
}

export default RootStore;
