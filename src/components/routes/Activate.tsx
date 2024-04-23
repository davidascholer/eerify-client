import React, { type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const styles = {
  container: {},
};

const Activate: React.FC<PropsWithChildren> = () => {
  const { uid, token } = useParams();
  return (
    <Box style={styles.container}>
      <Typography>Activate</Typography>
      <Typography>{uid}</Typography>
      <Typography>{token}</Typography>
    </Box>
  );
};

export default Activate;
