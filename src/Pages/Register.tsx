import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
import Page from "../components/Page";
import { RegisterForm } from "../sections/auth/register";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

export default function Register() {
  return (
    <Page title="Register">
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
    </Page>
  );
}
