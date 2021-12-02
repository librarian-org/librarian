import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { SearchSource } from '..';
import RoundedButton from '../../RoundedButton';

interface MenuItemProps {
  keyPress(e: React.KeyboardEvent): void;
  selectedItem: number;
  order: number;
  item: SearchSource;
}

const MenuItem: React.FC<MenuItemProps> = ({
  selectedItem,
  keyPress,
  order,
  item,
}) => {
  return (
    <>
      <li>
        <span
          tabIndex={order - 1}
          className={selectedItem === order - 1 ? 'selected' : ''}
          onClick={(e: React.MouseEvent) => item.handler.onClick(e)}
          onKeyDown={keyPress}
        >
          {<item.icon size={20} />}
          {item.label}
        </span>
        <RoundedButton
          className={
            selectedItem === order ? 'secondary selected' : 'secondary'
          }
          onClick={(e: React.MouseEvent) => item.action.onClick(e)}
          onKeyDown={keyPress}
          tabIndex={order}
          icon={item.iconAction}
          color="secondary"
        />
      </li>
    </>
  );
};

export default MenuItem;
