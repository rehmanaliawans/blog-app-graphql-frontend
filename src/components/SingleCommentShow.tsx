import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Button, Divider, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { Fragment, useReducer } from 'react';

import { useGlobalContext } from '../context';
import { CommentProps, SingleCommentAction, SingleCommentSate } from '../interface';
import DialogBox from './DialogBox';

const ReplyDiv = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingLeft: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(1)
  }
}));
const AvatarIcon = styled(Avatar)(({ index }: { index: number }) => ({
  backgroundColor: index % 2 === 0 ? "#5c7c8b" : "#029489",
  width: "35px",
  height: "35px",
  marginTop: "6px"
}));
const DateTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.grey[900],
  position: "relative",
  top: "-10px"
}));
const ReplyShowButton = styled(Button)(() => ({
  textTransform: "unset",
  fontSize: "12px",
  marginLeft: "1.5rem"
}));

const initialState = {
  deleteDialogOpen: false,
  reply: {
    id: "",
    message: ""
  },
  showReplies: {
    status: false,
    id: ""
  },
  editReply: {
    message: "",
    id: ""
  }
};
const reducer = (state: SingleCommentSate, action: SingleCommentAction) => {
  switch (action.type) {
    case "SET_DELETE_DIALOG_OPEN":
      return {
        ...state,
        deleteDialogOpen: action.value
      };
    case "SET_SHOW_REPLIES":
      return {
        ...state,
        showReplies: action.value
      };
    case "SET_EDIT_REPLY":
      return {
        ...state,
        editReply: action.value
      };
    case "SET_REPLY":
      return {
        ...state,
        reply: action.value
      };
  }
};

