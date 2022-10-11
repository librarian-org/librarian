import React, { useRef } from 'react';
import { Tab } from '../Tab';
import { FiX, FiBook, FiUser, FiSettings } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { Container } from './styles';
import Translator from '../../I18n/Translator';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';

interface TabHeaderProps {
  tab: Tab;
  title: string;
  onClick: (...args: any[]) => any;
  close: (tab: Tab) => void;
  moveTab: (dragIndex: number, hoverIndex: number) => void
  isActive: boolean;

  index: number;
  id: string;
}

interface DragItem {
  index: number
  id: string
  type: string
}

const TabHeader: React.FC<TabHeaderProps> = ({ moveTab, index, title, id, onClick, close, isActive, tab }) => {
  const ref = useRef<HTMLLIElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'TabHeader',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveTab(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'TabHeader',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <Container ref={ref} style={{ opacity }} isActive={isActive} onClick={onClick} data-handler-id={handlerId}>
      <div>
        {tab.type === 'title' && (<FiBook size={14} color="#4ad0ff" />)}
        {tab.type === 'person' && (<FiUser size={14} color="#ff78f7" />)}
        {tab.type === 'borrow' && (<FaHandshake size={14} color="#50fa7b" />)}
        {tab.type === 'settings' && (<FiSettings size={14} color="#e3bb06" />)}
        {tab.type === 'dashboard' && (<AiFillDashboard size={14} color="#CC0000" />)}
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
  );
};

export default TabHeader;
