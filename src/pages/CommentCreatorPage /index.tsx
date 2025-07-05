import { Button, TextField } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilePicker from '../../components/FilePicker';
import NewFileList from '../../components/lists/NewFileList';
import useComments from '../../hooks/useComments';
import useTaskById from '../../hooks/useTaskById';

interface IProps {
  projectId: number;
  taskId: number;
}

const CommentCreatorPage = ({ projectId, taskId }: IProps) => {
  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const { loading, createComment } = useComments(projectId, taskId);

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

  const createNewComment = useCallback(() => {
    createComment(message, files, goToTaskDetails);
  }, [message, files]);

  const goToTaskDetails = useCallback(() => {
    navigate(-1);
  }, []);

  const isValid = useMemo<boolean>(() => {
    return !!message.trim();
  }, [message]);

  return (
    <div>
      <h3>Create comment page</h3>
      <TextField
        label="Message"
        variant="filled"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <p>New files</p>
      <NewFileList files={files} deleteFile={deleteFile} />
      <FilePicker setFile={addFile}>
        <Button>Add file</Button>
      </FilePicker>
      <Button
        onClick={createNewComment}
        variant="contained"
        disabled={loading || !isValid}
      >
        Create new comment
      </Button>
    </div>
  );
};

const CommentCreatorPageWrapper = () => {
  const { projectId, taskId } = useParams();

  const { selectedTask } = useTaskById(taskId!);

  if (!selectedTask) {
    return <div>no comment</div>;
  }
  return (
    <CommentCreatorPage
      projectId={parseInt(projectId!)}
      taskId={parseInt(taskId!)}
    />
  );
};

export default CommentCreatorPageWrapper;
