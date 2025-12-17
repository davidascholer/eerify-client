# API Documentation

This folder contains all external API integrations for the HorrorMovies application.

## TMDB API (`tmdb.ts`)

Handles all interactions with The Movie Database (TMDB) API.

### Functions

- `setApiKey(key: string)` - Set the TMDB API key
- `getApiKey()` - Get the current TMDB API key (checks cache and KV storage)
- `getImageUrl(path, size)` - Generate TMDB image URLs
- `getHorrorMovies(page)` - Fetch popular horror movies
- `getTopRatedHorrorMovies()` - Fetch top-rated horror movies
- `getRecentHorrorMovies()` - Fetch recent horror movie releases
- `getMovieDetails(movieId)` - Fetch detailed information for a specific movie
- `searchHorrorMovies(query)` - Search for horror movies by title

### Usage

```typescript
import { getHorrorMovies, setApiKey } from '@/api/tmdb'

setApiKey('your-api-key-here')
const movies = await getHorrorMovies(1)
```

## Custom Trigger API (`triggers.ts`)

Handles interactions with your custom trigger data API endpoint.

### Configuration

Set your custom API base URL through the Settings dialog in the app, or programmatically:

```typescript
import { setTriggerApiUrl } from '@/api/triggers'

setTriggerApiUrl('https://api.example.com')
```

The API URL is stored in KV storage under the key `trigger-api-url` and persists between sessions.

### Expected API Endpoints

Your custom API should implement the following endpoints:

#### GET `/triggers`
Fetches trigger data for all movies.

**Response Format:**
```json
{
  "663712": {
    "doesTheDogDie": 0,
    "jumpScare": 2,
    "blood": 2,
    "bodyHorror": 1,
    "surgery": 0,
    "isolation": 1,
    "doom": 2,
    "possession": 2,
    "torture": 1
  },
  "539": {
    "doesTheDogDie": 0,
    "jumpScare": 1,
    ...
  }
}
```

#### GET `/triggers/:movieId`
Fetches trigger data for a specific movie.

**URL Parameters:**
- `movieId` (number) - The TMDB movie ID

**Response Format:**
```json
{
  "doesTheDogDie": 0,
  "jumpScare": 2,
  "blood": 2,
  "bodyHorror": 1,
  "surgery": 0,
  "isolation": 1,
  "doom": 2,
  "possession": 2,
  "torture": 1
}
```

### Trigger Rating Scale

All trigger values use a 0-5 scale:
- `null` - No review/data available
- `0-1` - Low risk (green indicator)
- `2-3` - Caution (yellow indicator)
- `4-5` - Warning (red indicator)

### Trigger Categories

- `doesTheDogDie` - Animal death or harm
- `jumpScare` - Sudden frightening moments with loud noises
- `blood` - Graphic blood and violence
- `bodyHorror` - Disturbing bodily transformation or mutilation
- `surgery` - Medical procedures or surgery scenes
- `isolation` - Themes of being alone or trapped
- `doom` - Existential dread and hopelessness
- `possession` - Demonic or supernatural possession
- `torture` - Prolonged torture or suffering

### Functions

- `setTriggerApiUrl(url: string)` - Configure the custom API base URL
- `getTriggerApiUrl()` - Get the current configured API URL
- `fetchTriggerData(movieId: number)` - Fetch trigger data for a specific movie
- `fetchAllTriggerData()` - Fetch trigger data for all movies

### Usage

```typescript
import { fetchTriggerData, setTriggerApiUrl } from '@/api/triggers'

setTriggerApiUrl('https://api.example.com')
const triggers = await fetchTriggerData(663712)
```

### Fallback Behavior

If the custom API is not configured or fails to respond:
- The app silently falls back to local trigger data stored in `/src/lib/triggerData.ts`
- No error is shown to the user, ensuring a seamless experience
- You can check the browser console for warnings about API availability

### Error Handling

All API calls handle errors gracefully:
- Network failures return `null` or empty objects
- Invalid responses are logged to console
- The app continues to function using local data

## Integration Example

```typescript
import { getMovieDetails } from '@/api/tmdb'
import { fetchTriggerData } from '@/api/triggers'

async function loadMovieWithTriggers(movieId: number) {
  const [details, triggers] = await Promise.all([
    getMovieDetails(movieId),
    fetchTriggerData(movieId)
  ])
  
  return { details, triggers }
}
```
