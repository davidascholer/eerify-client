import { Skeleton, Box } from "@mui/material";

const GameCardSkeleton = () => {
  return (
    <>
      <Skeleton variant="rounded" height={118} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width={"80%"} />
        <Skeleton width={"60%"} />
      </Box>
    </>
  );
};

export default GameCardSkeleton;
