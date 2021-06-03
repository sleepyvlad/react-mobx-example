import RootStore from '../RootStore';
import TodosStore from '../TodosStore';
import { StoreState } from '../../global';
const rootStore = new RootStore();
const todosStore = new TodosStore(rootStore);

it('TodosStore init', () => {
    expect(todosStore.root).toBe(rootStore);
    expect(todosStore.state).toBe(StoreState.pending);
});

it('TodosStore toggle todo', () => {
    todosStore.todos = [{ title: 'title', completed: false, userId: 1, id: 1 }];
    todosStore.toggleTodoCompleteById(1);
    expect(todosStore.todos[0].completed).toBe(true);
});

it('TodosStore fetch todos', () => {
    todosStore.fetchTodos(1).then(() => {
        expect(todosStore.todos.length).toBeGreaterThan(0);
    });
});
