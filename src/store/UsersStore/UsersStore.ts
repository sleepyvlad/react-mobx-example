import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { StoreState } from '../../global';
import { IUsersStore, User } from './UsersStore.types';
import { IRootStore } from '../RootStore';

class UsersStore implements IUsersStore {
    root: IRootStore;
    state = StoreState.pending;
    users: User[] = [];
    activeUserId = 0;

    constructor(root: IRootStore) {
        this.root = root;
        makeAutoObservable(this);
        autorun(async () => await this.fetchUsers());
    }

    async fetchUsers(): Promise<void> {
        try {
            const users = await fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
                res.json().then((data) => data),
            );
            runInAction(() => {
                this.users = users;
                this.state = StoreState.done;
            });
        } catch (error) {
            runInAction(() => {
                this.state = StoreState.error;
            });
        }
    }

    setActiveUser(id: number): void {
        this.activeUserId = id;
    }

    //Computed value
    get activeUser(): User | undefined {
        if (this.activeUserId && this.users.length) {
            return this.users.find((user) => user.id === this.activeUserId);
        }
    }
}

export default UsersStore;
