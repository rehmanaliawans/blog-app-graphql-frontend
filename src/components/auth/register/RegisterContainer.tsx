import { Link as RouterLink } from "react-router-dom";
import { Link, Container, Typography } from "@mui/material";
import {
  ContentStyle,
  RootStyle,
  SectionStyle
} from "../../../styledComponent";
import RegisterForm from "./RegisterForm";

const RegisterContainer = () => {
  return (
    <RootStyle>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 6, mt: 10, mb: 5 }}>
          Get started with register yourself!
        </Typography>
        <img alt="register" src="/images/register.png" />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Enter your details below.
          </Typography>

          <RegisterForm />

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?{" "}
            <Link variant="subtitle2" to="/login" component={RouterLink}>
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
export default RegisterContainer;
