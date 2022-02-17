import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../Button';
import { Actions } from '../../../../common/Actions';
import i18n from '../../../i18n';
import { format, parseISO } from 'date-fns';

import {
  Container,
  RigthSidebar,
  LeftSidebar,
  Center,
  Subpanel,
} from './styles';
import { trigger } from '../../../util/EventHandler';
import { AppEvent } from '../../../../common/AppEvent';
import { Person } from '../Person';
import Card from '../../Card';
import { FaPen } from 'react-icons/fa';

const ReadPerson: React.FC<{ item: Person }> = ({ item }) => {
  const handleEditClick = (item: Person) => {
    trigger(AppEvent.personTab, { action: Actions.update, value: item });
  };

  return (
    <Container>
      <LeftSidebar>
        <Card
          title={item.name}
          actions={
            <FaPen
              size={20}
              title={i18n.t('title.edit')}
              onClick={() => handleEditClick(item)}
            />
          }
        >
          {item.name} <br />
          {item.login} <br />
          {i18n.t(`userType.${item.userType.name}`)} <br />
        </Card>
      </LeftSidebar>
      <Center>
        <Card title={`${i18n.t('user.borrowedBy')} ${item.name}`}>
          <ul>
            {item.borrows.map((borrow) => (
              <li key={`borrow${borrow.id}`}>
                {i18n.t('publisher.label')}: {borrow.titlePublisher.publisher.name}/
                {i18n.t('borrow.title')}:  {borrow.titlePublisher.title.name}/
                {i18n.t('borrow.borrowDate')}: {format(new Date(borrow.borrow), 'dd/MM/yyyy')}/
                {i18n.t('borrow.returnDate')}: {format(new Date(borrow.returnedAt), 'dd/MM/yyyy')}
              </li>
            ))}
          </ul>
        </Card>
      </Center>
      <RigthSidebar>
        <Card title={i18n.t('person.contacts')}>
          <ul>
            {item.contacts.map((contact) => (
              <li key={contact.id}>
                {contact.contactType.name}: {contact.info}
              </li>
            ))}
          </ul>
        </Card>
        <Card title={i18n.t('person.addresses')}>
          {item.addresses.map((address) => (
            <Subpanel key={address.id}>
              {i18n.t('country.label')}:{' '}
              {i18n.t(`countries.${address.city.region.country.name}`)} <br />
              {i18n.t('region.label')}: {address.city.region.name} <br />
              {i18n.t('city.label')}: {address.city.name} <br />
              {i18n.t('address.neighborhood')}: {address.neighborhood} <br />
              {i18n.t('address.publicPlace')}: {address.publicPlace} <br />
              {i18n.t('address.complement')}: {address.complement} <br />
              {i18n.t('address.number')}: {address.number} <br />
              {i18n.t('address.zipcode')}: {address.zipcode} <br />
            </Subpanel>
          ))}
        </Card>
      </RigthSidebar>
    </Container>
  );
};

export default ReadPerson;
