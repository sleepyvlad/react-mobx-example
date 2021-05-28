import { makeAutoObservable } from 'mobx';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}
class UsersStore {
    fetched = false;
    users: User[] = [];
    activeUserId = 0;

    constructor() {
        makeAutoObservable(this);
    }

    fetchUsers() {
        if (!this.fetched) {
            fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
                res.json().then((data) => {
                    this.users = data;
                    this.fetched = true;
                }),
            );
        }
    }

    setActiveUser(id: number) {
        this.activeUserId = id;
    }
}

export default new UsersStore();
