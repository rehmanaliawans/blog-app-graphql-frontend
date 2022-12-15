/* eslint-disable react/prop-types */
import { useLazyQuery } from "@apollo/client";
import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { deleteToken, getToken } from "../utils";

const LoggedInProtection = ({
  children,
  redirectTo
}: {
  children: JSX.Element | null;
  redirectTo: string;
}) => {
  const isAuthenticated = getToken("token");

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default LoggedInProtection;
