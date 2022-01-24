import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Cell, Column } from 'react-table';
import i18n from '../../i18n';
import Input from '../Input';
import SectionContent from '../Sections/SectionContent';
import SectionHeader from '../Sections/SectionHeader';
import { PaginatedSearch, Table } from '../Table';
import { Search } from '../Table/TablePagination';
import { Borrow, Reservation } from './Borrow';
import { useToast } from '../../hooks/toast';

import { Container, Header, Row } from './styles';
import Button from '../Button';
import { FiPlus, FiRefreshCw, FiShare } from 'react-icons/fi';
import { SelectHandles } from '../CreatableSelectInput';
import UserSelect from '../UserSelect';
import { format } from 'date-fns';

const Borrow: React.FC = () => {
  const { addToast } = useToast();

  const refUser = useRef<SelectHandles>(null);

  const [selectedSection, setSelectedSection] = useState('borrow');
  const sections = useMemo(() => ['borrow', 'reservation'], []);

  const [reservationList, setReservationList] = useState<Reservation[]>([]);
  const [loadingReservation, setLoadingReservation] = useState(false);

  const [reservationRowsPerPage, setReservationRowsPerPage] = useState(10);
  const [reservationPageCount, setReservationPageCount] = React.useState(0);

  const [borrowList, setBorrowList] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = React.useState(0);

  const handleRenovation = (item: Borrow): void => {
    console.log('Renovation of ', item);
  };

  const handleBorrow = (item: Borrow): void => {
    console.log('Borrow of reserved: ', item);
  };

  const borrowColumns: Array<Column<Borrow>> = useMemo(
    () => [
      {
        Header: i18n.t('borrow.classification'),
        accessor: 'title1',
        // accessor: (borrow: Borrow) => `${borrow.titlePublisher.classification}`,
      },
      {
        Header: i18n.t('borrow.title'),
        accessor: 'title',
      },
      {
        Header: i18n.t('borrow.borrowDate'),
        accessor: 'borrow',
      },
      {
        Header: i18n.t('borrow.borrowDate'),
        accessor: 'estimatedReturn',
      },
      {
        Header: () => null,
        id: 'refresh',
        Cell: (row: Cell<Borrow>) => {
          return (
            <>
              <FiRefreshCw
                size={20}
                onClick={(event) => {
                  event.stopPropagation();
                  handleRenovation(row.row.original);
                }}
              />
            </>
          );
        },
      },
    ],
    []
  );

  const reservationColumns: Array<Column<Borrow>> = useMemo(
    () => [
      {
        Header: i18n.t('borrow.classification'),
        accessor: 'title1',
        // accessor: (borrow: Borrow) => `${borrow.titlePublisher.classification}`,
      },
      {
        Header: i18n.t('borrow.title'),
        accessor: 'title',
      },
      {
        Header: i18n.t('borrow.borrowDate'),
        accessor: 'borrow',
      },
      {
        Header: i18n.t('borrow.borrowDate'),
        accessor: 'estimatedReturn',
      },
      {
        Header: () => null,
        id: 'borrowing',
        Cell: (row: Cell<Borrow>) => {
          return (
            <>
              <FiShare
                size={20}
                onClick={(event) => {
                  event.stopPropagation();
                  handleBorrow(row.row.original);
                }}
              />
            </>
          );
        },
      },
    ],
    []
  );

  const handleReservationSubmit = useCallback(
    async ({ pageIndex = 0 }: Search) => {
      try {
        setLoading(true);
        const response = { data: [{}] as Borrow[], count: 0 };
        // window.api.sendSync('listBorrow', {
        //   entity: 'Borrow',
        //   value: {
        //     where: { isReservation: false },
        //     pageStart: rowsPerPage * pageIndex,
        //     pageSize: rowsPerPage,
        //   },
        // }) as PaginatedSearch<Borrow>;
        setReservationList(response.data);
        setPageCount(Math.ceil(response.count / rowsPerPage));

        setLoading(false);
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

  const handleBorrowSubmit = useCallback(
    async ({ pageIndex = 0 }: Search) => {
      try {
        setLoading(true);
        const response = {
          data: [{ borrow: format(new Date(), 'dd/MM/yyyy') }] as Borrow[],
          count: 0,
        };
        // window.api.sendSync('listBorrow', {
        //   entity: 'Borrow',
        //   value: {
        //     where: { isReservation: false },
        //     pageStart: rowsPerPage * pageIndex,
        //     pageSize: rowsPerPage,
        //   },
        // }) as PaginatedSearch<Borrow>;
        setBorrowList(response.data);
        setPageCount(Math.ceil(response.count / rowsPerPage));

        setLoading(false);
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

  const handleAddBorrow = useCallback(() => {
    return;
  }, []);
  return (
    <Container>
      <Header>
        <UserSelect ref={refUser} />
        {/* <Input
          type="text"
          name="name"
          autoFocus
          label={i18n.t('borrow.name')}
          placeholder={i18n.t('borrow.typePersonName')}
        /> */}
      </Header>
      {/* <Sections> */}
      <SectionHeader>
        {sections.map((section) => (
          <a
            key={section}
            className={selectedSection === section ? 'active' : ''}
            onClick={() => setSelectedSection(section)}
          >
            {i18n.t(`borrow.${section}`)}
          </a>
        ))}
      </SectionHeader>
      <SectionContent isActive={selectedSection === 'borrow'}>
        <Row>
          <Input
            type="text"
            name="title"
            label={i18n.t('borrow.title')}
            placeholder={i18n.t('borrow.typeTitleToBorrow')}
          />
          <Input
            type="date"
            name="borrowDate"
            label={i18n.t('borrow.borrowDate')}
            placeholder={i18n.t('borrow.typeBorrowDate')}
          />
          <Input
            type="date"
            name="returnDate"
            label={i18n.t('borrow.retrunDate')}
            placeholder={i18n.t('borrow.typeReturnBorrow')}
          />
          <label>
            <input type="checkbox" name="reservation" />
            {i18n.t('borrow.reservation')}
          </label>

          <Button style={{}} color="primary" onClick={handleAddBorrow}>
            <FiPlus size={20} />
          </Button>
        </Row>
        <Table<Borrow>
          name="Borrow"
          columns={borrowColumns}
          data={borrowList}
          loading={loading}
          pageCount={pageCount}
          fetchData={handleBorrowSubmit}
          setRowsPerPage={setRowsPerPage}
        />
      </SectionContent>
      <SectionContent isActive={selectedSection === 'reservation'}>
        <Table<Reservation>
          name="Reservation"
          columns={reservationColumns}
          data={reservationList}
          loading={loadingReservation}
          pageCount={reservationPageCount}
          fetchData={handleReservationSubmit}
          setRowsPerPage={setReservationRowsPerPage}
        />
      </SectionContent>
      {/* </Sections> */}
    </Container>
  );
};

export default Borrow;
