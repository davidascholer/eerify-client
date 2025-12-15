import { Box, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import CenteredCircularProgress from "../../../loading/CenteredCircularProgress";
import { BookResult } from "../utils/interface";
import { InfiniteData } from "@tanstack/react-query";

const styles = {
  container: {},
};

const BookResults = ({
  data,
  isLoading,
}: {
  data: InfiniteData<AxiosResponse>;
  isLoading: boolean;
}) => {
  if (isLoading) return <CenteredCircularProgress />;

  return (
    <Box style={styles.container}>
      {data?.pages
        ? data.pages.map((page: AxiosResponse) =>
            page?.data?.items
              ? page.data.items.map((book: BookResult) => (
                  <Typography key={book.id} sx={{ height: "100px" }}>
                    {book.volumeInfo.title.toLowerCase()}
                  </Typography>
                ))
              : null
          )
        : null}
    </Box>
  );
};

export default BookResults;
