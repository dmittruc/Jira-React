import NewFile from '../../NewFile';
import styles from './NewFileList.module.css';

interface IProps {
  files: File[];
  deleteFile: (file: File) => void;
}

const NewFileList = ({ files, deleteFile }: IProps) => {
  if (files.length === 0) {
    return <div>No files</div>;
  }

  return (
    <>
      {files.map((file: File) => (
        <div key={file.name} className={styles.fileContainer}>
          <NewFile file={file} deleteFile={deleteFile} />
        </div>
      ))}
    </>
  );
};

export default NewFileList;
