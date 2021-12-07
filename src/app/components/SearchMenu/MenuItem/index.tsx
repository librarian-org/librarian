import React from 'react';
import { SearchSource } from '../../../util/DefaultEntities';
import RoundedButton from '../../RoundedButton';

interface MenuItemProps {
  keyPress(e: React.KeyboardEvent): void;
  selectedItem: number;
  order: number;
  item: SearchSource;
  index: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  selectedItem,
  keyPress,
  order,
  item,
  index,
}) => {
  return (
    <>
      <li
        className={
          index ===
          (selectedItem % 2 ? (selectedItem - 1) / 2 : selectedItem / 2 - 1)
            ? 'li-selected'
            : ''
        }
      >
        <span
          tabIndex={order - 1}
          className={selectedItem === order - 1 ? 'selected' : ''}
          onClick={(e: React.MouseEvent) => item.handler.onClick(e)}
          onKeyDown={keyPress}
        >
          {<item.icon size={20} style={{ color: item.iconColor }} />}
          {item.label}
        </span>
        {item.iconAction && (
          <RoundedButton
            className={selectedItem === order ? 'primary selected' : 'primary'}
            onClick={(e: React.MouseEvent) => item.action.onClick(e)}
            onKeyDown={keyPress}
            tabIndex={order}
            icon={item.iconAction}
          />
        )}
      </li>
    </>
  );
};

export default MenuItem;
