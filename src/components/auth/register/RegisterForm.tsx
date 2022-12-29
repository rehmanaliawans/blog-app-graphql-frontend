import * as Yup from "yup";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useSignupMutation, CreateUserInput } from "../../../generated/graphql";
import { saveToken } from "../../../utils";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signupMutation, { loading, error }] = useSignupMutation({
    onCompleted: ({ signUp }) => {
      saveToken(signUp.access_token, "token");
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.message)
  });

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name required")
      .min(3, "Minimum 3 characters"),
    lastName: Yup.string()
      .required("Last name required")
      .min(3, "Minimum 3 characters"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()"'.,<>;:`~|?-_]))(?=.{8,})/,
        "Must contain 8 characters, one small letter,one capital letter, one number and one special case Character"
      )
  });
  const defaultValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  });
  const onSubmit = async (data: CreateUserInput) => {
    signupMutation({
      variables: {
        signUpUserInput: data
      }
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="First name"
            placeholder="Enter first name"
            {...register("firstName")}
            error={errors.firstName ? true : false}
            helperText={errors.firstName && errors.firstName.message}
          />
          <TextField
            label="Last name"
            placeholder="Enter last name"
            {...register("lastName")}
            error={errors.lastName ? true : false}
            helperText={errors.lastName && errors.lastName.message}
          />
        </Stack>

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
          error={errors.password ? true : false}
          {...register("password")}
          helperText={errors.password && errors.password.message}
          type={showPassword ? "text" : "password"}
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Register
        </LoadingButton>
        {error && (
          <Typography variant="caption" color="error">
            {error.message}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default RegisterForm;
