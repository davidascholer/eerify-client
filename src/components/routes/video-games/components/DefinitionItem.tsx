import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <Box marginY={5}>
      <Typography variant="h1" fontSize={"md"} color="gray.600">
        {term}
      </Typography>
      <dd>{children}</dd>
    </Box>
  );
};

export default DefinitionItem;
