interface Product {
  listenerName: string;
  repositoryName: string;
}
export default class ListenerContainer {
  public static getListeners(): Product[] {
    const products: Product[] = [
      { listenerName: 'create', repositoryName: 'GenericCreate' },
      { listenerName: 'delete', repositoryName: 'GenericDelete' },
      { listenerName: 'list', repositoryName: 'GenericList' },
      { listenerName: 'read', repositoryName: 'GenericRead' },
      { listenerName: 'softDelete', repositoryName: 'GenericSoftDelete' },
      { listenerName: 'update', repositoryName: 'GenericUpdate' },

      { listenerName: 'listTitle', repositoryName: 'ListTitle' },
      { listenerName: 'readTitle', repositoryName: 'ReadTitle' },

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
