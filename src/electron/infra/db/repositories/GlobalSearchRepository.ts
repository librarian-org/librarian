import RepositoryBase from '../RepositoryBase';
import typeORM, { getRepository } from 'typeorm';

import TitleAdapter from '../../../database/adapter/TitleAdapter';
import PersonAdapter from '../../../database/adapter/PersonAdapter';

import { TitleSearchRepository } from './title/TitleSearchRepository';
import { PersonSearchRepository } from './person/PersonSearchRepository';

import { Title } from '../../../database/models/Title.schema';
import { User } from '../../../database/models/User.schema';

export class GlobalSearchRepository extends RepositoryBase {
  private static instance: GlobalSearchRepository = null;

  static repositoryName = 'GlobalSearch';

  private constructor() {
    super();
  }

  public static getInstance(
    typeOrm: typeORM.Repository<unknown>
  ): GlobalSearchRepository {
    if (!GlobalSearchRepository.instance) {
      GlobalSearchRepository.instance = new GlobalSearchRepository();
    }

    GlobalSearchRepository.instance.repository = typeOrm;

    return GlobalSearchRepository.instance;
  }

  public async execute(content: string): Promise<unknown> {
    try {
      const titleAdapter = new TitleAdapter();
      const personAdapter = new PersonAdapter();

      const titleRepository = getRepository(Title);
      const titlesResult = (await TitleSearchRepository.getInstance(
        titleRepository
      ).execute(content)) as Title[];

      const titles = await titleAdapter.defineData(titlesResult);

      const personRepository = getRepository(User);
      const personResult = (await PersonSearchRepository.getInstance(
        personRepository
      ).execute(content)) as User[];

      const people = await personAdapter.defineData(personResult);

      return [...titles, ...people];
    } catch (err) {
      console.log('FUDEU', err);
      throw err;
    }
  }
}
