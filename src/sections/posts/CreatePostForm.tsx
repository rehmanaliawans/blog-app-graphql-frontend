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
  const [image, setImage] = useState([]);
  const [createUserPostMutation, { data, error, reset }] =
    useCreateUserPostMutation({
      onCompleted: (data) => {
        if (data.createUserPost.status === 200) {
          setFileLoading(false);

          setValue("title", "");
          setValue("description", "");
          setValue("file", []);
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
    file: []
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

  const onSubmit = async (data: { title: string; description: string }) => {
    console.log(data);
    let postData: CreatePostInput = {
      title: data.title,
      description: data.description
    };
    if (image.length > 0) {
      console.log("call", image, image[0]);
      // setFileLoading(true);
      const fileData = new FormData();
      fileData.append("file", image[0]);
      fileData.append("upload_preset", "Blog_post");
      fileData.append("cloud_name", "dxxv034dh");
      console.log("================================", fileData);
      fetch("https://api.cloudinary.com/v1_1/dxxv034dh/image/upload", {
        method: "POST",
        body: fileData
      })
        .then((res) => res.json())
        .then((data) => {
          postData = {
            ...postData,
            attachmentUrl: data.url
          };
          createUserPostMutation({
            variables: {
              createPostInput: postData
            }
          });
        })
        .catch((err) => console.log(err));
    } else {
      createUserPostMutation({
        variables: {
          createPostInput: postData
        }
      });
    }
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

        <input
          type="file"
          id="fileupload"
          onChange={(e) => {
            setImage(e.target.files as unknown as []);
          }}
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
