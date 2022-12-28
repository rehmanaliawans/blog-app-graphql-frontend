import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material";

const DescriptionTypo = styled(Typography)(() => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
}));
const MuiCard = ({
  card
}: {
  card: { title: string; description: string; id: string };
}) => {
  return (
    <Card>
      <CardContent sx={{ height: "8rem" }}>
        <Typography gutterBottom variant="h5" component="div">
          {card?.title}
        </Typography>
        <DescriptionTypo variant="body2" color="text.secondary">
          {card?.description}
        </DescriptionTypo>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small" component={RouterLink} to={`/get-post/${card.id}`}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default MuiCard;
