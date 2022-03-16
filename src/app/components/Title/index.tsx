import React, {useEffect} from 'react';
import TitleCreate from './Create';
import ListTitle from './List';
import ReadTitle from './Read';
import { Title } from './Title';
import TitleUpdate from './Update';
import {ActionSave} from '../Tabs';
 
const Title: React.FC<{ action: string, item?: unknown, globalSave: ActionSave }> = ({ action, item, globalSave }) => {
  const title = item as Title;


  useEffect(() => {
    if (action === 'list' || action === 'read')
      globalSave.current = () => {
        return;
      };
  }, [globalSave, action]);

  return (
    <>
      {action === 'create' && <TitleCreate globalSave={globalSave}/>}
      {action === 'list' && <ListTitle />}
      {action === 'read' && <ReadTitle item={title} />}
      {action === 'update' && <TitleUpdate item={title} globalSave={globalSave}/>}
    </>
  );
};

export default Title;
