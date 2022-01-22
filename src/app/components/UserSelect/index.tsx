import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { OnChangeValue } from 'react-select';

import { Container } from './styles';
import i18n from '../../i18n';
import { SelectHandles } from '../CreatableSelectInput';
import SelectInput from '../SelectInput';

interface Option {
  readonly label: string;
  readonly value: string;
}

interface UserProps {
  containerStyle?: unknown;
}

interface User {
  id: string;
  name: string;
}

const UserSelect: React.ForwardRefRenderFunction<SelectHandles, UserProps> = (
  { containerStyle },
  selectRef
) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    const result = window.api.sendSync('list', {
      entity: 'User',
    }) as User[];

    const mappedOptions = result.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));

    setOptions(mappedOptions);
  }, []);

  const handleChange = (selectedValue: OnChangeValue<Option, false>) => {
    setValue(selectedValue);
  };

  useImperativeHandle<unknown, SelectHandles>(selectRef, () => ({
    getValue<T>() {
      if (!value) {
        return undefined;
      }

      return { id: value.value, name: value.label } as unknown as T;
    },
    clear() {
      handleChange(null);
    },
  }));

  return (
    <Container style={containerStyle}>
      <SelectInput
        autoFocus
        label={i18n.t('user.label')}
        placeholder={i18n.t('user.select')}
        noOptionsMessage={() => i18n.t('user.selectEmpty')}
        onChange={handleChange}
        options={options}
        value={value}
      />
    </Container>
  );
};

export default forwardRef(UserSelect);
