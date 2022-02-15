import React, { useCallback, useState } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import Input from '../Input';
import i18n from '../../i18n';

import { Container, Center } from './styles';
import Button from '../Button';
import Card from '../Card';

import logoImg from '../../../assets/images/librarian.png';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    if (!username) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('login.typeUsername'),
      });
      return;
    }
    if (!password) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('login.typePassword'),
      });
      return;
    }

    const logged = await signIn({
      login: username,
      password,
    });

    if (!logged) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('login.invalid'),
      });
      return;
    }

    navigate('/');
  }, [addToast, navigate, password, signIn, username]);

  return (
    <Container>
      <Center>
        <Card>
          <img src={logoImg} alt="Librarian" width="64" />
          <Input
            name="username"
            autoFocus
            icon={FiUser}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={i18n.t('login.username')}
            placeholder={i18n.t('login.typeUsername')}
          />
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FiLock}
            label={i18n.t('login.password')}
            placeholder={i18n.t('login.typePassword')}
          />

          <Button type="button" color="primary" onClick={handleLogin}>
            {i18n.t('login.login')}
          </Button>
        </Card>
      </Center>
    </Container>
  );
};

export default Login;
