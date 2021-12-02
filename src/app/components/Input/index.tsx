import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, InputLabel, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  containerStyle?: object;
  length?: number;
  selected?: string;
  icon?: React.ComponentType<IconBaseProps>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  icon: Icon,
  containerStyle = {},
  length,
  disabled,
  selected,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      isDisabled={!!disabled}
      data-testid="input-container"
      className={selected}
    >
      {label && isFilled && <InputLabel>{label}</InputLabel>}

      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        name={name}
        maxLength={length}
        disabled={!!disabled}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
