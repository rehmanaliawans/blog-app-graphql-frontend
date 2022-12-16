import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MuiCard = ({
  card
}: {
  card: { title: string; description: string };
}) => {
  return (
    <Card sx={{ minWidth: { sm: "20vw" } }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card?.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
};

export default MuiCard;
