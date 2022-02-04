import React, {
  useState,
  useCallback,
  useRef,
  ReactNode,
  useEffect,
} from 'react';
import ReactModal from 'react-modal';

import Button from '../Button';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import i18n from '../../i18n';
import Input from '../Input';
import { SelectHandles } from '../CreatableSelectInput';
import CountrySelect from '../Country/CountrySelect';
import { useToast } from '../../hooks/toast';

interface ModalProps {
  isOpen: boolean;
  setOpen: () => void;
}

interface SelectType {
  id: string;
  name: string;
}

const CreateRegion: React.FC<ModalProps> = ({ isOpen, setOpen }) => {
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const refCountry = useRef<SelectHandles>(null);

  const handleSave = useCallback(() => {
    const errors: string[] = [];
    const country = refCountry.current.getValue<SelectType>();

    if (!name) {
      errors.push(i18n.t('region.name'));
    }

    if (!country) {
      errors.push(i18n.t('region.country'));
    }

    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('region.informError')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }

    const result = window.api.sendSync('create', {
      entity: 'Region',
      value: {
        name,
        countryId: country.id,
      },
    }) as { id: string };
    setOpen();
    setName('');
    return;
  }, [addToast, name, setOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      className={'region-modal'}
      overlayClassName="modal-overlay"
    >
      <CountrySelect ref={refCountry} containerStyle={{ flexGrow: 2 }} />
      &nbsp;
      <Input
        containerStyle={{ flexGrow: 1, marginRight: '18px' }}
        type="text"
        name="name"
        label={i18n.t('region.label')}
        autoFocus
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder={i18n.t('region.label')}
      />
      &nbsp;
      <Button
        color="primary"
        title={i18n.t('button.save')}
        onClick={handleSave}
      >
        <FiSave size={20} />
      </Button>
    </ReactModal>
  );
};

export default CreateRegion;
