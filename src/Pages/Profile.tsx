import React from "react";
import Page from "../components/Page";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useGetCurrentUserQuery } from "../generated/graphql";
import ProfileForm from "../sections/user/ProfileForm";

const Profile = () => {
  const { data, refetch: refetchUser } = useGetCurrentUserQuery();

  return (
    <Page title="Profile">
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
    </Page>
  );
};

export default Profile;
