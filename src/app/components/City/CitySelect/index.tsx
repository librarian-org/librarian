import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { OnChangeValue } from 'react-select';

import { Container } from './style';
import i18n from '../../../i18n';
import SelectInput, { SelectHandles } from '../../SelectInput';

export interface Option {
  readonly label: string;
  readonly value: string;
}

interface CityProps {
  containerStyle?: unknown;
  autoFocus?: boolean;
  reload: boolean;
  handleCustomChange?: (selectedValue: OnChangeValue<Option, false>) => void;
}

interface City {
  id: string;
  name: string;
}

const CitySelect: React.ForwardRefRenderFunction<SelectHandles, CityProps> = (
  { containerStyle, autoFocus, handleCustomChange, reload },
  selectRef
) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    const result = window.api.sendSync('list', {
      entity: 'City',
    }) as City[];

    const mappedOptions = result.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));

    setOptions(mappedOptions);
  }, [reload]);

  const handleChange = (selectedValue: OnChangeValue<Option, false>) => {
    setValue(selectedValue);
    if (handleCustomChange) {
      handleCustomChange(selectedValue);
    }
  };

  useImperativeHandle<unknown, SelectHandles>(selectRef, () => ({
    getValue<T>() {
      if (!value) {
        return undefined;
      }

      return { id: value.value, name: value.label } as unknown as T;
    },
    setValue(newValue: Option) {
      setValue(newValue);
    },
    clear() {
      handleChange(null);
    },
  }));

  return (
    <Container style={containerStyle}>
      <SelectInput
        autoFocus={autoFocus}
        label={i18n.t('city.label')}
        placeholder={i18n.t('city.select')}
        noOptionsMessage={() => i18n.t('city.selectEmpty')}
        onChange={handleChange}
        options={options}
        value={value}
      />
    </Container>
  );
};

export default forwardRef(CitySelect);
