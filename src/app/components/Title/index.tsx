import React from 'react';
import { FiPlus } from 'react-icons/fi';
import AuthorSelect from '../AuthorSelect';
import Button from '../Button';
import Input from '../Input';
import PublisherSelect from '../PublisherSelect';

import { Container } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <Input
        type="text"
        name="name"
        label="Name"
        placeholder="Type the name of the Title"
      />

      <Input
        type="text"
        name="ISBN"
        label="ISBN"
        placeholder="Type the ISBN of the Title"
      />

      <Input
        type="text"
        name="classification"
        label="Classification"
        placeholder="Type the classification"
      />

      <Input
        type="text"
        name="edition"
        label="Edition"
        placeholder="Type the edition"
      />

      <Input
        type="date"
        name="edition_date"
        label="Edition Date"
        placeholder="Type the edition date"
        alt="Type the edition date"
      />

      <PublisherSelect />
      <Button color="primary">
        <FiPlus size={20} />
      </Button>

      <AuthorSelect />
      <Button color="primary">
        <FiPlus size={20} />
      </Button>

      {/* <Category />
      <Button color="primary">
        <FiPlus size={20} />
      </Button> */}

      <Button color="primary">
        Salvar
      </Button>
    </Container>
  );
};

export default Title;
