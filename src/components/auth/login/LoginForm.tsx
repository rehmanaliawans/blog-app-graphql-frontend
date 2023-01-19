import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LoginUserInput, useLoginMutation } from '../../../generated/graphql';
import { saveToken } from '../../../utils';
import { LoginSchema } from '../../../utils/hookForm';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted: ({ login }) => {
      saveToken(login.access_token!, 'token');
      navigate('/', { replace: true });
    },
    onError: (err) => toast.error(err.message)
  });

  const defaultValues = {
    email: '',
    password: ''
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
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
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link variant="subtitle2" component={RouterLink} to="/forgot-password">
          Forgot Password?
        </Link>
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
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
