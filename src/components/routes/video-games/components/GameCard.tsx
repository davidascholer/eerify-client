import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import Box from "@mui/material/Box";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card
      sx={{
        borderRadius: 5,
      }}
    >
      <Box
        component="img"
        sx={{
          width: "100%",
        }}
        alt={game.name}
        src={getCroppedImageUrl(game.background_image)}
      />
      <CardContent>
        <Box>
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </Box>
        <Typography fontSize="2xl">
          <Link to={"/games/" + game.slug}>{game.name}</Link>
          <Emoji rating={game.rating_top} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;
