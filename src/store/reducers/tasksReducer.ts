import { createReducer } from '@reduxjs/toolkit';
import { ITask } from '../../interfaces';
import { ITasksReducerState } from '../../interfaces/reducers/tasksReducer';
import { setLoadingAction } from '../actions/authActions';
import { setErrorAction } from '../actions/projectsActions';
import {
  addTasksAction,
  deleteTasksAction,
  setTasksAction,
  updateTasksAction,
} from '../actions/tasksActions';

const initialState: ITasksReducerState = {
  tasks: [],
  loading: false,
  error: undefined,
};

const tasksReducer = createReducer<ITasksReducerState>(
  initialState,
  (builder) =>
    builder
      .addCase(setTasksAction, (store, { payload: { tasks } }) => ({
        ...store,
        tasks: tasks,
      }))
      .addCase(setLoadingAction, (store, { payload: { loading } }) => ({
        ...store,
        loading: loading,
      }))
      .addCase(setErrorAction, (store, { payload: { error } }) => ({
        ...store,
        error: error,
      }))
      .addCase(deleteTasksAction, (store, { payload: { task } }) => ({
        ...store,
        tasks: store.tasks.filter(
          (currentTask: ITask) => currentTask.id !== task.id
        ),
      }))
      .addCase(addTasksAction, (store, { payload: { task } }) => ({
        ...store,
        tasks: [...store.tasks, task],
      }))
      .addCase(updateTasksAction, (store, { payload: { task } }) => ({
        ...store,
        tasks: store.tasks.map((currentTask: ITask) =>
          currentTask.id === task.id ? task : currentTask
        ),
      }))
);

export default tasksReducer;
