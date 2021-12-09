import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { format, parseISO } from 'date-fns';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import { v4 } from 'uuid';
import { useToast } from '../../hooks/toast';
import i18n from '../../i18n';
import AuthorSelect from '../AuthorSelect';
import Button from '../Button';
import CategorySelect from '../CategorySelect';
import { SelectHandles } from '../CreatableSelectInput';

import Input from '../Input';
import PublisherSelect from '../PublisherSelect';
import SectionContent from '../Sections/SectionContent';
import SectionHeader from '../Sections/SectionHeader';

import { ButtonContainer, Container, List, ListItem, Row } from './styles';
import it from 'date-fns/esm/locale/it/index.js';
interface Settings {
  id?: number;
  daysReturnDate: string;
  backupPath: string;
}
const Settings: React.FC = () => {
  const { addToast } = useToast();

  const [settings, setSettings] = useState<Settings>(null);
  const [daysReturnDate, setDaysReturnDate] = useState('7');
  const [backupPath, setBackupPath] = useState('');

  useEffect(() => {
    const result = window.api.sendSync('list', {
      entity: 'Settings',
      value: {},
    }) as Settings[];

    if (result.length > 0) {
      setSettings(result[0]);
      setDaysReturnDate(result[0].daysReturnDate);
      setBackupPath(result[0].backupPath);
      return;
    }
  }, []);

  const handleSave = useCallback(() => {
    const result = window.api.sendSync(settings.id ? 'update' : 'create', {
      entity: 'Settings',
      value: settings.id
        ? {
            id: settings.id,
            daysReturnDate: daysReturnDate,
            backupPath: backupPath,
          }
        : {
            daysReturnDate: daysReturnDate,
            backupPath: backupPath,
          },
    }) as { id: string };
    console.log(result);
  }, []);

  return (
    <Container>
      <>
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Input
            containerStyle={{ marginRight: '18px' }}
            type="number"
            name="daysReturnDate"
            label={i18n.t('settings.time')}
            autoFocus
            onChange={(e) => setDaysReturnDate(e.target.value)}
            value={daysReturnDate}
            placeholder={i18n.t('settings.time')}
          />

          <Input
            directory=""
            webkitdirectory=""
            type="file"
            name="path"
            label={i18n.t('settings.path')}
            value={backupPath}
            onChange={(e) => setBackupPath(e.target.value)}
            placeholder={i18n.t('settings.path')}
          />
        </div>

        <ButtonContainer>
          <Button
            color="primary"
            title={i18n.t('button.save')}
            onClick={handleSave}
          >
            <FiSave size={20} />
          </Button>
        </ButtonContainer>
      </>
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
