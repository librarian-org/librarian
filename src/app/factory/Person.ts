import { trigger } from '../util/EventHandler';
import { AppEvent } from '../../common/AppEvent';
import { Actions } from '../../common/Actions';
import IconFactory from './IconFactory';
import {AdapterBaseProps} from '../../electron/database/adapter/AdapterBase';
import { SearchSource } from '../util/DefaultEntities';

class Person {
  execute(item: AdapterBaseProps): SearchSource {
    const icon = IconFactory.icon(item.icon);
    const iconAction = IconFactory.icon(item.iconAction);

    const newItem = {
      name: item.name,
      label: item.label,
      complement: item.complement,
      icon: icon,
      iconColor: item.iconColor,
      iconAction: iconAction,
      handler: {
        onClick: (): void => {
          trigger(AppEvent.quickSearch);
          trigger(AppEvent.personTab, {
            action: Actions.read,
            value: item.item,
          });
        },
        onPress: (): void => {
          trigger(AppEvent.quickSearch);
          trigger(AppEvent.personTab, {
            action: Actions.read,
            value: item.item,
          });
        },
      },
      action: {
        onClick: (): void => {
          trigger(AppEvent.quickSearch);
          trigger(AppEvent.borrowTab, {
            action: Actions.create,
            value: item.item,
            reference: 'Person'
          });
        },
        onPress: (): void => {
          trigger(AppEvent.quickSearch);
          trigger(AppEvent.borrowTab, {
            action: Actions.create,
            value: item.item,
            reference: 'Person'
          });
        },
      },
    };
    return newItem;
  }
}

export default Person;
