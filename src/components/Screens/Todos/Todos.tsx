import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Checkbox } from '@material-ui/core';
import { StoreState } from '../../../global';
import { useRootStore } from '../../../store/RootStore';
import { useTable, useSortBy, usePagination } from 'react-table';
import classNames from './Todos.module.css';

export const Todos: FC = observer(() => {
    const { todosStore, currentUserStore } = useRootStore();
    const tableData = useMemo(
        () =>
            todosStore.todos.map((todo) => {
                return {
                    idCol: todo.id,
                    titleCol: todo.title,
                    completedCol: (
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => todosStore.toggleTodoCompleteById(todo.id)}
                        />
                    ),
                };
            }),
        [JSON.stringify(todosStore.todos)],
    );
    const tableColumns = useMemo(
        () => [
            { Header: 'Id', accessor: 'idCol' },
            {
                Header: 'Title',
                accessor: 'titleCol',
            },
            { Header: 'Completed', accessor: 'completedCol' },
        ],
        [],
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tableInstance = useTable({ columns: tableColumns, data: tableData }, useSortBy, usePagination);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance;
    const renderTodos = () => {
        switch (todosStore.state) {
            case StoreState.pending:
                return <span>Loading...</span>;
            case StoreState.error:
                return <span>Error...</span>;
            case StoreState.done:
                return (
                    <div className={classNames.container}>
                        <table {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup) => {
                                    const { key: headKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                                    return (
                                        <tr {...restHeaderGroupProps} key={headKey}>
                                            {headerGroup.headers.map((column) => {
                                                const { key, ...restHeaderProps } = column.getHeaderProps(
                                                    column.getSortByToggleProps(),
                                                );
                                                return (
                                                    <th {...restHeaderProps} key={key}>
                                                        {column.render('Header')}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? ' 🔽'
                                                                    : ' 🔼'
                                                                : ''}
                                                        </span>
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    const { key: rowKey, ...restRowProps } = row.getRowProps();
                                    return (
                                        <tr {...restRowProps} key={rowKey}>
                                            {row.cells.map((cell) => {
                                                const { key, ...restCellProps } = cell.getCellProps();
                                                return (
                                                    <td
                                                        {...restCellProps}
                                                        key={key}
                                                        className={classNames['table-cell']}
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                {'<<'}
                            </button>{' '}
                            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'<'}
                            </button>{' '}
                            <button onClick={() => nextPage()} disabled={!canNextPage}>
                                {'>'}
                            </button>{' '}
                            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                {'>>'}
                            </button>{' '}
                            <span>
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                            </span>
                            <span>
                                | Go to page:{' '}
                                <input
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(page);
                                    }}
                                    style={{ width: '100px' }}
                                />
                            </span>{' '}
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
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
