import { ApolloQueryResult } from '@apollo/client';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Fragment, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  FetchPostByIdQuery,
  PostComment,
  useCreatePostCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../generated/graphql';
import { CommentBoxAction, CommentBoxSate } from '../interface';
import CommentDiv from './SingleCommentShow';

const MainCommentBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "30rem",
  overflowY: "auto",
  padding: theme.spacing(2),
  position: "relative"
}));

const initialState = {
  comment: "",
  comments: [],
  replyDelete: false,
  editDialogOpen: {
    isEdit: false,
    id: ""
  },
  replyInputId: {
    isReply: false,
    id: ""
  }
};

const reducer = (state: CommentBoxSate, action: CommentBoxAction) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.value
      };
    case "SET_COMMENT":
      return {
        ...state,
        comment: action.value
      };
    case "REPLY_DELETE":
      return {
        ...state,
        replyDelete: action.value
      };
    case "EDIT_DIALOG_OPEN":
      return {
        ...state,
        editDialogOpen: action.value
      };
    case "REPLY_INPUT_ID":
      return {
        ...state,
        replyInputId: action.value
      };
  }
};

const CommentBox = ({
  showComments,
  refetchPost
}: {
  showComments: PostComment[];
  refetchPost: () => Promise<ApolloQueryResult<FetchPostByIdQuery>>;
}) => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { comment, comments, replyDelete, editDialogOpen, replyInputId } = state;
  const [createPostCommentMutation] = useCreatePostCommentMutation({
    onCompleted: (data) => {
      toast.success(data.createPostComment.message);
      refetchPost();
      dispatch({
        type: "SET_COMMENT",
        value: ""
      });
    },
    onError: (err) => toast.error(err.message)
  });

  const [deleteCommentMutation] = useDeleteCommentMutation({
    onCompleted: (data) => {
      refetchPost();
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
      refetchPost();
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
