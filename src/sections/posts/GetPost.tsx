import { Box, Card, Typography } from "@mui/material";
import { padding, styled } from "@mui/system";
import React from "react";
import { FetchPostByIdQuery } from "../../generated/graphql";

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
const DescriptionCard = styled(TitleTypography)(() => ({
  height: "25rem",
  overflowY: "auto"
}));
const GetPost = ({ data }: { data: FetchPostByIdQuery }) => {
  return (
    <MainBox>
      <Typography variant="h4" color="primary" gutterBottom>
        Title
      </Typography>
      <TitleTypography variant="h3" gutterBottom>
        {data.fetchPost.title}
      </TitleTypography>
      <Typography variant="h4" color="primary" gutterBottom>
        Description
      </Typography>

      <DescriptionCard variant="body1" gutterBottom>
        {data.fetchPost.description}
      </DescriptionCard>
      <Box>
        <Typography variant="h6" color="primary" gutterBottom>
          Comments:
        </Typography>
      </Box>
    </MainBox>
  );
};

export default GetPost;
