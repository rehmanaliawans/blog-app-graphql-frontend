import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TablePagination,
  Typography,
  styled
} from "@mui/material";
import { useFetchUserPostsLazyQuery } from "../../generated/graphql";
import ShowData from "../homePage/ShowData";
import { Link } from "react-router-dom";

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
    <ContainerStyle maxWidth="lg" sx={{ width: "90vw" }}>
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
            No post found
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
  );
};

export default UserPostContainer;
