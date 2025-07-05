import { CircularProgress } from '@mui/material';
import { IComment } from '../../../interfaces';
import CommentListItem from '../../listItems/CommentListItem';

interface IProps {
  loading: boolean;
  error: any;
  comments: IComment[];
  projectId: number;
  taskId: number;
}

const Commentlist = ({
  loading,
  error,
  comments,
  projectId,
  taskId,
}: IProps) => {
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>zxcerror</div>;
  }
  if (comments.length === 0) {
    return <div>no comments</div>;
  }
  return (
    <>
      {comments.map((comment: IComment) => {
        return (
          <div key={comment.id}>
            <CommentListItem
              comment={comment}
              projectId={projectId}
              taskId={taskId}
            />
          </div>
        );
      })}
    </>
  );
};

export default Commentlist;
