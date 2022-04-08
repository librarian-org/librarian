import React, { useCallback, useEffect, useState } from 'react';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { on, off } from '../../util/EventHandler';
import { ToastMessage, useToast } from '../../hooks/toast';
import AlertsPanel from '../AlertsPanel';

import { Container, Counter, StatusItem, StatusItemContainer } from './styles';
import i18n from '../../i18n';
import LoggedUser from '../LoggedUser';

const StatusBar: React.FC = () => {
  const [alerts, setAlerts] = useState<ToastMessage[]>();
  const [alertsPanel, setAlertsPanel] = useState(false);
  const { getAlerts, addToast } = useToast();

  useEffect(() => {
    setAlerts(getAlerts());
  }, [getAlerts]);

  const handleAlertPanelClick = useCallback(() => {
    setAlertsPanel((oldState) => !oldState);
  }, []);

  const languageChangeHandler = () => {
    addToast({
      title: i18n.t('notifications.warning'),
      type: 'info',
      description: i18n.t('notifications.restartFullEffect'),
    });
  };

  useEffect(() => {
    on('languageChange', languageChangeHandler);

    return function cleanup() {
      off('languageChange', languageChangeHandler);
    };
  });

  return (
    <Container>
      <StatusItem>
        <LoggedUser />
      </StatusItem>
      <StatusItem>
        <StatusItemContainer onClick={handleAlertPanelClick}>
          <span>
            {alerts && alerts.length > 0 ? (
              <span>
                <FaBell />
                <Counter>{alerts.length}</Counter>
              </span>
            ) : (
              <FaRegBell />
            )}
          </span>
        </StatusItemContainer>
      </StatusItem>
      {alertsPanel && (
        <AlertsPanel alerts={alerts} handleAlertPanelClick={handleAlertPanelClick} />
      )}
    </Container>
  );
};

export default StatusBar;
