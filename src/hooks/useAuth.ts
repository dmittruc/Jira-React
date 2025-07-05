// зарегать, залогинить, разлогинить,
// достать аксесс токен и достать поле авторизован ли пользователь

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TRootState } from '../store';
import {
  setAccessTokenAction,
  signInAsyncAction,
  signUpAsyncAction,
} from '../store/actions/authActions';
import { TUserRole } from '../interfaces';

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<TAppDispatch>();

  const accessToken = useSelector<TRootState, string | undefined>(
    (state: TRootState) => state.auth.accessToken
  );

  const isAuth = useMemo(() => {
    const isAccessToken = !!accessToken;
    return isAccessToken;
  }, [accessToken]);

  const signIn = (
    email: string,
    password: string,
    onSuccess: () => void,
    onError: (e: any) => void
  ) => {
    const onSuccessCallback = () => {
      setTimeout(() => {
        onSuccess();
        setLoading(false);
      }, 2000);
    };
    const onErrorCallback = (e: any) => {
      setTimeout(() => {
        onError(e);
        setLoading(false);
      }, 2000);
    };
    setLoading(true);
    dispatch(
      signInAsyncAction({
        email,
        password,
        onSuccess: onSuccessCallback,
        onError: onErrorCallback,
      })
    );
  };

  const signUp = (
    email: string,
    name: string,
    password: string,
    role: TUserRole,
    avatar: File | null,
    onSuccess: () => void,
    onError: (e: any) => void
  ) => {
    const onSuccessCallback = () => {
      setTimeout(() => {
        onSuccess();
        setLoading(false);
      }, 2000);
    };
    const onErrorCallback = (e: any) => {
      setTimeout(() => {
        onError(e);
        setLoading(false);
      }, 2000);
    };
    setLoading(true);
    dispatch(
      signUpAsyncAction({
        email,
        name,
        password,
        role,
        avatar,
        onSuccess: onSuccessCallback,
        onError: onErrorCallback,
      })
    );
  };

  const logOut = (onSuccess: () => void) => {
    dispatch(setAccessTokenAction({ accessToken: undefined }));
    onSuccess();
  };

  return { accessToken, isAuth, signIn, signUp, logOut, loading };
};

export default useAuth;
