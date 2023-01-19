import { ApolloQueryResult } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { GetCurrentUserQuery, UpdateUserInput, useUpdateUserMutation } from '../../generated/graphql';
import { ProfileSchema } from '../../utils/hookForm';

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
      toast.success('Profile updated successfully!');

      setBtnDisabled(true);
      refetchUser();
    },
    onError: (error) => toast.error(error.message)
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

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
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues
  });

  const [firstName, lastName] = watch(['firstName', 'lastName']);

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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            render={({ field }) => (
              <TextField
                label="First name"
                placeholder="Enter first name"
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName && errors.firstName.message}
              />
            )}
            name="firstName"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                label="Last name"
                placeholder="Enter last name"
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName && errors.lastName.message}
              />
            )}
            name="lastName"
            control={control}
          />
        </Stack>
        <Controller
          render={({ field }) => (
            <TextField
              label="email"
              placeholder="enter email address"
              {...field}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              disabled={true}
            />
          )}
          name="email"
          control={control}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size="medium"
            type="submit"
            sx={{ width: '7rem' }}
            variant="contained"
            disabled={btnDisabled}>
            Update
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProfileForm;
