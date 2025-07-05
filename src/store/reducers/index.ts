import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authReducer';
import commentsReducer from './commentsReducer';
import projectsReducer from './projectsReducer';
import tasksReducer from './tasksReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'projects', 'tasks'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  comments: commentsReducer,
});

export default persistReducer(persistConfig, rootReducer);
