import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Checkbox } from '@material-ui/core';
import { StoreState } from '../../../global';
import { useRootStore } from '../../../store/RootStore';

export const Todos: FC = observer(() => {
    const { todosStore, currentUserStore } = useRootStore();

    const renderTodos = () => {
        switch (todosStore.state) {
            case StoreState.pending:
                return <span>Loading...</span>;
            case StoreState.error:
                return <span>Error...</span>;
            case StoreState.done:
                return (
                    <div>
                        {currentUserStore.todos.map((todo) => (
                            <div key={todo.id}>
                                <span>{todo.title}</span>
                                <Checkbox
                                    checked={todo.completed}
                                    onChange={() => todosStore.toggleTodoCompleteById(todo.id)}
                                />
                            </div>
                        ))}
                    </div>
                );
        }
    };

    return (
        <div>
            <h2>{currentUserStore.data?.name} your todos: </h2>
            {renderTodos()}
        </div>
    );
});
