import React from 'react';
import Draggable from 'react-draggable';
import { Tab } from '../Tab';
import { FiX, FiBook, FiUser, FiSettings } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import { Container } from './styles';
import Translator from '../../I18n/Translator';

interface TabHeaderProps {
  tab: Tab;
  title: string;
  onClick: (...args: any[]) => any;
  close: (tab: Tab) => void;
  isActive: boolean;
}

const TabHeader: React.FC<TabHeaderProps> = ({ title, onClick, close, isActive, tab }) => {
  return (
    <Draggable axis="x" bounds='parent' grid={[10, 10]}>
      <Container isActive={isActive} onClick={onClick}>
        <div>
          {tab.type === 'title' && (<FiBook size={14} color="#4ad0ff" />)}
          {tab.type === 'person' && (<FiUser size={14} color="#ff78f7" />)}
          {tab.type === 'borrow' && (<FaHandshake size={14} color="#50fa7b" />)}
          {tab.type === 'settings' && (<FiSettings size={14} color="#e3bb06" />)}
        </div>
        <span><Translator path={title} /></span>
        <div>
          <span>
            <FiX
              size={15}
              onClick={(e) => { e.stopPropagation(); close(tab); }}
            />
          </span>
        </div>
      </Container>
    </Draggable>
  );
};

export default TabHeader;
