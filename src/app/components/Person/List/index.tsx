import React, { useEffect, useState } from 'react';
import Button from '../../Button';

import { Container } from './styles';
import { trigger } from '../../../util/EventHandler';
import { AppEvent } from '../../../../common/AppEvent';
import { Person } from '../Person';

const ListPerson: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const result = window.api.sendSync('list', {
      entity: 'User',
    }) as Person[];
    setItems(result);
  }, []);

  const handleUpdate = (item: Person): void => {
    trigger(AppEvent.personTab, { action: 'update', value: item });
  };

  const handleRead = (item: Person): void => {
    trigger(AppEvent.personTab, { action: 'read', value: item });
  };

  return (
    <Container>
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <Button onClick={() => handleRead(item)}>Ver</Button>
                    <Button onClick={() => handleUpdate(item)}>Editar</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </Container>
  );
};

export default ListPerson;
