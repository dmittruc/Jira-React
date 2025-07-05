import { Button, TextField } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilePicker from '../../components/FilePicker';
import NewFileList from '../../components/lists/NewFileList';
import UploadedFileList from '../../components/lists/UploadedFileList';
import useCommentById from '../../hooks/useCommentBiId';
import useComments from '../../hooks/useComments';
import { IFile } from '../../interfaces';

interface IProps {
  commentId: number;
  currentMessage: string;
  currentFiles: IFile[];
}

const CommentEditorPage = ({
  commentId,
  currentMessage,
  currentFiles,
}: IProps) => {
  const { projectId, taskId } = useParams();

  const [message, setMessage] = useState<string>(currentMessage);
  const [files, setFiles] = useState<File[]>([]);
  const [oldFiles, setOldFiles] = useState<IFile[]>(currentFiles);

  const { loading, updateComment } = useComments(
    parseInt(projectId!),
    parseInt(taskId!)
  );

  const navigate = useNavigate();

  const addFile = useCallback(
    (file: File) => {
      setFiles((uploadedFiles: File[]) => {
        const isSelectedFile = files.some(
          (uploadedFile: File) => uploadedFile.name === file.name
        );
        if (isSelectedFile) {
          alert('You have already selected a file with this name');
          return uploadedFiles;
        }
        return [...uploadedFiles, file];
      });
    },
    [files]
  );

  const deleteFile = useCallback(
    (file: File) => {
      setFiles((uploadedFiles: File[]) =>
        uploadedFiles.filter(
          (uploadedFile: File) => uploadedFile.name !== file.name
        )
      );
    },
    [files]
  );

  const deleteOldFile = useCallback(
    (file: IFile) => {
      setOldFiles((uploadedFiles: IFile[]) =>
        uploadedFiles.filter(
          (uploadedFile: IFile) => uploadedFile.name !== file.name
        )
      );
    },
    [oldFiles]
  );

  const updateCurrentComment = useCallback(() => {
    updateComment(commentId, message, files, oldFiles, goToTaskDetails);
  }, [commentId, message, files, oldFiles]);

  const goToTaskDetails = useCallback(() => {
    navigate(-1);
  }, []);

  const isValid = useMemo<boolean>(() => {
    return !!message.trim();
  }, [message]);

  return (
    <div>
      <h3>Update comment page</h3>
      <TextField
        label="Message"
        variant="filled"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <p>Uploaded files</p>
      <UploadedFileList files={oldFiles} deleteFile={deleteOldFile} />
      <p>New files</p>
      <NewFileList files={files} deleteFile={deleteFile} />
      <FilePicker setFile={addFile}>
        <Button>Add file</Button>
      </FilePicker>
      <Button
        onClick={updateCurrentComment}
        variant="contained"
        disabled={loading || !isValid}
      >
        Update current comment
      </Button>
    </div>
  );
};

const CommentEditorPageWrapper = () => {
  const { commentId } = useParams();

  const { selectedComment } = useCommentById(parseInt(commentId!));

  if (!selectedComment) {
    return <div>no comment</div>;
  }
  return (
    <CommentEditorPage
      commentId={parseInt(commentId!)}
      currentMessage={selectedComment.message}
      currentFiles={selectedComment.files}
    />
  );
};

export default CommentEditorPageWrapper;
