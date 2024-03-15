import { Paper, Grid } from "@mui/material";
import useScreenshots from "../hooks/useScreenshots";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId);

  if (isLoading) return null;

  if (error) throw error;

  return (
    <Grid columns={{ base: 1, md: 2 }} spacing={2}>
      {data?.results.map((file) => (
        <Paper key={file.id}>
          <img src={file.image} />
        </Paper>
      ))}
    </Grid>
  );
};

export default GameScreenshots;
