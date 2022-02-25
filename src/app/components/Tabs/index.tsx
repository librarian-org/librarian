import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { on, off } from '../../util/EventHandler';
import { v4 } from 'uuid';

import { Container, TabContents } from './styles';
import TabHeader from './TabHeader';
import TabContent from './TabContent';
import { Tab } from './Tab';
import Shortcuts from '../Shortcuts';
import Borrow from '../Borrow';
import Title from '../Title';
import Person from '../Person';
import Settings from '../Settings';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import SearchMenu from '../SearchMenu';
import { Actions } from '../../../common/Actions';

interface ActionParameter {
  action: Actions;
  value?: unknown;
}
interface Event {
  event: string;
  handler: (...args: any[]) => any;
}

const Tabs: React.FC = () => {
  const [tabItems, setTabItems] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>(null);
  const [selectedTab, setSelectedTab] = useState<Tab>(null);
  const [isOpen, setOpen] = useState(false);
  const [, setAction] = useState('list');

  const lastTab = useCallback((): Tab => {
    return tabItems[tabItems.length - 1];
  }, [tabItems]);

  const firstTab = useCallback((): Tab => {
    return tabItems[0];
  }, [tabItems]);

  const activeIndex = useCallback((): number => {
    return tabItems.indexOf(activeTab);
  }, [activeTab, tabItems]);

  const handleClick = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const addTab = useCallback(
    (tab: Tab): void => {
      setTabItems((previousState) => [...previousState, tab]);
      handleClick(tab);
    },
    [handleClick]
  );

  const nextTab = useCallback((): void => {
    if (activeTab == lastTab()) {
      setActiveTab(firstTab());
    } else {
      setActiveTab(tabItems[activeIndex() + 1]);
    }
  }, [activeIndex, activeTab, firstTab, lastTab, setActiveTab, tabItems]);

  const previousTab = useCallback((): void => {
    if (activeTab == firstTab()) {
      setActiveTab(lastTab());
    } else {
      setActiveTab(tabItems[activeIndex() - 1]);
    }
  }, [activeIndex, activeTab, firstTab, lastTab, setActiveTab, tabItems]);

  const handleCreateTab = useCallback(
    (type: string, action: Actions, item: unknown) => {
      const hash = v4();

      const tabAlreadyOpened = tabItems.filter((t) => t.type === type);
      if (tabAlreadyOpened.length > 0) {
        tabAlreadyOpened[0].action = action;
        tabAlreadyOpened[0].item = item;
        setAction(action);
        setTabItems(tabItems);
        setSelectedTab(tabAlreadyOpened[0]);
        return;
      }

      const tab: Tab = {
        id: hash,
        type: type,
        title: `${type}.label`,
        action: action,
        item: item ? item : undefined,
      };

      addTab(tab);
    },
    [addTab, tabItems]
  );

  const close = useCallback(
    (tab: Tab): void => {
      if (activeTab === tab) {
        if (tab === lastTab()) {
          previousTab();
        } else {
          nextTab();
        }
      }

      const tabs = tabItems.filter((t) => t !== tab);

      setTabItems(tabs);
    },
    [activeTab, lastTab, nextTab, previousTab, tabItems]
  );

  const closeCurrentTab = useCallback((): void => {
    if (activeTab) {
      close(activeTab);
    }
  }, [activeTab, close]);

  const borrowTab = useCallback(
    (params: CustomEvent<ActionParameter>) => {
      const { action, value } = params.detail;
      handleCreateTab('borrow', action, value);
    },
    [handleCreateTab]
  );

  const personTab = useCallback(
    (params: CustomEvent<ActionParameter>) => {
      const { action, value } = params.detail;
      handleCreateTab('person', action, value);
    },
    [handleCreateTab]
  );

  const titleTab = useCallback(
    (params: CustomEvent<ActionParameter>) => {
      const { action, value } = params.detail;
      handleCreateTab('title', action, value);
    },
    [handleCreateTab]
  );

  const settingsTab = useCallback(() => {
    handleCreateTab('settings', Actions.update, {});
  }, [handleCreateTab]);

  const quickSearch = useCallback(() => {
    setOpen((oldState) => !oldState);
  }, []);

  const registerEvents: Event[] = useMemo(
    () => [
      { event: 'closeCurrentTab', handler: closeCurrentTab },
      { event: 'borrowTab', handler: borrowTab },
      { event: 'personTab', handler: personTab },
      { event: 'titleTab', handler: titleTab },
      { event: 'settingsTab', handler: settingsTab },
      { event: 'quickSearch', handler: quickSearch },
    ],
    [closeCurrentTab, borrowTab, personTab, titleTab, settingsTab, quickSearch]
  );

  useEffect(() => {
    registerEvents.forEach(({ event, handler }) => {
      on(event, handler);
    });

    return function cleanup() {
      registerEvents.forEach(({ event, handler }) => {
        off(event, handler);
      });
    };
  }, [registerEvents]);

  const moveTab = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = tabItems[dragIndex];
      setTabItems(
        update(tabItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [tabItems]
  );

  useEffect(() => {
    setActiveTab(selectedTab);
  }, [selectedTab]);

  const rendererTabs = (tab: Tab, index: number, isActive: boolean) => {
    return (
      <TabHeader
        isActive={isActive}
        key={`tab-header-${tab.id}`}
        title={tab.title}
        tab={tab}
        index={index}
        moveTab={moveTab}
        onClick={() => handleClick(tab)}
        close={close}
        id={tab.id}
      />
    );
  };

  return (
    <>
      <SearchMenu isOpen={isOpen} setOpen={quickSearch} />
      <DndProvider backend={HTML5Backend}>
        <Container>
          {tabItems &&
            tabItems.map((tab, i) => rendererTabs(tab, i, activeTab === tab))}
        </Container>
      </DndProvider>
      <TabContents>
        {tabItems.length === 0 && <Shortcuts />}
        {tabItems &&
          tabItems.map(
            (tab) =>
              tab === activeTab && (
                <TabContent
                  isActive={activeTab === tab}
                  key={`tab-content-${tab.id}`}
                >
                  {tab.type === 'borrow' && <Borrow />}
                  {tab.type === 'person' && (
                    <Person action={tab.action} item={tab.item} />
                  )}
                  {tab.type === 'title' && (
                    <Title action={tab.action} item={tab.item} />
                  )}
                  {tab.type === 'settings' && <Settings />}
                </TabContent>
              )
          )}
      </TabContents>
    </>
  );
};

export default Tabs;
