import React from "react";
import { useFetchPostByIdQuery } from "../generated/graphql";
import { useLocation, useParams } from "react-router-dom";
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
  console.log("location", id);
  const { data, loading, error } = useFetchPostByIdQuery({
    variables: {
      postId: id!
    }
  });
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log("error call");
  }
  if (loading) {
    return <p>loading</p>;
  }
  return (
    <Page title="Get Post">
      <ContainerStyle maxWidth="lg">
        <GetPost data={data!} />
      </ContainerStyle>
    </Page>
  );
};

export default GetSinglePost;
