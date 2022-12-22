import { Box, Card, Typography } from "@mui/material";
import { padding, styled } from "@mui/system";
import React from "react";
import { FetchPostByIdQuery } from "../../generated/graphql";
import CommentBox from "../../components/CommentBox";

const MainBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start"
}));
const TitleTypography = styled(Typography)(() => ({
  width: "100%",
  padding: "10px 20px",
  backgroundColor: "#fff",
  borderRadius: "10px"
}));
const DescriptionCard = styled(Box)(() => ({
  width: "100%",
  padding: "10px 20px",
  backgroundColor: "#fff",
  borderRadius: "10px"
}));
const GetPost = ({ data }: { data: FetchPostByIdQuery }) => {
  return (
    <MainBox>
      <Typography variant="h4" color="primary" gutterBottom>
        Title
      </Typography>
      <TitleTypography variant="h4" gutterBottom>
        {data.fetchPost.title}
      </TitleTypography>
      <Typography variant="h4" color="primary" gutterBottom>
        Description
      </Typography>

      <DescriptionCard>
        {data?.fetchPost?.attachmentUrl && (
          <img
            alt={data?.fetchPost?.title}
            src={data?.fetchPost?.attachmentUrl!}
            width="auto"
            height="auto"
          />
        )}
        <Typography variant="body1">{data.fetchPost.description}</Typography>
      </DescriptionCard>
      <Typography variant="h6" color="primary" gutterBottom>
        Comments:
      </Typography>

      <CommentBox showComments={data?.fetchPost?.postComments!} />
    </MainBox>
  );
};

export default GetPost;
