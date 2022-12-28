import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import {
  FetchPostByIdQuery,
  PostComment,
  useCreatePostCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import { ApolloQueryResult } from "@apollo/client";
import CommentDiv from "./SingleCommentShow";

const MainCommentBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "30rem",
  overflowY: "auto",
  padding: theme.spacing(2),
  position: "relative"
}));

const CommentBox = ({
  showComments,
  refetchPost
}: {
  showComments: PostComment[];
  refetchPost: () => Promise<ApolloQueryResult<FetchPostByIdQuery>>;
}) => {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<PostComment[]>([]);
  const [replyDelete, setReplyDelete] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState({
    isEdit: false,
    id: ""
  });
  const [replyInputId, setReplyInputId] = useState({
    isReply: false,
    id: ""
  });

  const [createPostCommentMutation] = useCreatePostCommentMutation({
    onCompleted: (data) => {
      toast.success(data.createPostComment.message);
      refetchPost();
      setComment("");
    },
    onError: (err) => toast.error(err.message)
  });

  const [deleteCommentMutation] = useDeleteCommentMutation({
    onCompleted: (data) => {
      refetchPost();
      setReplyDelete(!replyDelete);
      toast.success(data.deleteComment.message);
    },
    onError: (error) => toast.error(error.message)
  });

  const [updateCommentMutation] = useUpdateCommentMutation({
    onCompleted: (data) => {
      refetchPost();
      setReplyDelete(!replyDelete);
      setEditDialogOpen({
        isEdit: false,
        id: ""
      });
      toast.success(data.updateComment.message);
    },
    onError: (error) => toast.error(error.message)
  });

  useEffect(() => {
    if (showComments.length > 0) {
      setComments(showComments);
    } else {
      setComments([]);
    }
  }, [showComments, replyDelete]);

  const handleReplyComment = (reply: { id: string; message: string }) => {
    const checkNestedOneReply = comments.find((comment) =>
      comment.reply?.find((re) => re?.reply?.find((res) => res.id === reply.id))
    );

    const checkOneReply = checkNestedOneReply?.reply?.find((comment) =>
      comment.reply?.find((re) => re.id === reply?.id)
    );

    if (reply.message !== "" && id && reply.id) {
      createPostCommentMutation({
        variables: {
          createCommentInput: {
            commentBody: reply.message,
            postId: id!,
            parentId: checkOneReply?.id ? checkOneReply?.id : reply.id
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

  const handleCommentDelete = (id: string) => {
    deleteCommentMutation({
      variables: {
        commentId: id
      }
    });
  };

  const handleEditComment = (reply: { id: string; message: string }) => {
    updateCommentMutation({
      variables: {
        updateCommentInput: {
          commentBody: reply.message,
          commentId: reply.id
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
          marginTop: "10px"
        }}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => {
                handleCommentCall();
              }}
            >
              <SendIcon />
            </InputAdornment>
          )
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
              <CommentDiv
                comment={comment}
                index={index}
                handleCommentDelete={(id) => handleCommentDelete(id)}
                handleEditComment={(reply) => handleEditComment(reply)}
                handleReplyComment={(reply) => handleReplyComment(reply)}
                editDialogOpen={editDialogOpen}
                setEditDialogOpen={setEditDialogOpen}
                setReplyInputId={setReplyInputId}
                replyInputId={replyInputId}
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
