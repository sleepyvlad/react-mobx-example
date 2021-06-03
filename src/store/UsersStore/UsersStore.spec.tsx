import RootStore from '../RootStore';
import UsersStore from './UsersStore';
const rootStore = new RootStore();
const usersStore = new UsersStore(rootStore);

it('UsersStore init', () => {
    expect(usersStore.users).toHaveLength(0);
    expect(usersStore.root).toBe(rootStore);
});

it('UsersStore fetch users', () => {
    usersStore.fetchUsers().then(() => {
        expect(usersStore.users.length).toBeGreaterThan(0);
    });
});
