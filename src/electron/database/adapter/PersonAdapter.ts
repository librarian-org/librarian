import { Title } from '../models/Title.schema';
import { User } from '../models/User.schema';
import AdapterBase, { AdapterBaseProps } from './AdapterBase';

export default class PersonAdapter implements AdapterBase {
  public async defineData(
    dataFromRepository: Title[] | User[]
  ): Promise<AdapterBaseProps[]> {
    try {
      const data = dataFromRepository.map((item: Title | User) => {
        const processedItem = {
          name: item.name,
          label: item.name,
          complement: item.name,
          icon: 'FaUser',
          iconColor: '#ff78f7',
          iconAction: 'FaHandshake',
          handler: 'Person',
          action: 'Person',
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
