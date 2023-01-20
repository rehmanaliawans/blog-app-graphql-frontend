import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CreateUserInput, useSignupMutation } from '../../../generated/graphql';
import { saveToken } from '../../../utils';
import { RegisterSchema } from '../../../utils/hookForm';
import CustomController from '../../CustomControllerTextField';

const RegisterForm = () => {
  const navigate = useNavigate();

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
  const method = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  });

  const { handleSubmit } = method;
  const onSubmit = async (data: CreateUserInput) => {
    signupMutation({
      variables: {
        signUpUserInput: data
      }
    });
  };

  return (
    <FormProvider {...method}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <CustomController
              label="First name"
              name="firstName"
              placeholder="Enter first name"
              type="text"
            />
            <CustomController label="Last Name" name="lastName" placeholder="Enter last name" type="text" />
          </Stack>

          <CustomController label="email" name="email" placeholder="Enter email address" type="text" />
          <CustomController label="Password" name="password" placeholder="Enter password" type="password" />

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
    </FormProvider>
  );
};

export default RegisterForm;
