import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../utils";
import client from "../../interceptor/connectGRaphql";
import { Stack } from "@mui/system";
import { Popover } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { GetCurrentUserQuery } from "../../generated/graphql";

const MENU_OPTIONS = [
  {
    label: "My Post",
    linkTo: "/my-posts"
  }
];

export default function AccountMenu({ user }: { user: GetCurrentUserQuery }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    deleteToken("token");
    client.clearStore();
    navigate("/login");
  };
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img src="/logo192" alt="user-logo" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            overflow: "inherit"
          }
        }}
        open={Boolean(open)}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {user?.getCurrentUser && (
            <>
              <Typography variant="subtitle2" noWrap>
                {capitalizeFirstLetter(user?.getCurrentUser?.firstName)}{" "}
                {capitalizeFirstLetter(user?.getCurrentUser?.lastName)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {user?.getCurrentUser?.email}
              </Typography>
            </>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </React.Fragment>
  );
}
