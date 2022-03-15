import { trigger } from '../util/EventHandler';
import { AppEvent } from '../../common/AppEvent';
import { Actions } from '../../common/Actions';
import IconFactory from './IconFactory';
import {AdapterBaseProps} from '../../electron/database/adapter/AdapterBase';
import { SearchSource } from '../util/DefaultEntities';

class Title {
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
          trigger(AppEvent.titleTab, {
            action: Actions.read,
            value: item.item,
          });
        },
        onPress: (): void => {
          trigger(AppEvent.quickSearch);
          trigger(AppEvent.titleTab, {
            action: Actions.read,
            value: item.item,
          });
        },
      },
      action: {
        onClick: (): void => {
          trigger(AppEvent.quickSearch);
          trigger(AppEvent.borrowTab, {
            action: Actions.update,
            value: item.item,
          });
        },
        onPress: (): void => {
          trigger(AppEvent.quickSearch);
          trigger(AppEvent.borrowTab, {
            action: Actions.update,
            value: item.item,
          });
        },
      },
    };
    return newItem;
  }
}

export default Title;
