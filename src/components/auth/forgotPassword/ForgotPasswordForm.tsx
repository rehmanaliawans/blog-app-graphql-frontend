import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FormProvider, useForm } from 'react-hook-form';

import { ForgotPasswordMutationVariables, useForgotPasswordMutation } from '../../../generated/graphql';
import { ForgotSchema } from '../../../utils/hookForm';
import CustomController from '../../CustomControllerTextField';

const ForgotPasswordForm = ({ setUserKey }: { setUserKey: (value: string) => void }) => {
  const [forgotPasswordMutation, { loading, error }] = useForgotPasswordMutation({
    onCompleted: ({ forgotPassword }) => {
      setUserKey(forgotPassword.userKey);
    }
  });

  const defaultValues = {
    email: ''
  };
  const method = useForm({
    resolver: yupResolver(ForgotSchema),
    defaultValues
  });

  const { handleSubmit } = method;

  const onSubmit = async (data: ForgotPasswordMutationVariables) => {
    forgotPasswordMutation({
      variables: {
        email: data.email
      }
    });
  };
  return (
    <FormProvider {...method}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <CustomController label="email" name="email" placeholder="Enter email address" type="text" />

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
    </FormProvider>
  );
};

export default ForgotPasswordForm;
