import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import {
  Box,
  Container,
  TablePagination,
  Typography,
  styled
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import { useFetchUserPostsLazyQuery } from "../generated/graphql";
import { Link } from "react-router-dom";
import ShowData from "../sections/homePage/ShowData";

const ContainerStyle = styled(Container)(({ theme }) => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));
const MyPosts = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [fetchUserPosts, { data }] = useFetchUserPostsLazyQuery();

  useEffect(() => {
    fetchUserPosts({
      variables: {
        paginateInput: {
          limit: limit,
          page: page
        }
      },
      fetchPolicy: "network-only"
    });
  }, [page]);

  return (
    <Page title="Blog App">
      <ContainerStyle maxWidth="xl">
        <SearchBar />
        {data?.fetchUserPosts.posts?.length! > 0 ? (
          <>
            <ShowData data={data?.fetchUserPosts?.posts!} />
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={data?.fetchUserPosts?.count!}
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
              Please Write your first Blog
            </Typography>
            <Typography
              variant="h5"
              color="primary.dark"
              component={Link}
              to="/create-post"
            >
              {" "}
              Create New Post
            </Typography>
          </Box>
        )}
      </ContainerStyle>
    </Page>
  );
};

export default MyPosts;
