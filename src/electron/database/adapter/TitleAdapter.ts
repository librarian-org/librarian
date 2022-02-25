import { Title } from '../models/Title.schema';
import { User } from '../models/User.schema';
import AdapterBase, { AdapterBaseProps } from './AdapterBase';

export default class TitleAdapter implements AdapterBase{
  public async defineData(
    dataFromRepository: Title[] | User[]
  ): Promise<AdapterBaseProps[]> {
    try {
      const data = dataFromRepository.map((item: Title | User) => {
        const processedItem = {
          name: item.name,
          label: item.name,
          complement: item.name,
          icon: 'FaBook',
          iconColor: '#50fa7b',
          iconAction: 'FaPlus',
          handler: 'Title',
          action: 'Title',
          item: item,
        };
        return processedItem;
      });

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
