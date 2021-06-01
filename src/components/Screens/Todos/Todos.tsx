import React, { FC } from 'react';
import { observer } from 'mobx-react';
import TodosStore from '../../../store/TodosStore/TodosStore';
import UsersStore from '../../../store/UsersStore/UsersStore';
import { Checkbox } from '@material-ui/core';

export const Todos: FC = observer(() => {
    const { activeUser } = UsersStore;
    const { state } = TodosStore;

    const renderTodos = () => {
        switch (state) {
            case 'pending':
                return <span>Loading...</span>;
            case 'error':
                return <span>Error...</span>;
            case 'done':
                return (
                    <div>
                        {TodosStore.getTodosByUserId(UsersStore.activeUserId).map((todo) => (
                            <div key={todo.id}>
                                <span>{todo.title}</span>
                                <Checkbox
                                    checked={todo.completed}
                                    onChange={() => TodosStore.toggleTodoCompleteById(todo.id)}
                                />
                            </div>
                        ))}
                    </div>
                );
        }
    };

    return (
        <div>
            <h2>{activeUser?.name} your todos: </h2>
            {renderTodos()}
        </div>
    );
});
