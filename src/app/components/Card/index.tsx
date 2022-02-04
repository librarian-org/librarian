import React, { ReactNode } from 'react';
import Translator from '../I18n/Translator';

import { CardContent, CardHeader, Container } from './styles';

interface Props {
  title?: string;
  actions?: ReactNode;
}

const Card: React.FC<Props> = ({ children, title, actions }) => {
  return (
    <Container>
      {title && (
        <CardHeader>
          <h2>{<Translator path={title} />}</h2>
          {actions}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Container>
  );
};

export default Card;
