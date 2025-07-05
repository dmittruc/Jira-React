import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import styles from './ImageModal.module.css';

export interface IProps {
  imageUrl: string;
  closeModal: () => void;
}

const ImageModal = ({ imageUrl, closeModal }: IProps) => {
  const onClose = React.useCallback((event: any) => {
    event.stopPropagation();
    closeModal();
  }, []);

  return (
    <Dialog onClose={onClose} open={true}>
      <div className={styles.container}>
        <img className={styles.image} src={imageUrl} />
        <Button onClick={onClose} className={styles.button} variant="contained">
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default ImageModal;
