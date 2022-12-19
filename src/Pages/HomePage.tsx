/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Container,
  Grid,
  Pagination,
  TablePagination
} from "@mui/material";
import Page from "../components/Page";
import SearchBar from "../components/SerachBar";
import { CardData } from "../interface/Card.interface";
import ShowData from "../sections/homePage/ShowData";
import { styled } from "@mui/material/styles";
import { useFetchAllPostsLazyQuery } from "../generated/graphql";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ContainerStyle = styled(Container)(({ theme }) => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));
const HomePage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [fetchAllPost, { data, loading, error }] = useFetchAllPostsLazyQuery();

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
  console.log(data);

  return (
    <Page title="Blog App">
      <ContainerStyle maxWidth="xl">
        <SearchBar />
        <ShowData data={data} />
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
      </ContainerStyle>
    </Page>
  );
};

export default HomePage;
