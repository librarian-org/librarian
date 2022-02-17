import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Cell, Column } from 'react-table';
import { Setting } from '../../util/DefaultEntities';
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
import UserSelect, { Option } from '../UserSelect';
import { addDays, format, parseISO } from 'date-fns';
import TitleSelect from '../TitleSelect';
import { ThemeContext } from 'styled-components';
import { OnChangeValue } from 'react-select';
import { BorrowStatus } from '../../../common/BorrowStatus';
import { useSettings } from '../../hooks/useSettings';

interface SelectType {
  id: string;
  name: string;
}

interface BorrowSearch extends Search {
  userId: string;
}

const Borrow: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { addToast } = useToast();
  const settings = useSettings();

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

  const handleIsReservation = (): void => {
    setIsReservation(!isReservation);
  };

  const handleReservationSubmit = useCallback(
    async ({ pageIndex = 0, userId }: BorrowSearch) => {
      try {
        if (!userId) {
          return;
        }
        setLoadingReservation(true);
        const response = window.api.sendSync('listBorrow', {
          entity: 'Borrow',
          value: {
            where: {
              isReservation: '1',
              userId,
            },
            pageStart: reservationRowsPerPage * pageIndex,
            pageSize: reservationRowsPerPage,
          },
        }) as PaginatedSearch<Borrow>;
        setReservationList(response.data);
        setReservationPageCount(
          Math.ceil(response.count / reservationRowsPerPage)
        );

        setLoadingReservation(false);
      } catch (err) {
        addToast({
          type: 'error',
          title: i18n.t('borrow.anErrorHasOccurred'),
          description: i18n.t('borrow.anErrorOnLoadReservations'),
        });
      }
    },
    [addToast, reservationRowsPerPage]
  );

  const handleBorrowSubmit = useCallback(
    async ({ pageIndex = 0, userId }: BorrowSearch) => {
      try {
        if (!userId) {
          return;
        }
        setLoading(true);
        const response = window.api.sendSync('listBorrow', {
          entity: 'Borrow',
          value: {
            where: [
              {
                isReservation: '0',
                userId,
                status: BorrowStatus.Borrowed,
              },
              {
                isReservation: '0',
                userId,
                status: BorrowStatus.BorrowedByReservation,
              },
            ],
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
          title: i18n.t('borrow.anErrorHasOccurred'),
          description: i18n.t('borrow.anErrorOnLoadBorrow'),
        });
        console.log(err);
      }
    },
    [addToast, rowsPerPage]
  );

  const handleRefresh = useCallback(async () => {
    await handleBorrowSubmit({
      pageIndex: 0,
      pageSize: 10,
      userId: refUser.current.getValue<SelectType>().id,
    });
    await handleReservationSubmit({
      pageIndex: 0,
      pageSize: 10,
      userId: refUser.current.getValue<SelectType>().id,
    });
  }, [handleBorrowSubmit, handleReservationSubmit]);

  const handleReturn = useCallback(
    async (item: Borrow): Promise<void> => {
      try {
        window.api.sendSync('returns', {
          entity: 'Borrow',
          value: {
            where: {
              id: item.id,
            },
          },
        });
        await handleRefresh();
      } catch (err) {
        addToast({
          title: i18n.t('borrow.anErrorHasOccurred'),
          type: 'error',
          description: err,
        });
      }
    },
    [addToast, handleRefresh]
  );

  const handleRenovation = useCallback(
    async (item: Borrow): Promise<void> => {
      const errors: string[] = [];

      const reserved = window.api.sendSync('readReservation', {
        entity: 'Borrow',
        value: item.titlePublisherId,
      });

      if (reserved) {
        errors.push(i18n.t('borrow.alreadyReserved'));
      }

      if (item.renovations.length > parseInt(settings.allowedRenovations)) {
        errors.push(i18n.t('borrow.cantRenewAnymore'));
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

      try {
        const user = refUser.current.getValue<SelectType>();

        window.api.sendSync('updateRenovation', {
          entity: 'Borrow',
          value: {
            where: {
              id: item.id,
              titlePublisherId: item.titlePublisherId,
              userId: user.id,
            },
            config: {
              daysReturnDate: settings.daysReturnDate,
            },
          },
        });
        await handleRefresh();
      } catch (err) {
        addToast({
          title: i18n.t('borrow.anErrorHasOccurred'),
          type: 'error',
          description: err,
        });
      }
    },
    [
      addToast,
      handleRefresh,
      settings.allowedRenovations,
      settings.daysReturnDate,
    ]
  );

  const handleBorrowByReservation = useCallback(
    async (item: Borrow): Promise<void> => {
      try {
        const result = window.api.sendSync('list', {
          entity: 'Settings',
          value: {},
        }) as Setting[];
        const settings = result[0];

        window.api.sendSync('borrowByReservation', {
          entity: 'Borrow',
          value: {
            where: {
              id: item.id,
            },
            config: {
              daysReturnDate: settings.daysReturnDate,
            },
          },
        });
        await handleRefresh();
      } catch (err) {
        addToast({
          title: i18n.t('borrow.anErrorHasOccurred'),
          type: 'error',
          description: err,
        });
      }
    },
    [addToast, handleRefresh]
  );

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
          return <>{format(new Date(b.row.original.borrow), 'dd/MM/yyyy')}</>;
        },
      },
      {
        Header: i18n.t('borrow.returnDate'),
        id: 'returnDate',
        Cell: (b: Cell<Borrow>) => {
          return (
            <>
              {format(new Date(b.row.original.estimatedReturn), 'dd/MM/yyyy')}
            </>
          );
        },
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
    [handleRenovation, handleReturn]
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
        id: 'borrowDate',
        Cell: (b: Cell<Borrow>) => {
          return <>{format(new Date(b.row.original.borrow), 'dd/MM/yyyy')}</>;
        },
      },
      {
        Header: i18n.t('borrow.returnDate'),
        id: 'returnDate',
        Cell: (b: Cell<Borrow>) => {
          return (
            <>
              {format(new Date(b.row.original.estimatedReturn), 'dd/MM/yyyy')}
            </>
          );
        },
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
                  handleBorrowByReservation(row.row.original);
                }}
              />
            </>
          );
        },
      },
    ],
    [handleBorrowByReservation]
  );

  const cleanForm = useCallback(() => {
    setBorrowDate('');
    setReturnDate('');
    refTitle.current.clear();
    setIsReservation(false);
  }, []);

  const handleCustomChange = useCallback(
    (selectedValue: OnChangeValue<Option, false>) => {
      handleBorrowSubmit({
        pageIndex: 0,
        pageSize: 10,
        userId: selectedValue.value,
      });
      handleReservationSubmit({
        pageIndex: 0,
        pageSize: 10,
        userId: selectedValue.value,
      });

      cleanForm();
    },
    [cleanForm, handleBorrowSubmit, handleReservationSubmit]
  );

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

    if (!isReservation && title) {
      const borrowed = window.api.sendSync('readBorrow', {
        entity: 'Borrow',
        value: title.id,
      });

      if (borrowed) {
        errors.push(i18n.t('borrow.alreadyBorrowed'));
      }
    }

    if (isReservation && title) {
      const reserved = window.api.sendSync('readReservation', {
        entity: 'Borrow',
        value: title.id,
      });

      if (reserved) {
        errors.push(i18n.t('borrow.alreadyReserved'));
        cleanForm();
      }
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

    try {
      window.api.sendSync('create', {
        entity: 'Borrow',
        value: {
          userId: user.id,
          borrow: parseISO(borrowDate),
          estimatedReturn: parseISO(returnDate),
          status: BorrowStatus.Borrowed,
          isReservation: isReservation,
          titlePublisherId: title.id,
        },
      });

      cleanForm();
      await handleRefresh();
    } catch (err) {
      addToast({
        title: i18n.t('borrow.anErrorHasOccurred'),
        type: 'error',
        description: err,
      });
    }
  }, [
    addToast,
    borrowDate,
    cleanForm,
    handleRefresh,
    isReservation,
    returnDate,
  ]);

  const handleSelectTitle = useCallback(
    (selectedValue: OnChangeValue<Option, false>) => {
      if (selectedValue) {
        setBorrowDate(format(new Date(), 'yyyy-MM-dd'));
        setReturnDate(
          format(
            addDays(new Date(), parseInt(settings.daysReturnDate)),
            'yyyy-MM-dd'
          )
        );
      }
    },
    [settings.daysReturnDate]
  );

  return (
    <Container>
      <Header>
        <UserSelect
          autoFocus
          ref={refUser}
          handleCustomChange={handleCustomChange}
        />
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
          <TitleSelect ref={refTitle} handleCustomChange={handleSelectTitle} />
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
            label={i18n.t('borrow.returnDate')}
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
          getRowProps={(row) => ({
            style: {
              color:
                row.original.estimatedReturn <= new Date()
                  ? colors.error
                  : colors.text,
            },
          })}
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
