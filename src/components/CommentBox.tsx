import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import moment from "moment";
import {
  PostComment,
  useCreatePostCommentMutation,
  useFetchPostByIdQuery
} from "../generated/graphql";
import { useLocation, useParams } from "react-router-dom";

const MainCommentBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "30rem",
  overflowY: "auto",
  padding: theme.spacing(2)
}));
const ReplyDiv = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingLeft: theme.spacing(8),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2)
  }
}));
const CommentDiv = ({
  comment,
  index
}: {
  comment: PostComment;
  index: number;
}) => {
  return (
    <Grid container wrap="nowrap" spacing={2} key={comment.id} mt={1}>
      <Grid item>
        <Avatar sx={{ backgroundColor: index % 2 === 0 ? "Red" : "Orange" }}>
          {comment.user.firstName[0].toUpperCase()}
        </Avatar>
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {comment?.user?.firstName + " " + comment?.user?.lastName}
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
          posted {moment(comment?.createdAt).format("lll")}
        </Typography>
        <Typography>{comment?.commentBody}</Typography>
      </Grid>
    </Grid>
  );
};

const CommentBox = ({ comments }: { comments: PostComment[] }) => {
  const { id } = useParams();
  const [replyId, setReplyId] = useState("");
  const [reply, setReply] = useState({
    id: "",
    message: ""
  });
  const [comment, setComment] = useState("");

  const [createPostCommentMutation] = useCreatePostCommentMutation({
    refetchQueries: ["useFetchPostByIdQuery"],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setReply({
        id: "",
        message: ""
      });
      setComment("");
    }
  });

  const handleReplyComment = () => {
    if (reply.message !== "" && id && reply.id)
      createPostCommentMutation({
        variables: {
          createCommentInput: {
            commentBody: reply.message,
            postId: id!,
            parentId: reply.id
          }
        }
      });
  };
  const handleCommentCall = () => {
    console.log("reply call", { id }, { comment });
    if (comment !== "" && id)
      createPostCommentMutation({
        variables: {
          createCommentInput: {
            commentBody: comment,
            postId: id!
          }
        }
      });
  };
  return (
    <MainCommentBox>
      <TextField
        fullWidth
        placeholder="Enter new comment..."
        variant="outlined"
        label="New comment"
        size="small"
        sx={{
          padding: "0px",
          marginLeft: "10px",
          marginTop: "10px"
        }}
        value={comment}
        onChange={(e) => {
          console.log("keydown", e.target.value);
          setComment(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommentCall();
          }
        }}
      />
      {comments.length > 0 ? (
        comments.map((comment: any, index: number) => {
          return (
            <>
              <CommentDiv comment={comment} index={index} />
              {comment.reply.length > 0 && (
                <ReplyDiv>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => {
                      if (replyId !== comment.id) {
                        setReplyId(comment.id);
                      } else {
                        setReplyId("");
                      }
                    }}
                  >
                    Replies
                  </Button>

                  {replyId === comment.id &&
                    comment.reply.map((reply: any, index: number) => (
                      <CommentDiv comment={reply} index={index} />
                    ))}
                </ReplyDiv>
              )}
              <TextField
                fullWidth
                placeholder="Enter comment reply..."
                variant="standard"
                label="Reply"
                size="small"
                sx={{
                  padding: "0px",
                  marginLeft: "3rem"
                }}
                value={reply.id === comment.id ? reply.message : ""}
                onChange={(e) => {
                  console.log("keydown", e.target.value);
                  setReply({
                    id: comment.id,
                    message: e.target.value
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleReplyComment();
                  }
                }}
              />
            </>
          );
        })
      ) : (
        <Typography>No comments</Typography>
      )}
    </MainCommentBox>
  );
};

export default CommentBox;
