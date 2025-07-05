import { IFile, IStatus, ITask, IType, IUser } from '..';

export interface ISetLoadingAction {
  loading: boolean;
}

export interface ISetTasksAction {
  tasks: ITask[];
}

export interface ISetErrorAction {
  error: any;
}

export interface IAddTasksAction {
  task: ITask;
}

export interface IUpdateTasksAction {
  task: ITask;
}

export interface IDeleteTasksAction {
  task: ITask;
}

export interface ITasksAsyncAction {
  projectId: number;
}

export interface ICreateTasksAsyncAction {
  projectId: number;
  title: string;
  description: string;
  status: IStatus;
  type: IType;
  user: IUser;
  files: File[];
  onSuccess?: () => void;
}

export interface IUpdateTasksAsyncAction {
  projectId: number;
  taskId: number;
  title: string;
  description: string;
  status: IStatus;
  type: IType;
  user: IUser;
  files: File[];
  oldFiles: IFile[];
  onSuccess?: () => void;
}

export interface IDeleteTasksAsyncAction {
  projectId: number;
  taskId: number;
  onSuccess?: () => void;
}
