import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface IProps {
  children: any;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
