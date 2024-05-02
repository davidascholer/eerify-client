const token = "key=" + import.meta.env.VITE_FILM_API_KEY;
export const ROOT_API = import.meta.env.VITE_FILM_API_ADDRESS;

const appendToken = (endpoint: string) => endpoint + "?" + token;

const FILM_ENDPOINTS = {
  films: appendToken("film"),
  film: appendToken("film/:id"),
  // bookScreenshots: appendToken("books/:id/screenshots"),
  // // Returns the same response as books, but filtered by the book series e.g. Resident Evil -> Resident Evil.
  // bookSeries: appendToken("books/:id/book-series"),
  // bookStores: appendToken("books/:id/stores"),
  // platforms: appendToken("platforms"),
  // platform: appendToken("platform/:id"),
  // platformParents: appendToken("platforms/lists/parents"),
  // genres: appendToken("genres"),
  // genre: appendToken("genres/:id"),
};

export default FILM_ENDPOINTS;
