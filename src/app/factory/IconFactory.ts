import { FaPlus, FaUser, FaBook, FaHandshake } from 'react-icons/fa';
import { FiBook } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';

interface Product {
  [key: string]: React.ComponentType<IconBaseProps>;
}

class IconFactory {
  static readonly icons: Product = {
    FiBook: FiBook,
    FaPlus: FaPlus,
    FaUser: FaUser,
    FaBook: FaBook,
    FaHandshake: FaHandshake,
  };

  static icon(param: string): React.ComponentType<IconBaseProps> {
    return this.icons[param];
  }
}

export default IconFactory;
