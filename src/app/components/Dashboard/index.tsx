import React, { useEffect, useState } from 'react';
import { FaHandshake } from 'react-icons/fa';
import { FiAlertTriangle, FiBook, FiUsers } from 'react-icons/fi';
import i18n from '../../i18n';
import Panel from '../Panel';
import PanelBody from '../Panel/PanelBody';
import PanelFooter from '../Panel/PanelFooter';
import { Container, Row, Wrapper } from './styles';

const Dashboard: React.FC = () => {
  const [registeredSamples, setRegisteredSamples] = useState(0);
  const [registeredPeople, setRegisteredPeople] = useState(0);
  const [activeBorrows, setActiveBorrows] = useState(0);
  const [overdueBorrows, setOverdueBorrows] = useState(0);

  useEffect(() => {
    const samples = window.api.sendSync('regiteredSamples') as number;
    setRegisteredSamples(samples);

    const people = window.api.sendSync('regiteredPeople') as number;
    setRegisteredPeople(people);

    const actives = window.api.sendSync('activeBorrows') as number;
    setActiveBorrows(actives);

    const overdues = window.api.sendSync('overdueBorrows') as number;
    setOverdueBorrows(overdues);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Row>
          <Panel color={'#fe5d70'}>
            <PanelBody icon={FiAlertTriangle}>{overdueBorrows}</PanelBody>
            <PanelFooter color={'#fe5d70'}>
              {i18n.t('dashboard.overdueBorrows')}
            </PanelFooter>
          </Panel>
          <Panel color={'#fe9365'}>
            <PanelBody icon={FaHandshake}>{activeBorrows}</PanelBody>
            <PanelFooter color={'#fe9365'}>
              {i18n.t('dashboard.activeBorrows')}
            </PanelFooter>
          </Panel>
          <Panel color={'#01a9ac'}>
            <PanelBody icon={FiBook}>{registeredSamples}</PanelBody>
            <PanelFooter color={'#01a9ac'}>
              {i18n.t('dashboard.registeredSamples')}
            </PanelFooter>
          </Panel>
          <Panel color={'#0ac282'}>
            <PanelBody icon={FiUsers}>{registeredPeople}</PanelBody>
            <PanelFooter color={'#0ac282'}>
              {i18n.t('dashboard.registeredPeople')}
            </PanelFooter>
          </Panel>
        </Row>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
