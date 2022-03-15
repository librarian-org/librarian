import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { Setting } from '../../util/DefaultEntities';
import { useToast } from '../../hooks/toast';
import i18n from '../../i18n';
import Button from '../Button';
import Input from '../Input';
import { ButtonContainer, Container, Wrapper, Row } from './styles';

const defaultSetting: Setting = {
  id: 1,
  daysReturnDate: '7',
  allowedRenovations: '3',
  backupPath: '',
};

const Settings: React.FC<{globalSave: any}> = ({globalSave}) => {
  const { addToast } = useToast();

  const [settings, setSettings] = useState<Setting>(defaultSetting);

  useEffect(() => {
    globalSave.current = handleSave;
  }, [globalSave, settings, addToast]);

  useEffect(() => {
    const result = window.api.sendSync('list', {
      entity: 'Settings',
      value: {},
    }) as Setting[];
    if (result.length > 0) {
      setSettings(result[0]);
    }
  }, []);

  const handleSave = useCallback(() => {
    try {
      window.api.sendSync('update', {
        entity: 'Settings',
        value: {
          id: settings.id,
          daysReturnDate: settings.daysReturnDate,
          backupPath: settings.backupPath,
          allowedRenovations: settings.allowedRenovations,
        },
      });

      addToast({
        title: i18n.t('notifications.success'),
        type: 'success',
        description: i18n.t('settings.saved'),
      });
    } catch (err) {
      addToast({
        title: i18n.t('borrow.anErrorHasOccurred'),
        type: 'error',
        description: err,
      });
    }
  }, [settings, addToast]);

  const setConfig = useCallback(
    (event: ChangeEvent<HTMLInputElement>, config: string) => {
      const newSetting = { [config]: event.target.value };
      const mergedSetting = { ...settings, ...newSetting };

      setSettings(mergedSetting);
    },
    [settings]
  );

  return (
    <Container>
      {settings && (
        <Wrapper>
          <Row>
            <Input
              type="number"
              name="daysReturnDate"
              label={i18n.t('settings.daysReturnDate')}
              autoFocus
              onChange={(e) => setConfig(e, 'daysReturnDate')}
              value={settings.daysReturnDate}
              placeholder={i18n.t('settings.daysReturnDate')}
            />

            <Input
              type="number"
              name="allowedRenovations"
              label={i18n.t('settings.allowedRenovations')}
              onChange={(e) => setConfig(e, 'allowedRenovations')}
              value={settings.allowedRenovations}
              placeholder={i18n.t('settings.allowedRenovations')}
            />

            {/* <Input
              directory=""
              webkitdirectory=""
              type="file"
              name="path"
              label={i18n.t('settings.backupPath')}
              value={settings.backupPath}
              onChange={(e) => setConfig(e, 'backupPath')}
              placeholder={i18n.t('settings.backupPath')}
            /> */}
          </Row>
          <ButtonContainer>
            <Button
              color="primary"
              title={i18n.t('button.save')}
              onClick={handleSave}
            >
              <FiSave size={20} />
            </Button>
          </ButtonContainer>
        </Wrapper>
      )}
    </Container>
  );
};
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}
export default Settings;
