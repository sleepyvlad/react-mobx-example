import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useRootStore } from '../../../store/RootStore';

import classNames from './UserInfo.module.css';

export const UserInfo: FC = observer(() => {
    const { currentUserStore } = useRootStore();
    const { id }: any = useParams();
    const history = useHistory();

    useEffect(() => {
        currentUserStore.setCurrentUserId(id);
    }, [id, currentUserStore]);

    const openTodos = () => {
        history.push('/todos');
    };

    return (
        <div className={classNames.container}>
            <h2>User Info:</h2>
            {currentUserStore.data && (
                <div>
                    <p>Username: {currentUserStore.data.username}</p>
                    <p>Name: {currentUserStore.data.name}</p>
                    <p>Email: {currentUserStore.data.email}</p>
                </div>
            )}
            <Button disabled={!currentUserStore.currentUserId} onClick={openTodos}>
                Open todos
            </Button>
        </div>
    );
});
