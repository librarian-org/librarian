import React from 'react';
import Translator from '../I18n/Translator';

import { Container } from './styles';

interface Props {
  title?: string;
}

const Card: React.FC<Props> = ({children, title}) => {
  return (
    <Container>
      {title && (<h2>{<Translator path={title} />}</h2>)}
      <div>
        {children}
      </div>
    </Container>
  );
};

export default Card;
