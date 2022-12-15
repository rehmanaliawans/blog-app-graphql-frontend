import React from "react";
import { useRoutes } from "react-router-dom";
import PageLayout from "../components/layout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Page404 from "../Pages/Page404";
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
      path: "/",
      element: <PageLayout />,
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
