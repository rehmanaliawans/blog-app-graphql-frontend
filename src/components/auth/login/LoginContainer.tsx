import { Link as RouterLink } from "react-router-dom";
import { Link, Container, Typography } from "@mui/material";
import {
  ContentStyle,
  RootStyle,
  SectionStyle
} from "../../../styledComponent";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  return (
    <RootStyle>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src="/images/login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Enter your details below.
          </Typography>

          <LoginForm />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don’t have an account? {""}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default LoginContainer;
