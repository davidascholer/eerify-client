import { HorrorSubgenre } from './subgenres'

export interface Book {
  id: string
  title: string
  author: string
  coverUrl?: string
  rating?: number
  publishYear?: number
  pageCount?: number
  description?: string
  subjects?: string[]
  isbn?: string
  language?: string
  publishers?: string[]
  subgenres?: HorrorSubgenre[]
}

export interface BookDetails extends Book {
  fullDescription?: string
  firstPublishYear?: number
  editions?: number
}

export interface UserProfile {
  name: string
  bio: string
  favoriteSubgenres: HorrorSubgenre[]
  createdAt: number
}

export interface ViewingHistoryEntry {
  bookId: string
  timestamp: number
  title: string
  author: string
  coverUrl?: string
  subgenres?: HorrorSubgenre[]
}

export type SortOption = 'rating-high' | 'rating-low' | 'date-new' | 'date-old' | 'title-az' | 'title-za'
export type TriggerFilterLevel = 0 | 1 | 2 | null