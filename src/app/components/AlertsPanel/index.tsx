import React, { useCallback } from 'react';
import { FiX } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../hooks/toast';
import Translator from '../I18n/Translator';

import { AlertItem, AlertList, Container } from './style';

interface AlertPanelProps {
  alerts: ToastMessage[];
}

const AlertsPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const { removeAlerts } = useToast();

  const handleRemoveAlert = useCallback((id: string)=>{
    removeAlerts(id);
  }, [removeAlerts]);

  return (
    <Container>
      <AlertList>
        {alerts && alerts.length === 0 && (
          <AlertItem>
            <div>
              <span><Translator path="notifications.noNewNotifications" /></span>
            </div>
          </AlertItem>
        )}
        {alerts && alerts.map(alert => (
          <AlertItem key={alert.id}>
            <div>
              {alert.description}
              <span>
                <FiX size={14} onClick={() => handleRemoveAlert(alert.id)} />
              </span>
            </div>
          </AlertItem>
        ))}
      </AlertList>
    </Container>
  );
};

export default AlertsPanel;
