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
import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import {
  Post,
  PostComment,
  useCreatePostCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DialogBox from "./DialogBox";
import { toast } from "react-toastify";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

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
  index,
  handleCommentDelete,
  handleReplyComment,
  handleEditComment,
  setEditDialogOpen,
  editDialogOpen
}: {
  comment: PostComment;
  index: number;
  handleCommentDelete: (id: string) => void;
  handleEditComment: (editReply: { id: string; message: string }) => void;
  handleReplyComment: (reply: { id: string; message: string }) => void;
  editDialogOpen: { isEdit: boolean; id: string };
  setEditDialogOpen: (value: { isEdit: boolean; id: string }) => void;
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
          <Avatar
            sx={{
              backgroundColor: index % 2 === 0 ? "Red" : "Orange",
              width: "30px",
              height: "30px",
              marginTop: "8px"
            }}
          >
            {comment.user.id === userId
              ? "Y"
              : comment.user.firstName[0].toUpperCase()}
          </Avatar>
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
              sx={{
                padding: "0px"
                // width: "80%"
              }}
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
            <Typography>{comment?.commentBody}</Typography>
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

      {comment?.reply?.length! > 0 && (
        <ReplyDiv>
          <Button
            variant="text"
            color="primary"
            sx={{ textTransform: "capitalize", fontSize: "12px" }}
            onClick={() => {
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
            {showReplies.id === comment.id ? "hide replies" : "show replies"}
          </Button>
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
                />
              </Fragment>
            ))}
        </ReplyDiv>
      )}
      <ReplyDiv>
        <TextField
          placeholder="Enter reply..."
          variant="standard"
          label="reply"
          size="small"
          fullWidth
          sx={{
            padding: "0px"
            // marginLeft: "3rem"
            // width: "80%"
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
              handleReplyComment(reply);
              setReply({
                id: "",
                message: ""
              });
            }
          }}
        />
      </ReplyDiv>
    </Fragment>
  );
};

const CommentBox = ({
  showComments,
  refetchPost
}: {
  showComments: PostComment[];
  refetchPost: () => Post[];
}) => {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<PostComment[]>([]);
  const [replyDelete, setReplyDelete] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState({
    isEdit: false,
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

  const [deleteCommentMutation, { data }] = useDeleteCommentMutation({
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
