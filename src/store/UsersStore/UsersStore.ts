import { autorun, makeAutoObservable, runInAction } from 'mobx';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}
class UsersStore {
    state = 'pending'; //pending | done | error
    users: User[] = [];
    activeUserId = 0;

    constructor() {
        makeAutoObservable(this);
        autorun(async () => await this.fetchUsers());
    }

    async fetchUsers() {
        try {
            const users = await fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
                res.json().then((data) => data),
            );
            runInAction(() => {
                this.users = users;
                this.state = 'done';
            });
        } catch (error) {
            runInAction(() => {
                this.state = 'error';
            });
        }
    }

    setActiveUser(id: number) {
        this.activeUserId = id;
    }

    //Computed value
    get activeUser() {
        return this.users.find((user) => user.id === this.activeUserId);
    }
}

export default new UsersStore();
