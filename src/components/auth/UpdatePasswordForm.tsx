import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUpdatePasswordMutation } from "../../generated/graphql";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [updatePasswordMutation, { data, loading, error }] =
    useUpdatePasswordMutation({
      onCompleted(data) {
        if (data.updatePassword.status === 200) {
          setSearchParams(undefined);
        }
      },
      onError: (err) => toast.error(err.message)
    });
  const updateSPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()"'.,<>;:`~|?-_]))(?=.{8,})/,
        "Must contain 8 characters, one small letter,one capital letter, one number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Password does not match")
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
    if (searchParams.get("userKey")) {
      updatePasswordMutation({
        variables: {
          passwordUpdateInput: {
            password: data.password,
            userKey: searchParams?.get("userKey")!
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
          error={errors.password ? true : false}
          helperText={errors.password && errors.password.message}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
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
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          type={showPassword ? "text" : "password"}
        />

        {data?.updatePassword.status === 200 ? (
          <Typography variant="caption" color="success">
            {data.updatePassword.message}
          </Typography>
        ) : (
          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Update
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

export default UpdatePasswordForm;
