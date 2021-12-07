import React from 'react';

import { Container } from './styles';

interface SectionContentProps {
  isActive: boolean;
}

const SectionContent: React.FC<SectionContentProps> = ({isActive, children}) => {
  return (
    <Container isActive={isActive}>
      {children}
    </Container>
  );
};

export default SectionContent;
