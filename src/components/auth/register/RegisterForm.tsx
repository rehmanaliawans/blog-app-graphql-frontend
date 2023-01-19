import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
      saveToken(signUp.access_token, 'token');
      navigate('/', { replace: true });
    },
    onError: (err) => toast.error(err.message)
  });

  const defaultValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            render={({ field }) => (
              <TextField
                label="First name"
                placeholder="Enter first name"
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName && errors.firstName.message}
              />
            )}
            name="firstName"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                label="Last name"
                placeholder="Enter last name"
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName && errors.lastName.message}
              />
            )}
            name="lastName"
            control={control}
          />
        </Stack>

        <Controller
          render={({ field }) => (
            <TextField
              label="Email address"
              placeholder="Enter email address"
              {...field}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
          )}
          name="email"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Enter Password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              {...field}
              helperText={errors.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
          name="password"
          control={control}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
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
