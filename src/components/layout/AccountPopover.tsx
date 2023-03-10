import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { UserType } from '../../context/interface';
import client from '../../interceptor/connectGraphql';
import { deleteToken } from '../../utils';

const MENU_OPTIONS = [
  {
    label: 'Profile',
    linkTo: '/profile'
  },
  {
    label: 'My Post',
    linkTo: '/my-posts'
  }
];

export default function AccountMenu({ user }: { user: UserType }) {
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
    deleteToken('token');
    client.clearStore();
    navigate('/login');
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <img src="/logo192" alt="user-logo" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Popover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            overflow: 'inherit'
          }
        }}
        open={Boolean(open)}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75
          }
        }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {!!user && (
            <>
              <Typography variant="subtitle2" noWrap>
                {capitalizeFirstLetter(user?.firstName)} {capitalizeFirstLetter(user?.lastName)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {user?.email}
              </Typography>
            </>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </React.Fragment>
  );
}
