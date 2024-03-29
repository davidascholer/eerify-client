import React from "react";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GridContainer = ({ children }: { children: React.ReactNode }) => (
  <Grid
    container
    rowSpacing={1}
    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    alignItems="flex-start"
    spacing={{ xs: 2, md: 3 }}
  >
    {children}
  </Grid>
);

const GridItemContainer = ({ children }: { children: React.ReactNode }) => (
  <Grid
    item
    justifyContent="center"
    alignItems="center"
    xs={12}
    sm={6}
    md={4}
    lg={3}
    xl={2}
    sx={{ mb: 3 }}
  >
    {children}
  </Grid>
);

const GameGrid = () => {
  const {
    data,
    error,
    isLoading,
    // isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Typography>{error.message}</Typography>;

  console.debug("data", data);

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<CircularProgress />}
    >
      <Box sx={{ width: "100%" }}>
        {isLoading && (
          <GridContainer>
            {skeletons.map((skeleton) => (
              <GridItemContainer key={skeleton}>
                <GameCardSkeleton />
              </GridItemContainer>
            ))}
          </GridContainer>
        )}
        {data?.pages.map((page, index) => (
          <GridContainer>
            {page.results.map((game) => (
              <GridItemContainer key={index}>
                <GameCard key={game.id} game={game} />
              </GridItemContainer>
            ))}
          </GridContainer>
        ))}
      </Box>
    </InfiniteScroll>
  );
};

export default GameGrid;
