import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';

import { Container } from './styles';
import i18n from '../../i18n';
import CreatableSelectInput, { SelectHandles } from '../CreatableSelectInput';

interface Option {
  readonly label: string;
  readonly value: string;
}

interface PublisherProps {
  containerStyle?: unknown;
}

interface Publisher {
  id: string;
  name: string;
}

const PublisherSelect: React.ForwardRefRenderFunction<
  SelectHandles,
  PublisherProps
> = ({ containerStyle }, selectRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    const result = window.api.sendSync('list', {
      entity: 'Publisher',
    }) as Publisher[];

    const mappedOptions = result.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));

    setOptions(mappedOptions);
  }, []);

  const createOption = (label: string, value: string) => ({
    label,
    value,
  });

  const handleChange = (
    newValue: OnChangeValue<Option, false>,
    _actionMeta: ActionMeta<Option>
  ) => {
    setValue(newValue);
  };

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);

    const result = window.api.sendSync('create', {
      entity: 'Publisher',
      value: {
        name: inputValue,
      },
    }) as Publisher;

    const newOption = createOption(result.name, result.id.toString());
    setOptions((options) => [...options, newOption]);
    setValue(newOption);
    setIsLoading(false);
  };

  useImperativeHandle<unknown, SelectHandles>(selectRef, () => ({
    getValue<T>() {
      if (!value) {
        return undefined;
      }

      return { id: value.value, name: value.label } as unknown as T;
    },
    clear() {
      handleChange(null, null);
    },
  }));

  return (
    <Container style={containerStyle}>
      <CreatableSelectInput
        isClearable
        label={i18n.t('publisher.label')}
        placeholder={i18n.t('publisher.selectOrCreate')}
        noOptionsMessage={() => i18n.t('publisher.selectEmpty')}
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </Container>
  );
};

export default forwardRef(PublisherSelect);
