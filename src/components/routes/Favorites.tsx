import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Box, Typography, useTheme } from "@mui/material";
import Book from "../../assets/icons/Book";
import { useNavigate } from "react-router-dom";

interface FavoritesItemInterface {
  id: number;
  title: string;
  poster: string;
}

const testFilms: Array<FavoritesItemInterface> = [
  {
    id: 11,
    title: "Film 1",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
  {
    id: 12,
    title: "Film 2",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
  {
    id: 13,
    title: "Film 3",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
];

const testBooks: Array<FavoritesItemInterface> = [];

const testGames: Array<FavoritesItemInterface> = [
  {
    id: 31,
    title: "Film 1",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
  {
    id: 32,
    title: "Film 2",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
];

const styles = {
  summary: {
    display: "flex",
    flexDirection: "column",
    pb: 2,
  },
  icon: {
    width: 75,
    height: 75,
    p: 1,
  },
};

const Card = ({
  title,
  poster,
  onPress,
}: {
  title: string;
  poster: string;
  onPress: () => void;
}) => {
  return (
    <AccordionDetails onClick={onPress}>
      <Typography>{title}</Typography>
      <Box
        component="img"
        sx={{
          // height: 233,
          // width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt={title}
        src={poster}
      />
    </AccordionDetails>
  );
};

const Summary = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <AccordionSummary
      expandIcon={
        <ExpandMoreIcon sx={{ color: (theme) => theme.colors.iconColor }} />
      }
      aria-controls="panel1-content"
      id="panel1-header"
      sx={styles.summary}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 1,
        }}
      >
        {children}
        <Typography variant="h5">{title}</Typography>
      </Box>
    </AccordionSummary>
  );
};

export default function Favorites() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <div>
      {testFilms.length > 0 ? (
        <Accordion defaultExpanded>
          <Summary title="Film">
            <TheatersIcon
              sx={[styles.icon, { color: theme.colors.iconColor }]}
            />
          </Summary>
          <AccordionDetails>
            {testFilms.map((film) => (
              <Card
                key={film.id}
                title={film.title}
                poster={film.poster}
                onPress={() => navigate("/film/" + film.id)}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ) : null}
      {testBooks.length > 0 ? (
        <Accordion defaultExpanded>
          <Summary title="Books">
            <Book sx={[styles.icon, { color: theme.colors.iconColor }]} />
          </Summary>
          <AccordionDetails>
            {testBooks.map((film) => (
              <Card
                key={film.id}
                title={film.title}
                poster={film.poster}
                onPress={() => navigate("/books/" + film.id)}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ) : null}
      {testGames.length > 0 ? (
        <Accordion defaultExpanded>
          <Summary title="Games">
            <VideogameAssetIcon
              sx={[styles.icon, { color: theme.colors.iconColor }]}
            />
          </Summary>
          <AccordionDetails>
            {testGames.map((film) => (
              <Card
                key={film.id}
                title={film.title}
                poster={film.poster}
                onPress={() => navigate("/games/" + film.id)}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ) : null}
    </div>
  );
}
