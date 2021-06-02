import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Button, MenuItem, Select } from '@material-ui/core';
import { StoreState } from '../../../global';
import { useRootStore } from '../../../store/RootStore';

import classNames from './Users.module.css';

export const Users: FC = observer(() => {
    const { usersStore, currentUserStore } = useRootStore();
    const history = useHistory();

    const openTodos = () => {
        if (currentUserStore.currentUserId) {
            history.push('/todos');
        }
    };

    const openInfo = () => {
        if (currentUserStore.currentUserId) {
            history.push(`/user-info/${currentUserStore.currentUserId}`);
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
                            currentUserStore.setCurrentUserId(value);
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
            <Button disabled={!currentUserStore.currentUserId} onClick={openTodos}>
                Open todos
            </Button>
            <Button disabled={!currentUserStore.currentUserId} onClick={openInfo}>
                Open info
            </Button>
        </div>
    );
});
