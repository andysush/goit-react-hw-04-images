import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, tags, onModalClose }) {
  const handleCloseBackdrop = event => {
    if (event.target === event.currentTarget) onModalClose();
  };

  useEffect(() => {
    const handleCloseESC = event => {
      if (event.code === 'Escape') onModalClose();
    };
    document.addEventListener('keydown', handleCloseESC);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleCloseESC);
      document.documentElement.style.overflow = '';
    };
  }, [onModalClose]);

  return createPortal(
    <>
      <Overlay onClick={handleCloseBackdrop}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
