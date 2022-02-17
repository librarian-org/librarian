import { Setting } from '../util/DefaultEntities';

export const useSettings = (): Setting => {
    const result = window.api.sendSync('list', {
      entity: 'Settings',
      value: {},
    }) as Setting[];

  return result[0];
};
