import { Container, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchPostByIdLazyQuery } from "../../../generated/graphql";
import CreatePostForm from "./CreatePostForm";

const ContainerStyle = styled(Container)(() => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw"
}));
const CreatePostContainer = () => {
  const [id] = useSearchParams();
  const [isEdit, setIsEdit] = useState(false);
  const [fetchUserPost, { data }] = useFetchPostByIdLazyQuery({
    onCompleted: () => {
      setIsEdit(true);
    },
    onError: (err) => toast.error(err.message)
  });
  useEffect(() => {
    if (id.get("id")) {
      fetchUserPost({
        variables: {
          postId: id.get("id")!
        }
      });
    }
  }, []);

  return (
    <ContainerStyle maxWidth="md">
      <Typography variant="h4" gutterBottom color="primary">
        Create a new post
      </Typography>
      <CreatePostForm post={data} isEdit={isEdit} setIsEdit={setIsEdit} />
    </ContainerStyle>
  );
};

export default CreatePostContainer;
