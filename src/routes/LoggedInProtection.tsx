/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils';
import { useMemo } from 'react';

const LoggedInProtection = ({ redirectTo }: { redirectTo: string }) => {
  const isAuthenticated = getToken('token');

  const Element = useMemo(() => {
    if (isAuthenticated) {
      return <Outlet />;
    } else {
      return <Navigate to={redirectTo} />;
    }
  }, [isAuthenticated, redirectTo]);

  return Element;
};

export default LoggedInProtection;