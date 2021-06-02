import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Button, MenuItem, Select } from '@material-ui/core';
import { StoreState } from '../../../global';
import { useRootStore } from '../../../store/RootStore';

import classNames from './Users.module.css';

export const Users: FC = observer(() => {
    const { usersStore } = useRootStore();
    const history = useHistory();

    const openTodos = () => {
        if (usersStore.activeUserId) {
            history.push('/todos');
        }
    };

    const openInfo = () => {
        if (usersStore.activeUserId) {
            history.push(`/user-info/${usersStore.activeUserId}`);
        }
    };

    const renderUserSelect = () => {
        switch (usersStore.state) {
            case StoreState.pending:
                return <span>Loading...</span>;
            case StoreState.error:
                return <span>Error!!!</span>;
            case StoreState.done:
                return (
                    <Select
                        className={classNames.select}
                        onChange={(event) => {
                            const { value }: any = event.target;
                            usersStore.setActiveUser(value);
                        }}
                    >
                        {usersStore.users.map((user) => (
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
            <Button disabled={!usersStore.activeUserId} onClick={openTodos}>
                Open todos
            </Button>
            <Button disabled={!usersStore.activeUserId} onClick={openInfo}>
                Open info
            </Button>
        </div>
    );
});
