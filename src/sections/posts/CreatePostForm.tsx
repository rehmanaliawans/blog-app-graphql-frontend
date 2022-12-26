import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreatePostInput,
  FetchPostByIdQuery,
  UpdatePostInput,
  useCreateUserPostMutation,
  useUpdateUserPostMutation
} from "../../generated/graphql";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

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

const uploadImage = (image: (string | Blob)[]) => {
  const promise = new Promise((resolve, reject) => {
    const fileData = new FormData();
    fileData.append("file", image[0]);
    fileData.append("upload_preset", "Blog_post");
    fileData.append("cloud_name", "dxxv034dh");

    fetch("https://api.cloudinary.com/v1_1/dxxv034dh/image/upload", {
      method: "POST",
      body: fileData
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data.url);
      })
      .catch((err) => reject(err));
  });
  return promise;
};

const CreatePostForm = ({
  post,
  isEdit,
  setIsEdit
}: {
  post?: FetchPostByIdQuery;
  isEdit: Boolean;
  setIsEdit: (edit: boolean) => void;
}) => {
  const [id, setId] = useSearchParams();
  const [fileLoading, setFileLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();

  const [createUserPostMutation, { reset }] = useCreateUserPostMutation({
    onCompleted: (data) => {
      if (data.createUserPost.status === 200) {
        toast.success(data.createUserPost.message);
        setFileLoading(false);
        setValue("title", "");
        setValue("description", "");
        setValue("file", []);
        setPreviewImage(null);
        setTimeout(() => {
          reset();
        }, 3000);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const [updateUserPostMutation, { reset: UpdateReset }] =
    useUpdateUserPostMutation({
      onCompleted: (data) => {
        if (data.updateUserPost.status === 200) {
          toast.success(data.updateUserPost.message);
          setFileLoading(false);
          setValue("title", "");
          setValue("description", "");
          setValue("file", []);
          setPreviewImage(null);
          setId("id", undefined);
          setIsEdit(false);
          setTimeout(() => {
            UpdateReset();
          }, 3000);
        }
      },
      onError: (err) => {
        toast.error(err.message);
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

  useEffect(() => {
    if (isEdit) {
      setValue("title", post?.fetchPost?.title!);
      setValue("description", post?.fetchPost?.description!);
      setPreviewImage(post?.fetchPost?.attachmentUrl);
    }
  }, [isEdit]);

  const defaultValues = {
    title: "",
    description: "",
    file: []
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

  const onSubmit = async (data: { title: string; description: string }) => {
    let postData: CreatePostInput = {
      title: data.title,
      description: data.description
    };
    let UpdatePostData: UpdatePostInput = {
      title: postData.title,
      description: postData.description,
      postId: ""
    };

    if (image.length > 0) {
      setFileLoading(true);
      const imgUrl = await uploadImage(image);
      if (imgUrl) {
        if (isEdit) {
          UpdatePostData = {
            ...UpdatePostData,
            postId: id.get("id") as string,
            attachmentUrl: imgUrl as string
          };
          updateUserPostMutation({
            variables: {
              updatePostInput: UpdatePostData
            }
          });
        } else {
          postData = {
            ...postData,
            attachmentUrl: imgUrl as string
          };
          createUserPostMutation({
            variables: {
              createPostInput: postData
            }
          });
        }
      }
    } else {
      if (isEdit) {
        UpdatePostData = {
          ...UpdatePostData,
          postId: id.get("id") as string
        };

        updateUserPostMutation({
          variables: {
            updatePostInput: UpdatePostData
          }
        });
      } else {
        createUserPostMutation({
          variables: {
            createPostInput: postData
          }
        });
      }
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
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
        />

        <FileLabel htmlFor="fileupload" style={{ cursor: "pointer" }}>
          Attached file
        </FileLabel>
        <input
          type="file"
          id="fileupload"
          onChange={(e: any) => {
            if (!e.target.files[0]) return;
            setImage(e.target.files as unknown as []);
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setPreviewImage(reader.result);
              }
            };
            reader.readAsDataURL(e?.target?.files[0]);
          }}
          style={{ display: "none" }}
          accept="image/*"
        />
        {previewImage && (
          <Box>
            <img
              src={previewImage as string}
              alt="blog-post-images"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                maxWidth: "100%"
              }}
            />
          </Box>
        )}

        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={fileLoading}
          sx={{ width: { sm: "100%", md: "20%" } }}
        >
          {`${isEdit ? "Update" : "Create"}`}
        </LoadingButton>
      </Stack>
    </MainBox>
  );
};

export default CreatePostForm;
