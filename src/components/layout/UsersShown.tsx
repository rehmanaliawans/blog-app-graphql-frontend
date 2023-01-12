import { Avatar, Box, Grid, styled, Typography } from '@mui/material';
import React from 'react';

import { Notification } from '../../interface';

const AvatarIcon = styled(Avatar)(({ index }: { index: number }) => ({
  backgroundColor: index % 2 === 0 ? "#5c7c8b" : "#029489",
  width: "35px",
  height: "35px"
}));
const DateTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.success.dark,
  position: "relative"
}));
const NotificationDiv = styled(Typography)(({ theme }) => ({
  color: "#fff",
  position: "relative",
  backgroundColor: theme.palette.success.dark,
  borderRadius: "50%",
  padding: "0px 6px"
}));
const UsersShown = ({
  name,
  id,
  handleUserCall,
  notification
}: {
  name: string;
  id: string;
  handleUserCall: (id: string) => void;
  notification?: Notification;
}) => {
  console.log("notifaciton get", notification);
  return (
    <Grid
      container
      wrap="nowrap"
      spacing={1}
      p={2}
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer", borderBottom: "1px solid grey" }}
      onClick={() => handleUserCall(id)}
    >
      <Grid item>
        <AvatarIcon index={1}>{name.slice(0, 1).toUpperCase()}</AvatarIcon>
      </Grid>

      <Grid justifyContent="left" item xs zeroMinWidth>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ minWidth: "100%", marginRight: "10px", width: "fit-content", maxWidth: "15rem" }}
        >
          <Typography
            variant="body1"
            sx={{
              lineBreak: "anywhere",
              color: "#000",
              borderRadius: "5px",
              padding: "10px"
            }}
          >
            {name}
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            {!!notification?.status && (
              <NotificationDiv variant="caption">{notification?.count}</NotificationDiv>
            )}
            <DateTypography variant="body1">online</DateTypography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UsersShown;
