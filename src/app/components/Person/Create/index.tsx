import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import Button from '../../Button';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import i18n from '../../../i18n';
import Input from '../../Input';
import { useToast } from '../../../hooks/toast';
import { SelectHandles } from '../../CreatableSelectInput';

import { AppEvent } from '../../../../common/AppEvent';
import { trigger } from '../../../util/EventHandler';
import { Actions } from '../../../../common/Actions';

import SectionContent from '../../Sections/SectionContent';
import SectionHeader from '../../Sections/SectionHeader';
import ContactTypeSelect from '../../ContactTypeSelect';

import {
  ButtonContainer,
  Column,
  Container,
  Header,
  List,
  ListItem,
  Row,
} from './styles';
import CitySelect, { Option } from '../../City/CitySelect';
import UserTypeSelect from '../../UserTypeSelect';
import CreateCity from '../../City';
import { Person } from '../Person';
import { v4 } from 'uuid';

interface SelectType {
  id: string;
  name: string;
}

interface Contact {
  info: string;
  contactType: SelectType;
}

interface Address {
  city: SelectType;
  publicPlace: string;
  number: string;
  zipcode: string;
  neighborhood: string;
  complement: string;
}

const CreatePerson: React.FC<{ globalSave: any }> = ({ globalSave }) => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  const [notes, setNotes] = useState('');
  const [contact, setContact] = useState('');

  const [complement, setComplement] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [publicPlace, setPublicPlace] = useState('');
  const [number, setNumber] = useState('');
  const [addingCity, setAddingCity] = useState(false);

  const [selectedSection, setSelectedSection] = useState('contacts');

  const sections = useMemo(() => ['contacts', 'addresses'], []);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const refCity = useRef<SelectHandles>(null);
  const [reloadCities, setReloadCities] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const refContactType = useRef<SelectHandles>(null);

  const refUserType = useRef<SelectHandles>(null);

  useEffect(() => {
    globalSave.current = handleSave;
  }, [
    globalSave,
    addToast,
    addresses,
    contacts,
    document,
    login,
    name,
    notes,
    password,
  ]);

  const handleAddContact = useCallback(() => {
    const contactType = refContactType.current.getValue<SelectType>();
    const errors: string[] = [];

    if (!contactType) {
      errors.push(i18n.t('person.contactType'));
    }

    if (!contact) {
      errors.push(i18n.t('person.contact'));
    }

    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('person.informErrorsContact')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }

    const newContact = {
      info: contact,
      contactType,
    };

    setContacts((oldState) => [...oldState, newContact]);
    refContactType.current.clear();
    setContact('');
  }, [addToast, contact]);

  const handleRemoveContact = useCallback(
    (cont: Contact) => {
      const contactsFiltered = contacts.filter((c) => c !== cont);
      setContacts(contactsFiltered);
    },
    [contacts]
  );

  const handleAddAddress = useCallback(() => {
    const errors: string[] = [];
    const city = refCity.current.getValue<SelectType>();

    if (!city) {
      errors.push(i18n.t('address.city'));
    }

    if (!zipcode) {
      errors.push(i18n.t('address.zipcode'));
    }

    if (!publicPlace) {
      errors.push(i18n.t('address.publicPlace'));
    }

    if (!number) {
      errors.push(i18n.t('address.number'));
    }

    if (!neighborhood) {
      errors.push(i18n.t('address.neighborhood'));
    }

    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('person.informErrorsAddress')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }

    const newAddress = {
      city,
      zipcode,
      publicPlace,
      number,
      neighborhood,
      complement,
    };

    setAddresses((oldState) => [...oldState, newAddress]);
    refCity.current.clear();
    setZipcode('');
    setPublicPlace('');
    setNumber('');
    setNeighborhood('');
    setComplement('');
  }, [zipcode, publicPlace, number, neighborhood, complement, addToast]);

  const handleRemoveAddress = useCallback(
    (add: Address) => {
      const addressesFiltered = addresses.filter((c) => c !== add);
      setAddresses(addressesFiltered);
    },
    [addresses]
  );

  const handleSave = useCallback(() => {
    const errors: string[] = [];
    const userType = refUserType.current.getValue<SelectType>();

    if (!name) {
      errors.push(i18n.t('person.name'));
    }

    if (!userType) {
      errors.push(i18n.t('person.userType'));
    }

    if (!document) {
      errors.push(i18n.t('person.document'));
    }

    if (!login) {
      errors.push(i18n.t('person.login'));
    }

    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('person.informError')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }

    const result = window.api.sendSync('userCreate', {
      entity: 'User',
      value: {
        name,
        login,
        password,
        language: i18n.language,
        notes,
        document,
        userTypeId: userType.id,
      },
    }) as { id: string };

    contacts.map((con) => {
      window.api.sendSync('create', {
        entity: 'Contact',
        value: {
          userId: result.id,
          contactTypeId: con.contactType.id,
          info: con.info,
        },
      });
    });

    addresses.map((add) => {
      window.api.sendSync('create', {
        entity: 'Address',
        value: {
          userId: result.id,
          zipcode: add.zipcode,
          publicPlace: add.publicPlace,
          number: add.number,
          neighborhood: add.neighborhood,
          cityId: add.city.id,
          complement: add.complement,
        },
      });
    });

    const insertedPerson = window.api.sendSync('readPerson', {
      entity: 'User',
      value: {
        where: {
          id: result.id,
        },
      },
    }) as Person;

    addToast({
      title: i18n.t('notifications.success'),
      type: 'success',
      description: i18n.t('person.successSave'),
    });

    trigger(AppEvent.personTab, {
      action: Actions.read,
      value: insertedPerson,
    });
  }, [addToast, addresses, contacts, document, login, name, notes, password]);

  const handleCityModal = useCallback(() => {
    setAddingCity((oldState) => !oldState);
  }, []);

  const handleCityCreated = useCallback((created: Option) => {
    setReloadCities((oldState) => !oldState);
    refCity.current.setValue(created);
  }, []);

  return (
    <Container>
      <Header>
        <Row>
          <Column>
            <Input
              type="text"
              name="name"
              label={i18n.t('person.name')}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={i18n.t('person.name')}
            />
          </Column>
          <Column>
            <UserTypeSelect ref={refUserType} />
          </Column>
          <Column>
            <Input
              type="text"
              name="document"
              label={i18n.t('person.document')}
              onChange={(e) => setDocument(e.target.value)}
              value={document}
              required={false}
              placeholder={i18n.t('person.document')}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Input
              type="text"
              name="login"
              label={i18n.t('person.login')}
              onChange={(e) => setLogin(e.target.value)}
              value={login}
              required={false}
              placeholder={i18n.t('person.login')}
            />
          </Column>
          <Column>
            <Input
              type="password"
              name="password"
              label={i18n.t('person.password')}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required={false}
              placeholder={i18n.t('person.password')}
            />
          </Column>
          <Column>
            <Input
              type="text"
              name="notes"
              label={i18n.t('person.notes')}
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              required={false}
              placeholder={i18n.t('person.notes')}
            />
          </Column>
        </Row>
      </Header>
      <SectionHeader>
        {sections.map((section) => (
          <a
            key={section}
            className={selectedSection === section ? 'active' : ''}
            onClick={() => setSelectedSection(section)}
          >
            {i18n.t(`person.${section}`)}
          </a>
        ))}
      </SectionHeader>
      <SectionContent isActive={selectedSection === 'contacts'}>
        <Row>
          <Column>
            <ContactTypeSelect ref={refContactType} />
          </Column>
          <Column>
            <Input
              type="text"
              name="info"
              label={i18n.t('person.contact')}
              placeholder={i18n.t('person.contact')}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Column>
          <Column>
            <Button style={{}} color="primary" onClick={handleAddContact}>
              <FiPlus size={20} />
            </Button>
          </Column>
        </Row>
        <Row>
          <List>
            {contacts.map((cont) => (
              <ListItem key={v4()}>
                <span>{cont.contactType.name}</span>
                <span>{cont.info}</span>
                <span style={{ width: '10%', textAlign: 'right' }}>
                  <FiTrash2
                    size={20}
                    onClick={() => handleRemoveContact(cont)}
                    title={i18n.t('person.removeContact')}
                  />
                </span>
              </ListItem>
            ))}
          </List>
        </Row>
      </SectionContent>
      <SectionContent isActive={selectedSection === 'addresses'}>
        <Row>
          <Column>
            <CitySelect reload={reloadCities} ref={refCity} />
          </Column>
          <Column>
            <CreateCity
              isOpen={addingCity}
              setOpen={handleCityModal}
              handleCreated={handleCityCreated}
            />
            <FiPlus
              size={20}
              onClick={handleCityModal}
              title={i18n.t('city.create')}
            />
          </Column>

          <Column>
            <Input
              type="text"
              name="zipcode"
              label={i18n.t('address.zipcode')}
              placeholder={i18n.t('address.zipcode')}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </Column>
          <Column>
            <Input
              type="text"
              name="publicPlace"
              label={i18n.t('address.publicPlace')}
              placeholder={i18n.t('address.publicPlace')}
              value={publicPlace}
              onChange={(e) => setPublicPlace(e.target.value)}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Input
              type="text"
              name="number"
              label={i18n.t('address.number')}
              placeholder={i18n.t('address.number')}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Column>
          <Column>
            <Input
              type="text"
              name="neighborhood"
              label={i18n.t('address.neighborhood')}
              placeholder={i18n.t('address.neighborhood')}
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </Column>
          <Column>
            <Input
              type="text"
              name="complement"
              label={i18n.t('address.complement')}
              placeholder={i18n.t('address.complement')}
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </Column>
          <Column>
            <Button color="primary" onClick={handleAddAddress}>
              <FiPlus size={20} />
            </Button>
          </Column>
        </Row>
        <Row>
          <List>
            {addresses.map((add) => (
              <ListItem key={v4()}>
                <span>{add.city.name}</span>
                <span>{add.zipcode}</span>
                <span>{add.publicPlace}</span>
                <span>{add.number}</span>
                <span>{add.neighborhood}</span>
                <span style={{ width: '10%', textAlign: 'right' }}>
                  <FiTrash2
                    size={20}
                    onClick={() => handleRemoveAddress(add)}
                    title={i18n.t('person.removeAddress')}
                  />
                </span>
              </ListItem>
            ))}
          </List>
        </Row>
      </SectionContent>
      <ButtonContainer>
        <Button
          color="primary"
          title={i18n.t('button.save')}
          onClick={handleSave}
        >
          <FiSave size={20} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default CreatePerson;
