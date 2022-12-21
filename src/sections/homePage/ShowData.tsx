import { Grid } from "@mui/material";
import MuiCard from "../../components/Card";
import { FetchAllPostsQuery } from "../../generated/graphql";

const ShowData = ({
  data,
  fetchMore,
  page,
  setPage,
  limit,
  setLimit
}: {
  data: FetchAllPostsQuery | undefined;
  fetchMore: any;
  page: number;
  limit: number;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
}) => {
  return (
    <Grid
      container
      sx={{
        flexWrap: "wrap",
        marginTop: "10px"
      }}
      spacing={2}
      display="flex"
      justifyContent="center"
    >
      {data?.fetchAllPosts?.posts?.map((card, index) => (
        <Grid
          item
          lg={6}
          xl={6}
          sm={6}
          xs={12}
          key={index}
          sx={{ width: "100vw" }}
        >
          <MuiCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowData;
