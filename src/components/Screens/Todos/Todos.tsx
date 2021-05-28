import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import TodosStore from '../../../store/TodosStore';
import UsersStore from '../../../store/UsersStore';
import { Checkbox } from '@material-ui/core';

export const Todos: FC = observer(() => {
    useEffect(() => {
        TodosStore.fetchTodos();
    }, []);
    return (
        <div>
            <h2>Your Todos: </h2>
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
        </div>
    );
});
