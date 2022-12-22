/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Container, TablePagination, Typography } from "@mui/material";
import Page from "../components/Page";
import SearchBar from "../components/SearchBar";
import ShowData from "../sections/homePage/ShowData";
import { styled } from "@mui/material/styles";
import { useFetchAllPostsLazyQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContainerStyle = styled(Container)(({ theme }) => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));
const HomePage = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [fetchAllPost, { data }] = useFetchAllPostsLazyQuery();

  useEffect(() => {
    fetchAllPost({
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
      <ContainerStyle maxWidth="lg">
        <SearchBar />
        {data?.fetchAllPosts.posts?.length! > 0 ? (
          <>
            {" "}
            <ShowData data={data?.fetchAllPosts?.posts!} />
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={data?.fetchAllPosts?.count!}
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
            <Typography variant="h3" color="primary" gutterBottom>
              {" "}
              No Blog
            </Typography>
            <Typography
              variant="h3"
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

export default HomePage;
