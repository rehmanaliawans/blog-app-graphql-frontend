import { ApolloQueryResult } from '@apollo/client';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Fragment, useCallback, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';

import {
  FetchPostByIdQuery,
  PostComment,
  useCreatePostCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../generated/graphql';
import { commentInitialState, commentReducer } from "../reducers";
import CommentDiv from './SingleCommentShow';

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
  const [state, dispatch] = useReducer(commentReducer, commentInitialState);
  const [socket, setSocket] = useState<Socket>();
  const { comment, comments, replyDelete, editDialogOpen, replyInputId } = state;

  const [createPostCommentMutation] = useCreatePostCommentMutation({
    onCompleted: (data) => {
      socket?.emit("message", data.createPostComment.comment.commentBody);
      toast.success(data.createPostComment.message);
      refetchPost();
      dispatch({
        type: "SET_COMMENT",
        value: ""
      });
    },
    onError: (err) => toast.error(err.message)
  });

  useEffect(() => {
    const socketCon = io(process.env.REACT_APP_SOCKET_URL!);
    setSocket(socketCon);
  }, [setSocket]);

  const messageListener = useCallback(() => {
    refetchPost();
  }, [refetchPost]);

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener, socket]);

  const [deleteCommentMutation] = useDeleteCommentMutation({
    onCompleted: (data) => {
      socket?.emit("message", data.deleteComment.message);
      dispatch({
        type: "REPLY_DELETE",
        value: !replyDelete
      });
      toast.success(data.deleteComment.message);
    },
    onError: (error) => toast.error(error.message)
  });

  const [updateCommentMutation] = useUpdateCommentMutation({
    onCompleted: (data) => {
      socket?.emit("message", data.updateComment.message);
      dispatch({
        type: "REPLY_DELETE",
        value: !replyDelete
      });
      dispatch({
        type: "EDIT_DIALOG_OPEN",
        value: {
          isEdit: false,
          id: ""
        }
      });
      toast.success(data.updateComment.message);
    },
    onError: (error) => toast.error(error.message)
  });

  useEffect(() => {
    if (showComments.length > 0) {
      dispatch({ type: "SET_COMMENTS", value: showComments });
    } else {
      dispatch({ type: "SET_COMMENTS", value: [] });
    }
  }, [showComments, replyDelete]);

  const handleReplyComment = (reply: { id: string; message: string }) => {
    const checkNestedOneReply = comments.find((comment) =>
      comment.reply?.find((re) => re?.reply?.find((res) => res.id === reply.id))
    );

    const checkOneReply = checkNestedOneReply?.reply?.find((comment) =>
      comment.reply?.find((re) => re.id === reply?.id)
    );

    if (!!reply.message && id && reply.id) {
      createPostCommentMutation({
        variables: {
          createCommentInput: {
            commentBody: reply.message,
            postId: id!,
            parentId: !!checkOneReply?.id ? checkOneReply?.id : reply.id
          }
        }
      });
    } else {
      toast.error("Comment required");
    }
  };

  const handleCommentCall = () => {
    if (!!comment && id) {
      createPostCommentMutation({
        variables: {
          createCommentInput: {
            commentBody: comment,
            postId: id!
          }
        }
      });
    } else {
      toast.error("Comment required");
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
    if (!!reply.id && !!reply.message) {
      updateCommentMutation({
        variables: {
          updateCommentInput: {
            commentBody: reply.message,
            commentId: reply.id
          }
        }
      });
    } else {
      toast.error("Comment required");
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
          marginTop: "10px"
        }}
        value={comment}
        onChange={(e) => dispatch({ type: "SET_COMMENT", value: e.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={() => handleCommentCall()}>
              <SendIcon sx={{ cursor: "pointer" }} />
            </InputAdornment>
          )
        }}
        onKeyDown={(e) => e.key === "Enter" && handleCommentCall()}
      />

      {!!comments?.length ? (
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
                onDispatch={dispatch}
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
