import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { FiDownload, FiPlus, FiRefreshCw, FiShare } from 'react-icons/fi';
import { SelectHandles } from '../CreatableSelectInput';
import UserSelect from '../UserSelect';
import { format, parseISO } from 'date-fns';
import TitleSelect from '../TitleSelect';

interface SelectType {
  id: string;
  name: string;
}

const Borrow: React.FC = () => {
  const { addToast } = useToast();

  const refUser = useRef<SelectHandles>(null);
  const refTitle = useRef<SelectHandles>(null);
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isReservation, setIsReservation] = useState(false);

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

  const handleReturn = (item: Borrow): void => {
    console.log('Return of title: ', item);
  };

  const handleIsReservation = (): void => {
    setIsReservation(!isReservation);
  };

  const borrowColumns: Array<Column<Borrow>> = useMemo(
    () => [
      {
        Header: i18n.t('borrow.classification'),
        id: 'classification',
        Cell: (b: Cell<Borrow>) => {
          return <>{b.row.original.titlePublisher.classification}</>;
        },
      },
      {
        Header: i18n.t('borrow.title'),
        id: 'title',
        Cell: (b: Cell<Borrow>) => {
          return <>{b.row.original.titlePublisher.title.name}</>;
        },
      },
      {
        Header: i18n.t('borrow.borrowDate'),
        id: 'borrowDate',
        Cell: (b: Cell<Borrow>) => {
          return <>{b.row.original.borrow}</>;
        },
        // accessor: 'borrow',
        // accessor: (b: Borrow) => `${format(b.borrow, 'dd/MM/yyyy')}`
      },
      {
        Header: i18n.t('borrow.returnDate'),
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
      {
        Header: () => null,
        id: 'return',
        Cell: (row: Cell<Borrow>) => {
          return (
            <>
              <FiDownload
                size={20}
                onClick={(event) => {
                  event.stopPropagation();
                  handleReturn(row.row.original);
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
        id: 'classificationReservation',
        Cell: (b: Cell<Borrow>) => {
          return <>{b.row.original.titlePublisher.classification}</>;
        },
      },
      {
        Header: i18n.t('borrow.title'),
        id: 'titleReservation',
        Cell: (b: Cell<Borrow>) => {
          return <>{b.row.original.titlePublisher.title.name}</>;
        },
      },
      {
        Header: i18n.t('borrow.borrowDate'),
        accessor: 'borrow',
      },
      {
        Header: i18n.t('borrow.returnDate'),
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
        const response = { data: [] as Borrow[], count: 0 };
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
        const user = refUser.current.getValue<SelectType>();
        console.log('USER: ', refUser.current.getValue<SelectType>());
        if (!user) {
          return;
        }
        setLoading(true);
        const response = window.api.sendSync('listBorrow', {
          entity: 'Borrow',
          value: {
            where: { isReservation: false, userId: user.id },
            pageStart: rowsPerPage * pageIndex,
            pageSize: rowsPerPage,
          },
        }) as PaginatedSearch<Borrow>;
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
    [addToast, rowsPerPage, refUser]
  );

  useEffect(() => {
    handleBorrowSubmit({ pageIndex: 0, pageSize: 10 });
    console.log('USER1: ', refUser.current.getValue<SelectType>());
  }, [handleBorrowSubmit, refUser]);

  const handleAddBorrow = useCallback(async () => {
    const user = refUser.current.getValue<SelectType>();
    const title = refTitle.current.getValue<SelectType>();
    const errors: string[] = [];

    if (!user) {
      errors.push(i18n.t('user.label'));
    }

    if (!title) {
      errors.push(i18n.t('borrow.title'));
    }

    if (!borrowDate) {
      errors.push(i18n.t('borrow.borrowDate'));
    }

    if (!returnDate) {
      errors.push(i18n.t('borrow.returnDate'));
    }

    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('borrow.informErrors')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }

    window.api.sendSync('create', {
      entity: 'Borrow',
      value: {
        userId: user.id,
        borrow: parseISO(borrowDate),
        estimatedReturn: parseISO(returnDate),
        status: 1,
        isReservation: isReservation,
        titlePublisherId: title.id,
      },
    });

    setBorrowDate('');
    setReturnDate('');
    refTitle.current.clear();
    setIsReservation(false);

    await handleBorrowSubmit({ pageIndex: 0, pageSize: 10 });
  }, [addToast, borrowDate, handleBorrowSubmit, isReservation, returnDate]);

  return (
    <Container>
      <Header>
        <UserSelect autoFocus ref={refUser} />
      </Header>
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
          <TitleSelect ref={refTitle} />
          <Input
            type="date"
            name="borrowDate"
            label={i18n.t('borrow.borrowDate')}
            placeholder={i18n.t('borrow.typeBorrowDate')}
            onChange={(e) => setBorrowDate(e.target.value)}
            value={borrowDate}
          />
          <Input
            type="date"
            name="returnDate"
            label={i18n.t('borrow.retrunDate')}
            placeholder={i18n.t('borrow.typeReturnBorrow')}
            onChange={(e) => setReturnDate(e.target.value)}
            value={returnDate}
          />
          <label>
            <input
              type="checkbox"
              name="reserve"
              onChange={handleIsReservation}
              checked={isReservation}
            />
            &nbsp;
            {i18n.t('borrow.reserve')}
          </label>

          <Button color="primary" onClick={handleAddBorrow}>
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
    </Container>
  );
};

export default Borrow;
