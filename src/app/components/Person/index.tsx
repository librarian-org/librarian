import React, { useEffect } from 'react';
import CreatePerson from './Create';
import ListPerson from './List';
import ReadPerson from './Read';
import { Person } from './Person';
import {ActionSave} from '../Tabs';
import PersonUpdate from './Update';

const Person: React.FC<{ action: string; item?: unknown; globalSave: ActionSave }> = ({
  action,
  item,
  globalSave,
}) => {
  const person = item as Person;

  useEffect(() => {
    if (action === 'list' || action === 'read')
      globalSave.current = () => {
        return;
      };
  }, [globalSave, action]);

  return (
    <>
      {action === 'create' && <CreatePerson globalSave={globalSave} />}
      {action === 'list' && <ListPerson />}
      {action === 'read' && <ReadPerson item={person} />}
      {action === 'update' && (
        <PersonUpdate item={person} globalSave={globalSave} />
      )}
    </>
  );
};

export default Person;
