import React, { useCallback, useEffect, useState } from 'react';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { on, off } from '../../util/EventHandler';
import { ToastMessage, useToast } from '../../hooks/toast';
import AlertsPanel from '../AlertsPanel';

import { Container, StatusItem } from './styles';
import i18n from '../../i18n';
import { useAuth } from '../../hooks/auth';

const StatusBar: React.FC = () => {
  const [alerts, setAlerts] = useState<ToastMessage[]>();
  const [alertsPanel, setAlertsPanel] = useState(false);
  const { user } = useAuth();
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
        <FiUser size={16} />
        <span>{user && user.name}</span>
      </StatusItem>
      <StatusItem>
        <span onClick={handleAlertPanelClick}>
          {alerts && alerts.length > 0 ? <FaBell /> : <FaRegBell />}
        </span>
      </StatusItem>
      {alertsPanel && <AlertsPanel alerts={alerts} />}
    </Container>
  );
};

export default StatusBar;
