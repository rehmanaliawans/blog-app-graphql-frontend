/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getToken } from "../utils";

const LoggedOutProtection = ({
  children,
  redirectTo
}: {
  children: JSX.Element | null;
  redirectTo: string;
}) => {
  const isAuthenticated = getToken("token");

  return !isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default LoggedOutProtection;
