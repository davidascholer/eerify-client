import React, { useEffect } from "react";
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
            <div key={game.id} className="h-[100px]">
              {game.name}
            </div>
          ))
        : null}
    </>
  );
};

export default GamesResult;
