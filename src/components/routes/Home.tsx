import React, { type PropsWithChildren } from "react";
import AnimatedSvg from "../spider/AnimatedSpider";

const styles = {
  container: {},
};

const Home: React.FC<PropsWithChildren> = () => {
  return (
    <div style={styles.container}>
      <h1>Home</h1>
      <AnimatedSvg play={true} />
    </div>
  );
};

export default Home;
