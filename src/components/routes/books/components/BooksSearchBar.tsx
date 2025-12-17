import React, { type PropsWithChildren } from "react";

const styles = {
  container: {},
};

const BooksSearchBar: React.FC<PropsWithChildren> = () => {
  return (
    <div style={styles.container}>
      <p>BooksSearchBar</p>
    </div>
  );
};

export default BooksSearchBar;
