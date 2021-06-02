import { ICurrentUserStore } from './CurrentUserStore.types';
import { User } from '../UsersStore/UsersStore.types';
import { IRootStore } from '../RootStore';
import { Todo } from '../TodosStore/TodoStore.types';
import { autorun, makeAutoObservable } from 'mobx';

class CurrentUserStore implements ICurrentUserStore {
    data: User | undefined;
    root: IRootStore;
    todos: Todo[];

    constructor(root: IRootStore) {
        this.root = root;
        this.todos = [];
        makeAutoObservable(this);
        autorun(() => {
            const { usersStore, todosStore } = this.root;
            if (usersStore.activeUser) {
                this.data = usersStore.activeUser;
                this.todos = todosStore.getTodosByUserId(usersStore.activeUserId);
            }
        });
    }
}

export default CurrentUserStore;
