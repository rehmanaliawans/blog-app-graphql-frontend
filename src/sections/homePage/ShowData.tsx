import { Grid } from "@mui/material";
import MuiCard from "../../components/Card";
import { CardData } from "../../interface/Card.interface";

const ShowData = ({ data }: { data: CardData[] }) => {
  return (
    <Grid
      container
      sx={{
        flexWrap: "wrap",
        marginTop: "10px"
      }}
      spacing={2}
    >
      {data.map((card, index) => (
        <Grid item lg={3} key={index}>
          <MuiCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowData;
