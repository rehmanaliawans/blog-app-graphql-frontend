import { Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ForgotRootStyle } from "../../../styledComponent";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPasswordContainer = () => {
  return (
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
  );
};

export default ForgotPasswordContainer;
