import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import NavBar from "./NavBar";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  justifyContent: "center"
});

const MainStyle = styled("div")(({ theme }) => ({
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2)
  }
}));

const PageLayout = () => {
  return (
    <RootStyle>
      <NavBar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};
export default PageLayout;
