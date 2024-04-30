const token = "key=" + import.meta.env.VITE_GAMES_API_KEY;
export const ROOT_API = import.meta.env.VITE_GAMES_API_ADDRESS;

const appendToken = (endpoint: string) => endpoint + "?" + token;

const GAMES_ENDPOINTS = {
  games: appendToken("games"),
  game: appendToken("games/:id"),
  gameScreenshots: appendToken("games/:id/screenshots"),
  // Returns the same response as games, but filtered by the game series e.g. Resident Evil -> Resident Evil.
  gameSeries: appendToken("games/:id/game-series"),
  gameStores: appendToken("games/:id/stores"),
  platforms: appendToken("platforms"),
  platform: appendToken("platform/:id"),
  platformParents: appendToken("platforms/lists/parents"),
  genres: appendToken("genres"),
  genre: appendToken("genres/:id"),
};

export default GAMES_ENDPOINTS;
