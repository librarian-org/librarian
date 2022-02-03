import React, {
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react';

import {
  Row,
  TableOptions,
  usePagination,
  useRowSelect,
  useTable,
} from 'react-table';

import { ImpulseSpinner } from 'react-spinners-kit';
import { ThemeContext } from 'styled-components';
import { Container } from './styles';
import { Search, TablePagination } from './TablePagination';

export interface PaginatedSearch<T> {
  count: number;
  data: T[];
}

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name: string;
  loading: boolean;
  fetchData(search: Search): Promise<void>;
  setRowsPerPage(size: number): void;
  getRowProps?: (row: Row<T>) => unknown;
  onRowClick?: (item: T) => void;
}

const hooks = [usePagination, useRowSelect];

export function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const { colors } = useContext(ThemeContext);

  const {
    loading,
    columns,
    fetchData,
    setRowsPerPage,
    onRowClick,
    getRowProps,
  } = props;

  const initialState = {
    pageIndex: 0,
  };

  const instance = useTable<T>(
    {
      ...props,
      columns,
      initialState,
      manualPagination: true,
    },
    ...hooks
  );

  const { getTableProps, headerGroups, getTableBodyProps, page, prepareRow } =
    instance;

  const handleClick = (event: MouseEvent, row: Row<T>) => {
    event.stopPropagation();
    if (onRowClick) {
      onRowClick(row.original);
    }
  };

  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading ? (
            <tr>
              <td colSpan={100}>
                <ImpulseSpinner frontColor={colors.primary.light} />
              </td>
            </tr>
          ) : (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps(getRowProps ? getRowProps(row) : {})}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} onClick={(event) => handleClick(event, row)}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <TablePagination
        instance={instance}
        fetchData={fetchData}
        setRowsPerPage={setRowsPerPage}
      />
    </Container>
  );
}
