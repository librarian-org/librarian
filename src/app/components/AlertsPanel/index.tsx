import React, { useCallback } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { CgPlayListRemove } from 'react-icons/cg';
import { ToastMessage, useToast } from '../../hooks/toast';
import i18n from '../../i18n';
import Translator from '../I18n/Translator';

import { AlertItem, AlertList, Container, Clear, AlertsActions } from './style';

interface AlertPanelProps {
  alerts: ToastMessage[];
  handleAlertPanelClick(): void;
}

const AlertsPanel: React.FC<AlertPanelProps> = ({ alerts, handleAlertPanelClick }) => {
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
      <AlertsActions>
        <Clear onClick={handleRemoveAllAlert}>
          <CgPlayListRemove size={20} title={i18n.t('notifications.clearAll')} />
        </Clear>
        <Clear onClick={handleAlertPanelClick}>
          <FiChevronDown size={20} title={i18n.t('notifications.hide')} />
        </Clear>
      </AlertsActions>
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
