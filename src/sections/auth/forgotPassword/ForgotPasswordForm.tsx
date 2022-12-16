import { LoadingButton } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  ForgotPasswordMutationVariables,
  useForgotPasswordMutation
} from "../../../generated/graphql";

const ForgotPasswordForm = () => {
  const [forgotPasswordMutation, { data, loading, error }] =
    useForgotPasswordMutation({
      onCompleted: (data) => {
        console.log("data", data);
      }
    });

  const ForgotSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required")
  });
  const defaultValues = {
    email: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ForgotSchema),
    defaultValues
  });

  const onSubmit = async (data: ForgotPasswordMutationVariables) => {
    console.log("call", data);
    forgotPasswordMutation({
      variables: {
        email: data.email
      }
    });
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="Email address"
          placeholder="Enter email address"
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email && errors.email.message}
        />
        {data?.forgotPassword.userKey ? (
          <Typography variant="caption" align="right">
            <Link
              variant="subtitle2"
              component={RouterLink}
              to={`/update-password?userKey=${data?.forgotPassword.userKey}`}
            >
              Click here to change your password
            </Link>
          </Typography>
        ) : (
          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Send Request
          </LoadingButton>
        )}
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
