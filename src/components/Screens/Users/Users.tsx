import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { MenuItem, Select, Button } from '@material-ui/core';

import classNames from './Users.module.css';

import UsersStore from '../../../store/UsersStore';

export const Users: FC = observer(() => {
    useEffect(() => {
        UsersStore.fetchUsers();
    }, []);

    const history = useHistory();

    const openTodos = () => {
        if (UsersStore.activeUserId) {
            history.push('/todos');
        }
    };
    return (
        <div className={classNames.container}>
            <h2>Select User:</h2>
            <Select
                className={classNames.select}
                onChange={(event) => {
                    const { value }: any = event.target;
                    UsersStore.setActiveUser(value);
                }}
            >
                {UsersStore.users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                        {user.username}
                    </MenuItem>
                ))}
            </Select>
            <Button disabled={!UsersStore.activeUserId} onClick={openTodos}>
                Open todos
            </Button>
        </div>
    );
});
