import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IComment } from '../interfaces';
import { TRootState } from '../store';

const useCommentById = (commentId: number) => {
  const comments = useSelector<TRootState, IComment[]>(
    (state: TRootState) => state.comments.comments
  );
  const selectedComment = useMemo(() => {
    return comments.find((comment) => comment.id == commentId);
  }, [commentId]);

  return { selectedComment };
};

export default useCommentById;
