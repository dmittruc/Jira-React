import { Button, Checkbox, CircularProgress, TextField } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { TUserRole } from '../../interfaces';
import styles from './CommentEditorPage.module.css';

const EMPTY_PHOTO_URL =
  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('admin@gmail.com');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('Password12345');
  const [repeatPassword, setRepeatPassword] = useState<string>('Password12345');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarUrl = useMemo(() => {
    return avatar ? URL.createObjectURL(avatar) : EMPTY_PHOTO_URL;
  }, [avatar]);

  const navigate = useNavigate();

  const goToProjects = useCallback(() => {
    navigate('/projects');
  }, []);

  const goToSignIn = useCallback(() => {
    navigate('/sign-in');
  }, []);

  useEffect(() => {
    console.log(isAdmin);
  }, [isAdmin]);

  const { signUp, loading } = useAuth();

  const isValid = useMemo<boolean>(() => {
    return (
      email.includes('@') && password.length > 6 && password === repeatPassword
    );
  }, [email, password, repeatPassword]);

  const onSuccess = useCallback(() => {
    goToProjects();
  }, []);

  const onError = useCallback((e: any) => {
    alert('ошибка');
  }, []);

  const handleSignUp = useCallback(() => {
    const role: TUserRole = isAdmin ? 'ADMIN' : 'USER';
    signUp(email, name, password, role, avatar, onSuccess, onError);
  }, [email, name, password, avatar, onSuccess, onError, isAdmin]);

  const handleChangeRole = () => {
    setIsAdmin((isAdmin) => !isAdmin);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        setAvatar(file);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3>sign up page</h3>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      {avatar && <img src={avatarUrl} />}
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
        placeholder="name"
        className={styles.input}
        value={name}
        type="text"
        onChange={(e) => {
          setName(e.target.value);
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
      <TextField
        placeholder="password"
        className={styles.input}
        value={repeatPassword}
        type="password"
        onChange={(e) => {
          setRepeatPassword(e.target.value);
        }}
      />
      <Button onClick={handleSignUp} disabled={!isValid || loading}>
        sign up
      </Button>
      <Button onClick={goToSignIn}>go to sign in</Button>
      <Checkbox onClick={handleChangeRole} />
      {loading && <CircularProgress />}
    </div>
  );
};

export default SignUpPage;
