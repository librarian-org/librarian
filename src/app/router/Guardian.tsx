import React, { useEffect } from 'react';
import { useAuth } from '../hooks/auth';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const Guardian: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return !user ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default Guardian;
