import React, { useState, useCallback, useRef } from 'react';

import Button from '../Button';
import { FiSave } from 'react-icons/fi';
import i18n from '../../i18n';
import Input from '../Input';
import { SelectHandles } from '../CreatableSelectInput';
import ReactModal from 'react-modal';
import RegionSelect from '../RegionSelect';
import { useToast } from '../../hooks/toast';
import CountrySelect, { Option } from '../CountrySelect';
import { OnChangeValue } from 'react-select';
import { Container, Row } from './styles';

interface ModalProps {
  isOpen: boolean;
  setOpen: () => void;
  handleCreated: (created: Option) => void;
}

interface SelectType {
  id: string;
  name: string;
}

const CreateCity: React.FC<ModalProps> = ({
  isOpen,
  setOpen,
  handleCreated,
}) => {
  const { addToast } = useToast();

  const [selectedCountry, setSelectedCountry] = useState<SelectType>();
  const [selectedRegion, setSelectedRegion] = useState<SelectType>();
  const [name, setName] = useState('');
  const refRegion = useRef<SelectHandles>(null);
  const refCountry = useRef<SelectHandles>(null);

  const handleSave = useCallback(() => {
    const errors: string[] = [];

    if (!selectedCountry) {
      errors.push(i18n.t('city.country'));
    }

    if (!selectedRegion) {
      errors.push(i18n.t('city.region'));
    }

    if (!name) {
      errors.push(i18n.t('city.name'));
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
        regionId: selectedRegion.id,
      },
    }) as { id: string };

    setOpen();
    setName('');
    setSelectedCountry(null);
    setSelectedRegion(null);

    handleCreated({ value: result.id, label: name });
  }, [addToast, handleCreated, name, selectedCountry, selectedRegion, setOpen]);

  const handleCountryCustomChange = useCallback(
    (selectedValue: OnChangeValue<Option, false>) => {
      const country = {
        id: selectedValue.value,
        name: selectedValue.label,
      };
      setSelectedCountry(country);
    },
    []
  );

  const handleRegionCustomChange = useCallback(
    (selectedValue: OnChangeValue<Option, false>) => {
      const region = {
        id: selectedValue.value,
        name: selectedValue.label,
      };
      setSelectedRegion(region);
    },
    []
  );

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      className={'city-modal'}
      overlayClassName="modal-overlay"
    >
      <Container>
        <h2>{i18n.t('city.create')}</h2>

        <Row>
          <CountrySelect
            ref={refCountry}
            handleCustomChange={handleCountryCustomChange}
          />
        </Row>
        {selectedCountry && (
          <Row>
            <RegionSelect
              ref={refRegion}
              countryId={selectedCountry.id}
              handleCustomChange={handleRegionCustomChange}
            />
          </Row>
        )}
        {selectedRegion && (
          <Row>
            <Input
              type="text"
              name="name"
              label={i18n.t('city.label')}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={i18n.t('city.label')}
            />
          </Row>
        )}
        <Row>
          <Button
            color="primary"
            title={i18n.t('button.save')}
            onClick={handleSave}
          >
            <FiSave size={20} />
          </Button>
        </Row>
      </Container>
    </ReactModal>
  );
};

export default CreateCity;
