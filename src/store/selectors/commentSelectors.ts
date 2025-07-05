import { createSelector } from 'reselect';
import { TRootState } from '..';
import { IComment } from '../../interfaces';

const commentsSelector = (state: TRootState) => state.comments.comments;

export const commentInfoSelector = (commentId: number) =>
  createSelector([commentsSelector], (comments: IComment[]) =>
    comments.find((comment: IComment) => comment.id == commentId)
  );
