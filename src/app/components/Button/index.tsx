import React, { ButtonHTMLAttributes } from 'react';
import Translator from '../I18n/Translator';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  buttonStyle?: unknown;
  color?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({children, color, loading, buttonStyle, ...rest}) => {
  return (
    <Container className={color} style={buttonStyle} {...rest}>
      {loading ? <Translator path="button.loading" /> : children}
    </Container>
  );
};

export default Button;
