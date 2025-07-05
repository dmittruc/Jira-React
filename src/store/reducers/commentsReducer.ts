import { createReducer } from '@reduxjs/toolkit';
import { IComment } from '../../interfaces';
import { ICommentsReducerState } from '../../interfaces/reducers/commentsReducer';
import {
  addCommentsAction,
  deleteCommentsAction,
  setCommentsAction,
  setErrorAction,
  setLoadingAction,
  updateCommentsAction,
} from '../actions/commentsActions';

const initialState: ICommentsReducerState = {
  comments: [],
  loading: false,
  error: undefined,
};

const commentsReducer = createReducer<ICommentsReducerState>(
  initialState,
  (builder) =>
    builder
      .addCase(setCommentsAction, (store, { payload: { comments } }) => ({
        ...store,
        comments: comments,
      }))
      .addCase(setLoadingAction, (store, { payload: { loading } }) => ({
        ...store,
        loading: loading,
      }))
      .addCase(setErrorAction, (store, { payload: { error } }) => ({
        ...store,
        error: error,
      }))
      .addCase(deleteCommentsAction, (store, { payload: { comment } }) => ({
        ...store,
        comments: store.comments.filter(
          (currentComment: IComment) => currentComment.id !== comment.id
        ),
      }))
      .addCase(addCommentsAction, (store, { payload: { comment } }) => ({
        ...store,
        comments: [...store.comments, comment],
      }))
      .addCase(updateCommentsAction, (store, { payload: { comment } }) => ({
        ...store,
        comments: store.comments.map((currentComment: IComment) =>
          currentComment.id === comment.id ? comment : currentComment
        ),
      }))
);

export default commentsReducer;
