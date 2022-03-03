import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

export class TitleSearchRepository extends RepositoryBase {
  private static instance: TitleSearchRepository = null;

  static repositoryName = 'TitleSearch';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): TitleSearchRepository {
    if (!TitleSearchRepository.instance) {
      TitleSearchRepository.instance = new TitleSearchRepository();
    }

    TitleSearchRepository.instance.repository = typeOrm;

    return TitleSearchRepository.instance;
  }

  public async execute(content: string): Promise<unknown> {
    try {
      const filter = {
        relations: [
          'titleAuthors',
          'titleAuthors.author',
          'titleCategories',
          'titleCategories.category',
          'titlePublishers',
          'titlePublishers.publisher',
        ],
        where: (qb: any) => {
          qb.where(`Title.name like '%${content}%'`)
            .orWhere(
              `Title__titleCategories__category.name like '%${content}%'`
            )
            .orWhere(`Title__titleAuthors__author.name like '%${content}%'`);
        },
        limit: 15,
      };
      const data = await this.repository.find(filter);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
