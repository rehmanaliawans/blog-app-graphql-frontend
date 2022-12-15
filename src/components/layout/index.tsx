import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

const APP_BAR_MOBILE = 0;
const APP_BAR_DESKTOP = 0;

const RootStyle = styled("div")({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#fff"
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
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};
export default PageLayout;
