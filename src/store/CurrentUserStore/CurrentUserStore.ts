import { ICurrentUserStore } from './CurrentUserStore.types';
import { User } from '../UsersStore/UsersStore.types';
import { IRootStore } from '../RootStore';
import { Todo } from '../TodosStore/TodoStore.types';
import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { StoreState } from '../../global';

class CurrentUserStore implements ICurrentUserStore {
    data: User | undefined;
    currentUserId: number;
    state: StoreState;
    root: IRootStore;
    todos: Todo[];

    constructor(root: IRootStore) {
        this.root = root;
        this.todos = [];
        this.currentUserId = 0;
        this.state = StoreState.pending;
        this.data = undefined;
        makeAutoObservable(this);
        autorun(() => {
            if (this.currentUserId) {
                const { todosStore } = this.root;
                this.fetchUser(this.currentUserId).then(() =>
                    todosStore.fetchTodos(this.currentUserId).then(() => {
                        this.todos = todosStore.todos;
                    }),
                );
            }
        });
    }

    async fetchUser(id: number): Promise<void> {
        try {
            const data = await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`).then((res) =>
                res.json().then((data) => data),
            );
            runInAction(() => {
                this.data = data[0];
                this.state = StoreState.done;
            });
        } catch (error) {
            runInAction(() => {
                this.state = StoreState.error;
            });
        }
    }

    setCurrentUserId(id: number): void {
        this.currentUserId = +id;
    }
}

export default CurrentUserStore;
