import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';

import { ForgotPasswordMutationVariables, useForgotPasswordMutation } from '../../../generated/graphql';
import { ForgotSchema } from '../../../utils/hookForm';

const ForgotPasswordForm = ({ setUserKey }: { setUserKey: (value: string) => void }) => {
  const [forgotPasswordMutation, { loading, error }] = useForgotPasswordMutation({
    onCompleted: ({ forgotPassword }) => {
      setUserKey(forgotPassword.userKey);
    }
  });

  const defaultValues = {
    email: ''
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(ForgotSchema),
    defaultValues
  });

  const onSubmit = async (data: ForgotPasswordMutationVariables) => {
    forgotPasswordMutation({
      variables: {
        email: data.email
      }
    });
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          render={({ field }) => (
            <TextField
              label="Email Address"
              placeholder="Enter email address"
              {...field}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
          )}
          name="email"
          control={control}
        />

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" loading={loading}>
          Send Request
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

export default ForgotPasswordForm;
