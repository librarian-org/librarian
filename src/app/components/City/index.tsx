import React, { useState, useCallback, useRef, ReactNode } from 'react';

import Button from '../Button';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import i18n from '../../i18n';
import Input from '../Input';
import { SelectHandles } from '../CreatableSelectInput';
import ReactModal from 'react-modal';
import RegionSelect from '../Region/RegionSelect';
import CreateRegion from '../Region';
import { useToast } from '../../hooks/toast';
interface ModalProps {
  isOpen: boolean;
  setOpen: () => void;
}

interface SelectType {
  id: string;
  name: string;
}

const CreateCity: React.FC<ModalProps> = ({ isOpen, setOpen }) => {
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [addingRegion, setAddingRegion] = useState(false);
  const refRegion = useRef<SelectHandles>(null);

  const handleSave = useCallback(() => {
    const errors: string[] = [];
    const region = refRegion.current.getValue<SelectType>();

    if (!name) {
      errors.push(i18n.t('city.name'));
    }

    if (!region) {
      errors.push(i18n.t('city.region'));
    }

    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('city.informError')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }

    const result = window.api.sendSync('create', {
      entity: 'City',
      value: {
        name,
        regionId: region.id,
      },
    }) as { id: string };
    setOpen();
    setName('');
    return;
  }, [addToast, name, setOpen]);

  return addingRegion ? (
    <CreateRegion
      isOpen={addingRegion}
      setOpen={() => setAddingRegion(false)}
    ></CreateRegion>
  ) : (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      className={'city-modal'}
      overlayClassName="modal-overlay"
    >
      <div>
        <RegionSelect ref={refRegion} containerStyle={{ flexGrow: 2 }} />
        &nbsp;
        <Button
          style={{}}
          color="primary"
          onClick={() => setAddingRegion(true)}
        >
          <FiPlus size={20} />
        </Button>
        &nbsp;
        <Input
          containerStyle={{ flexGrow: 1, marginRight: '18px' }}
          type="text"
          name="name"
          label={i18n.t('city.label')}
          autoFocus
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={i18n.t('city.label')}
        />
        &nbsp;
        <Button
          color="primary"
          title={i18n.t('button.save')}
          onClick={handleSave}
        >
          <FiSave size={20} />
        </Button>
      </div>
    </ReactModal>
  );
};

export default CreateCity;
