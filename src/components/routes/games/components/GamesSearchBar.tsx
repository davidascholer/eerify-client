import React, { type PropsWithChildren } from "react";

const styles = {
  container: {},
};

const GamesSearchBar: React.FC<PropsWithChildren> = () => {
  return (
    <div style={styles.container}>
      <p>GamesSearchBar</p>
    </div>
  );
};

export default GamesSearchBar;
