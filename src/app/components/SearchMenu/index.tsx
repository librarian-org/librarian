import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiPlus, FiSearch } from 'react-icons/fi';
import i18n from '../../i18n';
import Input from '../Input/index';
import Modal from '../Modal';
import MenuItem from './MenuItem';

interface SearchMenuProps {
  setOpen(): void;
  isOpen: boolean;
}

export interface SearchSource {
  label: string;
  icon?: React.ComponentType<IconBaseProps>;
  handler: {
    onClick(e: React.MouseEvent): void;
    onPress(e: React.KeyboardEvent, item?: SearchSource): void;
  };
  action: {
    onClick(e: React.MouseEvent): void;
    onPress(e: React.KeyboardEvent, item?: SearchSource): void;
  };
}

const SearchMenu: React.FC<SearchMenuProps> = ({ isOpen, setOpen }) => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const [maxItems, setMaxItems] = useState(6);
  const [searchResult, setSearchResult] = useState<SearchSource[]>([]);
  const [inputSearch, setInputSearch] = useState('');

  const searchSourceMemo: SearchSource[] = useMemo(() => {
    return [
      {
        label: 'Emprestimo',
        icon: FiPlus,
        handler: {
          onClick: () => console.log('emprestimo list click'),
          onPress: () => console.log('emprestimo list press'),
        },
        action: {
          onClick: () => console.log('emprestimo action click'),
          onPress: () => console.log('emprestimo action press'),
        },
      },
      {
        label: 'Pessoa',
        icon: FiPlus,
        handler: {
          onClick: () => console.log('pessoa list click'),
          onPress: () => console.log('pessoa list press'),
        },
        action: {
          onClick: () => console.log('pessoa action click'),
          onPress: () => console.log('pessoa action press'),
        },
      },
      {
        label: 'Titulo',
        icon: FiPlus,
        handler: {
          onClick: () => console.log('titulo list click'),
          onPress: () => console.log('titulo list press'),
        },
        action: {
          onClick: () => console.log('titulo action click'),
          onPress: () => console.log('titulo action press'),
        },
      },
    ];
  }, []);

  useEffect(() => {
    setSelectedItem(-1);
    setSearchResult(searchSourceMemo);
    setMaxItems(searchSourceMemo.length * 2);
  }, [isOpen, searchSourceMemo]);

  const handleSetSelectedItem = useCallback(
    (position: number): void => {
      setSelectedItem(
        position === 0 || position < -1
          ? -1
          : position > maxItems
          ? maxItems
          : position
      );
    },
    [maxItems]
  );

  const tabClick = useCallback((): void => {
    handleSetSelectedItem(selectedItem + 1);
  }, [selectedItem, handleSetSelectedItem]);

  const arrowUpClick = useCallback((): void => {
    handleSetSelectedItem(selectedItem - 2);
  }, [selectedItem, handleSetSelectedItem]);

  const arrowDownClick = useCallback((): void => {
    handleSetSelectedItem(selectedItem + 2);
  }, [selectedItem, handleSetSelectedItem]);

  const arrowLeftClick = useCallback((): void => {
    handleSetSelectedItem(selectedItem - 1);
  }, [selectedItem, handleSetSelectedItem]);

  const arrowRightClick = useCallback((): void => {
    handleSetSelectedItem(selectedItem + 1);
  }, [selectedItem, handleSetSelectedItem]);

  const enterClick = useCallback(
    (e: React.KeyboardEvent): void => {
      const itemRevert =
        selectedItem % 2 ? (selectedItem - 1) / 2 : selectedItem / 2 - 1;
      const item = searchResult[itemRevert];
      selectedItem % 2 ? item.handler.onPress(e) : item.action.onPress(e);
    },
    [searchResult, selectedItem]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputSearch(e.target.value);
      const results = searchSourceMemo.filter((item) =>
        item.label
          .toLocaleLowerCase()
          .startsWith(e.target.value.toLocaleLowerCase())
      );
      const resultsDb: SearchSource[] = [];
      results.push(...resultsDb);
      const finalResult: SearchSource[] = results.sort((a, b) =>
        a.label < b.label ? -1 : 1
      );
      setSearchResult(finalResult);
      setMaxItems(finalResult.length * 2);
      setSelectedItem(-1);
    },
    [searchSourceMemo]
  );

  const handleKeys = useCallback(
    (event, clicked): void => {
      const mapKeys = [
        { name: 'Tab', execute: tabClick },
        { name: 'Enter', execute: enterClick },
        { name: 'ArrowDown', execute: arrowDownClick },
        { name: 'ArrowUp', execute: arrowUpClick },
        { name: 'ArrowLeft', execute: arrowLeftClick },
        { name: 'ArrowRight', execute: arrowRightClick },
      ];
      const method = mapKeys.filter((i) => i.name === clicked)[0];
      if (method) {
        event.stopPropagation();
        event.preventDefault();
        method.execute(event);
      }
    },
    [
      arrowDownClick,
      arrowLeftClick,
      arrowRightClick,
      arrowUpClick,
      enterClick,
      tabClick,
    ]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      handleKeys(e, e.key);
    },
    [handleKeys]
  );

  return (
    isOpen && (
      <>
        {selectedItem}
        <Modal isOpen={isOpen} setIsOpen={setOpen} customClass="quick-search">
          <div>
            <Input
              name="search-menu"
              placeholder={i18n.t('menu.file.quickSearch')}
              icon={FiSearch}
              autoFocus
              onKeyDown={(e) => handleKeyPress(e)}
              selected={selectedItem === -1 ? 'selected' : ''}
              tabIndex={-1}
              value={inputSearch}
              onChange={handleChange}
            ></Input>
          </div>
          <ul>
            {searchResult.map((item, index) => (
              <MenuItem
                key={`menu-${index}`}
                order={(index + 1) * 2}
                item={item}
                //  mouseInterraction={handleClick}
                keyPress={handleKeyPress}
                selectedItem={selectedItem}
              />
            ))}
          </ul>
        </Modal>
      </>
    )
  );
};

export default SearchMenu;
