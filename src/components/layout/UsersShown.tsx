import { Avatar, Box, Grid, styled, Typography } from '@mui/material';
import React from 'react';

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
const UsersShown = ({
  name,
  id,
  handleUserCall
}: {
  name: string;
  id: string;
  handleUserCall: (id: string) => void;
}) => {
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
        <AvatarIcon index={1}>Y</AvatarIcon>
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
          <DateTypography variant="body1">online</DateTypography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UsersShown;
