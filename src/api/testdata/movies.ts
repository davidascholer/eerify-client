// testData.ts

import { MovieTriggers } from "../testdata";

const testMovies: MovieTriggers[] = [
  {
    movieId: 426063,
    description: "Nosferatu (2024)",
    triggers: {
      doesTheDogDie: 0,
      jumpScare: 1,
      blood: 1,
      bodyHorror: 1,
      surgery: 0,
      isolation: 1,
      doom: 1,
      possession: 0,
      torture: 0,
    },
  },
  {
    movieId: 1010581,
    description: "Culpa mía (placeholder horror?)",
    triggers: {
      doesTheDogDie: 0,
      jumpScare: 0,
      blood: 0,
      bodyHorror: 0,
      surgery: 0,
      isolation: 0,
      doom: 0,
      possession: 0,
      torture: 0,
    },
  },
  {
    movieId: 496243,
    description: "A Nightmare on Elm Street (1984)",
    triggers: {
      doesTheDogDie: 0,
      jumpScare: 1,
      blood: 1,
      bodyHorror: 0,
      surgery: 0,
      isolation: 1,
      doom: 1,
      possession: 1,
      torture: 0,
    },
  },
  {
    movieId: 332562,
    description: "The Conjuring 2",
    triggers: {
      doesTheDogDie: 0,
      jumpScare: 1,
      blood: 1,
      bodyHorror: 0,
      surgery: 0,
      isolation: 0,
      doom: 1,
      possession: 1,
      torture: 0,
    },
  },
  {
    movieId: 155,
    description: "The Texas Chain Saw Massacre",
    triggers: {
      doesTheDogDie: 0,
      jumpScare: 1,
      blood: 1,
      bodyHorror: 0,
      surgery: 0,
      isolation: 1,
      doom: 1,
      possession: 0,
      torture: 1,
    },
  },
  {
    movieId: 26896,
    description: "Alien",
    triggers: {
      doesTheDogDie: 0,
      jumpScare: 1,
      blood: 1,
      bodyHorror: 1,
      surgery: 0,
      isolation: 1,
      doom: 1,
      possession: 0,
      torture: 0,
    },
  },
  {
    movieId: 1885,
    description: "Friday the 13th",
    triggers: {
      doesTheDogDie: 0,
      jumpScare: 1,
      blood: 1,
      bodyHorror: 0,
      surgery: 0,
      isolation: 1,
      doom: 1,
      possession: 0,
      torture: 1,
    },
  },
  {
    movieId: 9480,
    description: "The Cabin in the Woods",
    triggers: {
      doesTheDogDie: 1,
      jumpScare: 1,
      blood: 1,
      bodyHorror: 0,
      surgery: 0,
      isolation: 1,
      doom: 1,
      possession: 0,
      torture: 1,
    },
  },
  // For brevity only 8 shown; repeat pattern with real movie IDs
];

// // fill the array up to 100, e.g.:
// for (let i = testMovies.length; i < 100; i++) {
//   testMovies.push({
//     movieId: 100000 + i,
//     description: `Horror Placeholder #${i + 1}`,
//     triggers: {
//       doesTheDogDie: Math.round(Math.random()),
//       jumpScare: Math.round(Math.random()),
//       blood: Math.round(Math.random()),
//       bodyHorror: Math.round(Math.random()),
//       surgery: Math.round(Math.random()),
//       isolation: Math.round(Math.random()),
//       doom: Math.round(Math.random()),
//       possession: Math.round(Math.random()),
//       torture: Math.round(Math.random()),
//     },
//   });
// }

export default testMovies;
