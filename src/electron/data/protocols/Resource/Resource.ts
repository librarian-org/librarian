import { ResourceGetDatabasePath } from './ResourceGetDatabasePath';
import { ResourceGetIcon } from './ResourceGetIcon';
import { ResourceGetLanguages } from './ResourceGetLanguages';
import { ResourceGetMigrationPath } from './ResourceGetMigrationsPath';
import { ResourceGetSelectedLanguages } from './ResourceGetSelectedLanguage';
import { ResourceIsDev } from './ResourceIsDev';
import { ResourceWriteLanguageFile } from './ResourceWriteLanguageFile';

export default interface Resource
  extends ResourceGetDatabasePath,
    ResourceGetIcon,
    ResourceGetLanguages,
    ResourceGetMigrationPath,
    ResourceGetSelectedLanguages,
    ResourceIsDev,
    ResourceWriteLanguageFile {}
