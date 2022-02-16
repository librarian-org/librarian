import React, { useCallback, useState } from 'react';
import { FiLogOut, FiRefreshCw } from 'react-icons/fi';
import ReactModal from 'react-modal';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import Button from '../Button';
import Input from '../Input';
import { Container, Row } from './styles';

interface ModalProps {
  isOpen: boolean;
  setOpen: () => void;
}

const LoggedUserModal: React.FC<ModalProps> = ({ isOpen, setOpen }) => {
  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = useCallback(() => {
    if (!oldPassword) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('profile.typePassword'),
      });
      return;
    }
    if (!newPassword) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('profile.typeNewPassword'),
      });
      return;
    }

    if (!confirmPassword) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('profile.typeConfirmPassword'),
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('profile.newAndConfirmPassword'),
      });
      return;
    }

    const changed = window.api.sendSync('changePassword', {
      entity: 'User',
      value: {
        userId: user.id,
        password: oldPassword,
        newPassword,
      },
    }) as { id: string };

    if (!changed) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('profile.oldPasswordInvalid'),
      });
      return;
    }

    addToast({
      title: i18n.t('notifications.success'),
      type: 'success',
      description: i18n.t('profile.successPasswordChange'),
    });

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, [addToast, confirmPassword, newPassword, oldPassword, user.id]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      className={'password-modal'}
      overlayClassName="modal-overlay"
    >
      <Container>
        <h2>{user.name}</h2>
        <Row>
          <h3>{i18n.t('button.changePassword')}</h3>
        </Row>
        <Row>
          <Input
            type="password"
            name="oldPassword"
            placeholder={i18n.t('person.password')}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Row>
        <Row>
          <Input
            type="password"
            name="newPassword"
            placeholder={i18n.t('person.newPassword')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Row>
        <Row>
          <Input
            type="password"
            name="confirmPassword"
            placeholder={i18n.t('person.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Row>
        <Row>
          <Button
            color="primary"
            title={i18n.t('button.changePassword')}
            onClick={handleUpdatePassword}
          >
            <FiRefreshCw size={20} />
            &nbsp;
            {i18n.t('button.changePassword')}
          </Button>
        </Row>

        <Row>
          <Button
            color="primary"
            title={i18n.t('button.logout')}
            onClick={signOut}
          >
            <FiLogOut size={20} />
            &nbsp;
            {i18n.t('button.logout')}
          </Button>
        </Row>
      </Container>
    </ReactModal>
  );
};

export default LoggedUserModal;
