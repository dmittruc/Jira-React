import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '..';
import {
  createCommentsApi,
  deleteCommentsApi,
  fetchCommentsApi,
  updateCommentsApi,
} from '../../api/commentsApi';
import { deleteFileApi } from '../../api/filesApi';
import { IComment } from '../../interfaces';
import {
  IAddCommentAction,
  ICommentsAsyncAction,
  ICreateCommentsAsyncAction,
  IDeleteCommentAction,
  IDeleteCommentAsyncAction,
  ISetCommentsAction,
  ISetErrorAction,
  ISetLoadingAction,
  IUpdateCommentAction,
  IUpdateCommentsAsyncAction,
} from '../../interfaces/actions/commentsActions';
import { commentInfoSelector } from '../selectors/commentSelectors';

export const setLoadingAction = createAction<ISetLoadingAction>(
  'comments/setLoadingAction'
);

export const setCommentsAction = createAction<ISetCommentsAction>(
  'comments/setCommentsAction'
);

export const addCommentsAction = createAction<IAddCommentAction>(
  'comments/addCommentsAction'
);

export const updateCommentsAction = createAction<IUpdateCommentAction>(
  'comments/updateCommentsAction'
);

export const deleteCommentsAction = createAction<IDeleteCommentAction>(
  'comments/deleteCommentsAction'
);

export const setErrorAction = createAction<ISetErrorAction>(
  'comments/setErrorAction'
);

export const commentsAsyncAction = createAsyncThunk<void, ICommentsAsyncAction>(
  'comments/commentsAsyncAction',
  async ({ projectId, taskId }, { getState, dispatch }) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await fetchCommentsApi(projectId, taskId);
      console.log(res);
      const comments = res.comments.reverse();
      dispatch(setCommentsAction({ comments: comments }));
      dispatch(setErrorAction({ error: undefined }));
    } catch (e: any) {
      dispatch(setErrorAction({ error: e }));
      console.log('Error:', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const deleteCommentAsyncAction = createAsyncThunk<
  void,
  IDeleteCommentAsyncAction
>(
  'comments/deleteCommentAsyncAction',
  async (
    { projectId, taskId, commentId, onSuccess },
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await deleteCommentsApi(projectId, taskId, commentId);
      console.log('deleteCommentAsyncAction', res);
      dispatch(commentsAsyncAction({ projectId, taskId }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log('Error:', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const createCommentAsyncAction = createAsyncThunk<
  void,
  ICreateCommentsAsyncAction
>(
  'comments/createCommentAsyncAction',
  async (
    { projectId, taskId, message, files, onSuccess },
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      console.log(
        'try create comment with:',
        projectId,
        taskId,
        message,
        files
      );
      const res = await createCommentsApi(projectId, taskId, message, files);
      console.log('res create comments', res);
      dispatch(commentsAsyncAction({ projectId, taskId }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log('commentsActions::createCommentAsyncAction error:', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const updateCommentsAsyncAction = createAsyncThunk<
  void,
  IUpdateCommentsAsyncAction
>(
  'comments/updateCommentsAsyncAction',
  async (
    {
      projectId,
      taskId,
      commentId,
      message,
      files,
      oldFiles,
      onSuccess,
    }: IUpdateCommentsAsyncAction,
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      console.log('start update comment');
      const state: TRootState = getState() as TRootState;
      const commentInfo: IComment | undefined =
        commentInfoSelector(commentId)(state);
      if (commentInfo) {
        const deletedFiles = commentInfo.files.filter(
          (file) => !oldFiles.some((oldFile) => oldFile.name === file.name)
        );
        for (let i = 0; i < deletedFiles.length; i++) {
          await deleteFileApi(deletedFiles[i].id);
        }
      }
      const res = await updateCommentsApi(
        projectId,
        taskId,
        commentId,
        message,
        files
      );
      console.log('updated comments', res);
      dispatch(commentsAsyncAction({ projectId, taskId }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log('Error:', e);
    } finally {
      console.log('finish update comment');
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);
