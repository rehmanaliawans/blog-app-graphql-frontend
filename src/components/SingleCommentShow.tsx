import { Fragment, useState } from "react";
import { useGlobalContext } from "../context";
import { PostComment } from "../generated/graphql";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  styled
} from "@mui/material";
import moment from "moment";
import DialogBox from "./DialogBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SendIcon from "@mui/icons-material/Send";

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

interface CommentProps {
  comment: PostComment;
  index: number;
  handleCommentDelete: (id: string) => void;
  handleEditComment: (editReply: { id: string; message: string }) => void;
  handleReplyComment: (reply: { id: string; message: string }) => void;
  editDialogOpen: { isEdit: boolean; id: string };
  setEditDialogOpen: (value: { isEdit: boolean; id: string }) => void;
  setReplyInputId: (value: { isReply: boolean; id: string }) => void;
  replyInputId: { isReply: boolean; id: string };
}

const CommentDiv: React.FC<CommentProps> = ({
  comment,
  index,
  handleCommentDelete,
  handleReplyComment,
  handleEditComment,
  setEditDialogOpen,
  editDialogOpen,
  setReplyInputId,
  replyInputId
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

  const checkEditComment = () => {
    setReplyInputId({
      id: "",
      isReply: false
    });
    if (editDialogOpen.isEdit && editDialogOpen.id === comment.id) {
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
  };

  const handleReplySetComment = () => {
    handleReplyComment(reply);
    setReply({
      id: "",
      message: ""
    });
    setReplyInputId({
      id: "",
      isReply: false
    });
  };

  const handleEditSetComment = () => {
    setEditDialogOpen({ isEdit: false, id: "" });
    replyInputId.id === comment.id && replyInputId.isReply === true
      ? setReplyInputId({
          isReply: false,
          id: ""
        })
      : setReplyInputId({
          isReply: true,
          id: comment.id
        });
  };

  const handleShowHideReplies = () => {
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
  };
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
                  onClick={() => checkEditComment()}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => handleEditComment(editReply)}
                  >
                    <SendIcon sx={{ cursor: "pointer" }} />
                  </InputAdornment>
                )
              }}
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
              autoFocus
              InputLabelProps={{ shrink: true }}
              value={reply.id === comment.id ? reply.message : ""}
              onChange={(e) =>
                setReply({
                  id: comment.id,
                  message: e.target.value
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => handleReplySetComment()}
                  >
                    <SendIcon sx={{ cursor: "pointer" }} />
                  </InputAdornment>
                )
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
          onClick={() => handleEditSetComment()}
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
              onClick={() => handleShowHideReplies()}
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
            <Divider sx={{ borderStyle: "dashed" }} />
          </>
        )}
      </ReplyDiv>
    </Fragment>
  );
};

export default CommentDiv;
