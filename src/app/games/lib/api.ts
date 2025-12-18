import type { GamesResponse, Game, GenresResponse, PlatformsResponse, TagsResponse, TrailersResponse } from './types'
import { getKV, setKV } from '@/lib/storage/useKV'

const BASE_URL = import.meta.env.VITE_GAMES_API_ADDRESS ?? ''
const ENV_KEY = (import.meta.env.VITE_GAMES_API_KEY ?? '').toString()
const STORAGE_KEY = 'rawg-api-key'

const EMPTY_GAMES_RESPONSE: GamesResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

const EMPTY_TRAILERS_RESPONSE: TrailersResponse = {
  count: 0,
  results: [],
}

const EMPTY_GENRES_RESPONSE: GenresResponse = {
  count: 0,
  results: [],
}

const EMPTY_PLATFORMS_RESPONSE: PlatformsResponse = {
  count: 0,
  results: [],
}

const EMPTY_TAGS_RESPONSE: TagsResponse = {
  count: 0,
  results: [],
}

let cachedApiKey: string | null = null

export function setRawgApiKey(key: string) {
  cachedApiKey = key
  if (typeof window !== 'undefined') {
    setKV(STORAGE_KEY, key)
  }
}

function getApiKey(): string {
  if (cachedApiKey !== null) {
    return cachedApiKey
  }

  if (!import.meta.env.SSR && typeof window !== 'undefined') {
    try {
      cachedApiKey = getKV<string>(STORAGE_KEY, ENV_KEY)
      return cachedApiKey
    } catch {
      // fall through
    }
  }

  cachedApiKey = ENV_KEY
  return cachedApiKey
}

function hasApiKey(): boolean {
  const key = getApiKey()
  if (!key) {
    console.warn('Missing VITE_GAMES_API_KEY. Set it in your env file or local storage (key: rawg-api-key).')
    return false
  }
  return true
}

export const rawgApi = {
  async getGames(params: {
    search?: string
    genres?: string
    platforms?: string
    tags?: string
    page?: number
    page_size?: number
  } = {}): Promise<GamesResponse> {
    if (!hasApiKey()) {
      return EMPTY_GAMES_RESPONSE
    }
    const searchParams = new URLSearchParams({
      key: getApiKey(),
      page_size: String(params.page_size || 20),
      ...(params.search && { search: params.search }),
      ...(params.genres && { genres: params.genres }),
      ...(params.platforms && { platforms: params.platforms }),
      ...(params.tags && { tags: params.tags }),
      ...(params.page && { page: String(params.page) }),
    })

    const response = await fetch(`${BASE_URL}/games?${searchParams}`)
    if (!response.ok) throw new Error('Failed to fetch games')
    return response.json()
  },

  async getGameDetails(id: number): Promise<Game> {
    if (!hasApiKey()) {
      throw new Error('RAWG API key missing; cannot fetch game details.')
    }
    const response = await fetch(`${BASE_URL}/games/${id}?key=${getApiKey()}`)
    if (!response.ok) throw new Error('Failed to fetch game details')
    return response.json()
  },

  async getGameTrailers(id: number): Promise<TrailersResponse> {
    if (!hasApiKey()) {
      return EMPTY_TRAILERS_RESPONSE
    }
    const response = await fetch(`${BASE_URL}/games/${id}/movies?key=${getApiKey()}`)
    if (!response.ok) throw new Error('Failed to fetch game trailers')
    return response.json()
  },

  async getGenres(): Promise<GenresResponse> {
    if (!hasApiKey()) {
      return EMPTY_GENRES_RESPONSE
    }
    const response = await fetch(`${BASE_URL}/genres?key=${getApiKey()}`)
    if (!response.ok) throw new Error('Failed to fetch genres')
    return response.json()
  },

  async getPlatforms(): Promise<PlatformsResponse> {
    if (!hasApiKey()) {
      return EMPTY_PLATFORMS_RESPONSE
    }
    const response = await fetch(`${BASE_URL}/platforms?key=${getApiKey()}`)
    if (!response.ok) throw new Error('Failed to fetch platforms')
    return response.json()
  },

  async getTags(): Promise<TagsResponse> {
    if (!hasApiKey()) {
      return EMPTY_TAGS_RESPONSE
    }
    const response = await fetch(`${BASE_URL}/tags?key=${getApiKey()}`)
    if (!response.ok) throw new Error('Failed to fetch tags')
    return response.json()
  },
}
