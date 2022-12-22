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
import React, { Fragment, useState } from "react";
import moment from "moment";
import {
  PostComment,
  useCreatePostCommentMutation
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

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
  const { userId } = useGlobalContext();
  return (
    <Grid container wrap="nowrap" spacing={2} key={comment.id} mt={1}>
      <Grid item>
        <Avatar sx={{ backgroundColor: index % 2 === 0 ? "Red" : "Orange" }}>
          {comment.user.firstName[0].toUpperCase()}
        </Avatar>
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {comment?.user?.id === userId
            ? "You"
            : comment?.user?.firstName + " " + comment?.user?.lastName}
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
          {/* posted {moment(comment?.createdAt).format("lll")} */}
          posted {moment(comment?.createdAt).fromNow()}
        </Typography>
        <Typography>{comment?.commentBody}</Typography>
      </Grid>
    </Grid>
  );
};

const CommentBox = ({ showComments }: { showComments: PostComment[] }) => {
  const { id } = useParams();
  const [replyId, setReplyId] = useState("");
  const [reply, setReply] = useState({
    id: "",
    message: ""
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<PostComment[]>(showComments);
  const [createPostCommentMutation] = useCreatePostCommentMutation({
    onCompleted: ({ createPostComment }) => {
      const { comment: newComment } = createPostComment;
      if (comment !== "") {
        const allComments = [...comments, newComment];
        allComments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setComments(allComments);
      } else {
        let singleComment = comments.find((comment) => comment.id === reply.id);
        singleComment = {
          ...singleComment!,
          reply: [...singleComment?.reply!, newComment]
        };
        const finalComments = comments.filter(
          (comment) => comment.id !== reply.id
        );
        const finalReply = [...finalComments, singleComment];
        finalReply.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setComments(finalReply);
      }
      setReply({
        id: "",
        message: ""
      });
      setComment("");
    }
  });

  const handleReplyComment = () => {
    if (reply.message !== "" && id && reply.id) {
      createPostCommentMutation({
        variables: {
          createCommentInput: {
            commentBody: reply.message,
            postId: id!,
            parentId: reply.id
          }
        }
      });
    }
  };

  const handleCommentCall = () => {
    if (comment !== "" && id) {
      createPostCommentMutation({
        variables: {
          createCommentInput: {
            commentBody: comment,
            postId: id!
          }
        }
      });
    }
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
          setComment(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommentCall();
          }
        }}
      />
      {comments?.length > 0 ? (
        comments?.map((comment, index) => {
          return (
            <Fragment key={index}>
              <CommentDiv comment={comment} index={index} />
              {comment?.reply?.length! > 0 && (
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
                    comment?.reply?.map((reply, index) => (
                      <Fragment key={index}>
                        <CommentDiv comment={reply} index={index} />
                      </Fragment>
                    ))}
                </ReplyDiv>
              )}
              <TextField
                placeholder="Enter comment reply..."
                variant="standard"
                label="Reply"
                size="small"
                sx={{
                  padding: "0px",
                  marginLeft: "3rem",
                  width: "80%"
                }}
                value={reply.id === comment.id ? reply.message : ""}
                onChange={(e) => {
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
            </Fragment>
          );
        })
      ) : (
        <Typography color="primary" variant="h4" sx={{ textAlign: "center" }}>
          No comments
        </Typography>
      )}
    </MainCommentBox>
  );
};

export default CommentBox;
