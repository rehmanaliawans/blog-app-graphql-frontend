import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@mui/material";
import { padding, styled } from "@mui/system";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  FetchPostByIdQuery,
  useDeletePostMutation
} from "../../generated/graphql";
import CommentBox from "../../components/CommentBox";
import { useGlobalContext } from "../../context";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const MainBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start"
}));
const TitleTypography = styled(Typography)(() => ({
  width: "100%",
  padding: "10px 20px",
  backgroundColor: "#fff",
  borderRadius: "10px"
}));
const DescriptionCard = styled(Box)(() => ({
  width: "100%",
  padding: "10px 20px",
  backgroundColor: "#fff",
  borderRadius: "10px"
}));
const GetPost = ({ data }: { data: FetchPostByIdQuery }) => {
  const { userId } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deletePostMutation] = useDeletePostMutation({
    onCompleted: ({ deletePost }) => {
      if (deletePost.status === 200) {
        navigate("/", { replace: true });
        toast.success(deletePost.message);
      }
    },
    onError: (error) => console.error(error)
  });

  const handleDeletePost = () => {
    setDeleteDialogOpen(false);
    deletePostMutation({
      variables: {
        postId: id!
      }
    });
  };
  return (
    <MainBox>
      <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Title
        </Typography>
        {data?.fetchPost?.user?.id === userId && (
          <Box display="flex">
            <Button
              component={RouterLink}
              to={`/create-post?id=${data?.fetchPost?.id}`}
            >
              <BorderColorRoundedIcon color="primary" />
            </Button>
            <Button onClick={() => setDeleteDialogOpen(true)}>
              <DeleteForeverRoundedIcon color="error" />
            </Button>
          </Box>
        )}
      </Box>
      <TitleTypography variant="h4" gutterBottom>
        {data.fetchPost.title}
      </TitleTypography>
      <Typography variant="h4" color="primary" gutterBottom>
        Description
      </Typography>

      <DescriptionCard>
        {data?.fetchPost?.attachmentUrl && (
          <img
            alt={data?.fetchPost?.title}
            src={data?.fetchPost?.attachmentUrl!}
            width="auto"
            height="auto"
          />
        )}
        <Typography variant="body1">{data.fetchPost.description}</Typography>
      </DescriptionCard>
      <Typography variant="h6" color="primary" gutterBottom>
        Comments:
      </Typography>

      <CommentBox showComments={data?.fetchPost?.postComments!} />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this Post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Comments also deleted when you delete this post!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
          <Button onClick={() => handleDeletePost()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </MainBox>
  );
};

export default GetPost;
