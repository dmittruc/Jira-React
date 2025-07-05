import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useComments from '../../../hooks/useComments';
import { IComment, IFile } from '../../../interfaces';
import UploadedFile from '../../UploadedFile';

interface IProps {
  comment: IComment;
  projectId: number;
  taskId: number;
}

const CommentListItem = ({ comment, projectId, taskId }: IProps) => {
  const navigate = useNavigate();
  const { deleteComments, loading, error } = useComments(projectId, taskId);
  const onSuccess = () => console.log('onSuccess');

  const goToCommentEditor = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      navigate(
        `/projects/${projectId}/tasks/${taskId}/comments/${comment.id}/edit`
      );
    },
    [projectId, taskId, comment]
  );

  const handleDeleteComments = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      deleteComments(comment.id, onSuccess);
    },
    [comment]
  );
  return (
    <div>
      <div>
        <div onClick={handleDeleteComments}>delete comment</div>
        <div onClick={goToCommentEditor}>edit comment</div>
      </div>
      <p>
        <span>comment message: </span>
        <span>{comment.message}</span>
      </p>
      <div>
        {comment.files.map((file: IFile) => (
          <div key={file.id}>
            <UploadedFile file={file} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentListItem;
