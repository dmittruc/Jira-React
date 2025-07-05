import { createReducer } from '@reduxjs/toolkit';
import { IAuthReducerState } from '../../interfaces/reducers/authReducer';
import { setAccessTokenAction, setLoadingAction } from '../actions/authActions';

const initialState: IAuthReducerState = {
  accessToken: undefined,
  loading: false,
};

const authReducer = createReducer<IAuthReducerState>(
  initialState,
  (builder) => {
    builder
      .addCase(setAccessTokenAction, (store, { payload: { accessToken } }) => ({
        ...store,
        accessToken: accessToken,
      }))
      .addCase(setLoadingAction, (store, { payload: { loading } }) => ({
        ...store,
        loading: loading,
      }));
  }
);

export default authReducer;
