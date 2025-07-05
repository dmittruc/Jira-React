import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { signInApi, signUpApi } from '../../api/authApi';
import {
  ISetAccessTokenAction,
  ISetLoadingAction,
  ISignInAsyncAction,
  ISignUpAsyncAction,
} from '../../interfaces/actions/authActions';

export const setAccessTokenAction = createAction<ISetAccessTokenAction>(
  'auth/setAccesTokenAction'
);

export const setLoadingAction = createAction<ISetLoadingAction>(
  'auth/setLoadingAction'
);

export const signInAsyncAction = createAsyncThunk<void, ISignInAsyncAction>(
  'auth/signInAsyncAction',
  async (
    { email, password, onSuccess, onError }: ISignInAsyncAction,
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await signInApi(email, password);
      if (res.token) {
        dispatch(setAccessTokenAction({ accessToken: res.token }));
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log('Error:', e);
      if (onError) {
        onError(e);
      }
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);

export const signUpAsyncAction = createAsyncThunk<void, ISignUpAsyncAction>(
  'auth/signUpAsyncAction',
  async (
    {
      email,
      name,
      password,
      role,
      avatar,
      onSuccess,
      onError,
    }: ISignUpAsyncAction,
    { getState, dispatch }
  ) => {
    try {
      dispatch(setLoadingAction({ loading: true }));
      const res = await signUpApi(email, name, password, role, avatar);
      if (res.token) {
        dispatch(setAccessTokenAction({ accessToken: res.token }));
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log('Error:', e);
      if (onError) {
        onError(e);
      }
    } finally {
      dispatch(setLoadingAction({ loading: false }));
    }
  }
);
