import CurrentUserStore from '../CurrentUserStore';
import RootStore from './RootStore';
import TodosStore from '../TodosStore';
import UsersStore from '../UsersStore';
const rootStore = new RootStore();
const usersStore = new UsersStore(rootStore);
const todosStore = new TodosStore(rootStore);
const currentUserStore = new CurrentUserStore(rootStore);

it('RootStore init', () => {
    expect(rootStore.usersStore).toStrictEqual(usersStore);
    expect(rootStore.todosStore).toStrictEqual(todosStore);
    expect(rootStore.currentUserStore).toStrictEqual(currentUserStore);
});
