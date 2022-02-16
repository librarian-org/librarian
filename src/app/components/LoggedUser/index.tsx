import React, { useCallback, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import LoggedUserModal from '../LoggedUserModal';

import { Container } from './styles';

const LoggedUser: React.FC = () => {
  const { user } = useAuth();
  const [loggedUserModal, setLoggedUserModal] = useState(false);

  const handleloggedUserModal = useCallback(() => {
    setLoggedUserModal((oldState) => !oldState);
  }, []);

  return (
    <>
      <Container onClick={handleloggedUserModal}>
        <FiUser size={16} />
        <span>{user && user.name}</span>
      </Container>
      <LoggedUserModal
        isOpen={loggedUserModal}
        setOpen={handleloggedUserModal}
      />
    </>
  );
};

export default LoggedUser;
