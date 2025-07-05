import { createReducer } from '@reduxjs/toolkit';
import { IProject } from '../../interfaces';
import { IProjectsReducerState } from '../../interfaces/reducers/projectsReducer';
import { setLoadingAction } from '../actions/authActions';
import {
  addProjectsAction,
  deleteProjectsAction,
  setErrorAction,
  setProjectsAction,
  updateProjectsAction,
} from '../actions/projectsActions';

const initialState: IProjectsReducerState = {
  projects: [],
  loading: false,
  error: undefined,
};

const projectsReducer = createReducer<IProjectsReducerState>(
  initialState,
  (builder) =>
    builder
      .addCase(setProjectsAction, (store, { payload: { projects } }) => ({
        ...store,
        projects: projects,
      }))
      .addCase(setLoadingAction, (store, { payload: { loading } }) => ({
        ...store,
        loading: loading,
      }))
      .addCase(setErrorAction, (store, { payload: { error } }) => ({
        ...store,
        error: error,
      }))
      .addCase(deleteProjectsAction, (store, { payload: { project } }) => ({
        ...store,
        projects: store.projects.filter(
          (currentProject: IProject) => currentProject.id !== project.id
        ),
      }))
      .addCase(addProjectsAction, (store, { payload: { project } }) => ({
        ...store,
        projects: [...store.projects, project],
      }))
      .addCase(updateProjectsAction, (store, { payload: { project } }) => ({
        ...store,
        projects: store.projects.map((currentProject: IProject) =>
          currentProject.id === project.id ? project : currentProject
        ),
      }))
);

export default projectsReducer;
