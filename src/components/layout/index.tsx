import { styled } from '@mui/material/styles';
import React, { memo, useCallback, useContext, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ChatPopup from './ChatPopup';
import NavBar from './NavBar';
import { GlobalContext } from '../../context';
import { ActionTypes } from '../../context/appReduced';
import { useGetCurrentUserQuery } from '../../generated/graphql';
import { deleteToken } from '../../utils';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const MainStyle = styled('div')(({ theme }) => ({
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingRight: theme.spacing(2)
  }
}));

const PageLayout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);

  const { data, loading, error } = useGetCurrentUserQuery();

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const handleRequest = useCallback(() => {
    if (data && !loading) {
      const { id, firstName, lastName, email } = data?.getCurrentUser;
      dispatch({
        type: ActionTypes.SET_USER,
        user: {
          id,
          firstName,
          lastName,
          email
        }
      });
    }
  }, [data, dispatch, loading]);

  useEffect(() => {
    if (error) {
      deleteToken('token');
      navigateRef.current('/login');
    }
  }, [error]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);
  return (
    <RootStyle>
      <NavBar />
      <MainStyle>
        <Outlet />
      </MainStyle>
      <ChatPopup />
    </RootStyle>
  );
};
export default memo(PageLayout);
