import { Button, CircularProgress, TextField } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './CommentEditorPage.module.css';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('admin@gmail.com');
  const [password, setPassword] = useState<string>('Password12345');
  const { signIn, loading } = useAuth();

  const navigate = useNavigate();

  const goToProjects = useCallback(() => {
    navigate('/projects');
  }, []);

  const goToSignUp = useCallback(() => {
    navigate('/sign-up');
  }, []);

  const isValid = useMemo<boolean>(() => {
    return email.includes('@') && password.length > 6;
  }, [email, password]);

  const onSuccess = useCallback(() => {
    goToProjects();
  }, []);

  const onError = useCallback((e: any) => {
    alert('ошибка');
  }, []);

  const handleSignIn = useCallback(() => {
    signIn(email, password, onSuccess, onError);
  }, [email, password, onSuccess, onError]);

  return (
    <div className={styles.container}>
      <h3>sign in page</h3>
      <TextField
        placeholder="email"
        className={styles.input}
        value={email}
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        placeholder="password"
        className={styles.input}
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button onClick={handleSignIn} disabled={!isValid || loading}>
        sign in
      </Button>
      <Button onClick={goToSignUp}>go to sign up</Button>
      {loading && <CircularProgress />}
    </div>
  );
};

export default SignInPage;
