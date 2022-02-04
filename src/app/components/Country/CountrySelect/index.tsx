import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
  } from 'react';
  import { ActionMeta, OnChangeValue } from 'react-select';
  
  import { Container } from './style';
  import i18n from '../../../i18n';
  import CreatableSelectInput, { SelectHandles } from '../../CreatableSelectInput';
  
  interface Option {
    readonly label: string;
    readonly value: string;
  }
  
  interface StateProps {
    containerStyle?: unknown;
  }
  
  interface Country {
    id: string;
    name: string;
  }
  
  const CountrySelect: React.ForwardRefRenderFunction<
    SelectHandles,
    StateProps
  > = ({ containerStyle }, selectRef) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [value, setValue] = useState(undefined);
  
    useEffect(() => {
      const result = window.api.sendSync('list', {
        entity: 'Country',
      }) as Country[];
  
      const mappedOptions = result.map((item) => ({
        label: i18n.t(`countries.${item.name}`),
        value: item.id.toString(),
      }));
  
      setOptions(mappedOptions);
    }, []);
  
    const handleChange = (
      newValue: OnChangeValue<Option, false>,
      _actionMeta: ActionMeta<Option>
    ) => {
      setValue(newValue);
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
          label={i18n.t('country.label')}
          placeholder={i18n.t('country.select')}
          noOptionsMessage={() => i18n.t('country.selectEmpty')}
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={handleChange}
          options={options}
          value={value}
        />
      </Container>
    );
  };
  
  export default forwardRef(CountrySelect);
  