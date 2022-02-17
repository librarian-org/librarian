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

interface TitlePublisherProps {
  containerStyle?: unknown;
  handleCustomChange?: (selectedValue: OnChangeValue<Option, false>) => void;
}

interface TitlePublisher {
  id: string;
  classification: string;
  title: {
    name: string;
  };
}

const TitleSelect: React.ForwardRefRenderFunction<
  SelectHandles,
  TitlePublisherProps
> = ({ containerStyle, handleCustomChange }, selectRef) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    const result = window.api.sendSync('listEdition', {
      entity: 'TitlePublisher',
    }) as TitlePublisher[];

    const mappedOptions = result.map((item) => ({
      label: `${item.classification} - ${item.title.name}`,
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
    clear() {
      handleChange(null);
    },
  }));

  return (
    <Container style={containerStyle}>
      <SelectInput
        label={i18n.t('title.label')}
        placeholder={i18n.t('title.select')}
        noOptionsMessage={() => i18n.t('title.selectEmpty')}
        onChange={handleChange}
        options={options}
        value={value}
      />
    </Container>
  );
};

export default forwardRef(TitleSelect);
