import { ApolloQueryResult } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { GetCurrentUserQuery, UpdateUserInput, useUpdateUserMutation } from '../../generated/graphql';

const ProfileForm = ({
  profileData,
  refetchUser
}: {
  profileData: GetCurrentUserQuery;
  refetchUser: () => Promise<ApolloQueryResult<GetCurrentUserQuery>>;
}) => {
  const { firstName: pFirstName, lastName: pLastName, email, id } = profileData.getCurrentUser;
  const [updateUserMutation] = useUpdateUserMutation({
    onCompleted: (data) => {
      toast.success("Profile updated successfully!");

      setBtnDisabled(true);
      refetchUser();
    },
    onError: (error) => toast.error(error.message)
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required").min(3, "Minimum 3 characters"),
    lastName: Yup.string().required("Last name required").min(3, "Minimum 3 characters"),
    email: Yup.string().email("Email must be a valid email address").required("Email is required")
  });
  const defaultValues = {
    email: email,
    firstName: pFirstName,
    lastName: pLastName,
    id: id
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  });

  const [firstName, lastName] = watch(["firstName", "lastName"]);

  useEffect(() => {
    if (firstName.trim() !== pFirstName || lastName.trim() !== pLastName) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [firstName, lastName, pFirstName, pLastName]);

  const onSubmit = async (data: UpdateUserInput) => {
    data = {
      ...data,
      firstName: data?.firstName?.trim(),
      lastName: data?.lastName?.trim()
    };
    updateUserMutation({
      variables: {
        updateUserInput: data
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="First name"
            placeholder="Enter first name"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
          />
          <TextField
            label="Last name"
            placeholder="Enter last name"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />
        </Stack>

        <TextField
          label="email"
          placeholder="enter email address"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          disabled={true}
        />

        <Stack direction={{ xs: "column", sm: "row" }} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="medium"
            type="submit"
            sx={{ width: "7rem" }}
            variant="contained"
            disabled={btnDisabled}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProfileForm;
