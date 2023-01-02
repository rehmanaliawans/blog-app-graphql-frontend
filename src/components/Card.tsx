import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const DescriptionTypo = styled(Typography)(() => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
}));
const MuiCard = ({ card }: { card: { title: string; description: string; id: string } }) => {
  const { title, description, id } = card;
  return (
    <Card>
      <CardContent sx={{ height: "8rem" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <DescriptionTypo variant="body2" color="text.secondary">
          {description}
        </DescriptionTypo>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small" component={RouterLink} to={`/get-post/${id}`}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default MuiCard;
