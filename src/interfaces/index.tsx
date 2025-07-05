export type TUserRole = 'ADMIN' | 'USER';

export interface IProject {
  id: number;
  title: string;
  description: string;
  taskCount: number;
  users: IUser[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
}

export interface IType {
  id: number;
  title: string;
  color: string;
}

export interface IStatus {
  id: number;
  title: string;
  color: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  timeTracked: number;
  projectId: number;
  statusId: number;
  typeId: number;
  userId: number;
  status: IStatus;
  type: IType;
  user: IUser;
  files: File[];
}

export interface IComment {
  id: number;
  message: string;
  taskId: number;
  userId: number;
  user: IUser;
  files: IFile[];
}

export interface IFile {
  id: number;
  commentId?: number;
  taskId?: number;
  name: string;
}
