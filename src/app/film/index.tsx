import { useState, useEffect, useMemo } from "react";
import { useKV } from "@/lib/storage/useKV";
import {
  Movie,
  UserReview,
  TriggerRatings,
  UserProfile,
  ViewingHistoryEntry,
} from "./lib/types";
import {
  getHorrorMovies,
  getTrendingMovies,
  getRecentHorrorMovies,
  getNewReleaseHorrorMovies,
  getUpcomingHorrorMovies,
  getForeignHorrorMovies,
  getTopRatedHorrorByDecade,
  setApiKey,
  enrichMoviesWithRuntime,
} from "./api/tmdb";
import { setTriggerApiUrl } from "./api/triggers";
import { getTriggerDataForMovie } from "./lib/triggerData";
import {
  detectMovieSubgenres,
  HORROR_SUBGENRE_DEFINITIONS,
  HorrorSubgenre,
} from "./lib/genres";
import {
  calculateProfileStats,
  generatePersonalizedRecommendations,
} from "./lib/recommendations";
import { MovieList } from "./components/MovieList";
import { MovieDetailsPage } from "./components/MovieDetailsPage";
import { MovieGridPage } from "./components/MovieGridPage";
import { SettingsDialog } from "./components/SettingsDialog";
import { SearchBar } from "./components/SearchBar";
import { FilterOptions } from "./components/FilterBar";
import { ShareFavoritesDialog } from "./components/ShareFavoritesDialog";
import { ShareWatchlistDialog } from "./components/ShareWatchlistDialog";
import { SharedFavoritesBanner } from "./components/SharedFavoritesBanner";
import { SharedWatchlistBanner } from "./components/SharedWatchlistBanner";
import { KeyboardNavigationHint } from "./components/KeyboardNavigationHint";
import { UserProfileDialog } from "./components/UserProfileDialog";
import { DevTools } from "./components/DevTools";
import { ExportDialog } from "./components/ExportDialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Pentagram from "@/assets/icons/Pentagram";
import SpinningPentagram from "@/components/loading/SpinningPentagram";

type ViewMode = "home" | "grid" | "details";
type GridCategory =
  | "trending"
  | "forYou"
  | "recommended"
  | "favorites"
  | "watchLater"
  | "newReleases"
  | "comingSoon"
  | "foreign"
  | "decade-2020s"
  | "decade-2010s"
  | "decade-2000s"
  | "decade-1990s"
  | "decade-1980s"
  | "decade-1970s"
  | "decade-1960s"
  | "decade-pre1960"
  | `subgenre-${string}`;

const DEFAULT_TRIGGERS: TriggerRatings = {
  doesTheDogDie: null,
  jumpScare: null,
  blood: null,
  bodyHorror: null,
  surgery: null,
  isolation: null,
  doom: null,
  possession: null,
  torture: null,
  claustrophobia: null,
};

const MOCK_USER = {
  id: 12345,
  login: "sampleuser",
  avatarUrl: "https://example.com/avatar.png",
};

