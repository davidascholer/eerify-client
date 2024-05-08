export const ROOT_API = import.meta.env.VITE_GAMES_API_ADDRESS;

const GAMES_ENDPOINTS = {
  games: "games",
  game: "games/:id",
  gameScreenshots: "games/:id/screenshots",
  // Returns the same response as games, but filtered by the game series e.g. Resident Evil -> Resident Evil.
  gameSeries: "games/:id/game-series",
  gameStores: "games/:id/stores",
  platforms: "platforms",
  platform: "platform/:id",
  platformParents: "platforms/lists/parents",
  genres: "genres",
  genre: "genres/:id",
};

export default GAMES_ENDPOINTS;
