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
  
  interface CityProps {
    containerStyle?: unknown;
  }
  
  interface City {
    id: string;
    name: string;
  }
  
  const CitySelect: React.ForwardRefRenderFunction<
    SelectHandles,
    CityProps
  > = ({ containerStyle }, selectRef) => {
    const [isLoading, setIsLoading] = useState(false);
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
          label={i18n.t('city.label')}
          placeholder={i18n.t('city.selectOrCreate')}
          noOptionsMessage={() => i18n.t('city.selectEmpty')}
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={handleChange}
          options={options}
          value={value}
        />
      </Container>
    );
  };
  
  export default forwardRef(CitySelect);
  