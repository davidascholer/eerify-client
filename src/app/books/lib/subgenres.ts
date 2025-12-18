export const HORROR_SUBGENRES = [
  'gothic',
  'supernatural',
  'psychological',
  'cosmic horror',
  'folk horror',
  'body horror',
  'haunted house',
  'vampire',
  'werewolf',
  'ghost story',
  'occult',
  'southern gothic',
  'splatterpunk',
  'dark fantasy',
  'weird fiction'
] as const

export type HorrorSubgenre = typeof HORROR_SUBGENRES[number]

const SUBGENRE_KEYWORDS: Record<HorrorSubgenre, string[]> = {
  'gothic': ['gothic', 'dracula', 'frankenstein', 'castle', 'victorian', 'poe', 'shelley'],
  'supernatural': ['supernatural', 'paranormal', 'spirit', 'demon', 'entity', 'haunting', 'possession'],
  'psychological': ['psychological', 'mind', 'insanity', 'madness', 'psycho', 'mental', 'paranoia'],
  'cosmic horror': ['cosmic', 'lovecraft', 'cthulhu', 'elder', 'eldritch', 'unknowable', 'void', 'cosmic horror'],
  'folk horror': ['folk', 'pagan', 'ritual', 'rural', 'countryside', 'cult', 'folklore', 'midsommar'],
  'body horror': ['body horror', 'mutation', 'transformation', 'flesh', 'cronenberg', 'visceral', 'grotesque'],
  'haunted house': ['haunted house', 'mansion', 'manor', 'estate', 'building', 'house', 'hill house'],
  'vampire': ['vampire', 'vampyr', 'dracula', 'blood', 'immortal', 'undead', 'lestat'],
  'werewolf': ['werewolf', 'lycanthrope', 'wolf', 'full moon', 'transformation', 'beast'],
  'ghost story': ['ghost', 'specter', 'apparition', 'phantom', 'spirit', 'haunting', 'poltergeist'],
  'occult': ['occult', 'witchcraft', 'witch', 'magic', 'spell', 'curse', 'hex', 'dark magic'],
  'southern gothic': ['southern', 'plantation', 'bayou', 'swamp', 'louisiana', 'southern gothic'],
  'splatterpunk': ['splatterpunk', 'extreme', 'brutal', 'violent', 'gore', 'graphic', 'barker'],
  'dark fantasy': ['dark fantasy', 'fantasy', 'magic', 'medieval', 'sword', 'creature'],
  'weird fiction': ['weird', 'strange', 'bizarre', 'uncanny', 'surreal', 'weird fiction', 'ligotti']
}

export function detectSubgenres(title: string, description?: string, subjects?: string[]): HorrorSubgenre[] {
  const text = `${title} ${description || ''} ${subjects?.join(' ') || ''}`.toLowerCase()
  const detected: HorrorSubgenre[] = []
  
  for (const [subgenre, keywords] of Object.entries(SUBGENRE_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
      detected.push(subgenre as HorrorSubgenre)
    }
  }
  
  return detected.length > 0 ? detected : ['psychological']
}

export function getPrimarySubgenre(subgenres: HorrorSubgenre[]): HorrorSubgenre {
  return subgenres[0] || 'psychological'
}

export const SUBGENRE_COLORS: Record<HorrorSubgenre, string> = {
  'gothic': 'bg-purple-900/40 text-purple-200',
  'supernatural': 'bg-blue-900/40 text-blue-200',
  'psychological': 'bg-red-900/40 text-red-200',
  'cosmic horror': 'bg-indigo-900/40 text-indigo-200',
  'folk horror': 'bg-green-900/40 text-green-200',
  'body horror': 'bg-pink-900/40 text-pink-200',
  'haunted house': 'bg-gray-900/40 text-gray-200',
  'vampire': 'bg-red-950/40 text-red-300',
  'werewolf': 'bg-amber-900/40 text-amber-200',
  'ghost story': 'bg-cyan-900/40 text-cyan-200',
  'occult': 'bg-violet-900/40 text-violet-200',
  'southern gothic': 'bg-orange-900/40 text-orange-200',
  'splatterpunk': 'bg-rose-900/40 text-rose-200',
  'dark fantasy': 'bg-fuchsia-900/40 text-fuchsia-200',
  'weird fiction': 'bg-teal-900/40 text-teal-200'
}