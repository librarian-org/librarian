import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

interface Where {
  where: unknown;
}

export class ReadTitleRepository extends RepositoryBase {
  private static instance: ReadTitleRepository = null;

  static repositoryName = 'ReadTitle';

  private constructor() {
    super();
  }

  public static getInstance(
    typeOrm: typeORM.Repository<unknown>
  ): ReadTitleRepository {
    if (!ReadTitleRepository.instance) {
      ReadTitleRepository.instance = new ReadTitleRepository();
    }

    ReadTitleRepository.instance.repository = typeOrm;

    return ReadTitleRepository.instance;
  }

  public async execute(content: Where): Promise<unknown> {
    try {
      let filter = {
        relations: [
          'titleAuthors',
          'titleAuthors.author',
          'titleCategories',
          'titleCategories.category',
          'titlePublishers',
          'titlePublishers.publisher',
        ],
      };

      if (content.where) {
        filter = { ...filter, ...{ where: content.where } };
      }

      return await this.repository.findOne(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
