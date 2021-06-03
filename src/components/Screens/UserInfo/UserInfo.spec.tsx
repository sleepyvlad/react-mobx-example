import React from 'react';
import { UserInfo } from './UserInfo';
import { shallow } from 'enzyme';
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

const originalModule = jest.requireActual('react-router-dom');
const mockedUseParams = jest.fn(() => {
    return { id: '1' };
});
const mockedUseHistory = jest.fn();
jest.mock('react-router-dom', () => ({
    ...originalModule,
    useParams: () => mockedUseParams,
    useHistory: () => mockedUseHistory,
}));
beforeEach(() => {
    jest.spyOn(StoreContext, 'useRootStore').mockImplementation(() => root);
});

it('should render UserInfo title', () => {
    const component = shallow(<UserInfo />);
    const title = component.find('h2');
    expect(title.text()).toMatch('User Info:');
});

it('should render UserInfo user info', () => {
    const component = shallow(<UserInfo />);
    const information = component.find('p');
    expect(information).toHaveLength(3);
});
