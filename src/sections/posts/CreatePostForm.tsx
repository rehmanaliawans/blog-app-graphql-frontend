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
import React, { useState } from "react";
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

const FileLabel = styled("label")(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  width: "8rem",
  textAlign: "center"
}));
const CreatePostForm = () => {
  const [fileLoading, setFileLoading] = useState(false);
  const [createUserPostMutation, { data, error, reset }] =
    useCreateUserPostMutation({
      onCompleted: (data) => {
        if (data.createUserPost.status === 200) {
          setFileLoading(false);

          setValue("title", "");
          setValue("description", "");
          setValue("file", [{ name: "" }]);
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
      .min(3, "Minimum 3 characters required"),
    file: Yup.mixed()
  });
  const defaultValues = {
    title: "",
    description: "",
    file: [
      {
        name: ""
      }
    ]
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const onSubmit = async (data: {
    title: string;
    description: string;
    file: any;
  }) => {
    console.log(data);
    let postData: CreatePostInput = {
      title: data.title,
      description: data.description
    };
    if (data?.file !== null) {
      console.log("call");
      setFileLoading(true);
      const fileData = new FormData();
      fileData.append("file", data?.file[0]!);
      fileData.append("upload_preset", "Blog_post");
      fileData.append("cloud_name", "dxxv034dh");

      const result = await fetch(
        "https://api.cloudinary.com/v1_1/dxxv034dh/image/upload",
        {
          method: "POST",
          body: fileData
        }
      );
      if (result) {
        console.log(result.url);
        postData = {
          ...postData,
          attachmentUrl: JSON.stringify(result.url)
        };
        console.log("Upload", JSON.stringify(postData));
      }
    }

    createUserPostMutation({
      variables: {
        createPostInput: postData
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
          helperText={errors.description && errors.description.message}
          {...register("description")}
        />

        <FileLabel htmlFor="fileupload" style={{ cursor: "pointer" }}>
          Attached file
        </FileLabel>
        {watch("file")[0].name !== "" && (
          <Typography variant="caption">{watch("file")[0].name}</Typography>
        )}

        <input
          type="file"
          id="fileupload"
          {...register("file")}
          style={{ display: "none" }}
          accept="image/*"
        />

        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={fileLoading}
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
