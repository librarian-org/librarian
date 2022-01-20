import { FaHandshake } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import { FiBook, FiPlus, FiSettings, FiUser } from 'react-icons/fi';
import i18n from '../i18n';
import { trigger } from './EventHandler';
import { AppEvent } from '../../common/AppEvent';
import Borrow from '../components/Borrow';
import { Actions } from '../../common/Actions';

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

const actionCreate = {
  action: Actions.create
}

const actionList = {
  action: Actions.list
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
        trigger(AppEvent.personTab, actionList);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.personTab, actionList);
      },
    },
    action: {
      onClick: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.personTab, actionCreate);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.personTab, actionCreate);
      },
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
        trigger(AppEvent.titleTab, actionList);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.titleTab, actionList);
      },
    },
    action: {
      onClick: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.titleTab, actionCreate);
      },
      onPress: (): void => {
        trigger(AppEvent.quickSearch);
        trigger(AppEvent.titleTab, actionCreate);
      },
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
