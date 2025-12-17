import React, { useEffect } from "react";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { FilmResponseInterface } from "../utils/interface";
import { devDebug } from "../utils/logger";

const styles = {
  container: {},
};

interface FilmResultsProps {
  isLoading: boolean;
  data: any;
}

const FilmResults: React.FC<FilmResultsProps> = ({ isLoading, data }) => {
  if (isLoading) return <CenteredCircularProgress />;

  useEffect(() => {
    devDebug("data", data);
  }, [data]);

  return (
    <div style={styles.container}>
      {(data as FilmResponseInterface)?.data?.results
        ? (data as FilmResponseInterface).data.results.map((film) => (
            <div key={film.id} className="h-[100px]">
              {film.title}
            </div>
          ))
        : null}
    </div>
  );
};

export default FilmResults;
