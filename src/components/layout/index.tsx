import { styled } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';

import ChatPopup from './ChatPopup';
import NavBar from './NavBar';

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
    paddingRight: theme.spacing(2)
  }
}));

const ChatBoxStyle = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: "10px"
}));

const PageLayout = () => {
  return (
    <RootStyle>
      <NavBar />
      <MainStyle>
        <Outlet />
      </MainStyle>
      <ChatBoxStyle>
        <ChatPopup />
      </ChatBoxStyle>
    </RootStyle>
  );
};
export default PageLayout;
