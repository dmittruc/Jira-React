import React from 'react';
import { IFile } from '../../interfaces';
import ImageModal from '../ImageModal';
import styles from './UploadedFileList.module.css';

interface IProps {
  file: IFile;
  deleteFile?: (file: IFile) => void;
}

const UploadedFile = ({ file, deleteFile }: IProps) => {
  const [open, setOpen] = React.useState(false);

  const openModal = React.useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setOpen(false);
  }, []);

  const fileUrl = React.useMemo(() => {
    return `https://i.ibb.co/cchq8W9M/79ed26c0b2d7.jpg`;
  }, [file]);

  const deleteCurrentFile = React.useCallback(() => {
    if (deleteFile) {
      deleteFile(file);
    }
  }, [file, deleteFile]);

  return (
    <div className={styles.container} onClick={openModal}>
      <img className={styles.image} src={fileUrl} />
      {deleteFile && (
        <div onClick={deleteCurrentFile} className={styles.deleteIcon}>
          delete
        </div>
      )}
      {open && <ImageModal imageUrl={fileUrl} closeModal={closeModal} />}
    </div>
  );
};

export default UploadedFile;
