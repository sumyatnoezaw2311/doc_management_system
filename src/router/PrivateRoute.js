import { Navigate, Outlet } from 'react-router-dom';
import { authName } from '../utils/config';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../slices/auth/authSlice';

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const authData = JSON.parse(localStorage.getItem(authName))
  const is_auth = Boolean(authData);

  const getProfileData = async () => {
    is_auth && (await dispatch(getProfile()));
  }; 

  useEffect(() => {
    getProfileData();
  }, []);

  return is_auth ? <Outlet /> : <Navigate to={'/login'} />;

};

export default PrivateRoutes;
