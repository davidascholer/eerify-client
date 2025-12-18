import { TriggerRatings } from "../lib/types"

let customApiUrl: string | null = null

const triggerCache: Map<number, TriggerRatings> = new Map()

export const setTriggerApiUrl = (url: string) => {
  customApiUrl = url
}

export const getTriggerApiUrl = (): string | null => {
  return customApiUrl
}

export const clearTriggerCache = () => {
  triggerCache.clear()
}

export const fetchTriggerData = async (movieId: number): Promise<TriggerRatings | null> => {
  if (triggerCache.has(movieId)) {
    return triggerCache.get(movieId)!
  }

  if (!customApiUrl) {
    console.warn('Custom trigger API URL not configured')
    return null
  }

  try {
    const response = await fetch(`${customApiUrl}/triggers/${movieId}`)
    
    if (!response.ok) {
      console.error(`Failed to fetch trigger data for movie ${movieId}: ${response.statusText}`)
      return null
    }

    const data = await response.json()
    const triggerData = data as TriggerRatings
    
    triggerCache.set(movieId, triggerData)
    
    return triggerData
  } catch (error) {
    console.error(`Error fetching trigger data for movie ${movieId}:`, error)
    return null
  }
}

export const fetchAllTriggerData = async (): Promise<Record<number, TriggerRatings>> => {
  if (!customApiUrl) {
    console.warn('Custom trigger API URL not configured')
    return {}
  }

  try {
    const response = await fetch(`${customApiUrl}/triggers`)
    
    if (!response.ok) {
      console.error(`Failed to fetch all trigger data: ${response.statusText}`)
      return {}
    }

    const data = await response.json()
    return data as Record<number, TriggerRatings>
  } catch (error) {
    console.error('Error fetching all trigger data:', error)
    return {}
  }
}
