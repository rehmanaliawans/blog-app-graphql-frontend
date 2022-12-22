import { Container, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import CreatePostForm from "../sections/posts/CreatePostForm";
import { useParams, useSearchParams } from "react-router-dom";
import { useFetchPostByIdLazyQuery } from "../generated/graphql";

const ContainerStyle = styled(Container)(() => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw"
}));
const CreatePost = () => {
  const [id, setId] = useSearchParams();
  const [isEdit, setIsEdit] = useState(false);
  const [fetchUserPost, { data }] = useFetchPostByIdLazyQuery({
    onCompleted: () => {
      setIsEdit(true);
    }
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
    <Page title="Create Post">
      <ContainerStyle maxWidth="md">
        <Typography variant="h4" gutterBottom color="primary">
          Create a new post
        </Typography>
        <CreatePostForm post={data} isEdit={isEdit} setIsEdit={setIsEdit} />
      </ContainerStyle>
    </Page>
  );
};

export default CreatePost;
