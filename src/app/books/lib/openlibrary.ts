import { Book, BookDetails } from './types'
import { detectSubgenres } from './subgenres'

const OPENLIBRARY_BASE = 'https://openlibrary.org'
const COVERS_BASE = 'https://covers.openlibrary.org/b'

export async function fetchHorrorBooks(limit = 50): Promise<Book[]> {
  try {
    const subject = 'horror'
    const response = await fetch(
      `${OPENLIBRARY_BASE}/subjects/${subject}.json?limit=${limit}&details=true`
    )
    
    if (!response.ok) throw new Error('Failed to fetch books')
    
    const data = await response.json()
    
    return data.works?.map((work: any) => {
      const title = work.title || 'Untitled'
      const description = work.description || ''
      const subjects = work.subject || []
      const subgenres = detectSubgenres(title, description, subjects)
      
      return {
        id: work.key.replace('/works/', ''),
        title,
        author: work.authors?.[0]?.name || 'Unknown Author',
        coverUrl: work.cover_id 
          ? `${COVERS_BASE}/id/${work.cover_id}-L.jpg`
          : undefined,
        rating: work.ratings_average || 0,
        publishYear: work.first_publish_year,
        pageCount: undefined,
        description,
        subjects,
        subgenres
      }
    }) || []
  } catch (error) {
    console.error('Error fetching horror books:', error)
    return []
  }
}

export async function searchHorrorBooks(query: string, limit = 8): Promise<Book[]> {
  if (!query || query.length < 2) return []
  
  try {
    const response = await fetch(
      `${OPENLIBRARY_BASE}/search.json?q=${encodeURIComponent(query)}&subject=horror&limit=${limit}`
    )
    
    if (!response.ok) throw new Error('Failed to search books')
    
    const data = await response.json()
    
    return data.docs?.map((doc: any) => {
      const title = doc.title || 'Untitled'
      const description = ''
      const subjects = doc.subject || []
      const subgenres = detectSubgenres(title, description, subjects)
      
      return {
        id: doc.key.replace('/works/', ''),
        title,
        author: doc.author_name?.[0] || 'Unknown Author',
        coverUrl: doc.cover_i 
          ? `${COVERS_BASE}/id/${doc.cover_i}-M.jpg`
          : undefined,
        rating: doc.ratings_average || 0,
        publishYear: doc.first_publish_year,
        pageCount: doc.number_of_pages_median,
        subjects,
        subgenres
      }
    }) || []
  } catch (error) {
    console.error('Error searching books:', error)
    return []
  }
}

export async function getBookDetails(bookId: string): Promise<BookDetails | null> {
  try {
    const workResponse = await fetch(`${OPENLIBRARY_BASE}/works/${bookId}.json`)
    if (!workResponse.ok) throw new Error('Failed to fetch book details')
    
    const work = await workResponse.json()
    
    const ratingsResponse = await fetch(`${OPENLIBRARY_BASE}/works/${bookId}/ratings.json`)
    const ratings = ratingsResponse.ok ? await ratingsResponse.json() : null
    
    const description = typeof work.description === 'string' 
      ? work.description 
      : work.description?.value || 'No description available'
    
    let authorName = 'Unknown Author'
    if (work.authors?.[0]?.author?.key) {
      authorName = await getAuthorName(work.authors[0].author.key)
    }
    
    const title = work.title || 'Untitled'
    const subjects = work.subjects || []
    const subgenres = detectSubgenres(title, description, subjects)
    
    return {
      id: bookId,
      title,
      author: authorName,
      coverUrl: work.covers?.[0] 
        ? `${COVERS_BASE}/id/${work.covers[0]}-L.jpg`
        : undefined,
      rating: ratings?.summary?.average || 0,
      publishYear: work.created?.value ? new Date(work.created.value).getFullYear() : undefined,
      description: description.substring(0, 300),
      fullDescription: description,
      subjects,
      firstPublishYear: work.first_publish_year,
      subgenres
    }
  } catch (error) {
    console.error('Error fetching book details:', error)
    return null
  }
}

export async function getAuthorName(authorKey: string): Promise<string> {
  try {
    const response = await fetch(`${OPENLIBRARY_BASE}${authorKey}.json`)
    if (!response.ok) return 'Unknown Author'
    const author = await response.json()
    return author.name || 'Unknown Author'
  } catch {
    return 'Unknown Author'
  }
}
