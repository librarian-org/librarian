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
import { User as UserSchema } from '../../../electron/database/models/User.schema';
import { Settings as SettingsSchema } from '../../../electron/database/models/Settings.schema';
import { Borrow as  BorrowSchema } from '../../../electron/database/models/Borrow.schema';
import { Title as TitleSchema } from '../../../electron/database/models/Title.schema';

export interface Option {
  readonly label: string;
  readonly value: string;
}

interface UserProps {
  containerStyle?: unknown;
  autoFocus?: boolean;
  handleCustomChange: (selectedValue: OnChangeValue<Option, false>) => void;
}

interface User {
  id: string;
  name: string;
}

const UserSelect: React.ForwardRefRenderFunction<SelectHandles, UserProps> = (
  { containerStyle, autoFocus, handleCustomChange},
  selectRef: any
  //item: UserSchema | TitleSchema | BorrowSchema | SettingsSchema
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
    debugger;
    setValue(selectedValue);
    handleCustomChange(selectedValue);
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
        autoFocus={autoFocus}
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
