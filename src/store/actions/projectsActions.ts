import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createProjectApi,
  deleteProjectApi,
  fetchProjectsApi,
  updateProjectApi,
} from '../../api/projectsApi';
import {
  IAddProjectsAction,
  ICreateProjectsAsyncAction,
  IDeleteProjectsAction,
  IDeleteProjectsAsyncAction,
  ISetErrorAction,
  ISetLoadingAction,
  ISetProjectsAction,
  IUpdateProjectsAction,
  IUpdateProjectsAsyncAction,
} from '../../interfaces/actions/projectsActions';

export const setLoadingAction = createAction<ISetLoadingAction>(
  'projects/setLoadingAction'
);

export const setProjectsAction = createAction<ISetProjectsAction>(
  'projects/setProjectsAction'
);

export const addProjectsAction = createAction<IAddProjectsAction>(
  'projects/addProjectsAction'
);

export const updateProjectsAction = createAction<IUpdateProjectsAction>(
  'projects/updateProjectsAction'
);

export const deleteProjectsAction = createAction<IDeleteProjectsAction>(
  'projects/deleteProjectAction'
);

export const setErrorAction = createAction<ISetErrorAction>(
  'projects/setErrorAction'
);

export const projectsAsyncAction = createAsyncThunk(
  'projects/projectsAsyncAction',
  async (_, { getState, dispatch }) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await fetchProjectsApi();
      const projects = res.projects.reverse();
      dispatch(setProjectsAction({ projects: projects }));
      dispatch(setErrorAction({ error: undefined }));
    } catch (e: any) {
      dispatch(setErrorAction({ error: e }));
      console.log('Error:', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const deleteProjectsAsyncAction = createAsyncThunk<
  void,
  IDeleteProjectsAsyncAction
>(
  'projects/deleteProjectsAsyncAction',
  async ({ projectId, onSuccess }, { getState, dispatch }) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await deleteProjectApi(projectId);
      console.log('delete project', res);
      dispatch(projectsAsyncAction());
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log('Error:', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const updateProjectsAsyncAction = createAsyncThunk<
  void,
  IUpdateProjectsAsyncAction
>(
  'projects/updateProjectsAsyncAction',
  async (
    { projectId, title, description, onSuccess },
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await updateProjectApi(projectId, title, description);
      console.log('update project', res);
      dispatch(projectsAsyncAction());
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log('Error:', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const createProjectAsyncAction = createAsyncThunk<
  void,
  ICreateProjectsAsyncAction
>(
  'project/createProjectsAsyncAction',
  async ({ title, description, onSuccess }, { getState, dispatch }) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await createProjectApi(title, description);
      console.log('create project', res);
      dispatch(projectsAsyncAction());
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log('Error', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);
