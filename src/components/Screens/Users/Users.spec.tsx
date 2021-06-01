import React from 'react';
import { Users } from './Users';
import { shallow } from 'enzyme';
import { MenuItem, Select } from '@material-ui/core';
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
it('should render Users title', () => {
    const component = shallow(<Users />);
    const title = component.find('h2');
    expect(title.text()).toBe('Select User:');
});
it('should render Users Select', () => {
    const component = shallow(<Users />);
    expect(component.find(Select)).toHaveLength(1);
    expect(component.find(MenuItem)).toHaveLength(3);
});
