export interface TriggerWarning {
  violence: number
  gore: number
  sexual_content: number
  abuse: number
  death: number
  mental_health: number
  substance_abuse: number
  body_horror: number
}

export interface BookReview {
  bookId: string
  triggers: TriggerWarning
  review: string
  rating: number
  timestamp: number
}

export const DEFAULT_TRIGGERS: TriggerWarning = {
  violence: 0,
  gore: 0,
  sexual_content: 0,
  abuse: 0,
  death: 0,
  mental_health: 0,
  substance_abuse: 0,
  body_horror: 0
}

export const TRIGGER_LABELS: Record<keyof TriggerWarning, string> = {
  violence: 'Violence',
  gore: 'Gore',
  sexual_content: 'Sexual Content',
  abuse: 'Abuse',
  death: 'Death',
  mental_health: 'Mental Health',
  substance_abuse: 'Substance Abuse',
  body_horror: 'Body Horror'
}

export const triggerData: Record<string, TriggerWarning> = {}