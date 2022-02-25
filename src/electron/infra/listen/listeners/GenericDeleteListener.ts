import { IpcMainEvent } from 'electron';
import log from 'electron-log';
import { Event } from '../../../contracts/Event';
import RepositoryFactory from '../../db/factories/RepositoryFactory';
import ListenerBase from '../ListenerBase';

export class GenericDeleteListener extends ListenerBase {
  static listenerName = 'delete';

  constructor(repositoryFactory: RepositoryFactory) {
    super(repositoryFactory);
  }

  public async handler(event: IpcMainEvent, content: Event[]): Promise<void> {
    try {
      const { value, entity } = content[0];
      const repository = this.repositoryFactory.make('GenericDelete', entity);
      event.returnValue = await repository.execute(value);
    } catch (err) {
      log.error(err);
    }
  }
}
