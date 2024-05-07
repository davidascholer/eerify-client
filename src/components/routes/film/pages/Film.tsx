import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import useFilmQuery from "../hooks/useFilmQuery";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { FilmResultInterface, FilmResponseInterface } from "../utils/interface";
import SearchBar from "../../../common/SearchBar";

const styles = {
  container: {},
};

const Film: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, error } = useFilmQuery({ searchQuery: queryText });
  const [searchData, setSearchData] = React.useState<string[]>([]);
  const [shownData, setShownData] = React.useState<Array<FilmResultInterface>>(
    []
  );
  const [updateFlag, setUpdateFlag] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (data) {
      const returnArray: string[] = [];
      (data as FilmResponseInterface).data?.results?.map((film) =>
        returnArray.push(film.title.toLowerCase())
      );
      const uniqueArray = [...new Set(returnArray)];
      setSearchData(uniqueArray);
      if (setUpdateFlag) {
        setUpdateFlag(false);
        handleShowUpdatedData();
      }
    }
  }, [data]);

  const handleSearchInput = (inputString: string) => {
    setQueryText(inputString);
  };

  const handleShowUpdatedData = () => {
    const { results } = (data as FilmResponseInterface)?.data;
    if (results) {
      setShownData(results);
    } else {
      setSearchData([]);
    }
  };

  return (
    <Box style={styles.container}>
      <SearchBar
        handleOnChange={handleSearchInput}
        optionList={searchData}
        handleOnSearch={handleShowUpdatedData}
        setUpdateFlag={() => setUpdateFlag(true)}
      />
      {isLoading ? <CenteredCircularProgress /> : null}
      {shownData
        ? shownData.map((film) => (
            <Typography key={film.id}>{film.title}</Typography>
          ))
        : null}
    </Box>
  );
};

export default Film;
