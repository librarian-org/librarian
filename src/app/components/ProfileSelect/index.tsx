import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
  } from 'react';
  import { ActionMeta, OnChangeValue } from 'react-select';
  
  import { Container } from './style';
  import i18n from '../../i18n';
  import CreatableSelectInput, { SelectHandles } from '../CreatableSelectInput';
  
  interface Option {
    readonly label: string;
    readonly value: string;
  }
  
  interface ProfileProps {
    containerStyle?: unknown;
  }
  
  interface Profile {
    id: string;
    name: string;
  }
  
  const ProfileSelect: React.ForwardRefRenderFunction<
    SelectHandles,
    ProfileProps
  > = ({ containerStyle }, selectRef) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [value, setValue] = useState(undefined);
  
    useEffect(() => {
      const result = window.api.sendSync('list', {
        entity: 'Profile',
      }) as Profile[];
  
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
        entity: 'Profile',
        value: {
          name: inputValue,
        },
      }) as Profile;
  
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
          label={i18n.t('profile.label')}
          placeholder={i18n.t('profile.selectOrCreate')}
          noOptionsMessage={() => i18n.t('profile.selectEmpty')}
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
  
  export default forwardRef(ProfileSelect);
  