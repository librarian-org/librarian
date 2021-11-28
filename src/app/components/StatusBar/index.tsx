import React, { useCallback, useEffect, useState } from 'react';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../hooks/toast';
import AlertsPanel from '../AlertsPanel';

import { Container, StatusItem } from './styles';

interface User {
  name: string;
}

const StatusBar: React.FC = () => {
  const [alerts, setAlerts] = useState<ToastMessage[]>();
  const [alertsPanel, setAlertsPanel] = useState(false);
  const [user, setUser] = useState<User>();

  const { getAlerts } = useToast();

  useEffect(() => {
    setUser({name: 'John Doe'});

    setAlerts(getAlerts());
  }, [getAlerts]);

  const handleAlertPanelClick = useCallback(() => {
    setAlertsPanel(oldState => !oldState);
  }, []);

  return (
    <Container>
      <StatusItem>
        <FiUser size={16} />
        <span>
          {user && (user.name)}
        </span>
      </StatusItem>
      <StatusItem>
        <span onClick={handleAlertPanelClick}>
          {alerts && alerts.length > 0 ? (<FaBell />) : (<FaRegBell />)}
        </span>
      </StatusItem>
      {alertsPanel && (<AlertsPanel alerts={alerts} />)}
    </Container>
  );
};

export default StatusBar;
