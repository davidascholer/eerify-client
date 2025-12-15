import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { GameResult } from "../utils/interface";
import { devDebug } from "../utils/logger";

const styles = {
  container: {},
};

interface GamesResultsProps {
  isLoading: boolean;
  data: any;
}

const GamesResult: React.FC<GamesResultsProps> = ({ isLoading, data }) => {
  if (isLoading) return <CenteredCircularProgress />;

  useEffect(() => {
    devDebug("data", data);
  }, [data]);

  return (
    <>
      {data?.results
        ? data.results.map((game: GameResult) => (
            <Typography key={game.id} sx={{ height: "100px" }}>
              {game.name}
            </Typography>
          ))
        : null}
    </>
  );
};

export default GamesResult;
