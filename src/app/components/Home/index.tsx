import React from 'react';
import Content from '../Content';
import Tabs from '../Tabs';
import StatusBar from '../StatusBar';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Tabs />
        <StatusBar />
      </Content>
    </Container>
  );
};

export default Home;
