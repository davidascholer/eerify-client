import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import useBooksQuery from "../hooks/useBooksQuery";
import { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { BookResult } from "../utils/interface";

const styles = {
  container: {},
};

const Books: React.FC<PropsWithChildren> = () => {
  const [queryText, setQueryText] = React.useState<string>("");
  const { data, isLoading, error } = useBooksQuery({ searchQuery: queryText });
  const searchParams = useSearchParams()[0];

  React.useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setQueryText(query);
    } else {
      setQueryText("");
    }
  }, [searchParams]);

  if (isLoading && queryText !== "") return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      {(data as AxiosResponse)?.data?.items
        ? (data as AxiosResponse).data.items.map((book: BookResult) => (
            <Typography key={book.id}>{book.volumeInfo.title}</Typography>
          ))
        : null}
    </Box>
  );
};

export default Books;
