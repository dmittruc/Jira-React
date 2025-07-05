import { IComment, IFile } from '..';

export interface ISetLoadingAction {
  loading: boolean;
}

export interface ISetCommentsAction {
  comments: IComment[];
}

export interface ISetErrorAction {
  error: any;
}

export interface IAddCommentAction {
  comment: IComment;
}

export interface IUpdateCommentAction {
  comment: IComment;
}

export interface IDeleteCommentAction {
  comment: IComment;
}

export interface ICommentsAsyncAction {
  projectId: number;
  taskId: number;
}

export interface ICreateCommentsAsyncAction {
  projectId: number;
  taskId: number;
  message: string;
  files?: File[];
  onSuccess?: () => void;
}

export interface IUpdateCommentsAsyncAction {
  projectId: number;
  taskId: number;
  commentId: number;
  message: string;
  files: File[];
  oldFiles: IFile[];
  onSuccess?: () => void;
}

export interface IDeleteCommentAsyncAction {
  projectId: number;
  taskId: number;
  commentId: number;
  onSuccess?: () => void;
}
