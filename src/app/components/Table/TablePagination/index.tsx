import React, {
  ChangeEvent,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
} from 'react';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';
import { TableInstance } from 'react-table';
import i18n from '../../../i18n';

import { Container } from './styles';

const rowsPerPageOptions = [10, 20, 30, 40, 50];

export interface Search {
  pageSize: number;
  pageIndex: number;
}

export function TablePagination<T extends Record<string, unknown>>({
  instance,
  fetchData,
  setRowsPerPage,
}: PropsWithChildren<{
  instance: TableInstance<T>;
  fetchData(search: Search): Promise<void>;
  setRowsPerPage(size: number): void;
}>): ReactElement | null {
  const {
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    pageCount,
  } = instance;

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const pageSizeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(event.target.value));
      setRowsPerPage(Number(event.target.value));
    },
    [setPageSize, setRowsPerPage],
  );

  const gotoPageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      gotoPage(Number(event.target.value));
    },
    [gotoPage],
  );

  return (
    <Container>
      <span>
        {i18n.t('table.page')}
        <select
          value={pageIndex}
          onBlur={gotoPageChange}
          onChange={gotoPageChange}
        >
          {[...Array(pageCount)].map((_, i) => (
            <option key={i.toString()} value={i}>
              {i + 1}
            </option>
          ))}
        </select>
        {i18n.t('table.of')}
        <strong>
          &nbsp;
          {pageCount}
        </strong>
      </span>
      <span />
      &nbsp;&bull;&nbsp;{i18n.t('table.itemsPerPage')}:&nbsp;
      <select
        value={pageSize}
        onBlur={pageSizeChange}
        onChange={pageSizeChange}
      >
        {rowsPerPageOptions.map(rowsPerPage => (
          <option key={rowsPerPage} value={rowsPerPage}>
            {rowsPerPage}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        <MdFirstPage size={20} />
      </button>
      <button
        type="button"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <MdNavigateBefore size={20} />
      </button>
      <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
        <MdNavigateNext size={20} />
      </button>
      <button
        type="button"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        <MdLastPage size={20} />
      </button>
    </Container>
  );
}
