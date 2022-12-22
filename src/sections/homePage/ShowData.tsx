import { Grid } from "@mui/material";
import MuiCard from "../../components/Card";
import { Post } from "../../generated/graphql";

const ShowData = ({ data }: { data: Post[] | undefined }) => {
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
      {data?.map((card, index) => (
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
