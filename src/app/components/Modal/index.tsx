import React, { useState, useEffect, ReactNode } from 'react';

import ReactModal from 'react-modal';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
  customClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  customClass,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      className={customClass ?? 'modal'}
      overlayClassName="modal-overlay"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
