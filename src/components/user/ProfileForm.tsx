import { ApolloQueryResult } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { GetCurrentUserQuery, UpdateUserInput, useUpdateUserMutation } from '../../generated/graphql';
import { ProfileSchema } from '../../utils/hookForm';
import CustomController from '../CustomControllerTextField';

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
  const method = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues
  });

  const { handleSubmit, watch } = method;
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
    <FormProvider {...method}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <CustomController
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              type="text"
            />
            <CustomController label="Last Name" name="lastName" placeholder="Enter last name" type="text" />
          </Stack>
          <CustomController
            label="Email"
            name="email"
            placeholder="Enter email address"
            type="text"
            disable={true}
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
    </FormProvider>
  );
};

export default ProfileForm;
