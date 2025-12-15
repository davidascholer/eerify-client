// types.ts
export type ReviewNumberType = 1 | 2 | 3 | 4 | 5;

export type TriggerCounts = {
  doesTheDogDie: ReviewNumberType;
  jumpScare: ReviewNumberType;
  blood: ReviewNumberType;
  bodyHorror: ReviewNumberType;
  surgery: ReviewNumberType;
  isolation: ReviewNumberType;
  doom: ReviewNumberType;
  possession: ReviewNumberType;
  torture: ReviewNumberType;
};

export type MovieReview = {
  id: number;
  movieId: number;
  userId: number;
  rating: ReviewNumberType;
  triggers: TriggerCounts;
  comment: string;
};
