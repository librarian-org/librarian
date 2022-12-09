import { format } from 'date-fns';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { Cell, Column } from 'react-table';
import { ThemeContext } from 'styled-components';
import { useToast } from '../../../hooks/toast';
import i18n from '../../../i18n';
import Button from '../../Button';
import { PaginatedSearch, Table } from '../../Table';
import { Search } from '../../Table/TablePagination';

import { ButtonContainer, Container } from './styles';

type BorrowedTitle = {
  borrow: Date;
  estimatedReturn: Date;
  titlePublisher: {
    classification: string;
    title: {
      name: string;
    };
  };
  user: {
    name: string;
  };
};

const BorrowedTitles: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { addToast } = useToast();
  const [list, setList] = useState<BorrowedTitle[]>([]);
  const [loading, setLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = React.useState(0);

  useEffect(() => {
    try {
      setLoading(true);
      const response = window.api.sendSync('listBorrowedTitles', {
        value: {
          where: null,
          pageStart: 0,
          pageSize: rowsPerPage,
        },
      }) as PaginatedSearch<BorrowedTitle>;
      setList(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [rowsPerPage]);

  const handleSubmit = useCallback(
    async ({ pageIndex = 0 }: Search) => {
      try {
        setLoading(true);
        const response = window.api.sendSync('listBorrowedTitles', {
          value: {
            where: null,
            pageStart: rowsPerPage * pageIndex,
            pageSize: rowsPerPage,
          },
        }) as PaginatedSearch<BorrowedTitle>;
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

  const columns: Array<Column<BorrowedTitle>> = useMemo(
    () => [
      {
        Header: i18n.t('borrow.borrowDate'),
        id: 'borrowDate',
        Cell: (b: Cell<BorrowedTitle>) => {
          return <>{format(new Date(b.row.original.borrow), 'dd/MM/yyyy')}</>;
        },
      },
      {
        Header: i18n.t('borrow.estimatedReturnDate'),
        id: 'returnDate',
        Cell: (b: Cell<BorrowedTitle>) => {
          return (
            <>
              {format(new Date(b.row.original.estimatedReturn), 'dd/MM/yyyy')}
            </>
          );
        },
      },
      {
        Header: i18n.t('borrow.classification'),
        id: 'classification',
        Cell: (b: Cell<BorrowedTitle>) => {
          return <>{b.row.original.titlePublisher.classification}</>;
        },
      },
      {
        Header: i18n.t('borrow.title'),
        id: 'title',
        Cell: (b: Cell<BorrowedTitle>) => {
          return <>{b.row.original.titlePublisher.title.name}</>;
        },
      },
      {
        Header: i18n.t('person.label'),
        id: 'user',
        Cell: (b: Cell<BorrowedTitle>) => {
          return <>{b.row.original.user.name}</>;
        },
      },
    ],
    []
  );

  return (
    <Container>
      <ButtonContainer>
        <Button
          color="primary"
          title={i18n.t('button.pdfExport')}
          onClick={() => { return; }}
        >
          <AiOutlineFilePdf size={20} />
        </Button>
      </ButtonContainer>
      <Table<BorrowedTitle>
        name="borrowedTitles"
        columns={columns}
        data={list}
        loading={loading}
        pageCount={pageCount}
        fetchData={handleSubmit}
        setRowsPerPage={setRowsPerPage}
        getRowProps={(row) => ({
          style: {
            color:
              row.original.estimatedReturn <= new Date()
                ? colors.error
                : colors.text,
            fontWeight:
                row.original.estimatedReturn <= new Date()
                  ? 600
                  : 400,
          },
        })}
      />
    </Container>
  );
};

export default BorrowedTitles;
