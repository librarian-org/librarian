import { Address } from './models/Address.schema';
import { Author } from './models/Author.schema';
import { Borrow } from './models/Borrow.schema';
import { BorrowRenovation } from './models/BorrowRenovation.schema';
import { Category } from './models/Category.schema';
import { City } from './models/City.schema';
import { Contact } from './models/Contact.schema';
import { ContactType } from './models/ContactType.schema';
import { Country } from './models/Country.schema';
import { Permission } from './models/Permission.schema';
import { Profile } from './models/Profile.schema';
import { Program } from './models/Program.schema';
import { Publisher } from './models/Publisher.schema';
import { Region } from './models/Region.schema';
import { Settings } from './models/Settings.schema';
import { Title } from './models/Title.schema';
import { TitleAuthor } from './models/TitleAuthor.schema';
import { TitleCategory } from './models/TitleCategory.schema';
import { TitlePublisher } from './models/TitlePublisher.schema';
import { UserType } from './models/UserType.schema';
import { User } from './models/User.schema';

export default class EntitiesConfigs {
  public static getEntities(): unknown[] {
    return [
      Permission,
      Title,
      TitlePublisher,
      User,
      Author,
      Program,
      Category,
      Publisher,
      Region,
      City,
      Address,
      Country,
      Profile,
      UserType,
      ContactType,
      Contact,
      Settings,
      Borrow,
      BorrowRenovation,
      TitleCategory,
      TitleAuthor,
    ];
  }
}
