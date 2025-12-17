import React, { type PropsWithChildren } from "react";

const styles = {
  container: {},
};

const BookDetail: React.FC<PropsWithChildren> = () => {
  return (
    <div style={styles.container}>
      <p>BookDetail</p>
    </div>
  );
};

export default BookDetail;
