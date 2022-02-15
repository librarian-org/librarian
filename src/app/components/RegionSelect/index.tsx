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

  interface StateProps {
    containerStyle?: unknown;
    countryId: string;
    handleCustomChange: (selectedValue: OnChangeValue<Option, false>) => void;
  }

  interface Region {
    id: string;
    name: string;
  }

  const RegionSelect: React.ForwardRefRenderFunction<
    SelectHandles,
    StateProps
  > = ({ containerStyle, countryId, handleCustomChange }, selectRef) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [value, setValue] = useState(undefined);

    useEffect(() => {
      const result = window.api.sendSync('list', {
        entity: 'Region',
      }) as Region[];

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
      handleCustomChange(newValue);
    };

    const handleCreate = (inputValue: string) => {
      setIsLoading(true);

      const result = window.api.sendSync('create', {
        entity: 'Region',
        value: {
          name: inputValue,
          countryId
        },
      }) as Region;

      const newOption = createOption(result.name, result.id.toString());
      setOptions((options) => [...options, newOption]);
      setValue(newOption);
      handleCustomChange(newOption);
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
          label={i18n.t('region.label')}
          placeholder={i18n.t('region.selectOrCreate')}
          noOptionsMessage={() => i18n.t('region.selectEmpty')}
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

  export default forwardRef(RegionSelect);
