import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { SearchSource } from '..';
import RoundedButton from '../../RoundedButton';

interface MenuItemProps {
  //mouseInterraction(e: React.MouseEvent, param: any): void;
  keyPress(e: React.KeyboardEvent): void;
  selectedItem: number;
  order: number;
  item: SearchSource;
}

const MenuItem: React.FC<MenuItemProps> = ({
  selectedItem,
  //mouseInterraction,
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
          onClick={(e: React.MouseEvent) =>  item.handler.onClick(e)}
          onKeyDown={keyPress}
          // onKeyDown={e => item.handler.onPress(e, item)}
        >
          {<item.icon size={20} />}
          {item.label}
        </span>
        <RoundedButton
          className={
            selectedItem === order ? 'secondary selected' : 'secondary'
          }
          //onClick={item.action.onClick}
          //onKeyDown={item.action.onPress}
          onClick={(e: React.MouseEvent) =>  item.action.onClick(e)}
          onKeyDown={keyPress}
          tabIndex={order}
          icon={FiPlus}
          color="secondary"
        />
      </li>
    </>
  );
};

export default MenuItem;
