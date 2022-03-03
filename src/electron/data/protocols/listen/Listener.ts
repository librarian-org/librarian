import { IpcMainEvent } from 'electron';
import RepositoryFactory from '../../../infra/db/factories/RepositoryFactory';
import { Event } from '../../../contracts/Event';

export interface Listener {
  repositoryFactory: RepositoryFactory;
  handler(event: IpcMainEvent, content: Event[]): Promise<void>;
}
