import Person from './Person';
import Title from './Title';
import {AdapterBaseProps} from '../../electron/database/adapter/AdapterBase';
import { SearchSource } from '../util/DefaultEntities';

interface Product {
  [key: string]: Person | Title;
}

class BehaviourFactory {
  static readonly factories: Product = {
    Person: new Person(),
    Title: new Title(),
  };

  static make(item: AdapterBaseProps): SearchSource {
    const classElement = this.factories[item.handler];
    return classElement.execute(item);
  }
}

export default BehaviourFactory;
