/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Container, TablePagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFetchAllPostsLazyQuery, useSearchPostLazyQuery } from '../../generated/graphql';
import SearchBar from '../SearchBar';
import ShowData from './ShowData';

const ContainerStyle = styled(Container)(({ theme }) => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));
const HomePageContainer = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [fetchAllPost, { data }] = useFetchAllPostsLazyQuery();
  const [searchPost, { data: searchData }] = useSearchPostLazyQuery();
  const [searchPriority, setSearchPriority] = useState(false);

  const fetchPosts = useCallback(() => {
    fetchAllPost({
      variables: {
        paginateInput: {
          limit: limit,
          page: page
        }
      },
      fetchPolicy: "network-only"
    });
  }, [fetchAllPost, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearchPost = (queryString: string) => {
    setSearchPriority(!!queryString);
    searchPost({
      variables: {
        queryString: queryString
      }
    });
  };

  if (data?.fetchAllPosts) var { posts, count } = data?.fetchAllPosts!;

  return (
    <ContainerStyle maxWidth="lg" sx={{ width: "90vw" }}>
      <SearchBar handleSearchPost={(queryString) => handleSearchPost(queryString)} />
      {(data?.fetchAllPosts?.posts?.length! > 0 && !searchPriority) ||
      (searchData?.searchPost?.length! > 0 && searchPriority) ? (
        <>
          <ShowData data={searchData?.searchPost?.length! > 0 ? searchData?.searchPost! : posts!} />
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

export default HomePageContainer;
