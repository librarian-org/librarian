import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

type RoundedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ComponentType<IconBaseProps>;
  buttonStyle?: unknown;
  color?: 'primary' | 'secondary';
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  icon: Icon,
  color,
  buttonStyle,
  ...rest
}) => {
  return (
    <Container className={color} style={buttonStyle} {...rest}>
      {<Icon size={20} />}
    </Container>
  );
};

export default RoundedButton;
