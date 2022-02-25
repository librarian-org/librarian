import { IpcMainEvent } from 'electron';
import { Event } from '../../contracts/Event';
import { Listener } from '../../data/protocols';
import RepositoryFactory from '../db/factories/RepositoryFactory';

export default class ListenerBase implements Listener {
  static listenerName: string;
  public repositoryFactory: RepositoryFactory;

  constructor(repositoryFactory: RepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async handler(event: IpcMainEvent, content: Event[]): Promise<void> {
    throw new Error('Must be implemented on children classes.');
  }
}
