import { Box, Container, Grid, Pagination } from "@mui/material";
import Page from "../components/Page";
import SearchBar from "../components/SerachBar";
import { CardData } from "../interface/Card.interface";
import ShowData from "../sections/homePage/ShowData";
import { styled } from "@mui/material/styles";
const data: CardData[] = [
  {
    id: 1,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 2,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 3,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 4,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 5,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 5,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 5,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 5,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 5,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  },
  {
    id: 5,
    link: "/assets/images.jpeg",
    title: "Brunch this weekend?",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  }
];
const ContainerStyle = styled(Container)(({ theme }) => ({
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));
const HomePage = () => {
  return (
    <Page title="Blog App">
      <ContainerStyle maxWidth="xl">
        <SearchBar />
        <ShowData data={data} />
        <Pagination count={10} sx={{ marginTop: "20px" }} />
      </ContainerStyle>
    </Page>
  );
};

export default HomePage;
