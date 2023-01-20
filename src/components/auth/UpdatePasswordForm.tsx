import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUpdatePasswordMutation } from '../../generated/graphql';
import { updateSPasswordSchema } from '../../utils/hookForm';
import CustomController from '../CustomControllerTextField';

const UpdatePasswordForm = ({ userKey }: { userKey: string }) => {
  const navigate = useNavigate();

  const [updatePasswordMutation, { loading, error }] = useUpdatePasswordMutation({
    onCompleted(data) {
      toast.success('Password updated successfully');
      navigate('/login', { replace: true });
    },
    onError: (err) => toast.error(err.message)
  });

  const defaultValues = {
    password: '',
    confirmPassword: ''
  };
  const method = useForm({
    resolver: yupResolver(updateSPasswordSchema),
    defaultValues
  });

  const { handleSubmit } = method;
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
    <FormProvider {...method}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <CustomController label="Password" name="password" placeholder="Enter password" type="password" />
          <CustomController
            label="confirm Password"
            name="confirmPassword"
            placeholder="Enter confirm password"
            type="password"
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
    </FormProvider>
  );
};

export default UpdatePasswordForm;
