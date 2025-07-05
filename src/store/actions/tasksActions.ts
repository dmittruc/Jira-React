import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTasksApi,
  deleteTasksApi,
  fetchTasksApi,
  updateTasksApi,
} from '../../api/tasksApi';
import {
  IAddTasksAction,
  ICreateTasksAsyncAction,
  IDeleteTasksAction,
  IDeleteTasksAsyncAction,
  ISetErrorAction,
  ISetLoadingAction,
  ISetTasksAction,
  ITasksAsyncAction,
  IUpdateTasksAction,
  IUpdateTasksAsyncAction,
} from '../../interfaces/actions/tasksActions';

export const setLoadingAction = createAction<ISetLoadingAction>(
  'tasks/setLoadingAction'
);

export const setTasksAction = createAction<ISetTasksAction>(
  'tasks/setTasksAction'
);

export const addTasksAction = createAction<IAddTasksAction>(
  'tasks/addTasksAction'
);

export const updateTasksAction = createAction<IUpdateTasksAction>(
  'tasks/updateTasksAction'
);

export const deleteTasksAction = createAction<IDeleteTasksAction>(
  'tasks/deleteTasksAction'
);

export const setErrorAction = createAction<ISetErrorAction>(
  'tasks/setErrorAction'
);

export const tasksAsyncAction = createAsyncThunk<void, ITasksAsyncAction>(
  'tasks/tasksAsyncAction',
  async ({ projectId }: ITasksAsyncAction, { getState, dispatch }) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await fetchTasksApi(projectId);
      console.log(res);
      const tasks = res.tasks.reverse();
      dispatch(setTasksAction({ tasks: tasks }));
      dispatch(setErrorAction({ error: undefined }));
    } catch (e: any) {
      dispatch(setErrorAction({ error: e }));
      console.log('Error:', e);
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const deleteTasksAsyncAction = createAsyncThunk<
  void,
  IDeleteTasksAsyncAction
>(
  'tasks/deleteTasksAsyncAction',
  async (
    { projectId, taskId, onSuccess }: IDeleteTasksAsyncAction,
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await deleteTasksApi(projectId, taskId);
      console.log('delete task', res);
      const tasks = res.tasks.reverse();
      dispatch(tasksAsyncAction({ projectId }));
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

export const updateTasksAsyncAction = createAsyncThunk<
  void,
  IUpdateTasksAsyncAction
>(
  'tasks/updateTasksAsyncAction',
  async (
    {
      projectId,
      taskId,
      title,
      description,
      status,
      type,
      user,
      files,
      onSuccess,
    }: IUpdateTasksAsyncAction,
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await updateTasksApi(
        projectId,
        taskId,
        title,
        description,
        status.id,
        type.id,
        user.id,
        files
      );
      console.log('update tasks', res);
      dispatch(tasksAsyncAction({ projectId }));
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

export const createTasksAsyncAction = createAsyncThunk<
  void,
  ICreateTasksAsyncAction
>(
  'tasks/createTasksAsyncAction',
  async (
    {
      projectId,
      title,
      description,
      status,
      type,
      user,
      files,
      onSuccess,
    }: ICreateTasksAsyncAction,
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await createTasksApi(
        projectId,
        title,
        description,
        status.id,
        type.id,
        user.id,
        files
      );
      console.log(res);
      dispatch(tasksAsyncAction({ projectId }));
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
