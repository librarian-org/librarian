import React, { useEffect, useState } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';

import { Container } from './styles';
import i18n from '../../i18n';
import CreatableSelectInput from '../CreatableSelectInput';
import { Category } from '../../../electron/database/models/category.schema';

interface Option {
  readonly label: string;
  readonly value: string;
}

const CategorySelect: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState(undefined);

  useEffect (() => {
    const result = window.api.sendSync('list', {
      entity: 'Category',
    }) as Category[];

    const mappedOptions = result.map(item => ({
      label: item.name,
      value: item.id.toString(),
    }));

    setOptions(mappedOptions);
  }, []);

  const createOption = (label: string, value: string) => ({
    label,
    value,
  })

  const handleChange = (newValue: OnChangeValue<Option, false>, _actionMeta: ActionMeta<Option>) => {
    setValue(newValue);
  }

  const handleCreate = (inputValue: string)  => {
    setIsLoading(true);

    const result = window.api.sendSync('create', {
      entity: 'Category',
      value: {
        name: inputValue,
      }
    }) as Category;

    const newOption = createOption(result.name, result.id.toString());
    setOptions(options => [...options, newOption]);
    setValue(newOption);
    setIsLoading(false);
  }

  return (
    <Container>
      <CreatableSelectInput
        isClearable
        label={i18n.t('category.label')}
        placeholder={i18n.t('category.selectOrCreate')}
        noOptionsMessage={() => i18n.t('category.selectEmpty')}
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

export default CategorySelect;
