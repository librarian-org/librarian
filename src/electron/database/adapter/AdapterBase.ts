import { Title } from '../models/Title.schema';
import { User } from '../models/User.schema';

export type AdapterBaseProps = {
  name: string;
  label: string;
  complement?: string;
  icon: string;
  iconColor: string;
  iconAction: string;
  handler: string;
  action: string;
  item: Title | User;
};

interface BaseAdapterContract {
  defineData(dataFromRepository: Title[] | User[]): Promise<AdapterBaseProps[]>;
}

export default class AdapterBase implements BaseAdapterContract {
  defineData(
    dataFromRepository: Title[] | User[]
  ): Promise<AdapterBaseProps[]> {
    throw new Error('Method not implemented.');
  }
}
