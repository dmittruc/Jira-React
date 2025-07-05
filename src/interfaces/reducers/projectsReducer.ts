import { IProject } from '..';

export interface IProjectsReducerState {
  loading: boolean;
  projects: IProject[];
  error: any;
}
