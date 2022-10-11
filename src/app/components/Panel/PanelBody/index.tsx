import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface PanelBodyProps {
  icon?: React.ComponentType<IconBaseProps>;
}

const PanelBody: React.FC<PanelBodyProps> = ({
  children,
  icon: Icon,
}) => {
  return (
    <Container>
      {children}
      {Icon && <Icon size={30} />}
    </Container>
  );
};

export default PanelBody;
