import React from "react";
import { useRoutes } from "react-router-dom";
import PageLayout from "../components/layout";
import ForgotPassword from "../Pages/ForgotPassword";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Page404 from "../Pages/Page404";
import Register from "../Pages/Register";
import UpdatePassword from "../Pages/UpdatePassword";
import LoggedInProtection from "./LoggesInProtection";
import LoggedOutProtection from "./LogggedOutProtection";

export default function Router() {
  return useRoutes([
    {
      path: "/login",
      element: (
        <LoggedOutProtection redirectTo="/">
          <Login />
        </LoggedOutProtection>
      )
    },
    {
      path: "/register",
      element: (
        <LoggedOutProtection redirectTo="/">
          <Register />
        </LoggedOutProtection>
      )
    },
    {
      path: "/forgot-password",
      element: (
        <LoggedOutProtection redirectTo="/">
          <ForgotPassword />
        </LoggedOutProtection>
      )
    },
    {
      path: "/update-password",
      element: (
        <LoggedOutProtection redirectTo="/">
          <UpdatePassword />
        </LoggedOutProtection>
      )
    },
    {
      path: "/",
      element: (
        <LoggedInProtection redirectTo="/login">
          <PageLayout />
        </LoggedInProtection>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />
        }
      ]
    },
    {
      path: "*",
      element: <Page404 />
    }
  ]);
}
