import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { MenuItem, Select, Button } from '@material-ui/core';

import classNames from './Users.module.css';

import UsersStore from '../../../store/UsersStore';

export const Users: FC = observer(() => {
    const { state, users } = UsersStore;
    const history = useHistory();

    const openTodos = () => {
        if (UsersStore.activeUserId) {
            history.push('/todos');
        }
    };

    const renderUserSelect = () => {
        switch (state) {
            case 'pending':
                return <span>Loading...</span>;
            case 'error':
                return <span>Error!!!</span>;
            case 'done':
                return (
                    <Select
                        className={classNames.select}
                        onChange={(event) => {
                            const { value }: any = event.target;
                            UsersStore.setActiveUser(value);
                        }}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                );
        }
    };
    return (
        <div className={classNames.container}>
            <h2>Select User:</h2>
            {renderUserSelect()}
            <Button disabled={!UsersStore.activeUserId} onClick={openTodos}>
                Open todos
            </Button>
        </div>
    );
});
