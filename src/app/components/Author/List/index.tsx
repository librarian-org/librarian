import React from 'react';
import Button from '../../Button';
import {FiAlignJustify} from 'react-icons/fi';

import { Container } from './styles';
import Card from '../../Card';

const AuthorList: React.FC = () => {
  return (
    <Card title="Listagem do autor">
      <Container>
        <Button color="primary"><FiAlignJustify size={20} /> Novo</Button>
        <br /><br />
        <table>
          <tr>
            <td>Id</td>
            <td>nome</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Rowling J. K.</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Rowling J. K.</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Rowling J. K.</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Rowling J. K.</td>
          </tr>
        </table>
      </Container>
    </Card>
  );
};

export default AuthorList;
