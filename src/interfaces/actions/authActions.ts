import { TUserRole } from '..';

export interface ISetAccessTokenAction {
  accessToken: string | undefined;
}

export interface ISetLoadingAction {
  loading: boolean;
}

export interface ISignInAsyncAction {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface ISignUpAsyncAction {
  email: string;
  name: string;
  role: TUserRole;
  password: string;
  avatar: File | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
