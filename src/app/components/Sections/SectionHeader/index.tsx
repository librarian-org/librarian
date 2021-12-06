import React from 'react';

import { Container } from './styles';

const SectionHeader: React.FC = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default SectionHeader;
