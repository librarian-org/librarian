interface Author {
  id: string;
  name: string;
}

interface TitleAuthor {
  id: string;
  authorId: number;
  author: Author;
}

interface Category {
  id: string;
  name: string;
}

interface TitleCategory {
  id: string;
  categoryId: number;
  category: Category;
}

interface Publisher {
  id: string;
  name: string;
}

interface TitlePublisher {
  id: string;
  edition: string;
  classification: string;
  publishedAt: Date;
  publisherId: number;
  publisher: Publisher;
}

export type Title = {
  id: string;
  name: string;
  ISBN: string;
  titlePublishers: TitlePublisher[];
  titleAuthors: TitleAuthor[];
  titleCategories: TitleCategory[];
}
