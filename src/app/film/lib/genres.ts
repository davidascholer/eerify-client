export const HORROR_GENRE_ID = 27

export const HORROR_SUBGENRES: Record<number, string> = {
  878: 'Sci-Fi Horror',
  53: 'Thriller',
  9648: 'Mystery',
  14: 'Fantasy Horror',
  80: 'Crime Horror',
  10751: 'Family Horror',
  10749: 'Romance Horror',
  12: 'Adventure Horror',
  35: 'Comedy Horror',
  10752: 'War Horror',
  36: 'Historical Horror',
  37: 'Western Horror',
  99: 'Documentary',
  18: 'Drama Horror',
  10770: 'TV Movie',
  16: 'Animated Horror',
  10402: 'Musical Horror',
}

export const getGenreNames = (genreIds?: number[]): string[] => {
  if (!genreIds || genreIds.length === 0) return []
  
  return genreIds
    .filter(id => id !== HORROR_GENRE_ID)
    .map(id => HORROR_SUBGENRES[id])
    .filter(Boolean)
}

export const TMDB_GENRE_SUBGENRES = [
  { id: 53, name: 'Thriller' },
  { id: 9648, name: 'Mystery' },
  { id: 878, name: 'Sci-Fi Horror' },
  { id: 14, name: 'Fantasy' },
  { id: 35, name: 'Comedy Horror' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 12, name: 'Adventure' },
]

export type HorrorSubgenre = 
  | 'slasher'
  | 'supernatural'
  | 'psychological'
  | 'zombie'
  | 'vampire'
  | 'werewolf'
  | 'ghost'
  | 'possession'
  | 'found-footage'
  | 'gothic'
  | 'survival'
  | 'creature'
  | 'occult'
  | 'cosmic'
  | 'folk'
  | 'giallo'

export interface SubgenreDefinition {
  id: HorrorSubgenre
  name: string
  description: string
  keywords: string[]
}

export const HORROR_SUBGENRE_DEFINITIONS: SubgenreDefinition[] = [
  {
    id: 'slasher',
    name: 'Slasher',
    description: 'Killer stalking and murdering victims',
    keywords: ['slash', 'kill', 'murder', 'knife', 'mask', 'serial killer', 'massacre', 'scream', 'halloween', 'friday', 'nightmare on elm', 'chainsaw', 'psycho', 'stab']
  },
  {
    id: 'supernatural',
    name: 'Supernatural',
    description: 'Paranormal and otherworldly phenomena',
    keywords: ['supernatural', 'paranormal', 'spirit', 'haunted', 'haunting', 'curse', 'demon', 'evil', 'entity', 'poltergeist', 'conjuring', 'insidious', 'sinister']
  },
  {
    id: 'psychological',
    name: 'Psychological',
    description: 'Mental terror and mind games',
    keywords: ['psychological', 'mind', 'madness', 'insane', 'mental', 'psycho', 'disturb', 'twist', 'descent', 'black swan', 'shutter island', 'get out', 'hereditary']
  },
  {
    id: 'zombie',
    name: 'Zombie',
    description: 'Undead and infected hordes',
    keywords: ['zombie', 'undead', 'living dead', 'infected', 'outbreak', 'apocalypse', 'walking dead', 'dawn of the dead', 'night of the living', '28 days', 'world war z', 'train to busan']
  },
  {
    id: 'vampire',
    name: 'Vampire',
    description: 'Bloodsucking immortals',
    keywords: ['vampire', 'dracula', 'nosferatu', 'blood', 'fang', 'immortal', 'bite', 'neck', 'let the right one', 'lost boys', 'interview with']
  },
  {
    id: 'werewolf',
    name: 'Werewolf',
    description: 'Lycanthrope transformations',
    keywords: ['werewolf', 'lycanthrope', 'wolf', 'full moon', 'transformation', 'beast', 'howl', 'american werewolf', 'dog soldiers', 'ginger snaps']
  },
  {
    id: 'ghost',
    name: 'Ghost Story',
    description: 'Spectral hauntings and apparitions',
    keywords: ['ghost', 'spirit', 'apparition', 'spectral', 'phantom', 'wraith', 'sixth sense', 'others', 'orphanage', 'ring', 'grudge', 'shining']
  },
  {
    id: 'possession',
    name: 'Possession',
    description: 'Demonic or spiritual possession',
    keywords: ['possess', 'exorcis', 'demon', 'devil', 'satan', 'evil dead', 'omen', 'rosemary', 'constantine']
  },
  {
    id: 'found-footage',
    name: 'Found Footage',
    description: 'First-person documentary style',
    keywords: ['found footage', 'blair witch', 'paranormal activity', 'rec', 'cloverfield', 'vhs', 'chronicle', 'unfriended', 'host']
  },
  {
    id: 'gothic',
    name: 'Gothic Horror',
    description: 'Dark atmosphere and Victorian dread',
    keywords: ['gothic', 'crimson peak', 'sleepy hollow', 'frankenstein', 'victorian', 'castle', 'manor', 'mansion', 'woman in black']
  },
  {
    id: 'survival',
    name: 'Survival Horror',
    description: 'Fighting to stay alive',
    keywords: ['survival', 'trapped', 'cabin', 'woods', 'isolated', 'descent', 'green room', 'frozen', 'open water', 'backcountry', 'beast']
  },
  {
    id: 'creature',
    name: 'Creature Feature',
    description: 'Monsters and beasts',
    keywords: ['creature', 'monster', 'beast', 'alien', 'thing', 'predator', 'tremors', 'anaconda', 'lake placid', 'crawl', 'jaws', 'piranha', 'meg']
  },
  {
    id: 'occult',
    name: 'Occult',
    description: 'Dark magic and rituals',
    keywords: ['occult', 'ritual', 'cult', 'witch', 'coven', 'wicker man', 'midsommar', 'lords of salem', 'ninth gate', 'suspiria', 'craft']
  },
  {
    id: 'cosmic',
    name: 'Cosmic Horror',
    description: 'Lovecraftian dread and the unknown',
    keywords: ['cosmic', 'lovecraft', 'cthulhu', 'void', 'unknown', 'incomprehensible', 'elder', 'color out of space', 'lighthouse', 'annihilation', 'underwater']
  },
  {
    id: 'folk',
    name: 'Folk Horror',
    description: 'Rural traditions and pagan rituals',
    keywords: ['folk', 'pagan', 'ritual', 'rural', 'village', 'witch', 'apostle', 'kill list', 'blood on satan', 'wicker man', 'midsommar', 'ritual']
  },
  {
    id: 'giallo',
    name: 'Giallo',
    description: 'Italian thriller-horror mysteries',
    keywords: ['giallo', 'argento', 'bava', 'suspiria', 'tenebrae', 'deep red', 'italian', 'mystery', 'stylized']
  }
]

export const COMMON_HORROR_SUBGENRES = HORROR_SUBGENRE_DEFINITIONS.map(def => ({
  id: def.id,
  name: def.name,
  description: def.description
}))

export const detectMovieSubgenres = (movie: {
  title: string
  overview: string
  genre_ids?: number[]
  genres?: { id: number; name: string }[]
}): HorrorSubgenre[] => {
  const searchText = `${movie.title} ${movie.overview}`.toLowerCase()
  const detectedSubgenres: HorrorSubgenre[] = []

  for (const subgenre of HORROR_SUBGENRE_DEFINITIONS) {
    const hasMatch = subgenre.keywords.some(keyword => 
      searchText.includes(keyword.toLowerCase())
    )
    
    if (hasMatch) {
      detectedSubgenres.push(subgenre.id)
    }
  }

  return detectedSubgenres
}
