import { IComment } from '..';

export interface ICommentsReducerState {
  loading: boolean;
  comments: IComment[];
  error: any;
}
