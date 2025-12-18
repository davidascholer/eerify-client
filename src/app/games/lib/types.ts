export interface Game {
  id: number
  name: string
  background_image: string
  rating: number
  rating_top: number
  ratings_count: number
  released: string
  platforms: {
    platform: {
      id: number
      name: string
      slug: string
    }
  }[]
  genres: {
    id: number
    name: string
    slug: string
  }[]
  short_screenshots?: {
    id: number
    image: string
  }[]
  metacritic?: number
  esrb_rating?: {
    id: number
    name: string
    slug: string
  }
  description_raw?: string
  developers?: {
    id: number
    name: string
    slug: string
  }[]
  publishers?: {
    id: number
    name: string
    slug: string
  }[]
  clip?: {
    clip: string
    clips: {
      [key: string]: string
    }
    video: string
    preview: string
  }
}

export interface Trailer {
  id: number
  name: string
  preview: string
  data: {
    480: string
    max: string
  }
}

export interface TrailersResponse {
  count: number
  results: Trailer[]
}

export interface GamesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
}

export interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface Platform {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface GenresResponse {
  count: number
  results: Genre[]
}

export interface PlatformsResponse {
  count: number
  results: Platform[]
}

export interface Tag {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface TagsResponse {
  count: number
  results: Tag[]
}
