import { Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ForgotRootStyle } from "../../../styledComponent";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { useState } from "react";
import UpdatePasswordForm from "../UpdatePasswordForm";

const ForgotPasswordContainer = () => {
  const [userKey, setUserKey] = useState("");
  return (
    <ForgotRootStyle>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom color="primary">
          Forgot Password
        </Typography>
        {!!userKey ? (
          <UpdatePasswordForm userKey={userKey} />
        ) : (
          <ForgotPasswordForm setUserKey={setUserKey} />
        )}

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
