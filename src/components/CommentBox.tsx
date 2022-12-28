import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { styled } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import {
  FetchPostByIdQuery,
  PostComment,
  useCreatePostCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import DialogBox from "./DialogBox";
import { toast } from "react-toastify";
import { ApolloQueryResult } from "@apollo/client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const MainCommentBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "30rem",
  overflowY: "auto",
  padding: theme.spacing(2),
  position: "relative"
}));
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

const CommentDiv = ({
  comment,
  index,
  handleCommentDelete,
  handleReplyComment,
  handleEditComment,
  setEditDialogOpen,
  editDialogOpen,
  setReplyInputId,
  replyInputId
}: {
  comment: PostComment;
  index: number;
  handleCommentDelete: (id: string) => void;
  handleEditComment: (editReply: { id: string; message: string }) => void;
  handleReplyComment: (reply: { id: string; message: string }) => void;
  editDialogOpen: { isEdit: boolean; id: string };
  setEditDialogOpen: (value: { isEdit: boolean; id: string }) => void;
  setReplyInputId: (value: { isReply: boolean; id: string }) => void;
  replyInputId: { isReply: boolean; id: string };
}) => {
  const { userId } = useGlobalContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showReplies, setShowReplies] = useState({
    id: "",
    status: false
  });

  const [editReply, setEditReply] = useState({
    id: "",
    message: ""
  });
  const [reply, setReply] = useState({
    id: "",
    message: ""
  });
  return (
    <Fragment key={comment.id}>
      <Grid container wrap="nowrap" spacing={1} mt={1}>
        <Grid item>
          <AvatarIcon index={index}>
            {comment.user.id === userId
              ? "Y"
              : comment.user.firstName[0].toUpperCase()}
          </AvatarIcon>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {comment?.user?.id === userId
                  ? "You"
                  : comment?.user?.firstName + " " + comment?.user?.lastName}
              </Typography>
              <DateTypography variant="caption">
                posted {moment(comment?.createdAt).fromNow()}
              </DateTypography>
            </Box>
            {comment.user.id === userId && (
              <Box>
                <Button
                  size="small"
                  color="primary"
                  variant="text"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => {
                    if (
                      editDialogOpen.isEdit &&
                      editDialogOpen.id === comment.id
                    ) {
                      setEditDialogOpen({ isEdit: false, id: "" });
                      setEditReply({
                        id: "",
                        message: ""
                      });
                    } else {
                      setEditDialogOpen({
                        isEdit: true,
                        id: comment.id
                      });
                    }
                  }}
                >
                  {editDialogOpen.isEdit && editDialogOpen.id === comment?.id
                    ? "Cancel"
                    : "Edit"}
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="text"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
          {editDialogOpen.isEdit && editDialogOpen.id === comment.id ? (
            <TextField
              placeholder="Enter comment..."
              variant="outlined"
              fullWidth
              label="Edit comment"
              size="small"
              value={
                editReply.id === comment.id
                  ? editReply.message
                  : comment?.commentBody
              }
              onChange={(e) => {
                setEditReply({
                  id: comment.id,
                  message: e.target.value
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEditComment(editReply);
                }
              }}
            />
          ) : (
            <Typography sx={{ lineBreak: "anywhere" }}>
              {comment?.commentBody}
            </Typography>
          )}
          {replyInputId.id === comment.id && replyInputId.isReply === true && (
            <TextField
              placeholder="Enter reply..."
              variant="outlined"
              label="reply"
              size="small"
              fullWidth
              value={reply.id === comment.id ? reply.message : ""}
              onChange={(e) => {
                setReply({
                  id: comment.id,
                  message: e.target.value
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleReplyComment(reply);
                  setReply({
                    id: "",
                    message: ""
                  });
                  setReplyInputId({
                    id: "",
                    isReply: false
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
          handleClose={() => setDeleteDialogOpen(false)}
          handleAgree={() => {
            setDeleteDialogOpen(false);
            handleCommentDelete(comment.id);
          }}
        />
      </Grid>

      <ReplyDiv>
        <ReplyShowButton
          variant="text"
          color="primary"
          onClick={() => {
            replyInputId.id === comment.id && replyInputId.isReply === true
              ? setReplyInputId({
                  isReply: false,
                  id: ""
                })
              : setReplyInputId({
                  isReply: true,
                  id: comment.id
                });
          }}
        >
          {replyInputId.id === comment.id ? "Cancel" : "Reply"}
        </ReplyShowButton>
        {comment?.reply?.length! > 0 && (
          <>
            <ReplyShowButton
              variant="text"
              color="primary"
              endIcon={
                showReplies.id !== comment.id ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )
              }
              onClick={() => {
                setReplyInputId({
                  isReply: false,
                  id: ""
                });
                if (showReplies.id === comment.id) {
                  setShowReplies({
                    id: "",
                    status: false
                  });
                } else {
                  setShowReplies({
                    id: comment.id,
                    status: true
                  });
                }
              }}
            >
              {showReplies.id === comment.id ? "Hide replies" : "Show replies"}
            </ReplyShowButton>
            <Divider sx={{ borderStyle: "dashed" }} />

            {showReplies.status === true &&
              showReplies.id === comment.id &&
              comment?.reply?.map((reply, index) => (
                <Fragment key={index}>
                  <CommentDiv
                    comment={reply}
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
              ))}
          </>
        )}
      </ReplyDiv>
    </Fragment>
  );
};

const CommentBox = ({
  showComments,
  refetchPost
}: {
  showComments: PostComment[];
  refetchPost: () => Promise<ApolloQueryResult<FetchPostByIdQuery>>;
}) => {
  const theme = useTheme();
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