function FilmPage() {
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingTotalPages, setTrendingTotalPages] = useState(1);
  const [isLoadingMoreTrending, setIsLoadingMoreTrending] = useState(false);

  const [forYouMovies, setForYouMovies] = useState<Movie[]>([]);
  const [forYouPage, setForYouPage] = useState(1);
  const [forYouTotalPages, setForYouTotalPages] = useState(1);
  const [isLoadingMoreForYou, setIsLoadingMoreForYou] = useState(false);

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);

  const [newReleaseMovies, setNewReleaseMovies] = useState<Movie[]>([]);
  const [newReleasePage, setNewReleasePage] = useState(1);
  const [newReleaseTotalPages, setNewReleaseTotalPages] = useState(1);
  const [isLoadingMoreNewReleases, setIsLoadingMoreNewReleases] =
    useState(false);

  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [upcomingTotalPages, setUpcomingTotalPages] = useState(1);
  const [isLoadingMoreUpcoming, setIsLoadingMoreUpcoming] = useState(false);

  const [foreignMovies, setForeignMovies] = useState<Movie[]>([]);
  const [foreignMoviesPage, setForeignMoviesPage] = useState(1);
  const [foreignMoviesTotalPages, setForeignMoviesTotalPages] = useState(1);
  const [isLoadingMoreForeign, setIsLoadingMoreForeign] = useState(false);

  const [movies2020s, setMovies2020s] = useState<Movie[]>([]);
  const [movies2010s, setMovies2010s] = useState<Movie[]>([]);
  const [movies2000s, setMovies2000s] = useState<Movie[]>([]);
  const [movies1990s, setMovies1990s] = useState<Movie[]>([]);
  const [movies1980s, setMovies1980s] = useState<Movie[]>([]);
  const [movies1970s, setMovies1970s] = useState<Movie[]>([]);
  const [movies1960s, setMovies1960s] = useState<Movie[]>([]);
  const [moviesPre1960, setMoviesPre1960] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [gridCategory, setGridCategory] = useState<GridCategory>("trending");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareWatchlistDialogOpen, setShareWatchlistDialogOpen] =
    useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [sharedMovieIds, setSharedMovieIds] = useState<number[]>([]);
  const [showSharedBanner, setShowSharedBanner] = useState(false);
  const [sharedWatchlistIds, setSharedWatchlistIds] = useState<number[]>([]);
  const [showSharedWatchlistBanner, setShowSharedWatchlistBanner] =
    useState(false);

  const [favorites, setFavorites] = useKV<number[]>("horror-favorites", []);
  const [watchLater, setWatchLater] = useKV<number[]>("horror-watch-later", []);
  const [reviews, setReviews] = useKV<Record<number, UserReview>>(
    "horror-reviews",
    {}
  );
  const [movieReviews, setMovieReviews] = useKV<Record<number, UserReview[]>>(
    "horror-movie-reviews",
    {}
  );
  const [apiToken, setApiToken] = useKV<string | null>("tmdb-api-key", null);
  const [triggerApiUrl, setTriggerApiUrlKV] = useKV<string | null>(
    "trigger-api-url",
    null
  );
  const [userProfile, setUserProfile] = useKV<UserProfile | null>(
    "user-profile",
    null
  );
  const [viewingHistory, setViewingHistory] = useKV<ViewingHistoryEntry[]>(
    "viewing-history",
    []
  );
  const [allMovies, setAllMovies] = useState<Record<number, Movie>>({});

  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "rating-desc",
    triggerFilter: null,
    triggerIntensity: "low",
    languageFilter: null,
    runtimeFilter: null,
    genreFilter: null,
    yearRange: null,
    ratingFilter: null,
  });

  useEffect(() => {
    const resizeObserverErrHandler = (e: ErrorEvent) => {
      if (
        e.message ===
          "ResizeObserver loop completed with undelivered notifications." ||
        e.message === "ResizeObserver loop limit exceeded"
      ) {
        e.stopImmediatePropagation();
        return true;
      }
    };
    window.addEventListener("error", resizeObserverErrHandler);
    return () => window.removeEventListener("error", resizeObserverErrHandler);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedParam = urlParams.get("shared");
    const watchlistParam = urlParams.get("watchlist");

    if (sharedParam) {
      try {
        const decodedIds = JSON.parse(atob(sharedParam)) as number[];
        if (Array.isArray(decodedIds) && decodedIds.length > 0) {
          setSharedMovieIds(decodedIds);
          setShowSharedBanner(true);
          toast.success(
            `${decodedIds.length} shared favorite${
              decodedIds.length === 1 ? "" : "s"
            } loaded!`
          );
        }
      } catch (error) {
        console.error("Failed to decode shared favorites:", error);
        toast.error("Invalid share link");
      }
    }

    if (watchlistParam) {
      try {
        const decodedIds = JSON.parse(atob(watchlistParam)) as number[];
        if (Array.isArray(decodedIds) && decodedIds.length > 0) {
          setSharedWatchlistIds(decodedIds);
          setShowSharedWatchlistBanner(true);
          toast.success(
            `${decodedIds.length} shared watchlist movie${
              decodedIds.length === 1 ? "" : "s"
            } loaded!`
          );
        }
      } catch (error) {
        console.error("Failed to decode shared watchlist:", error);
        toast.error("Invalid watchlist link");
      }
    }
  }, []);

  useEffect(() => {
    const initializeProfile = async () => {
      if (!userProfile) {
        try {
          // const user = await spark.user()
          const user = MOCK_USER;
          const newProfile: UserProfile = {
            userId: user?.id?.toString() || "guest",
            userName: user?.login || "Guest User",
            userAvatar: user?.avatarUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            favoriteSubgenres: [],
            viewingHistory: [],
            stats: {
              totalMoviesWatched: 0,
              totalReviews: 0,
              favoriteCount: 0,
              averageRating: 0,
            },
          };
          setUserProfile(newProfile);
        } catch (error) {
          const newProfile: UserProfile = {
            userId: "guest",
            userName: "Guest User",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            favoriteSubgenres: [],
            viewingHistory: [],
            stats: {
              totalMoviesWatched: 0,
              totalReviews: 0,
              favoriteCount: 0,
              averageRating: 0,
            },
          };
          setUserProfile(newProfile);
        }
      }
    };

    initializeProfile();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setLoadingStartTime(Date.now());

      console.log("[App] Starting to fetch movies...");
      console.log("[App] API Token present:", !!apiToken);

      if (apiToken) {
        setApiKey(apiToken);
        console.log("[App] Using custom API token");
      } else {
        console.log("[App] Using default API token");
      }

      if (triggerApiUrl) {
        setTriggerApiUrl(triggerApiUrl);
        console.log("[App] Using custom trigger API URL:", triggerApiUrl);
      }

      try {
        const currentYear = new Date().getFullYear();
        const currentDecadeStart = Math.floor(currentYear / 10) * 10;

        console.log("[App] Fetching all movie categories...");
        const [
          trendingData,
          forYouData,
          popular,
          newReleasesData,
          upcomingData,
          foreignData,
          decade2020s,
          decade2010s,
          decade2000s,
          decade1990s,
          decade1980s,
          decade1970s,
          decade1960s,
          pre1960,
        ] = await Promise.all([
          getTrendingMovies(1),
          getRecentHorrorMovies(1),
          getHorrorMovies(),
          getNewReleaseHorrorMovies(1),
          getUpcomingHorrorMovies(1),
          getForeignHorrorMovies(1),
          getTopRatedHorrorByDecade(currentDecadeStart, currentYear),
          getTopRatedHorrorByDecade(2010, 2019),
          getTopRatedHorrorByDecade(2000, 2009),
          getTopRatedHorrorByDecade(1990, 1999),
          getTopRatedHorrorByDecade(1980, 1989),
          getTopRatedHorrorByDecade(1970, 1979),
          getTopRatedHorrorByDecade(1960, 1969),
          getTopRatedHorrorByDecade(1900, 1959),
        ]);

        console.log(
          "[App] All movie categories fetched. Enriching with runtime data..."
        );
        const [
          trendingEnriched,
          forYouEnriched,
          newReleasesEnriched,
          upcomingEnriched,
          foreignEnriched,
          enriched2020s,
          enriched2010s,
          enriched2000s,
          enriched1990s,
          enriched1980s,
          enriched1970s,
          enriched1960s,
          enrichedPre1960,
        ] = await Promise.all([
          enrichMoviesWithRuntime(trendingData.movies),
          enrichMoviesWithRuntime(forYouData.movies),
          enrichMoviesWithRuntime(newReleasesData.movies),
          enrichMoviesWithRuntime(upcomingData.movies),
          enrichMoviesWithRuntime(foreignData.movies),
          enrichMoviesWithRuntime(decade2020s),
          enrichMoviesWithRuntime(decade2010s),
          enrichMoviesWithRuntime(decade2000s),
          enrichMoviesWithRuntime(decade1990s),
          enrichMoviesWithRuntime(decade1980s),
          enrichMoviesWithRuntime(decade1970s),
          enrichMoviesWithRuntime(decade1960s),
          enrichMoviesWithRuntime(pre1960),
        ]);

        console.log("[App] Runtime enrichment complete. Setting state...");
        setTrendingMovies(trendingEnriched);
        setTrendingPage(1);
        setTrendingTotalPages(trendingData.totalPages);

        setForYouMovies(forYouEnriched);
        setForYouPage(1);
        setForYouTotalPages(forYouData.totalPages);

        setNewReleaseMovies(newReleasesEnriched);
        setNewReleasePage(1);
        setNewReleaseTotalPages(newReleasesData.totalPages);

        setUpcomingMovies(upcomingEnriched);
        setUpcomingPage(1);
        setUpcomingTotalPages(upcomingData.totalPages);

        setForeignMovies(foreignEnriched);
        setForeignMoviesPage(1);
        setForeignMoviesTotalPages(foreignData.totalPages);

        setMovies2020s(enriched2020s);
        setMovies2010s(enriched2010s);
        setMovies2000s(enriched2000s);
        setMovies1990s(enriched1990s);
        setMovies1980s(enriched1980s);
        setMovies1970s(enriched1970s);
        setMovies1960s(enriched1960s);
        setMoviesPre1960(enrichedPre1960);

        const moviesMap: Record<number, Movie> = {};
        [
          ...trendingEnriched,
          ...forYouEnriched,
          ...popular,
          ...newReleasesEnriched,
          ...upcomingEnriched,
          ...foreignEnriched,
          ...enriched2020s,
          ...enriched2010s,
          ...enriched2000s,
          ...enriched1990s,
          ...enriched1980s,
          ...enriched1970s,
          ...enriched1960s,
          ...enrichedPre1960,
        ].forEach((movie) => {
          moviesMap[movie.id] = movie;
        });
        setAllMovies(moviesMap);

        const totalMovies = Object.keys(moviesMap).length;
        console.log("[App] Successfully loaded", totalMovies, "unique movies");

        if (totalMovies === 0) {
          console.error(
            "[App] WARNING: No movies were loaded! Check API logs above."
          );
          toast.error(
            "Failed to load movies. Please check your API key in Settings."
          );
        } else {
          console.log("[App] Movie loading successful!");
        }

        const elapsedTime = Date.now() - (loadingStartTime ?? Date.now());
        const remainingTime = Math.max(0, 1000 - elapsedTime);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      } catch (error) {
        console.error("[App] Critical error during movie fetching:", error);
        toast.error(
          "Failed to load movies. Please check your internet connection and API key."
        );
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiToken, triggerApiUrl]);

  useEffect(() => {
    const favMovies = (favorites ?? [])
      .map((id) => allMovies[id])
      .filter((movie): movie is Movie => movie !== undefined);
    setFavoriteMovies(favMovies);
  }, [favorites, allMovies]);

  useEffect(() => {
    const watchMovies = (watchLater ?? [])
      .map((id) => allMovies[id])
      .filter((movie): movie is Movie => movie !== undefined);
    setWatchLaterMovies(watchMovies);
  }, [watchLater, allMovies]);

  useEffect(() => {
    if (userProfile && Object.keys(allMovies).length > 0) {
      const updatedStats = calculateProfileStats(
        viewingHistory ?? [],
        favorites ?? [],
        reviews ?? {},
        allMovies
      );

      setUserProfile((current) => {
        if (!current) return null;
        return {
          ...current,
          stats: updatedStats,
          viewingHistory: viewingHistory ?? [],
        };
      });
    }
  }, [viewingHistory, favorites, reviews, allMovies]);

  const handleToggleFavorite = (movieId: number) => {
    setFavorites((currentFavorites) => {
      const current = currentFavorites ?? [];
      if (current.includes(movieId)) {
        return current.filter((id) => id !== movieId);
      }
      return [...current, movieId];
    });
  };

  const handleToggleWatchLater = (movieId: number) => {
    setWatchLater((currentWatchLater) => {
      const current = currentWatchLater ?? [];
      if (current.includes(movieId)) {
        return current.filter((id) => id !== movieId);
      }
      return [...current, movieId];
    });
  };

  const handleMovieViewed = (movieId: number, completed: boolean = true) => {
    setViewingHistory((current) => {
      const history = current ?? [];
      const existingIndex = history.findIndex((h) => h.movieId === movieId);

      const newEntry: ViewingHistoryEntry = {
        movieId,
        viewedAt: new Date().toISOString(),
        completed,
      };

      if (existingIndex >= 0) {
        const updated = [...history];
        updated[existingIndex] = newEntry;
        return updated;
      } else {
        return [...history, newEntry];
      }
    });
  };

  const handleSaveReview = async (review: UserReview) => {
    try {
      // const user = await spark.user();
      const user = MOCK_USER;
      if (!user) {
        setReviews((currentReviews) => ({
          ...(currentReviews ?? {}),
          [review.movieId]: review,
        }));
        return;
      }

      const enrichedReview: UserReview = {
        ...review,
        userId: user.id.toString(),
        userLogin: user.login,
        userAvatar: user.avatarUrl,
      };

      setReviews((currentReviews) => ({
        ...(currentReviews ?? {}),
        [review.movieId]: enrichedReview,
      }));

      setMovieReviews((currentMovieReviews) => {
        const current = currentMovieReviews ?? {};
        const movieReviewsList = current[review.movieId] ?? [];
        const existingIndex = movieReviewsList.findIndex(
          (r) => r.userId === user.id.toString()
        );

        let updatedList: UserReview[];
        if (existingIndex >= 0) {
          updatedList = [...movieReviewsList];
          updatedList[existingIndex] = enrichedReview;
        } else {
          updatedList = [...movieReviewsList, enrichedReview];
        }

        return {
          ...current,
          [review.movieId]: updatedList,
        };
      });
    } catch (error) {
      console.error("Error saving review:", error);
      setReviews((currentReviews) => ({
        ...(currentReviews ?? {}),
        [review.movieId]: review,
      }));
    }
  };

  const handleSaveApiToken = async (token: string) => {
    setApiToken(token);
    setApiKey(token);
    toast.success("Reloading movies with your API key...");

    try {
      setLoading(true);
      setLoadingStartTime(Date.now());

      console.log("[App] Reloading with new API token...");
      const currentYear = new Date().getFullYear();
      const currentDecadeStart = Math.floor(currentYear / 10) * 10;

      const [
        trendingData,
        forYouData,
        popular,
        newReleasesData,
        upcomingData,
        foreignData,
        decade2020s,
        decade2010s,
        decade2000s,
        decade1990s,
        decade1980s,
        decade1970s,
        decade1960s,
        pre1960,
      ] = await Promise.all([
        getTrendingMovies(1),
        getRecentHorrorMovies(1),
        getHorrorMovies(),
        getNewReleaseHorrorMovies(1),
        getUpcomingHorrorMovies(1),
        getForeignHorrorMovies(1),
        getTopRatedHorrorByDecade(currentDecadeStart, currentYear),
        getTopRatedHorrorByDecade(2010, 2019),
        getTopRatedHorrorByDecade(2000, 2009),
        getTopRatedHorrorByDecade(1990, 1999),
        getTopRatedHorrorByDecade(1980, 1989),
        getTopRatedHorrorByDecade(1970, 1979),
        getTopRatedHorrorByDecade(1960, 1969),
        getTopRatedHorrorByDecade(1900, 1959),
      ]);

      const [
        trendingEnriched,
        forYouEnriched,
        newReleasesEnriched,
        upcomingEnriched,
        foreignEnriched,
        enriched2020s,
        enriched2010s,
        enriched2000s,
        enriched1990s,
        enriched1980s,
        enriched1970s,
        enriched1960s,
        enrichedPre1960,
      ] = await Promise.all([
        enrichMoviesWithRuntime(trendingData.movies),
        enrichMoviesWithRuntime(forYouData.movies),
        enrichMoviesWithRuntime(newReleasesData.movies),
        enrichMoviesWithRuntime(upcomingData.movies),
        enrichMoviesWithRuntime(foreignData.movies),
        enrichMoviesWithRuntime(decade2020s),
        enrichMoviesWithRuntime(decade2010s),
        enrichMoviesWithRuntime(decade2000s),
        enrichMoviesWithRuntime(decade1990s),
        enrichMoviesWithRuntime(decade1980s),
        enrichMoviesWithRuntime(decade1970s),
        enrichMoviesWithRuntime(decade1960s),
        enrichMoviesWithRuntime(pre1960),
      ]);

      setTrendingMovies(trendingEnriched);
      setTrendingPage(1);
      setTrendingTotalPages(trendingData.totalPages);

      setForYouMovies(forYouEnriched);
      setForYouPage(1);
      setForYouTotalPages(forYouData.totalPages);

      setNewReleaseMovies(newReleasesEnriched);
      setNewReleasePage(1);
      setNewReleaseTotalPages(newReleasesData.totalPages);

      setUpcomingMovies(upcomingEnriched);
      setUpcomingPage(1);
      setUpcomingTotalPages(upcomingData.totalPages);

      setForeignMovies(foreignEnriched);
      setForeignMoviesPage(1);
      setForeignMoviesTotalPages(foreignData.totalPages);

      setMovies2020s(enriched2020s);
      setMovies2010s(enriched2010s);
      setMovies2000s(enriched2000s);
      setMovies1990s(enriched1990s);
      setMovies1980s(enriched1980s);
      setMovies1970s(enriched1970s);
      setMovies1960s(enriched1960s);
      setMoviesPre1960(enrichedPre1960);

      const moviesMap: Record<number, Movie> = {};
      [
        ...trendingEnriched,
        ...forYouEnriched,
        ...popular,
        ...newReleasesEnriched,
        ...upcomingEnriched,
        ...foreignEnriched,
        ...enriched2020s,
        ...enriched2010s,
        ...enriched2000s,
        ...enriched1990s,
        ...enriched1980s,
        ...enriched1970s,
        ...enriched1960s,
        ...enrichedPre1960,
      ].forEach((movie) => {
        moviesMap[movie.id] = movie;
      });
      setAllMovies(moviesMap);

      const totalMovies = Object.keys(moviesMap).length;
      console.log(
        "[App] Successfully reloaded",
        totalMovies,
        "unique movies with new API key"
      );

      if (totalMovies === 0) {
        console.error("[App] WARNING: No movies were loaded with new API key!");
        toast.error(
          "Failed to load movies with new API key. Please verify the key is valid."
        );
      } else {
        toast.success(`Successfully loaded ${totalMovies} movies!`);
      }

      const elapsedTime = Date.now() - (loadingStartTime ?? Date.now());
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    } catch (error) {
      console.error("[App] Critical error reloading with new API key:", error);
      toast.error(
        "Failed to reload movies. Please verify your API key is correct."
      );
      setLoading(false);
    }
  };

  const handleSaveTriggerApiUrl = (url: string) => {
    setTriggerApiUrlKV(url);
    setTriggerApiUrl(url);
    toast.success("Custom trigger API URL saved!");
  };

  const handleLoadMoreForeignMovies = async () => {
    if (isLoadingMoreForeign || foreignMoviesPage >= foreignMoviesTotalPages)
      return;

    setIsLoadingMoreForeign(true);
    const nextPage = foreignMoviesPage + 1;

    try {
      const foreignData = await getForeignHorrorMovies(nextPage);
      const enriched = await enrichMoviesWithRuntime(foreignData.movies);

      setForeignMovies((current) => [...current, ...enriched]);
      setForeignMoviesPage(nextPage);
      setForeignMoviesTotalPages(foreignData.totalPages);

      setAllMovies((current) => {
        const updated = { ...current };
        enriched.forEach((movie) => {
          updated[movie.id] = movie;
        });
        return updated;
      });
    } catch (error) {
      console.error("Error loading more foreign movies:", error);
      toast.error("Failed to load more movies");
    } finally {
      setIsLoadingMoreForeign(false);
    }
  };

  const handleLoadMoreTrending = async () => {
    if (isLoadingMoreTrending || trendingPage >= trendingTotalPages) return;

    setIsLoadingMoreTrending(true);
    const nextPage = trendingPage + 1;

    try {
      const trendingData = await getTrendingMovies(nextPage);
      const enriched = await enrichMoviesWithRuntime(trendingData.movies);

      setTrendingMovies((current) => [...current, ...enriched]);
      setTrendingPage(nextPage);
      setTrendingTotalPages(trendingData.totalPages);

      setAllMovies((current) => {
        const updated = { ...current };
        enriched.forEach((movie) => {
          updated[movie.id] = movie;
        });
        return updated;
      });
    } catch (error) {
      console.error("Error loading more trending movies:", error);
      toast.error("Failed to load more movies");
    } finally {
      setIsLoadingMoreTrending(false);
    }
  };

  const handleLoadMoreForYou = async () => {
    if (isLoadingMoreForYou || forYouPage >= forYouTotalPages) return;

    setIsLoadingMoreForYou(true);
    const nextPage = forYouPage + 1;

    try {
      const forYouData = await getRecentHorrorMovies(nextPage);
      const enriched = await enrichMoviesWithRuntime(forYouData.movies);

      setForYouMovies((current) => [...current, ...enriched]);
      setForYouPage(nextPage);
      setForYouTotalPages(forYouData.totalPages);

      setAllMovies((current) => {
        const updated = { ...current };
        enriched.forEach((movie) => {
          updated[movie.id] = movie;
        });
        return updated;
      });
    } catch (error) {
      console.error("Error loading more for you movies:", error);
      toast.error("Failed to load more movies");
    } finally {
      setIsLoadingMoreForYou(false);
    }
  };

  const handleLoadMoreNewReleases = async () => {
    if (isLoadingMoreNewReleases || newReleasePage >= newReleaseTotalPages)
      return;

    setIsLoadingMoreNewReleases(true);
    const nextPage = newReleasePage + 1;

    try {
      const newReleasesData = await getNewReleaseHorrorMovies(nextPage);
      const enriched = await enrichMoviesWithRuntime(newReleasesData.movies);

      setNewReleaseMovies((current) => [...current, ...enriched]);
      setNewReleasePage(nextPage);
      setNewReleaseTotalPages(newReleasesData.totalPages);

      setAllMovies((current) => {
        const updated = { ...current };
        enriched.forEach((movie) => {
          updated[movie.id] = movie;
        });
        return updated;
      });
    } catch (error) {
      console.error("Error loading more new releases:", error);
      toast.error("Failed to load more movies");
    } finally {
      setIsLoadingMoreNewReleases(false);
    }
  };

  const handleLoadMoreUpcoming = async () => {
    if (isLoadingMoreUpcoming || upcomingPage >= upcomingTotalPages) return;

    setIsLoadingMoreUpcoming(true);
    const nextPage = upcomingPage + 1;

    try {
      const upcomingData = await getUpcomingHorrorMovies(nextPage);
      const enriched = await enrichMoviesWithRuntime(upcomingData.movies);

      setUpcomingMovies((current) => [...current, ...enriched]);
      setUpcomingPage(nextPage);
      setUpcomingTotalPages(upcomingData.totalPages);

      setAllMovies((current) => {
        const updated = { ...current };
        enriched.forEach((movie) => {
          updated[movie.id] = movie;
        });
        return updated;
      });
    } catch (error) {
      console.error("Error loading more upcoming movies:", error);
      toast.error("Failed to load more movies");
    } finally {
      setIsLoadingMoreUpcoming(false);
    }
  };

  const getUserRatings = () => {
    const ratings: Record<number, number> = {};
    Object.values(reviews ?? {}).forEach((review) => {
      if (review.rating !== undefined) {
        ratings[review.movieId] = review.rating;
      }
    });
    return ratings;
  };

  const getTriggers = () => {
    const triggers: Record<number, TriggerRatings> = {};
    const reviewsObj = reviews ?? {};
    Object.values(reviewsObj).forEach((review) => {
      if (review && review.triggers !== undefined) {
        triggers[review.movieId] = review.triggers;
      }
    });
    const moviesObj = allMovies ?? {};
    Object.keys(moviesObj).forEach((id) => {
      const movieId = Number(id);
      if (!triggers[movieId]) {
        triggers[movieId] = getTriggerDataForMovie(movieId);
      }
    });
    return triggers;
  };

  const sortAndFilterMovies = (movies: Movie[]) => {
    const triggers = getTriggers();
    const userRatings = getUserRatings();

    let filtered = [...movies];

    if (filters.genreFilter) {
      filtered = filtered.filter((movie) => {
        const subgenres = detectMovieSubgenres(movie);
        return subgenres.includes(filters.genreFilter!);
      });
    }

    if (filters.languageFilter) {
      filtered = filtered.filter((movie) => {
        return (
          movie.original_language?.toLowerCase() ===
          filters.languageFilter?.toLowerCase()
        );
      });
    }

    if (filters.runtimeFilter) {
      filtered = filtered.filter((movie) => {
        if (!movie.runtime) return false;

        switch (filters.runtimeFilter) {
          case "short":
            return movie.runtime < 90;
          case "medium":
            return movie.runtime >= 90 && movie.runtime <= 120;
          case "long":
            return movie.runtime > 120;
          default:
            return true;
        }
      });
    }

    if (filters.yearRange) {
      filtered = filtered.filter((movie) => {
        if (!movie.release_date) return false;
        const releaseYear = new Date(movie.release_date).getFullYear();
        return (
          releaseYear >= filters.yearRange!.start &&
          releaseYear <= filters.yearRange!.end
        );
      });
    }

    if (filters.ratingFilter) {
      filtered = filtered.filter((movie) => {
        const rating = userRatings[movie.id] ?? movie.vote_average;

        switch (filters.ratingFilter) {
          case "high":
            return rating >= 7.0;
          case "medium":
            return rating >= 5.0 && rating < 7.0;
          case "low":
            return rating < 5.0;
          default:
            return true;
        }
      });
    }

    if (filters.triggerFilter) {
      filtered = filtered.filter((movie) => {
        const movieTriggers = triggers[movie.id];
        if (!movieTriggers) return false;
        const triggerValue =
          movieTriggers[filters.triggerFilter! as keyof TriggerRatings];

        if (triggerValue === null) return false;

        if (filters.triggerIntensity === "low") {
          return triggerValue >= 0 && triggerValue <= 1;
        } else if (filters.triggerIntensity === "moderate") {
          return triggerValue >= 2 && triggerValue <= 3;
        } else if (filters.triggerIntensity === "high") {
          return triggerValue >= 4 && triggerValue <= 5;
        }

        return false;
      });
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "rating-desc": {
          const ratingA = userRatings[a.id] ?? a.vote_average;
          const ratingB = userRatings[b.id] ?? b.vote_average;
          return ratingB - ratingA;
        }
        case "rating-asc": {
          const ratingAsc = userRatings[a.id] ?? a.vote_average;
          const ratingBAsc = userRatings[b.id] ?? b.vote_average;
          return ratingAsc - ratingBAsc;
        }
        case "date-desc":
          return (
            new Date(b.release_date || "").getTime() -
            new Date(a.release_date || "").getTime()
          );
        case "date-asc":
          return (
            new Date(a.release_date || "").getTime() -
            new Date(b.release_date || "").getTime()
          );
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredTrending = useMemo(
    () => sortAndFilterMovies(trendingMovies),
    [trendingMovies, filters, reviews]
  );

  const filteredForYou = useMemo(
    () => sortAndFilterMovies(forYouMovies),
    [forYouMovies, filters, reviews]
  );

  const recommendedMovies = useMemo(() => {
    if (!userProfile || Object.keys(allMovies).length === 0) return [];

    return generatePersonalizedRecommendations(
      userProfile,
      Object.values(allMovies),
      favorites ?? [],
      reviews ?? {},
      viewingHistory ?? []
    );
  }, [userProfile, allMovies, favorites, reviews, viewingHistory]);

  const filteredRecommended = useMemo(
    () => sortAndFilterMovies(recommendedMovies),
    [recommendedMovies, filters, reviews]
  );

  const filteredFavorites = useMemo(
    () => sortAndFilterMovies(favoriteMovies),
    [favoriteMovies, filters, reviews]
  );

  const filteredWatchLater = useMemo(
    () => sortAndFilterMovies(watchLaterMovies),
    [watchLaterMovies, filters, reviews]
  );

  const filteredNewReleases = useMemo(
    () => sortAndFilterMovies(newReleaseMovies),
    [newReleaseMovies, filters, reviews]
  );

  const filteredUpcoming = useMemo(
    () => sortAndFilterMovies(upcomingMovies),
    [upcomingMovies, filters, reviews]
  );

  const filteredForeign = useMemo(
    () => sortAndFilterMovies(foreignMovies),
    [foreignMovies, filters, reviews]
  );

  const filtered2020s = useMemo(
    () => sortAndFilterMovies(movies2020s),
    [movies2020s, filters, reviews]
  );

  const filtered2010s = useMemo(
    () => sortAndFilterMovies(movies2010s),
    [movies2010s, filters, reviews]
  );

  const filtered2000s = useMemo(
    () => sortAndFilterMovies(movies2000s),
    [movies2000s, filters, reviews]
  );

  const filtered1990s = useMemo(
    () => sortAndFilterMovies(movies1990s),
    [movies1990s, filters, reviews]
  );

  const filtered1980s = useMemo(
    () => sortAndFilterMovies(movies1980s),
    [movies1980s, filters, reviews]
  );

  const filtered1970s = useMemo(
    () => sortAndFilterMovies(movies1970s),
    [movies1970s, filters, reviews]
  );

  const filtered1960s = useMemo(
    () => sortAndFilterMovies(movies1960s),
    [movies1960s, filters, reviews]
  );

  const filteredPre1960 = useMemo(
    () => sortAndFilterMovies(moviesPre1960),
    [moviesPre1960, filters, reviews]
  );

  const filteredTrendingForHome = useMemo(
    () => trendingMovies.slice(0, 20),
    [trendingMovies]
  );

  const filteredRecommendedForHome = useMemo(
    () => recommendedMovies.slice(0, 20),
    [recommendedMovies]
  );

  const filteredForYouForHome = useMemo(
    () => forYouMovies.slice(0, 20),
    [forYouMovies]
  );

  const filteredFavoritesForHome = useMemo(
    () => favoriteMovies.slice(0, 20),
    [favoriteMovies]
  );

  const filteredWatchLaterForHome = useMemo(
    () => watchLaterMovies.slice(0, 20),
    [watchLaterMovies]
  );

  const filteredNewReleasesForHome = useMemo(
    () => newReleaseMovies.slice(0, 20),
    [newReleaseMovies]
  );

  const filteredUpcomingForHome = useMemo(
    () => upcomingMovies.slice(0, 20),
    [upcomingMovies]
  );

  const filteredForeignForHome = useMemo(
    () => foreignMovies.slice(0, 20),
    [foreignMovies]
  );

  const filtered2020sForHome = useMemo(
    () => movies2020s.slice(0, 20),
    [movies2020s]
  );

  const filtered2010sForHome = useMemo(
    () => movies2010s.slice(0, 20),
    [movies2010s]
  );

  const filtered2000sForHome = useMemo(
    () => movies2000s.slice(0, 20),
    [movies2000s]
  );

  const filtered1990sForHome = useMemo(
    () => movies1990s.slice(0, 20),
    [movies1990s]
  );

  const filtered1980sForHome = useMemo(
    () => movies1980s.slice(0, 20),
    [movies1980s]
  );

  const filtered1970sForHome = useMemo(
    () => movies1970s.slice(0, 20),
    [movies1970s]
  );

  const filtered1960sForHome = useMemo(
    () => movies1960s.slice(0, 20),
    [movies1960s]
  );

  const filteredPre1960ForHome = useMemo(
    () => moviesPre1960.slice(0, 20),
    [moviesPre1960]
  );

  const sharedMovies = useMemo(() => {
    return sharedMovieIds
      .map((id) => allMovies[id])
      .filter((movie): movie is Movie => movie !== undefined);
  }, [sharedMovieIds, allMovies]);

  const sharedWatchlistMovies = useMemo(() => {
    return sharedWatchlistIds
      .map((id) => allMovies[id])
      .filter((movie): movie is Movie => movie !== undefined);
  }, [sharedWatchlistIds, allMovies]);

  const moviesBySubgenre = useMemo(() => {
    const subgenreMap: Record<string, Movie[]> = {};
    const allMoviesList = Object.values(allMovies);

    allMoviesList.forEach((movie) => {
      const subgenres = detectMovieSubgenres(movie);
      subgenres.forEach((subgenre) => {
        if (!subgenreMap[subgenre]) {
          subgenreMap[subgenre] = [];
        }
        if (!subgenreMap[subgenre].find((m) => m.id === movie.id)) {
          subgenreMap[subgenre].push(movie);
        }
      });
    });

    Object.keys(subgenreMap).forEach((subgenre) => {
      subgenreMap[subgenre].sort((a, b) => b.vote_average - a.vote_average);
    });

    return subgenreMap;
  }, [allMovies]);

  const filteredTrendingForGrid = useMemo(
    () => filteredTrending.slice(0, 100),
    [filteredTrending]
  );

  const filteredForYouForGrid = useMemo(
    () => filteredForYou.slice(0, 100),
    [filteredForYou]
  );

  const filteredRecommendedForGrid = useMemo(
    () => filteredRecommended.slice(0, 100),
    [filteredRecommended]
  );

  const filteredFavoritesForGrid = useMemo(
    () => filteredFavorites.slice(0, 100),
    [filteredFavorites]
  );

  const filteredWatchLaterForGrid = useMemo(
    () => filteredWatchLater.slice(0, 100),
    [filteredWatchLater]
  );

  const filteredNewReleasesForGrid = useMemo(
    () => filteredNewReleases.slice(0, 100),
    [filteredNewReleases]
  );

  const filteredUpcomingForGrid = useMemo(
    () => filteredUpcoming.slice(0, 100),
    [filteredUpcoming]
  );

  const filteredForeignForGrid = useMemo(
    () => filteredForeign.slice(0, 100),
    [filteredForeign]
  );

  const handleMovieSelect = (movieId: number) => {
    handleMovieViewed(movieId, false);
    setSelectedMovieId(movieId);
    setViewMode("details");
  };

  const handleGridCategoryClick = (category: GridCategory) => {
    setGridCategory(category);
    setViewMode("grid");
  };

  const handleBackToHome = () => {
    setViewMode("home");
    setSelectedMovieId(null);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((current) => {
      if (!current) return null;
      return {
        ...current,
        ...updates,
      };
    });
  };

  const handleCloseSharedBanner = () => {
    setShowSharedBanner(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("shared");
    window.history.replaceState({}, "", url.toString());
  };

  const handleCloseSharedWatchlistBanner = () => {
    setShowSharedWatchlistBanner(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("watchlist");
    window.history.replaceState({}, "", url.toString());
  };

  // const handleRandomMovie = () => {
  //   const allMovieIds = Object.keys(allMovies).map(Number);
  //   if (allMovieIds.length === 0) {
  //     toast.error("No movies available");
  //     return;
  //   }
  //   const randomIndex = Math.floor(Math.random() * allMovieIds.length);
  //   const randomMovieId = allMovieIds[randomIndex];
  //   handleMovieSelect(randomMovieId);
  // };

  if (viewMode === "details" && selectedMovieId !== null) {
    return (
      <>
        <MovieDetailsPage
          movieId={selectedMovieId}
          onBack={handleBackToHome}
          onSaveReview={handleSaveReview}
          existingReview={reviews?.[selectedMovieId]}
          allReviews={movieReviews?.[selectedMovieId] ?? []}
          isFavorite={(favorites ?? []).includes(selectedMovieId)}
          onToggleFavorite={() => handleToggleFavorite(selectedMovieId)}
          isWatchLater={(watchLater ?? []).includes(selectedMovieId)}
          onToggleWatchLater={() => handleToggleWatchLater(selectedMovieId)}
          onMovieClick={handleMovieSelect}
          favorites={favorites ?? []}
          watchLater={watchLater ?? []}
          userRatings={getUserRatings()}
          triggers={getTriggers()}
        />
        <KeyboardNavigationHint />
        <Toaster position="top-right" />
      </>
    );
  }

  if (viewMode === "grid") {
    const userRatings = getUserRatings();
    const triggers = getTriggers();

    let movies: Movie[] = [];
    let title = "";
    let onLoadMore: (() => void) | undefined;
    let hasMore = false;
    let isLoadingMore = false;
    let showLanguage = false;

    if (gridCategory.startsWith("subgenre-")) {
      const subgenreId = gridCategory.replace(
        "subgenre-",
        ""
      ) as HorrorSubgenre;
      const subgenreDef = HORROR_SUBGENRE_DEFINITIONS.find(
        (def) => def.id === subgenreId
      );
      movies = sortAndFilterMovies(moviesBySubgenre[subgenreId] ?? []).slice(
        0,
        100
      );
      title = subgenreDef?.name ?? "Subgenre";
    } else {
      switch (gridCategory) {
        case "trending":
          movies = filteredTrendingForGrid;
          title = "Trending";
          onLoadMore = handleLoadMoreTrending;
          hasMore =
            trendingPage < trendingTotalPages &&
            filteredTrendingForGrid.length < 100;
          isLoadingMore = isLoadingMoreTrending;
          break;
        case "recommended":
          movies = filteredRecommendedForGrid;
          title = "Recommended For You";
          break;
        case "forYou":
          movies = filteredForYouForGrid;
          title = "For You";
          onLoadMore = handleLoadMoreForYou;
          hasMore =
            forYouPage < forYouTotalPages && filteredForYouForGrid.length < 100;
          isLoadingMore = isLoadingMoreForYou;
          break;
        case "favorites":
          movies = filteredFavoritesForGrid;
          title = "Favorites";
          break;
        case "watchLater":
          movies = filteredWatchLaterForGrid;
          title = "Watch Later";
          break;
        case "newReleases":
          movies = filteredNewReleasesForGrid;
          title = "New Releases";
          onLoadMore = handleLoadMoreNewReleases;
          hasMore =
            newReleasePage < newReleaseTotalPages &&
            filteredNewReleasesForGrid.length < 100;
          isLoadingMore = isLoadingMoreNewReleases;
          break;
        case "comingSoon":
          movies = filteredUpcomingForGrid;
          title = "Coming Soon";
          onLoadMore = handleLoadMoreUpcoming;
          hasMore =
            upcomingPage < upcomingTotalPages &&
            filteredUpcomingForGrid.length < 100;
          isLoadingMore = isLoadingMoreUpcoming;
          break;
        case "foreign":
          movies = filteredForeignForGrid;
          title = "Foreign Horror";
          showLanguage = true;
          onLoadMore = handleLoadMoreForeignMovies;
          hasMore =
            foreignMoviesPage < foreignMoviesTotalPages &&
            filteredForeignForGrid.length < 100;
          isLoadingMore = isLoadingMoreForeign;
          break;
        case "decade-2020s":
          movies = sortAndFilterMovies(movies2020s).slice(0, 100);
          title = "Top Rated 2020s";
          break;
        case "decade-2010s":
          movies = sortAndFilterMovies(movies2010s).slice(0, 100);
          title = "Top Rated 2010s";
          break;
        case "decade-2000s":
          movies = sortAndFilterMovies(movies2000s).slice(0, 100);
          title = "Top Rated 2000s";
          break;
        case "decade-1990s":
          movies = sortAndFilterMovies(movies1990s).slice(0, 100);
          title = "Top Rated 1990s";
          break;
        case "decade-1980s":
          movies = sortAndFilterMovies(movies1980s).slice(0, 100);
          title = "Top Rated 1980s";
          break;
        case "decade-1970s":
          movies = sortAndFilterMovies(movies1970s).slice(0, 100);
          title = "Top Rated 1970s";
          break;
        case "decade-1960s":
          movies = sortAndFilterMovies(movies1960s).slice(0, 100);
          title = "Top Rated 1960s";
          break;
        case "decade-pre1960":
          movies = sortAndFilterMovies(moviesPre1960).slice(0, 100);
          title = "Top Rated Pre-1960";
          break;
      }
    }

    if (gridCategory === "watchLater") {
      return (
        <>
          <MovieGridPage
            title={title}
            movies={movies}
            userRatings={userRatings}
            favorites={favorites ?? []}
            watchLater={watchLater ?? []}
            triggers={triggers}
            filters={filters}
            onFilterChange={setFilters}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchLater={handleToggleWatchLater}
            onMovieClick={handleMovieSelect}
            onBack={handleBackToHome}
            showLanguage={false}
            onLoadMore={undefined}
            hasMore={false}
            isLoadingMore={false}
            isInitialLoading={loading}
          />
          <KeyboardNavigationHint />
          <Toaster position="top-right" />
        </>
      );
    }

    return (
      <>
        <MovieGridPage
          title={title}
          movies={movies}
          userRatings={userRatings}
          favorites={favorites ?? []}
          watchLater={watchLater ?? []}
          triggers={triggers}
          filters={filters}
          onFilterChange={setFilters}
          onToggleFavorite={handleToggleFavorite}
          onToggleWatchLater={handleToggleWatchLater}
          onMovieClick={handleMovieSelect}
          onBack={handleBackToHome}
          showLanguage={showLanguage}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          isInitialLoading={loading}
        />
        <KeyboardNavigationHint />
        <Toaster position="top-right" />
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SpinningPentagram className="w-30" />
      </div>
    );
  }

  const userRatings = getUserRatings();
  const triggers = getTriggers();

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="px-6 py-8 space-y-8">
          {/* <header className="mb-12 flex items-start justify-between gap-4">
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleRandomMovie}
                title="Discover a random horror movie"
              >
                <Shuffle size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setProfileDialogOpen(true)}
                title="View your profile"
              >
                <User size={20} />
              </Button>
            </div>
          </header> */}

          <div className="space-y-6">
            <SearchBar onMovieSelect={handleMovieSelect} />
          </div>

          {showSharedBanner && sharedMovies.length > 0 && (
            <SharedFavoritesBanner
              sharedMovies={sharedMovies}
              onClose={handleCloseSharedBanner}
              onMovieClick={handleMovieSelect}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              userRatings={userRatings}
              triggers={triggers}
            />
          )}

          {showSharedWatchlistBanner && sharedWatchlistMovies.length > 0 && (
            <SharedWatchlistBanner
              sharedMovies={sharedWatchlistMovies}
              onClose={handleCloseSharedWatchlistBanner}
              onMovieClick={handleMovieSelect}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              userRatings={userRatings}
              triggers={triggers}
            />
          )}

          {filteredWatchLaterForHome.length > 0 && (
            <MovieList
              title="Watch Later"
              movies={filteredWatchLaterForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("watchLater")}
              totalCount={watchLaterMovies.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filteredRecommendedForHome.length > 0 && (
            <MovieList
              title="Recommended For You"
              movies={filteredRecommendedForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("recommended")}
              totalCount={recommendedMovies.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          <MovieList
            title="New Releases"
            movies={filteredNewReleasesForHome}
            userRatings={userRatings}
            favorites={favorites ?? []}
            watchLater={watchLater ?? []}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchLater={handleToggleWatchLater}
            onMovieClick={handleMovieSelect}
            triggers={triggers}
            onTitleClick={() => handleGridCategoryClick("newReleases")}
            totalCount={newReleaseMovies.length}
            onLoadMore={
              newReleaseMovies.length < 20
                ? handleLoadMoreNewReleases
                : undefined
            }
            hasMore={
              newReleaseMovies.length < 20 &&
              newReleasePage < newReleaseTotalPages
            }
            isLoadingMore={isLoadingMoreNewReleases}
            isLoading={loading}
          />

          <MovieList
            title="Trending"
            movies={filteredTrendingForHome}
            userRatings={userRatings}
            favorites={favorites ?? []}
            watchLater={watchLater ?? []}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchLater={handleToggleWatchLater}
            onMovieClick={handleMovieSelect}
            triggers={triggers}
            onTitleClick={() => handleGridCategoryClick("trending")}
            totalCount={trendingMovies.length}
            onLoadMore={
              trendingMovies.length < 20 ? handleLoadMoreTrending : undefined
            }
            hasMore={
              trendingMovies.length < 20 && trendingPage < trendingTotalPages
            }
            isLoadingMore={isLoadingMoreTrending}
            isLoading={loading}
          />

          <MovieList
            title="For You"
            movies={filteredForYouForHome}
            userRatings={userRatings}
            favorites={favorites ?? []}
            watchLater={watchLater ?? []}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchLater={handleToggleWatchLater}
            onMovieClick={handleMovieSelect}
            triggers={triggers}
            onTitleClick={() => handleGridCategoryClick("forYou")}
            totalCount={forYouMovies.length}
            onLoadMore={
              forYouMovies.length < 20 ? handleLoadMoreForYou : undefined
            }
            hasMore={forYouMovies.length < 20 && forYouPage < forYouTotalPages}
            isLoadingMore={isLoadingMoreForYou}
            isLoading={loading}
          />

          <MovieList
            title="Foreign Horror"
            movies={filteredForeignForHome}
            userRatings={userRatings}
            favorites={favorites ?? []}
            watchLater={watchLater ?? []}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchLater={handleToggleWatchLater}
            onMovieClick={handleMovieSelect}
            triggers={triggers}
            onTitleClick={() => handleGridCategoryClick("foreign")}
            showLanguage={true}
            totalCount={foreignMovies.length}
            onLoadMore={
              foreignMovies.length < 20
                ? handleLoadMoreForeignMovies
                : undefined
            }
            hasMore={
              foreignMovies.length < 20 &&
              foreignMoviesPage < foreignMoviesTotalPages
            }
            isLoadingMore={isLoadingMoreForeign}
            isLoading={loading}
          />

          {filtered2020sForHome.length > 0 && (
            <MovieList
              title="Top Rated 2020s"
              movies={filtered2020sForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-2020s")}
              totalCount={movies2020s.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filtered2010sForHome.length > 0 && (
            <MovieList
              title="Top Rated 2010s"
              movies={filtered2010sForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-2010s")}
              totalCount={movies2010s.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filtered2000sForHome.length > 0 && (
            <MovieList
              title="Top Rated 2000s"
              movies={filtered2000sForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-2000s")}
              totalCount={movies2000s.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filtered1990sForHome.length > 0 && (
            <MovieList
              title="Top Rated 1990s"
              movies={filtered1990sForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-1990s")}
              totalCount={movies1990s.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filtered1980sForHome.length > 0 && (
            <MovieList
              title="Top Rated 1980s"
              movies={filtered1980sForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-1980s")}
              totalCount={movies1980s.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filtered1970sForHome.length > 0 && (
            <MovieList
              title="Top Rated 1970s"
              movies={filtered1970sForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-1970s")}
              totalCount={movies1970s.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filtered1960sForHome.length > 0 && (
            <MovieList
              title="Top Rated 1960s"
              movies={filtered1960sForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-1960s")}
              totalCount={movies1960s.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {filteredPre1960ForHome.length > 0 && (
            <MovieList
              title="Top Rated Pre-1960"
              movies={filteredPre1960ForHome}
              userRatings={userRatings}
              favorites={favorites ?? []}
              watchLater={watchLater ?? []}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchLater={handleToggleWatchLater}
              onMovieClick={handleMovieSelect}
              triggers={triggers}
              onTitleClick={() => handleGridCategoryClick("decade-pre1960")}
              totalCount={moviesPre1960.length}
              isLoading={loading}
              onLoadMore={undefined}
              hasMore={false}
              isLoadingMore={false}
            />
          )}

          {HORROR_SUBGENRE_DEFINITIONS.map((subgenreDef) => {
            const subgenreMovies =
              moviesBySubgenre[subgenreDef.id]?.slice(0, 20) ?? [];

            if (subgenreMovies.length === 0) return null;

            return (
              <MovieList
                key={subgenreDef.id}
                title={subgenreDef.name}
                movies={subgenreMovies}
                userRatings={userRatings}
                favorites={favorites ?? []}
                watchLater={watchLater ?? []}
                onToggleFavorite={handleToggleFavorite}
                onToggleWatchLater={handleToggleWatchLater}
                onMovieClick={handleMovieSelect}
                triggers={triggers}
                onTitleClick={() =>
                  handleGridCategoryClick(
                    `subgenre-${subgenreDef.id}` as GridCategory
                  )
                }
                totalCount={moviesBySubgenre[subgenreDef.id]?.length ?? 0}
                isLoading={loading}
                onLoadMore={undefined}
                hasMore={false}
                isLoadingMore={false}
              />
            );
          })}
        </div>
      </div>
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        currentToken={apiToken ?? null}
        onSaveToken={handleSaveApiToken}
        currentTriggerApiUrl={triggerApiUrl ?? null}
        onSaveTriggerApiUrl={handleSaveTriggerApiUrl}
      />
      <ShareFavoritesDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        favoriteMovieIds={favorites ?? []}
      />
      <ShareWatchlistDialog
        open={shareWatchlistDialogOpen}
        onOpenChange={setShareWatchlistDialogOpen}
        watchLaterMovieIds={watchLater ?? []}
      />
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        favorites={favorites ?? []}
        watchLater={watchLater ?? []}
        reviews={reviews ?? {}}
        userProfile={userProfile ?? null}
        viewingHistory={viewingHistory ?? []}
        allMovies={allMovies}
      />
      <UserProfileDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        profile={userProfile ?? null}
        onSaveProfile={handleUpdateProfile}
        viewingHistory={(viewingHistory ?? [])
          .map((h) => allMovies[h.movieId])
          .filter((m): m is Movie => m !== undefined)}
        onMovieClick={handleMovieSelect}
      />
      <DevTools />
      <KeyboardNavigationHint />
      <Toaster position="top-right" />
    </>
  );
}

export default FilmPage;
