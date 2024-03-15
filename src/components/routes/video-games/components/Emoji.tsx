import { Paper, Typography } from "@mui/material";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  return (
    <Paper variant="outlined">
      <Typography>rating: {rating}</Typography>
    </Paper>
  );
};

export default Emoji;
