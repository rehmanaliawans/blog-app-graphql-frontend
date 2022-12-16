import { AppBar, Box, Button, Stack, styled, Toolbar } from "@mui/material";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteToken } from "../../utils";
import client from "../../interceptor/connectGRaphql";

const APPBAR_MOBILE = 44;
const APPBAR_DESKTOP = 62;
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
    padding: theme.spacing(0, 5)
  }
}));
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
          <Button variant="text" component={RouterLink} to="/" size="large">
            Home
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/* {pathname !== "/dashboard/contents" && ( */}
          <Button variant="outlined" component={RouterLink} to="/create-post">
            Create Post
          </Button>
          {/* )} */}

          <LogoutIcon
            color="primary"
            sx={{ cursor: "pointer" }}
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
