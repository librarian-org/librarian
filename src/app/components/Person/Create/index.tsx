import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import Button from '../../Button';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import i18n from '../../../i18n';
import Input from '../../Input';
import { useToast } from '../../../hooks/toast';
import { SelectHandles } from '../../CreatableSelectInput';
import SectionContent from '../../Sections/SectionContent';
import SectionHeader from '../../Sections/SectionHeader';
import ContactTypeSelect from '../../ContactTypeSelect';

import { ButtonContainer, Container, List, ListItem, Row } from './styles';
import ProfileSelect from '../../ProfileSelect';
import CitySelect from '../../CitySelect';

interface SelectType {
  id: string;
  name: string;
}

const CreatePerson: React.FC = () => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  const [notes, setNotes] = useState('');
  const [language, setLanguage] = useState('');
  const [contact, setContact] = useState('');
  const [profile, setProfile] = useState('');

  const [complement, setComplement] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [publicPlace, setPublicPlace] = useState('');

  const [selectedSection, setSelectedSection] = useState('contacts');

  const sections = useMemo(() => ['contacts', 'profiles', 'addresses'], []);

  const [addresses, setAddresses] = useState<SelectType[]>([]);
  const refAddress = useRef<SelectHandles>(null);

  const [contacts, setContacts] = useState<SelectType[]>([]);
  const refContact = useRef<SelectHandles>(null);

  const [typeContact, setTypeContact] = useState<SelectType[]>([]);
  const refTypeContact = useRef<SelectHandles>(null);

  const [profiles, setProfiles] = useState<SelectType[]>([]);
  const refProfile = useRef<SelectHandles>(null);

  const handleAddContact = useCallback(() => {
    const contactType = refTypeContact.current.getValue<SelectType>();
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
  }, [contact]);

  const handleAddProfile = useCallback(() => {
    const profile = refTypeContact.current.getValue<SelectType>();
    const errors: string[] = [];
    if (!profile) {
      errors.push(i18n.t('person.profile'));
    }

    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('person.informErrorsProfile')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }
  }, [profile]);

  const handleAddAddress = useCallback(() => {
    const errors: string[] = [];
    if (!complement) {
      errors.push(i18n.t('address.complement'));
    }
    if (!zipcode) {
      errors.push(i18n.t('address.zipcode'));
    }
    if (!neighborhood) {
      errors.push(i18n.t('address.neighborhood'));
    }
    if (!publicPlace) {
      errors.push(i18n.t('address.publicPlace'));
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
  }, [complement, zipcode, neighborhood, publicPlace]);

  const handleSave = useCallback(() => {
    const result = window.api.sendSync('create', {
      entity: 'User',
      value: {
        name,
        login,
        password,
        document,
        language,
        notes,
      },
    }) as { id: string };
  }, []);
  return (
    <Container>
      <>
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Input
            containerStyle={{ flexGrow: 1, marginRight: '18px' }}
            type="text"
            name="name"
            label={i18n.t('person.name')}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={i18n.t('person.name')}
          />
          <Input
            containerStyle={{ flexGrow: 1, marginRight: '18px' }}
            type="text"
            name="login"
            label={i18n.t('person.login')}
            autoFocus
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            required={false}
            placeholder={i18n.t('person.login')}
          />
          <Input
            containerStyle={{ flexGrow: 1, marginRight: '18px' }}
            type="password"
            name="password"
            label={i18n.t('person.password')}
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={false}
            placeholder={i18n.t('person.password')}
          />
          <Input
            containerStyle={{ flexGrow: 1, marginRight: '18px' }}
            type="text"
            name="document"
            label={i18n.t('person.document')}
            autoFocus
            onChange={(e) => setDocument(e.target.value)}
            value={document}
            required={false}
            placeholder={i18n.t('person.document')}
          />
          <Input
            containerStyle={{ flexGrow: 1, marginRight: '18px' }}
            type="text"
            name="notes"
            label={i18n.t('person.notes')}
            autoFocus
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            required={false}
            placeholder={i18n.t('person.notes')}
          />
        </div>
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
        <div>
          <SectionContent isActive={selectedSection === 'contacts'}>
            <Row style={{ minHeight: '180px' }}>
              <ContactTypeSelect
                ref={refTypeContact}
                containerStyle={{ flexGrow: 2 }}
              />
              &nbsp;
              <Input
                type="text"
                name="info"
                label={i18n.t('person.contact')}
                placeholder={i18n.t('person.contact')}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              &nbsp;
              <Button style={{}} color="primary" onClick={handleAddContact}>
                <FiPlus size={20} />
              </Button>
            </Row>
          </SectionContent>
          <SectionContent isActive={selectedSection === 'profiles'}>
            <Row style={{ minHeight: '180px' }}>
              <ProfileSelect
                ref={refProfile}
                containerStyle={{ flexGrow: 2 }}
              />

              <Button style={{}} color="primary" onClick={handleAddProfile}>
                <FiPlus size={20} />
              </Button>
            </Row>
          </SectionContent>
          <SectionContent isActive={selectedSection === 'addresses'}>
            <Row style={{ minHeight: '180px' }}>
              <CitySelect
                ref={refTypeContact}
                containerStyle={{ flexGrow: 2 }}
              />
              &nbsp;
              <Button style={{}} color="primary" onClick={handleAddContact}>
                <FiPlus size={20} />
              </Button>
              &nbsp;
              <Input
                type="text"
                name="complement"
                label={i18n.t('address.complement')}
                placeholder={i18n.t('address.complement')}
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
              &nbsp;
              <Input
                type="text"
                name="zipcode"
                label={i18n.t('address.zipcode')}
                placeholder={i18n.t('address.zipcode')}
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              &nbsp;
              <Input
                type="text"
                name="neighborhood"
                label={i18n.t('address.neighborhood')}
                placeholder={i18n.t('address.neighborhood')}
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
              &nbsp;
              <Input
                type="text"
                name="publicPlace"
                label={i18n.t('address.publicPlace')}
                placeholder={i18n.t('address.publicPlace')}
                value={publicPlace}
                onChange={(e) => setPublicPlace(e.target.value)}
              />
              &nbsp;
              <Button style={{}} color="primary" onClick={handleAddAddress}>
                <FiPlus size={20} />
              </Button>
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
        </div>
      </>
    </Container>
  );
};

export default CreatePerson;
