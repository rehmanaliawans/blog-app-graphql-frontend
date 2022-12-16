import { Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Page from "../components/Page";
import { ForgotPasswordForm } from "../sections/auth";
import { ForgotRootStyle } from "../styledComponent";

const ForgotPassword = () => {
  return (
    <Page title="Forgot Password">
      <ForgotRootStyle>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom color="primary">
            Forgot Password
          </Typography>

          <ForgotPasswordForm />

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account? {""}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Typography>
        </Container>
      </ForgotRootStyle>
    </Page>
  );
};

export default ForgotPassword;
