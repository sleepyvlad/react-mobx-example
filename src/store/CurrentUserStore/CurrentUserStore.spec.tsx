import CurrentUserStore from './CurrentUserStore';
import RootStore from '../RootStore';
import TodosStore from '../TodosStore';
import UsersStore from '../UsersStore';
import { StoreState } from '../../global';
const rootStore = new RootStore();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const usersStore = new UsersStore(rootStore);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const todosStore = new TodosStore(rootStore);
const currentUserStore = new CurrentUserStore(rootStore);

it('CurrentUserStore init', () => {
    expect(currentUserStore.currentUserId).toBe(0);
    expect(currentUserStore.root).toBe(rootStore);
    expect(currentUserStore.todos).toHaveLength(0);
    expect(currentUserStore.state).toBe(StoreState.pending);
    expect(currentUserStore.data).toBe(undefined);
});

it('CurrentUserStore change current user', () => {
    expect(currentUserStore.currentUserId).toBe(0);
    currentUserStore.setCurrentUserId(1);
    expect(currentUserStore.currentUserId).toBe(1);
});

it('CurrentUserStore fetch user', () => {
    currentUserStore.fetchUser(1).then(() => {
        expect(currentUserStore.data).not.toBe(undefined);
    });
});
