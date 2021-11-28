import React from 'react';

import { Container } from './styles';

interface TabContentProps {
  isActive: boolean;
}

const TabContent: React.FC<TabContentProps> = ({children, isActive}) => {
  return (
    <Container isActive={isActive}>
      {children}
    </Container>
  );
};

export default TabContent;
