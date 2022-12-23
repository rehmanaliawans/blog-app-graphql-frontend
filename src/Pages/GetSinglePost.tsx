import React from "react";
import { useFetchPostByIdQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";
import Page from "../components/Page";
import { Container, Typography, styled } from "@mui/material";
import GetPost from "../sections/posts/GetPost";

const ContainerStyle = styled(Container)(() => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw"
}));
const GetSinglePost = () => {
  const { id } = useParams();
  const {
    data,
    error,
    refetch: refetchPost
  } = useFetchPostByIdQuery({
    variables: {
      postId: id!
    },
    fetchPolicy: "network-only"
  });

  return (
    <Page title="Get Post">
      <ContainerStyle maxWidth="lg">
        {data && <GetPost data={data!} refetchPost={refetchPost} />}
        {error && (
          <Typography color="primary" variant="h3">
            No Post found
          </Typography>
        )}
      </ContainerStyle>
    </Page>
  );
};

export default GetSinglePost;
