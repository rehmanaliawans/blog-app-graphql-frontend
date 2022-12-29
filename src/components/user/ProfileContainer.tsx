import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import ProfileForm from "./ProfileForm";
import { useGetCurrentUserQuery } from "../../generated/graphql";

const ProfileContainer = () => {
  const { data, refetch: refetchUser } = useGetCurrentUserQuery();

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 1 }} color="primary">
        Profile
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={6} sx={{ width: "80vw", padding: "2rem 1rem" }}>
          {data && (
            <ProfileForm profileData={data!} refetchUser={refetchUser} />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileContainer;
