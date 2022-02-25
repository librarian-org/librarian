import { Listener } from '../../../data/protocols';
import RepositoryFactory from '../../db/factories/RepositoryFactory';
import * as AllListeners from '../listeners';

interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default class ListenerFactory {
  private products: Product = {};

  constructor(private repositoryFactory: RepositoryFactory) {
    this.loadListeners();
  }

  private loadListeners(): void {
    Object.entries(AllListeners).map((a) => {
      this.products[a[1].listenerName] = a[1];
    });
  }

  public getAvailableListeners(): string[] {
    return Object.keys(this.products);
  }

  public make(listenerName: string): Listener {
    const listenerProduct = new this.products[listenerName](
      this.repositoryFactory
    ) as Listener;

    return listenerProduct;
  }
}
