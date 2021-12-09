import React, { useEffect } from 'react';
import FormTitle from './form';
import ListTitle,{Title} from './list';
import ReadTitle from './read';

const Title: React.FC<{ action: string, item?: Title }> = ({ action, item }) => {

  return (
    <>
      {action === 'create' && <FormTitle />}
      {action === 'list' && <ListTitle />}
      {action === 'read' && <ReadTitle item={item} />}
      {action === 'update' && <FormTitle item={item} />}
    </>
  );
};

export default Title;
