import React from 'react';
import TitleCreate from './Create';
import ListTitle from './List';
import ReadTitle from './Read';
import { Title } from './Title';
import TitleUpdate from './Update';

const Title: React.FC<{ action: string, item?: unknown }> = ({ action, item }) => {
  const title = item as Title;
  console.log('title: ', title);
  return (
    <>
      {action === 'create' && <TitleCreate />}
      {action === 'list' && <ListTitle />}
      {action === 'read' && <ReadTitle item={title} />}
      {action === 'update' && <TitleUpdate item={title} />}
    </>
  );
};

export default Title;
