import React from 'react';
import { EMPTY_PHOTO_URL } from '../../constants';
import ImageModal from '../ImageModal';
import styles from './NewFile.module.css';

interface IProps {
  file: File;
  deleteFile: (file: File) => void;
}

const NewFile = ({ file, deleteFile }: IProps) => {
  const [open, setOpen] = React.useState(false);

  const openModal = React.useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setOpen(false);
  }, []);
  const fileUrl = React.useMemo(() => {
    return file ? URL.createObjectURL(file) : EMPTY_PHOTO_URL;
  }, [file]);

  const deleteCurrentFile = React.useCallback(() => {
    deleteFile(file);
  }, [file]);

  return (
    <div className={styles.container} onClick={openModal}>
      <img className={styles.image} src={fileUrl} />
      <div onClick={deleteCurrentFile} className={styles.deleteIcon}>
        delete
      </div>
      {open && <ImageModal imageUrl={fileUrl} closeModal={closeModal} />}
    </div>
  );
};

export default NewFile;
