export interface ResponseInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<any>;
}

export interface BookResponseInterface {
  id: number;
  slug: string; //Format = ^[-a-zA-Z0-9_]+$
  name: string;
}

export type Rating = 1 | 2 | 3 | 4 | 5;
