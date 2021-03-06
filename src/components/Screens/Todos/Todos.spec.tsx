import React from 'react';
import { Todos } from './Todos';
import { shallow } from 'enzyme';
import { Checkbox } from '@material-ui/core';
import * as StoreContext from '../../../store/RootStore/RootStore.provider';

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

const root = {
    todosStore: {
        state: 'done',
    },
    currentUserStore: {
        state: 'done',
        currentUserId: 1,
        data: {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
        },
        todos: TODOS,
    },
} as any;

beforeEach(() => {
    jest.spyOn(StoreContext, 'useRootStore').mockImplementation(() => root);
});

it('should render Todos title', () => {
    const component = shallow(<Todos />);
    const title = component.find('h2');
    expect(title.text()).toMatch(/your todos:/);
});

it('should render todos checkboxes', () => {
    const component = shallow(<Todos />);
    expect(component.find(Checkbox)).toHaveLength(5);
});
