import { Grid, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <CircularProgress />;

  if (error || !game) throw error;

  return (
    <Grid columns={{ base: 1, md: 2 }}>
      <Grid item>
        <Typography variant="h1">{game.name}</Typography>
        <ExpandableText>{game.description_raw}</ExpandableText>
        <GameAttributes game={game} />
      </Grid>
      <Grid item>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </Grid>
    </Grid>
  );
};

export default GameDetailPage;
