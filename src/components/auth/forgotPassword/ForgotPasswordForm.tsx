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

const ForgotPasswordForm = ({
  setUserKey
}: {
  setUserKey: (value: string) => void;
}) => {
  const [forgotPasswordMutation, { data, loading, error }] =
    useForgotPasswordMutation({
      onCompleted: ({ forgotPassword }) => {
        setUserKey(forgotPassword.userKey);
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
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
        />
        <LoadingButton
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
          loading={loading}
        >
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
