import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;

  if (children.length <= limit) return <Typography>{children}</Typography>;

  const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <Typography>
      {summary}
      <Button
        size="small"
        sx={{ ml: 1 }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </Typography>
  );
};

export default ExpandableText;
