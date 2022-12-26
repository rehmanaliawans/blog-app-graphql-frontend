import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Typography,
  Link
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { saveToken } from "../../utils";
import { useLoginMutation, LoginUserInput } from "../../generated/graphql";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted: ({ login }) => {
      saveToken(login.access_token!, "token");
      navigate("/", { replace: true });
    }
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required")
  });
  const defaultValues = {
    email: "",
    password: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const onSubmit = async (data: LoginUserInput) => {
    loginMutation({
      variables: {
        loginUser: {
          email: data.email,
          password: data.password
        }
      }
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="Email address"
          placeholder="Enter email address"
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email && errors.email.message}
        />

        <TextField
          placeholder="Enter Password"
          label="Password"
          type={showPassword ? "text" : "password"}
          error={errors.password ? true : false}
          {...register("password")}
          helperText={errors.password && errors.password.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 2 }}
      >
        <Link variant="subtitle2" component={RouterLink} to="/forgot-password">
          Forgot Password?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
      >
        Login
      </LoadingButton>

      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default LoginForm;
