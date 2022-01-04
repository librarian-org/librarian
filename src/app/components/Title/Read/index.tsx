import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../Card';
import { Title } from '../Title';
import i18n from '../../../i18n';

import SectionContent from '../../Sections/SectionContent';
import SectionHeader from '../../Sections/SectionHeader';

import { Container, List, ListItem, Row } from './styles';
import { format, parseISO } from 'date-fns';
import { v4 } from 'uuid';
import Barcode from '../../Barcode';

interface SelectType {
  id: string;
  name: string;
}

interface Publisher {
  publisher: SelectType;
  classification: string;
  edition: string;
  publishedAt: Date;
}

const ReadTitle: React.FC<{ item: Title }> = ({ item }) => {
  const sections = useMemo(() => ['editions', 'authors', 'categories'], []);
  const [selectedSection, setSelectedSection] = useState('editions');

  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [authors, setAuthors] = useState<SelectType[]>([]);
  const [categories, setCategories] = useState<SelectType[]>([]);

  useEffect(() => {
    if (item !== undefined) {
      const publishersAux: Publisher[] = item.titlePublishers.map((item) => ({
        id: item.id,
        publisher: item.publisher,
        classification: item.classification,
        edition: item.edition,
        publishedAt: parseISO(item.publishedAt.toString()),
      }));
      setPublishers(publishersAux);

      const authorsAux: SelectType[] = item.titleAuthors.map((item) => ({
        id: item.authorId.toString(),
        name: item.author.name
      }));
      setAuthors(authorsAux);

      const categoriesAux: SelectType[] = item.titleCategories.map((item) => ({
        id: item.categoryId.toString(),
        name: item.category.name,
      }))
      setCategories(categoriesAux);
    }
  }, [item]);

  return (
    <Container>
      <Card title={item.name}>
        <Barcode value={item.ISBN} options={{
          format: 'EAN13',
          font: 'Monospace',
          fontSize: 14,
          textMargin: 0,
          width: 1.5,
          height: 54,
          margin: 8,
          textAlign: 'center',
          background: '#FFFFFF',
          lineColor: '#000000',
        }} />
      </Card>
      <Card>
        <SectionHeader>
          {sections.map((section) => (
            <a
              key={section}
              className={selectedSection === section ? 'active' : ''}
              onClick={() => setSelectedSection(section)}
            >
              {i18n.t(`title.${section}`)}
            </a>
          ))}
        </SectionHeader>
        <div>
          <SectionContent isActive={selectedSection === 'editions'}>
            <Row>
              <List>
                {publishers.map((publisher) => (
                  <ListItem key={v4()}>
                    <span>{publisher.classification}</span>
                    <span>{publisher.edition}</span>
                    <span>
                      {format(publisher.publishedAt, 'dd/MM/yyyy')}
                    </span>
                    <span>{publisher.publisher.name}</span>
                  </ListItem>
                ))}
              </List>
            </Row>
          </SectionContent>

          <SectionContent isActive={selectedSection === 'authors'}>
            <Row>
              <List>
                {authors.map((author) => (
                  <ListItem key={v4()}>
                    {author.name}{' '}
                  </ListItem>
                ))}
              </List>
            </Row>
          </SectionContent>

          <SectionContent isActive={selectedSection === 'categories'}>
            <Row>
              <List>
                {categories.map((category) => (
                  <ListItem key={v4()}>
                    {category.name}{' '}
                  </ListItem>
                ))}
              </List>
            </Row>
          </SectionContent>
        </div>
      </Card>
    </Container>
  );
};

export default ReadTitle;
