import { Box, Container, styled, TablePagination, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFetchUserPostsLazyQuery } from '../../generated/graphql';
import ShowData from '../homePage/ShowData';

const ContainerStyle = styled(Container)(({ theme }) => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));
const UserPostContainer = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [fetchUserPosts, { data }] = useFetchUserPostsLazyQuery();

  const fetUserOwnPosts = useCallback(() => {
    fetchUserPosts({
      variables: {
        paginateInput: {
          limit: limit,
          page: page
        }
      },
      fetchPolicy: "network-only"
    });
  }, [fetchUserPosts, page]);

  useEffect(() => {
    fetUserOwnPosts();
  }, [fetUserOwnPosts]);
  if (data?.fetchUserPosts) var { posts, count } = data?.fetchUserPosts!;
  return (
    <ContainerStyle maxWidth="lg" sx={{ width: "90vw" }}>
      {posts?.length! > 0 ? (
        <>
          <ShowData data={posts!} />
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={count!}
            rowsPerPage={limit}
            page={page - 1}
            onPageChange={(event, value) => {
              setPage(value + 1);
            }}
            showFirstButton
            showLastButton
          />
        </>
      ) : (
        <Box mt={5} sx={{ textAlign: "center" }}>
          <Typography variant="h4" color="primary" gutterBottom>
            {" "}
            No post found
          </Typography>
          <Typography variant="h5" color="primary.dark" component={Link} to="/create-post">
            {" "}
            Create New Post
          </Typography>
        </Box>
      )}
    </ContainerStyle>
  );
};

export default UserPostContainer;
