import React from "react";
import { useRoutes } from "react-router-dom";
import PageLayout from "../components/layout";
import CreatePost from "../Pages/CreatePost";
import ForgotPassword from "../Pages/ForgotPassword";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Page404 from "../Pages/Page404";
import Register from "../Pages/Register";
import LoggedInProtection from "./LoggedInProtection";
import LoggedOutProtection from "./LoggedOutProtection";
import GetSinglePost from "../Pages/GetSinglePost";
import MyPosts from "../Pages/MyPosts";
import Profile from "../Pages/Profile";

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
        },
        {
          path: "/create-post",
          element: <CreatePost />
        },
        {
          path: "/my-posts",
          element: <MyPosts />
        },
        {
          path: "/get-post/:id",
          element: <GetSinglePost />
        },
        {
          path: "/profile",
          element: <Profile />
        }
      ]
    },
    {
      path: "*",
      element: <Page404 />
    }
  ]);
}
