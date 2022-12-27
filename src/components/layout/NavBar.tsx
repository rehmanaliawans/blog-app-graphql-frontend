import { AppBar, Box, Button, Stack, styled, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteToken } from "../../utils";
import client from "../../interceptor/connectGraphql";
import AccountPopover from "./AccountPopover";
import { useGetCurrentUserQuery } from "../../generated/graphql";
import { useGlobalContext } from "../../context";

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: "transparent",
  borderBottom: "1px solid #ccc",
  height: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    width: `calc(100%)`,
    height: APPBAR_DESKTOP
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 2)
  }
}));

const HomeButton = styled(RouterLink)(({ theme }) => ({
  fontSize: "25px",
  textDecoration: "none",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px"
  }
}));
const LogoutIconButton = styled(LogoutIcon)(({ theme }) => ({
  cursor: "pointer",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setUserId } = useGlobalContext();
  const { data, loading, error } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data && !loading) {
      setUserId(data?.getCurrentUser?.id);
    }
    if (error) {
      deleteToken("token");
      navigate("/login");
    }
  }, [loading]);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ display: "inline-flex" }}>
          <HomeButton to="/">Blog App</HomeButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {pathname !== "/create-post" && (
            <Button
              variant="outlined"
              size="small"
              component={RouterLink}
              to="/create-post"
            >
              Create Post
            </Button>
          )}
          <AccountPopover user={data!} />

          <LogoutIconButton
            color="primary"
            onClick={async () => {
              deleteToken("token");
              await client.clearStore();
              navigate("/login");
            }}
          />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default NavBar;
