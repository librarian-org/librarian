import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { OnChangeValue } from 'react-select';

import { Container } from './style';
import i18n from '../../i18n';
import SelectInput, { SelectHandles } from '../SelectInput';

interface Option {
  readonly label: string;
  readonly value: string;
}

interface UserTypeProps {
  containerStyle?: unknown;
  autoFocus?: boolean;
  handleCustomChange?: (selectedValue: OnChangeValue<Option, false>) => void;
}

interface UserType {
  id: string;
  name: string;
}

const UserTypeSelect: React.ForwardRefRenderFunction<
  SelectHandles,
  UserTypeProps
> = ({ containerStyle, autoFocus, handleCustomChange }, selectRef) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    const result = window.api.sendSync('list', {
      entity: 'UserType',
    }) as UserType[];

    const mappedOptions = result.map((item) => ({
      label: i18n.t(`userType.${item.name}`),
      value: item.id.toString(),
    }));

    setOptions(mappedOptions);
  }, []);

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
        label={i18n.t('userType.label')}
        placeholder={i18n.t('userType.select')}
        noOptionsMessage={() => i18n.t('userType.selectEmpty')}
        onChange={handleChange}
        options={options}
        value={value}
      />
    </Container>
  );
};

export default forwardRef(UserTypeSelect);
