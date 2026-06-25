import { useSelector, useDispatch } from 'react-redux';
import { logout, clearError } from '@store/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, initialized } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());
  const handleClearError = () => dispatch(clearError());

  return { user, loading, error, initialized, logout: handleLogout, clearError: handleClearError };
};

export default useAuth;
