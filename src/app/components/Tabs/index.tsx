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

interface Event {
  event: string;
  handler: (...args: any[]) => any;
}

const Tabs: React.FC = () => {
  const [tabItems, setTabItems] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>(null);

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

  const addTab = useCallback((tab: Tab): void => {
    setTabItems(previousState => [...previousState, tab]);
    handleClick(tab);
  }, [handleClick]);

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

  const handleCreateTab = useCallback((type: string) => {
    const hash = v4();

    const alreadyOpened = tabItems.filter(t => t.type === type);
    if (alreadyOpened.length > 0) {
      setActiveTab(alreadyOpened[0]);
      return;
    }

    const tab: Tab = {
      id: hash,
      type: type,
      title: `${type}.label`,
    };

    addTab(tab);
  }, [addTab, tabItems]);


  const close = useCallback((tab: Tab): void => {
    if (activeTab === tab) {
      if (tab === lastTab()) {
        previousTab();
      } else {
        nextTab();
      }
    }

    const tabs = tabItems.filter(t => t !== tab);

    setTabItems(tabs);
  }, [activeTab, lastTab, nextTab, previousTab, tabItems]);

  const closeCurrentTab = useCallback((): void => {
    if (activeTab) {
      close(activeTab);
    }
  }, [activeTab, close]);

  const borrowTab = useCallback(() => {
    handleCreateTab('borrow');
  }, [handleCreateTab]);

  const personTab = useCallback(() => {
    handleCreateTab('person');
  }, [handleCreateTab]);

  const titleTab = useCallback(() => {
    handleCreateTab('title');
  }, [handleCreateTab]);

  const settingsTab = useCallback(() => {
    handleCreateTab('settings');
  }, [handleCreateTab]);

  const registerEvents: Event[] = useMemo(() => [
    { event: 'closeCurrentTab', handler: closeCurrentTab },
    { event: 'borrowTab', handler: borrowTab },
    { event: 'personTab', handler: personTab },
    { event: 'titleTab', handler: titleTab },
    { event: 'settingsTab', handler: settingsTab },
  ], [closeCurrentTab, borrowTab, personTab, titleTab, settingsTab]);

  useEffect(() => {
    registerEvents.forEach(({ event, handler }) => {
      on(event, handler);
    });

    return function cleanup () {
      registerEvents.forEach(({ event, handler }) => {
        off(event, handler);
      });
    }
  }, [registerEvents]);

  return (
    <>
      <Container>
        {tabItems && tabItems.map(tab => (
          <TabHeader
            isActive={activeTab === tab}
            key={`tab-header-${tab.id}`}
            title={tab.title}
            tab={tab}
            onClick={() => handleClick(tab)}
            close={close}
          />
        ))}
      </Container>
      <TabContents>
        {tabItems.length === 0 && (<Shortcuts />)}
        {tabItems && tabItems.map(tab =>
          tab === activeTab && (
            <TabContent
              isActive={activeTab === tab}
              key={`tab-content-${tab.id}`}
            >
              {tab.type === 'borrow' && (<Borrow />)}
              {tab.type === 'person' && (<Person />)}
              {tab.type === 'title' && (<Title />)}
              {tab.type === 'settings' && (<Settings />)}
            </TabContent>
        ))}
      </TabContents>
    </>
  );
};

export default Tabs;
