import React from 'react';
import CreatePerson from './Create';
import ListPerson from './List';
import ReadPerson from './Read';
import { Person } from './Person';

import PersonUpdate from './Update';

const Person: React.FC<{ action: string; item?: unknown }> = ({
  action,
  item,
}) => {
  const person = item as Person;
  return (
    <>
      {action === 'create' && <CreatePerson />}
      {action === 'list' && <ListPerson />}
      {action === 'read' && <ReadPerson item={person} />}
      {action === 'update' && <PersonUpdate item={person} />}
    </>
  );
};

export default Person;
