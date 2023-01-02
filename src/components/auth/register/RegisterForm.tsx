import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CreateUserInput, useSignupMutation } from '../../../generated/graphql';
import { saveToken } from '../../../utils';
import { RegisterSchema } from '../../../utils/hookForm';

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
            error={!!errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
          />
          <TextField
            label="Last name"
            placeholder="Enter last name"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />
        </Stack>

        <TextField
          label="Email address"
          placeholder="Enter email address"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
        />

        <TextField
          placeholder="Enter Password"
          label="Password"
          error={!!errors.password}
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
