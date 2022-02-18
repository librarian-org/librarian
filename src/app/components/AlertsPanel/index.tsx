import React, { useCallback } from 'react';
import { FiX } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../hooks/toast';
import Translator from '../I18n/Translator';

import { AlertItem, AlertList, Container, Clear } from './style';

interface AlertPanelProps {
  alerts: ToastMessage[];
}

const AlertsPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const { removeAlerts, removeAllAlerts } = useToast();

  const handleRemoveAlert = useCallback(
    (id: string) => {
      removeAlerts(id);
    },
    [removeAlerts]
  );

  const handleRemoveAllAlert = useCallback(() => {
    removeAllAlerts();
  }, [removeAllAlerts]);

  return (
    <Container>
      <Clear onClick={handleRemoveAllAlert}>
        <FiX size={10}  />
        Limpar tudo
      </Clear>
      <AlertList>
        {alerts && alerts.length === 0 && (
          <AlertItem>
            <div>
              <span>
                <Translator path="notifications.noNewNotifications" />
              </span>
            </div>
          </AlertItem>
        )}
        {alerts &&
          alerts.map((alert) => (
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
