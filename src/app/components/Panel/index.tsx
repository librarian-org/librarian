import React from 'react';

import { Container } from './styles';

interface PanelProps {
  color: string;
}

const Panel: React.FC<PanelProps> = ({ color, children }) => {
  return (
    <Container backgroundColor={color}>
      {children}
    </Container>
  );
};

export default Panel;
