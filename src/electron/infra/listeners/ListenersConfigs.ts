interface Config {
  listenerName: string;
  repositoryName: string;
}
export default class ListenersConfigs {
  public static getListeners(): Config[] {
    const products: Config[] = [
      { listenerName: 'create', repositoryName: 'GenericCreate' },
      { listenerName: 'delete', repositoryName: 'GenericDelete' },
      { listenerName: 'list', repositoryName: 'GenericList' },
      { listenerName: 'read', repositoryName: 'GenericRead' },
      { listenerName: 'softDelete', repositoryName: 'GenericSoftDelete' },
      { listenerName: 'update', repositoryName: 'GenericUpdate' },

      { listenerName: 'listTitle', repositoryName: 'ListTitle' },
      { listenerName: 'readTitle', repositoryName: 'ReadTitle' },
      {
        listenerName: 'checkTitleClassification',
        repositoryName: 'CheckTitleClassification',
      },

      { listenerName: 'listPerson', repositoryName: 'ListPerson' },
      { listenerName: 'readPerson', repositoryName: 'ReadPerson' },

      { listenerName: 'listBorrow', repositoryName: 'ListBorrow' },
      { listenerName: 'readBorrow', repositoryName: 'ReadBorrow' },
      { listenerName: 'readReservation', repositoryName: 'ReadReservation' },
      { listenerName: 'updateRenovation', repositoryName: 'UpdateRenovation' },
      { listenerName: 'returns', repositoryName: 'Returns' },
      {
        listenerName: 'borrowByReservation',
        repositoryName: 'BorrowByReservation',
      },
      { listenerName: 'listEdition', repositoryName: 'ListEdition' },

      { listenerName: 'userLogin', repositoryName: 'Login' },
      { listenerName: 'userCreate', repositoryName: 'UserCreate' },
      { listenerName: 'userUpdate', repositoryName: 'UserUpdate' },
      { listenerName: 'changePassword', repositoryName: 'ChangePassword' },

      { listenerName: 'globalSearch', repositoryName: 'GlobalSearch' },
    ];

    return products;
  }
}
