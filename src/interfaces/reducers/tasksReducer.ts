import { ITask } from '..';

export interface ITasksReducerState {
  loading: boolean;
  tasks: ITask[];
  error: any;
}
