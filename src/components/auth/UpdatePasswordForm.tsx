import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUpdatePasswordMutation } from '../../generated/graphql';
import { updateSPasswordSchema } from '../../utils/hookForm';

const UpdatePasswordForm = ({ userKey }: { userKey: string }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [updatePasswordMutation, { loading, error }] = useUpdatePasswordMutation({
    onCompleted(data) {
      toast.success("Password updated successfully");
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(err.message)
  });

  const defaultValues = {
    password: "",
    confirmPassword: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(updateSPasswordSchema),
    defaultValues
  });

  const onSubmit = async (data: { password: string }) => {
    if (!!userKey) {
      updatePasswordMutation({
        variables: {
          passwordUpdateInput: {
            password: data.password,
            userKey: userKey
          }
        }
      });
    }
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="New password"
          placeholder="Enter new password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          type={showPassword ? "text" : "password"}
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
        <TextField
          label="confirm password"
          placeholder="Enter confirm password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          type={showPassword ? "text" : "password"}
        />

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" loading={loading}>
          Update
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

export default UpdatePasswordForm;
