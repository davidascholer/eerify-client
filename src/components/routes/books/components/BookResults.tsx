import React from "react";
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
    <div style={styles.container}>
      {data?.pages
        ? data.pages.map((page: AxiosResponse) =>
            page?.data?.items
              ? page.data.items.map((book: BookResult) => (
                  <div key={book.id} className="h-[100px]">
                    {book.volumeInfo.title.toLowerCase()}
                  </div>
                ))
              : null
          )
        : null}
    </div>
  );
};

export default BookResults;
