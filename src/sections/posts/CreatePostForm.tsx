import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  InputLabel,
  Stack,
  styled,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreatePostInput,
  useCreateUserPostMutation,
  useFetchAllUserQuery
} from "../../generated/graphql";

const MainBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start"
}));
const CreatePostForm = () => {
  const [createUserPostMutation, { data, loading, error, reset }] =
    useCreateUserPostMutation({
      onCompleted: (data) => {
        if (data.createUserPost.status === 200) {
          setValue("title", "");
          setValue("description", "");
          setTimeout(() => {
            reset();
          }, 3000);
        }
      }
    });
  const LoginSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Minimum 3 characters required"),
    description: Yup.string()
      .required("Description is required")
      .min(3, "Minimum 3 characters required")
  });
  const defaultValues = {
    title: "",
    description: ""
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const onSubmit = async (data: CreatePostInput) => {
    console.log(data);
    createUserPostMutation({
      variables: {
        createPostInput: data
      }
    });
  };
  return (
    <MainBox component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <TextField
          label="Title"
          placeholder="Enter email address"
          size="medium"
          {...register("title")}
          error={errors.title ? true : false}
          helperText={errors.title && errors.title.message}
        />

        <TextField
          placeholder="Enter description"
          label="Description"
          fullWidth
          multiline
          rows={10}
          error={errors.description ? true : false}
          {...register("description")}
          helperText={errors.description && errors.description.message}
        />
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          sx={{ width: { sm: "100%", md: "20%" } }}
        >
          Create
        </LoadingButton>
      </Stack>
      {data?.createUserPost.status === 200 && (
        <Typography variant="caption" mt={1} color="success.main">
          {data.createUserPost.message}
        </Typography>
      )}
      {error && (
        <Typography variant="caption" mt={1} color="error">
          {error.message}
        </Typography>
      )}
    </MainBox>
  );
};

export default CreatePostForm;
