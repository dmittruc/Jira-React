import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IComment, IFile } from '../interfaces';
import { TAppDispatch, TRootState } from '../store';
import {
  commentsAsyncAction,
  createCommentAsyncAction,
  deleteCommentAsyncAction,
  updateCommentsAsyncAction,
} from '../store/actions/commentsActions';

const useComments = (projectId: number, taskId: number) => {
  const dispatch = useDispatch<TAppDispatch>();

  const comments = useSelector<TRootState, IComment[]>(
    (state: TRootState) => state.comments.comments
  );

  const loading = useSelector<TRootState, boolean>(
    (state: TRootState) => state.comments.loading
  );

  const error = useSelector<TRootState, any>(
    (state: TRootState) => state.comments.error
  );

  const fetchComments = useCallback(() => {
    dispatch(commentsAsyncAction({ projectId: projectId, taskId: taskId }));
  }, [projectId, taskId]);

  const createComment = useCallback(
    (message: string, files: File[], onSuccess?: () => void) => {
      dispatch(
        createCommentAsyncAction({
          projectId,
          taskId,
          message,
          files,
          onSuccess,
        })
      );
    },
    [projectId, taskId]
  );

  const updateComment = useCallback(
    (
      commentId: number,
      message: string,
      files: File[],
      oldFiles: IFile[],
      onSuccess?: () => void
    ) => {
      dispatch(
        updateCommentsAsyncAction({
          projectId,
          taskId,
          commentId,
          message,
          files,
          oldFiles,
          onSuccess,
        })
      );
    },
    [projectId, taskId]
  );

  const deleteComments = useCallback(
    (commentId: number, onSuccess: () => void) => {
      dispatch(
        deleteCommentAsyncAction({ projectId, taskId, commentId, onSuccess })
      );
    },
    [projectId, taskId]
  );

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    updateComment,
    deleteComments,
  };
};

export default useComments;
