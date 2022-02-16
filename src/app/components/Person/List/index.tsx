import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Container, ColumWrapper } from './styles';
import { PaginatedSearch, Table } from '../../../components/Table';
import { Person } from '../Person';
import i18n from '../../../i18n';
import { Cell, Column } from 'react-table';
import { Search } from '../../Table/TablePagination';
import { useToast } from '../../../hooks/toast';
import { AppEvent } from '../../../../common/AppEvent';
import { trigger } from '../../../util/EventHandler';
import { Actions } from '../../../../common/Actions';
import { FaPen } from 'react-icons/fa';

const PersonList: React.FC = () => {
  const { addToast } = useToast();
  const [list, setList] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = React.useState(0);

  useEffect(() => {
    try {
      setLoading(true);
      const response = window.api.sendSync('listPerson', {
        entity: 'User',
        value: {
          where: null,
          pageStart: 0,
          pageSize: rowsPerPage,
        },
      }) as PaginatedSearch<Person>;
      setList(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [rowsPerPage]);

  const handleUpdate = (item: Person): void => {
    trigger(AppEvent.personTab, { action: Actions.update, value: item });
  };

  const handleRowClick = (item: Person) => {
    trigger(AppEvent.personTab, { action: Actions.read, value: item });
  };

  const columns: Array<Column<Person>> = useMemo(
    () => [
      {
        Header: i18n.t('person.name'),
        accessor: 'name',
      },
      {
        Header: i18n.t('person.userType'),
        id: 'userType',
        Cell: (b: Cell<Person>) => {
          return <>{i18n.t(`userType.${b.row.original.userType.name}`)}</>;
        },
      },
      {
        Header: () => null,
        id: 'edit',
        Cell: (row: Cell<Person>) => {
          return (
            <ColumWrapper>
              {row.row.original.login !== 'admin' && (
                <FaPen
                  size={20}
                  title={i18n.t('person.edit')}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleUpdate(row.row.original);
                  }}
                />
              )}
            </ColumWrapper>
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
        const response = window.api.sendSync('listPerson', {
          entity: 'User',
          value: {
            where: null,
            pageStart: rowsPerPage * pageIndex,
            pageSize: rowsPerPage,
          },
        }) as PaginatedSearch<Person>;
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
      <Table<Person>
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

export default PersonList;
