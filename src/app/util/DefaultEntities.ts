import { FaHandshake } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import { FiBook, FiPlus, FiSettings, FiUser } from 'react-icons/fi';
import i18n from '../i18n';
import { trigger } from './EventHandler';
import { AppEvent } from '../../common/AppEvent';
import Borrow from '../components/Borrow';

export interface SearchSource {
  name: string;
  label: string;
  icon: React.ComponentType<IconBaseProps>;
  iconColor: string;
  iconAction?: React.ComponentType<IconBaseProps>;
  handler: {
    onClick(e: React.MouseEvent): void;
    onPress(e: React.KeyboardEvent, item?: SearchSource): void;
  };
  action: {
    onClick(e: React.MouseEvent): void;
    onPress(e: React.KeyboardEvent, item?: SearchSource): void;
  };
}

export const entities: SearchSource[] = [
  {
    name: 'borrow',
    label: i18n.t('borrow.label'),
    icon: FaHandshake,
    iconColor: '#50fa7b',
    iconAction: FiPlus,
    handler: {
      onClick: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.borrowTab);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.borrowTab);
      },
    },
    action: {
      onClick: () => console.log('emprestimo action click'),
      onPress: () => console.log('emprestimo action press'),
    },
  },
  {
    name: 'person',
    label: i18n.t('person.label'),
    icon: FiUser,
    iconColor: '#ff78f7',
    iconAction: FiPlus,
    handler: {
      onClick: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.personTab);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.personTab);
      },
    },
    action: {
      onClick: () => console.log('pessoa action click'),
      onPress: () => console.log('pessoa action press'),
    },
  },
  {
    name: 'title',
    label: i18n.t('title.label'),
    icon: FiBook,
    iconColor: '#4ad0ff',
    iconAction: FiPlus,
    handler: {
      onClick: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.titleTab);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.titleTab);
      },
    },
    action: {
      onClick: () => console.log('titulo action click'),
      onPress: () => console.log('titulo action press'),
    },
  },
  {
    name: 'settings',
    label: i18n.t('settings.label'),
    icon: FiSettings,
    iconColor: '#e3bb06',
    iconAction: FiSettings,
    handler: {
      onClick: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.settingsTab);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.settingsTab);
      },
    },
    action: {
      onClick: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.settingsTab);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.settingsTab);
      },
    },
  },
];
