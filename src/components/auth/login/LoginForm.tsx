import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Link, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LoginUserInput, useLoginMutation } from '../../../generated/graphql';
import { saveToken } from '../../../utils';
import { LoginSchema } from '../../../utils/hookForm';
import CustomController from '../../CustomControllerTextField';

const LoginForm = () => {
  const navigate = useNavigate();

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

  const method = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });
  const { handleSubmit } = method;

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
    <FormProvider {...method}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <CustomController label="email" name="email" placeholder="Enter email address" type="text" />
          <CustomController label="Password" name="password" placeholder="Enter password" type="password" />
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
    </FormProvider>
  );
};

export default LoginForm;
