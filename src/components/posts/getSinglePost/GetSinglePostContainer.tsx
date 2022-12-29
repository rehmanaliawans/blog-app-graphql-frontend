import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, styled } from "@mui/material";
import { useFetchPostByIdQuery } from "../../../generated/graphql";
import GetPost from "./GetPost";

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
    <ContainerStyle maxWidth="lg" sx={{ width: "95vw" }}>
      {data && <GetPost data={data!} refetchPost={refetchPost} />}
      {error && (
        <Typography color="primary" variant="h3">
          No Post found
        </Typography>
      )}
    </ContainerStyle>
  );
};

export default GetSinglePost;
