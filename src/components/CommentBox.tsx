import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const MainCommentBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: theme.spacing(2)
}));
const ReplyDiv = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  paddingLeft: theme.spacing(8),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2)
  }
}));
const CommentDiv = () => {
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar sx={{ backgroundColor: "Orange" }}>Re</Avatar>
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Michel Michel
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            color: "grey",
            position: "relative",
            top: "-10px"
          }}
        >
          posted 1 minute ago
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Grid>
    </Grid>
  );
};
const CommentBox = () => {
  return (
    <MainCommentBox>
      <CommentDiv />
      <ReplyDiv>
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: "capitalize" }}
        >
          Replies
        </Button>
        <CommentDiv />
        <CommentDiv />
      </ReplyDiv>
    </MainCommentBox>
  );
};

export default CommentBox;
