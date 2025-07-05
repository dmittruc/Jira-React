import { IProject } from '..';

export interface ISetLoadingAction {
  loading: boolean;
}

export interface ISetProjectsAction {
  projects: IProject[];
}

export interface ISetErrorAction {
  error: any;
}

export interface IAddProjectsAction {
  project: IProject;
}

export interface IUpdateProjectsAction {
  project: IProject;
}

export interface IDeleteProjectsAction {
  project: IProject;
}

export interface ICreateProjectsAsyncAction {
  title: string;
  description: string;
  onSuccess?: () => void;
}

export interface IUpdateProjectsAsyncAction {
  projectId: number;
  title: string;
  description: string;
  onSuccess?: () => void;
}

export interface IDeleteProjectsAsyncAction {
  projectId: number;
  onSuccess?: () => void;
}
