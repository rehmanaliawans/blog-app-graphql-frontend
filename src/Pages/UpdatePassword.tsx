import { Container, Link, Typography } from "@mui/material";
import React from "react";
import Page from "../components/Page";
import { ForgotRootStyle } from "../styledComponent";
import { Link as RouterLink } from "react-router-dom";
import { UpdatePasswordForm } from "../components/auth";
const UpdatePassword = () => {
  return (
    <Page title="Update Password">
      <ForgotRootStyle>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom color="primary">
            Update Password
          </Typography>
          <UpdatePasswordForm />
          <Typography variant="body2" align="right" sx={{ mt: 2 }}>
            Want to login?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              click here
            </Link>
          </Typography>
        </Container>
      </ForgotRootStyle>
    </Page>
  );
};

export default UpdatePassword;
