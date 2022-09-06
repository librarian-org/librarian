import React from 'react';

import { Container } from './styles';

interface PanelFooterProps {
  color: string;
}

const PanelFooter: React.FC<PanelFooterProps> = ({ color, children }) => {
  return <Container backgroundColor={color}>{children}</Container>;
};

export default PanelFooter;
