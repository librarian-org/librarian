/* eslint-disable @typescript-eslint/ban-types */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GroupBase, StylesConfig } from 'react-select';
import CreatableSelect, { CreatableProps } from 'react-select/creatable';
import i18n from '../../i18n';
import { ThemeContext } from 'styled-components';

import { Container, InputLabel } from './styles';

interface Option {
  readonly label: string;
  readonly value: string;
}

interface CreatableSelectInputProps extends CreatableProps<Option, boolean, GroupBase<Option>> {
  label?: string;
}

interface ColourOption {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
  isSelected: boolean;
  isFocused: boolean
}
export interface SelectHandles {
  getValue<T>(): T;
  setValue?: (newValue: Option) => void;
  clear(): void;
}

const CreatableSelectInput: React.FC<CreatableSelectInputProps> = ({ label, ...rest }) => {
  const { colors } = useContext(ThemeContext);

  const [isFilled, setIsFilled] = useState(false);

  const customStyles: StylesConfig<ColourOption> = useMemo(() => ({
    option: (provided: object, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? colors.card.background : colors.input.background,
      color: state.isSelected ? colors.input.text : colors.input.placeholder,
      ':active': {
        border: `2px solid ${colors.primary}`,
      },
      ':focus': {
        border: `2px solid ${colors.primary}`,
      },
    }),
    container: (provided: object) => ({
      ...provided,
    }),
    control: () => ({
      padding: '8px',
      display: 'flex',
      backgroundColor: colors.input.background,
      color: colors.input.text,
      border: `2px solid ${colors.input.background}`,
      margin: 0,
      height: '46px',
      // marginBottom: '20px',
      borderRadius: '8px',
      outline: 0,
      ':hover': {
        border: `2px solid ${colors.primary}`,
        boxShadow: `0 0 0 1px ${colors.primary}`,
      },
      ':active': {
        border: `2px solid ${colors.primary}`,
      },
      ':focus': {
        border: `2px solid ${colors.primary}`,
      },
    }),
    singleValue: (provided: object, state: { isDisabled: boolean; }) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {
        ...provided, opacity, transition, color: colors.input.text,
      };
    },
    menu: (provided: object) => ({
      ...provided,
      backgroundColor: colors.input.background,
      zIndex: 2,
    }),
    placeholder: (provided: object) => ({
        ...provided,
       color: colors.input.placeholder ,
    }),
    valueContainer: (provided: object) => ({
      ...provided,
    }),
  }), [colors]);

  useEffect(() => {
    setIsFilled(!!rest.value);
  }, [rest]);

  return (
    <Container>
      { (label && isFilled) && <InputLabel isFilled={isFilled}>{label}</InputLabel>}

      <CreatableSelect
        styles={customStyles}
        formatCreateLabel={(newValue) => `${i18n.t('button.create')} ${newValue}`}
        { ...rest }
      />
    </Container>
  );
};

export default CreatableSelectInput;
