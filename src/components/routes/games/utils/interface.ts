export interface ResponseInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<
    | GameResponseInterface
    | GenreResponseInterface
    | PlatformResponseInterface
    | PlatformsParentResponseInterface
    | GamesStoresResponseInterface
    | GamesScreenshotsResponseInterface
  >;
}

export interface GameResponseInterface {
  id: number;
  slug: string; //Format = ^[-a-zA-Z0-9_]+$
  name: string;
  name_original: string;
  description: string;
  metacritic?: number;
  released?: Date;
  tba?: boolean;
  updated?: Date;
  background_image?: string;
  background_image_additional?: string;
  website?: string;
  rating: Rating;
  rating_top?: Rating;
  ratings?: Ratings;
  reactions?: object;
  added?: number;
  added_by_status?: object;
  playtime?: number; // in hours
  screenshots_count?: number;
  movies_count?: number;
  creators_count?: number;
  achievements_count?: number;
  parent_achievements_count?: number;
  reddit_url?: string; // e.g.: "https://www.reddit.com/r/uncharted/" or "uncharted"
  reddit_name?: string;
  reddit_description?: string;
  reddit_logo?: string;
  reddit_count?: number;
  twitch_count?: string;
  youtube_count?: string;
  reviews_text_count?: string;
  ratings_count?: number;
  suggestions_count?: number;
  alternative_names?: Array<string>;
  metacritic_url?: string;
  parents_count?: number;
  additions_count?: number;
  game_series_count?: number;
  esrb_rating?: object | null;
  platforms?: Array<PlatformResponseInterface>;
}

export interface GamesScreenshotsResponseInterface {
  id: number;
  image?: string; // up to 20mb
  hidden?: boolean; // default false
  width?: number;
  height?: number;
}

export interface GamesStoresResponseInterface {
  id: number;
  game_id?: string;
  store_id?: string;
  url?: string;
}

export interface GenreResponseInterface {
  id: number;
  name: string; //max 100 chars
  slug?: string; //formate = ^[-a-zA-Z0-9_]+$
  games_count?: number;
  image_background: string;
  description: string;
}

export interface PlatformResponseInterface {
  id: number;
  name: string; //Format = ^[-a-zA-Z0-9_]+$
  slug?: string;
  games_count?: number;
  image_background?: string;
  image?: string | null;
  year_start?: number | null;
  year_end?: number | null;
}

export interface PlatformsParentResponseInterface {
  id: number;
  name: string; //Format = ^[-a-zA-Z0-9_]+$
  slug?: string;
  platforms?: Array<PlatformResponseInterface>;
}

export interface Ratings {
  id?: number;
  title?: string;
  count?: number;
  percent?: number;
}

export type OrderingType =
  | "name"
  | "released"
  | "added"
  | "created"
  | "updated"
  | "rating"
  | "metacritic";

export type StoresType =
  | "steam"
  | "gog"
  | "epic"
  | "xbox"
  | "playstation"
  | "apple"
  | "google"
  | "itch"
  | "nintendo"
  | "uplay"
  | "origin"
  | "discord"
  | "other";

export type PlatformsType =
  | "pc"
  | "playstation"
  | "xbox"
  | "nintendo"
  | "apple"
  | "android"
  | "linux"
  | "web"
  | "mac"
  | "other";

export type Rating = 1 | 2 | 3 | 4 | 5;
