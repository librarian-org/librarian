import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Container } from './styles';
import { PaginatedSearch, Table } from '../../../components/Table';
import { Title } from '../Title';
import i18n from '../../../i18n';
import { Cell, Column } from 'react-table';
import { Search } from '../../Table/TablePagination';
import { useToast } from '../../../hooks/toast';
import { AppEvent } from '../../../../common/AppEvent';
import { trigger } from '../../../util/EventHandler';
import { Actions } from '../../../../common/Actions';
import { FaPen, FaTags } from 'react-icons/fa';

const TitleList: React.FC = () => {
  const { addToast } = useToast();
  const [list, setList] = useState<Title[]>([]);
  const [loading, setLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = React.useState(0);

  useEffect(() => {
    try {
      setLoading(true);
      const response = window.api.sendSync('listTitle', {
        entity: 'Title',
        value: {
          where: null,
          pageStart: 0,
          pageSize: rowsPerPage,
        },
      }) as PaginatedSearch<Title>;
      setList(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [rowsPerPage]);

  const handleUpdate = (item: Title): void => {
    trigger(AppEvent.titleTab, { action: Actions.update, value: item });
  };

  const handleRowClick = (item: Title) => {
    trigger(AppEvent.titleTab, { action: Actions.read, value: item });
  };

  const columns: Array<Column<Title>> = useMemo(
    () => [
      {
        Header: () => null,
        id: 'info',
        Cell: (row: Cell<Title>) => {
          const classifications = row.row.original.titlePublishers.map(
            (publisher) => {
              return publisher.classification;
            }
          );
          return (
            // <>
              <FaTags
                title={classifications.join(', ')}
                size={15}
              />
            // </>
          );
        },
      },
      {
        Header: i18n.t('title.label'),
        accessor: 'name',
      },
      {
        Header: 'ISBN',
        accessor: 'ISBN',
      },
      {
        Header: () => null,
        id: 'edit',
        Cell: (row: Cell<Title>) => {
          return (
            <>
              <FaPen
                size={20}
                title={i18n.t('title.edit')}
                onClick={(event) => {
                  event.stopPropagation();
                  handleUpdate(row.row.original);
                }}
              />
            </>
          );
        },
      },
    ],
    []
  );

  const handleSubmit = useCallback(
    async ({ pageIndex = 0 }: Search) => {
      try {
        setLoading(true);
        const response = window.api.sendSync('listTitle', {
          entity: 'Title',
          value: {
            where: null,
            pageStart: rowsPerPage * pageIndex,
            pageSize: rowsPerPage,
          },
        }) as PaginatedSearch<Title>;
        setList(response.data);
        setPageCount(Math.ceil(response.count / rowsPerPage));

        setLoading(false);

        setList(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao listar os endereços',
          description:
            'Ocorreu um erro ao listar os endereços, tente novamente.',
        });
      }
    },
    [addToast, rowsPerPage]
  );

  return (
    <Container>
      <Table<Title>
        name="title"
        columns={columns}
        onRowClick={handleRowClick}
        data={list}
        fetchData={handleSubmit}
        loading={loading}
        pageCount={pageCount}
        setRowsPerPage={setRowsPerPage}
      />
    </Container>
  );
};

export default TitleList;