const CommentDiv: React.FC<CommentProps> = ({
  comment,
  index,
  handleCommentDelete,
  handleReplyComment,
  handleEditComment,
  onDispatch,
  editDialogOpen,
  replyInputId
}) => {
  const { id, user, commentBody, createdAt, reply: commentReply } = comment;
  const { userId } = useGlobalContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { deleteDialogOpen, showReplies, editReply, reply } = state;

  const checkEditComment = () => {
    onDispatch({
      type: "REPLY_INPUT_ID",
      value: {
        isReply: false,
        id: ""
      }
    });
    if (editDialogOpen.isEdit && editDialogOpen.id === id) {
      onDispatch({
        type: "EDIT_DIALOG_OPEN",
        value: {
          isEdit: false,
          id: ""
        }
      });
      dispatch({
        type: "SET_EDIT_REPLY",
        value: {
          message: "",
          id: ""
        }
      });
    } else {
      onDispatch({
        type: "EDIT_DIALOG_OPEN",
        value: {
          isEdit: true,
          id: id
        }
      });
    }
  };

  const handleReplySetComment = () => {
    handleReplyComment(reply);

    dispatch({
      type: "SET_REPLY",
      value: {
        message: "",
        id: ""
      }
    });
    onDispatch({
      type: "REPLY_INPUT_ID",
      value: {
        isReply: false,
        id: ""
      }
    });
  };

  const handleEditSetComment = () => {
    onDispatch({
      type: "EDIT_DIALOG_OPEN",
      value: {
        isEdit: false,
        id: ""
      }
    });
    replyInputId.id === id && replyInputId.isReply === true
      ? onDispatch({
          type: "REPLY_INPUT_ID",
          value: {
            isReply: false,
            id: ""
          }
        })
      : onDispatch({
          type: "REPLY_INPUT_ID",
          value: {
            isReply: true,
            id: id
          }
        });
  };

  const handleShowHideReplies = () => {
    onDispatch({
      type: "REPLY_INPUT_ID",
      value: {
        isReply: false,
        id: ""
      }
    });
    if (showReplies.id === id) {
      dispatch({
        type: "SET_SHOW_REPLIES",
        value: {
          status: false,
          id: ""
        }
      });
    } else {
      dispatch({
        type: "SET_SHOW_REPLIES",
        value: {
          status: true,
          id: id
        }
      });
    }
  };
  return (
    <Fragment key={id}>
      <Grid container wrap="nowrap" spacing={1} mt={1}>
        <Grid item>
          <AvatarIcon index={index}>{user.id === userId ? "Y" : user.firstName[0].toUpperCase()}</AvatarIcon>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {user?.id === userId ? "You" : user?.firstName + " " + user?.lastName}
              </Typography>
              <DateTypography variant="caption">posted {moment(createdAt).fromNow()}</DateTypography>
            </Box>
            {user.id === userId && (
              <Box>
                <Button
                  size="small"
                  color="primary"
                  variant="text"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => checkEditComment()}
                >
                  {editDialogOpen.isEdit && editDialogOpen.id === id ? "Cancel" : "Edit"}
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="text"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() =>
                    dispatch({
                      type: "SET_DELETE_DIALOG_OPEN",
                      value: true
                    })
                  }
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
          {editDialogOpen.isEdit && editDialogOpen.id === id ? (
            <TextField
              placeholder="Enter comment.."
              variant="outlined"
              fullWidth
              label="Edit comment"
              size="small"
              value={editReply.id === id ? editReply.message : commentBody}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={() => handleEditComment(editReply)}>
                    <SendIcon sx={{ cursor: "pointer" }} />
                  </InputAdornment>
                )
              }}
              onChange={(e) => {
                dispatch({
                  type: "SET_EDIT_REPLY",
                  value: {
                    message: e.target.value,
                    id: id
                  }
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEditComment(editReply);
                }
              }}
            />
          ) : (
            <Typography sx={{ lineBreak: "anywhere" }}>{commentBody}</Typography>
          )}
          {replyInputId.id === id && replyInputId.isReply === true && (
            <TextField
              placeholder="Enter reply..."
              variant="outlined"
              label="reply"
              size="small"
              fullWidth
              autoFocus
              InputLabelProps={{ shrink: true }}
              value={reply.id === id ? reply.message : ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_REPLY",
                  value: {
                    message: e.target.value,
                    id: id
                  }
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={() => handleReplySetComment()}>
                    <SendIcon sx={{ cursor: "pointer" }} />
                  </InputAdornment>
                )
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleReplyComment(reply);
                  dispatch({
                    type: "SET_REPLY",
                    value: {
                      message: "",
                      id: ""
                    }
                  });
                  onDispatch({
                    type: "REPLY_INPUT_ID",
                    value: {
                      isReply: false,
                      id: ""
                    }
                  });
                }
              }}
            />
          )}
        </Grid>

        <DialogBox
          title="Are you sure to delete this comment?"
          description="Replies also deleted when you delete this comment!"
          open={deleteDialogOpen}
          handleClose={() =>
            dispatch({
              type: "SET_DELETE_DIALOG_OPEN",
              value: false
            })
          }
          handleAgree={() => {
            dispatch({
              type: "SET_DELETE_DIALOG_OPEN",
              value: false
            });
            handleCommentDelete(id);
          }}
        />
      </Grid>

      <ReplyDiv>
        <ReplyShowButton variant="text" color="primary" onClick={() => handleEditSetComment()}>
          {replyInputId.id === id ? "Cancel" : "Reply"}
        </ReplyShowButton>
        {commentReply?.length! > 0 && (
          <>
            <ReplyShowButton
              variant="text"
              color="primary"
              endIcon={showReplies.id !== id ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              onClick={() => handleShowHideReplies()}
            >
              {showReplies.id === id ? "Hide replies" : "Show replies"}
            </ReplyShowButton>
            <Divider sx={{ borderStyle: "dashed" }} />

            {showReplies.status === true &&
              showReplies.id === id &&
              commentReply?.map((reply, index) => (
                <Fragment key={index}>
                  <CommentDiv
                    comment={reply}
                    index={index}
                    handleCommentDelete={(id) => handleCommentDelete(id)}
                    handleEditComment={(reply) => handleEditComment(reply)}
                    handleReplyComment={(reply) => handleReplyComment(reply)}
                    editDialogOpen={editDialogOpen}
                    onDispatch={onDispatch}
                    replyInputId={replyInputId}
                  />
                </Fragment>
              ))}
            <Divider sx={{ borderStyle: "dashed" }} />
          </>
        )}
      </ReplyDiv>
    </Fragment>
  );
};

export default CommentDiv;
