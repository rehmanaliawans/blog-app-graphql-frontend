import { Grid } from "@mui/material";
import MuiCard from "../../components/Card";
import { FetchAllPostsQuery } from "../../generated/graphql";

const ShowData = ({ data }: { data: FetchAllPostsQuery | undefined }) => {
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
        <Grid item lg={6} xl={6} sm={6} xs={12} key={index}>
          <MuiCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowData;
