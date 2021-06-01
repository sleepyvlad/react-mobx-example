import React from 'react';
import { Todos } from './Todos';
import { shallow } from 'enzyme';
import { Checkbox } from '@material-ui/core';

const TODOS = [
    {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
    },
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
    },
    {
        userId: 1,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
    },
    {
        userId: 1,
        id: 4,
        title: 'et porro tempora',
        completed: true,
    },
    {
        userId: 1,
        id: 5,
        title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false,
    },
];

jest.mock('../../../store/UsersStore/UsersStore', () => ({
    __esModule: true,
    default: {
        state: 'done',
        activeUserId: 1,
        users: [
            {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                phone: '1-770-736-8031 x56442',
                website: 'hildegard.org',
            },
            {
                id: 2,
                name: 'Ervin Howell',
                username: 'Antonette',
                email: 'Shanna@melissa.tv',
                phone: '010-692-6593 x09125',
                website: 'anastasia.net',
            },
            {
                id: 3,
                name: 'Clementine Bauch',
                username: 'Samantha',
                email: 'Nathan@yesenia.net',
                phone: '1-463-123-4447',
                website: 'ramiro.info',
            },
        ],
    },
}));
jest.mock('../../../store/TodosStore/TodosStore', () => ({
    __esModule: true,
    default: {
        getTodosByUserId: (userId: number) => {
            return TODOS.filter((todo) => todo.userId === userId);
        },
        state: 'done',
        todos: TODOS,
    },
}));
it('should render Todos title', () => {
    const component = shallow(<Todos />);
    const title = component.find('h2');
    expect(title.text()).toMatch(/your todos:/);
});

it('should render todos checkboxes', () => {
    const component = shallow(<Todos />);
    expect(component.find(Checkbox)).toHaveLength(5);
});
