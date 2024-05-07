export interface ResponseInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<any>;
}

export interface FilmResponseInterface {
  data: FilmDataInterface;
  status: number;
  statusText: string;
  headers: object;
  config: object;
  request: object;
}

export interface FilmDataInterface {
  page: number;
  total_results: string | null;
  total_pages: string | null;
  results: Array<FilmResultInterface>;
}

export interface FilmResultInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type Rating = 1 | 2 | 3 | 4 | 5;
