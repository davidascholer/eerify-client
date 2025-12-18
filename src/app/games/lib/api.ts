import type { GamesResponse, Game, GenresResponse, PlatformsResponse, TagsResponse, TrailersResponse } from './types'

const BASE_URL = import.meta.env.DEV ? '/rawg' : 'https://api.rawg.io/api'
const API_KEY = (import.meta.env.VITE_RAWG_API_KEY ?? '').toString()

function requireApiKey() {
  if (!API_KEY) {
    throw new Error('Missing VITE_RAWG_API_KEY. Set it in your env file.')
  }
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
    requireApiKey()
    const searchParams = new URLSearchParams({
      key: API_KEY,
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
    requireApiKey()
    const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch game details')
    return response.json()
  },

  async getGameTrailers(id: number): Promise<TrailersResponse> {
    requireApiKey()
    const response = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch game trailers')
    return response.json()
  },

  async getGenres(): Promise<GenresResponse> {
    requireApiKey()
    const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch genres')
    return response.json()
  },

  async getPlatforms(): Promise<PlatformsResponse> {
    requireApiKey()
    const response = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch platforms')
    return response.json()
  },

  async getTags(): Promise<TagsResponse> {
    requireApiKey()
    const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch tags')
    return response.json()
  },
}
