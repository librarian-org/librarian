import { User as UserSchema } from '../../../electron/database/models/User.schema';
import { Settings as SettingsSchema } from '../../../electron/database/models/Settings.schema';
import { Borrow as  BorrowSchema } from '../../../electron/database/models/Borrow.schema';
import { Title as TitleSchema } from '../../../electron/database/models/Title.schema';
export interface Tab {
  id: string;
  type: string;
  title: string;
  unsavedChanges?: boolean;
  titleScope?: string;
  action: string;
  item?: UserSchema | TitleSchema | SettingsSchema | BorrowSchema;
  reference?: string
}
