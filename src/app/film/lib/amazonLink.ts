export function generateAmazonLink(movieTitle: string, releaseYear?: string): string {
  const searchQuery = releaseYear 
    ? `${movieTitle} ${releaseYear} movie`
    : `${movieTitle} movie`
  
  const encodedQuery = encodeURIComponent(searchQuery)
  
  return `https://www.amazon.com/s?k=${encodedQuery}&i=movies-tv`
}

export function generateAmazonPrimeVideoLink(movieTitle: string, releaseYear?: string): string {
  const searchQuery = releaseYear 
    ? `${movieTitle} ${releaseYear}`
    : movieTitle
  
  const encodedQuery = encodeURIComponent(searchQuery)
  
  return `https://www.amazon.com/gp/video/search?phrase=${encodedQuery}`
}

export function generateAmazonRentBuyLink(movieTitle: string, releaseYear?: string): string {
  return generateAmazonLink(movieTitle, releaseYear)
}
