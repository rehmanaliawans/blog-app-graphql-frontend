import { Container, styled, Typography } from "@mui/material";
import React from "react";
import Page from "../components/Page";
import CreatePostForm from "../sections/posts/CreatePostForm";

const ContainerStyle = styled(Container)(() => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw"
}));
const CreatePost = () => {
  return (
    <Page title="Create Post">
      <ContainerStyle maxWidth="md">
        <Typography variant="h4" gutterBottom color="primary">
          Create a new post
        </Typography>
        <CreatePostForm />
      </ContainerStyle>
    </Page>
  );
};

export default CreatePost;
