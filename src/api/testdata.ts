// types.ts
export type TriggerCounts = {
  doesTheDogDie: number;
  jumpScare: number;
  blood: number;
  bodyHorror: number;
  surgery: number;
  isolation: number;
  doom: number;
  possession: number;
  torture: number;
};

export type MovieTriggers = {
  movieId: number;
  triggers: TriggerCounts;
  description: string;
};
