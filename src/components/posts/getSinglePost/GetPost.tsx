import { ApolloQueryResult } from '@apollo/client';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { GlobalContext } from '../../../context';
import { FetchPostByIdQuery, useDeletePostMutation } from '../../../generated/graphql';
import CommentBox from '../../CommentBox';
import DialogBox from '../../DialogBox';

const MainBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}));
const TitleTypography = styled(Typography)(() => ({
  width: '100%',
  padding: '10px 20px',
  backgroundColor: '#fff',
  borderRadius: '10px'
}));
const DescriptionCard = styled(Box)(() => ({
  width: '100%',
  padding: '10px 20px',
  backgroundColor: '#fff',
  borderRadius: '10px'
}));

const DescriptionTypo = styled(Typography)(() => ({
  lineBreak: 'anywhere'
}));
const GetPost = ({
  data,
  refetchPost
}: {
  data: FetchPostByIdQuery;
  refetchPost: () => Promise<ApolloQueryResult<FetchPostByIdQuery>>;
}) => {
  const { user } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deletePostMutation] = useDeletePostMutation({
    onCompleted: ({ deletePost }) => {
      if (deletePost.status === 200) {
        navigate('/', { replace: true });
        toast.success(deletePost.message);
      }
    },
    onError: (error) => toast.error(error.message)
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%', marginBottom: '0.35rem' }}>
        <Typography variant="h4" color="primary">
          Title
        </Typography>
        {data?.fetchPost?.user?.id === user?.id && (
          <Box display="flex">
            <Button component={RouterLink} to={`/create-post?id=${data?.fetchPost?.id}`}>
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
            style={{ maxWidth: '100%' }}
          />
        )}
        <DescriptionTypo variant="body1">{data.fetchPost.description}</DescriptionTypo>
      </DescriptionCard>
      <Typography variant="h6" color="primary" gutterBottom>
        Comments:
      </Typography>

      <CommentBox showComments={data?.fetchPost?.postComments!} refetchPost={refetchPost} />
      <DialogBox
        title="Are you sure to delete this Post?"
        description="Comments also deleted when you delete this post!"
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleAgree={() => handleDeletePost()}
      />
    </MainBox>
  );
};

export default GetPost;
