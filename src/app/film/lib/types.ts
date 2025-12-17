export interface TriggerRatings {
  doesTheDogDie: number | null
  jumpScare: number | null
  blood: number | null
  bodyHorror: number | null
  surgery: number | null
  isolation: number | null
  doom: number | null
  possession: number | null
  torture: number | null
  claustrophobia: number | null
}

export interface TriggerInfo {
  label: string
  description: string
}

export const TRIGGER_INFO: Record<keyof TriggerRatings, TriggerInfo> = {
  doesTheDogDie: {
    label: "Animal Death",
    description: "Does an animal die or get hurt?"
  },
  jumpScare: {
    label: "Jump Scares",
    description: "Sudden frightening moments with loud noises"
  },
  blood: {
    label: "Blood/Gore",
    description: "Graphic blood and violence"
  },
  bodyHorror: {
    label: "Body Horror",
    description: "Disturbing bodily transformation or mutilation"
  },
  surgery: {
    label: "Surgery/Medical",
    description: "Medical procedures or surgery scenes"
  },
  isolation: {
    label: "Isolation",
    description: "Themes of being alone or trapped"
  },
  doom: {
    label: "Existential Dread",
    description: "Hopelessness and impending doom"
  },
  possession: {
    label: "Possession",
    description: "Demonic or supernatural possession"
  },
  torture: {
    label: "Torture",
    description: "Prolonged torture or suffering"
  },
  claustrophobia: {
    label: "Claustrophobia",
    description: "Confined or tight spaces that induce panic"
  }
}

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids?: number[]
  runtime?: number
  tagline?: string
  genres?: { id: number; name: string }[]
  original_language?: string
}

export interface MovieDetails extends Movie {
  runtime: number
  tagline: string
  genres: { id: number; name: string }[]
  production_companies?: { id: number; name: string; logo_path: string | null }[]
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[]
    crew: { id: number; name: string; job: string }[]
  }
  videos?: {
    results: { id: string; key: string; name: string; site: string; type: string }[]
  }
}

export interface UserReview {
  movieId: number
  rating?: number
  reviewText?: string
  triggers?: TriggerRatings
  createdAt: string
  userId?: string
  userLogin?: string
  userAvatar?: string
}

export interface UserRating {
  movieId: number
  rating: number
}

export interface ViewingHistoryEntry {
  movieId: number
  viewedAt: string
  duration?: number
  completed: boolean
}

export interface UserProfile {
  userId: string
  userName: string
  userAvatar?: string
  bio?: string
  createdAt: string
  updatedAt: string
  favoriteSubgenres: string[]
  viewingHistory: ViewingHistoryEntry[]
  stats: {
    totalMoviesWatched: number
    totalReviews: number
    favoriteCount: number
    averageRating: number
    mostWatchedSubgenre?: string
  }
}
