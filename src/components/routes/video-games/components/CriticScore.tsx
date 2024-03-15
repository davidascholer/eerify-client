import Badge from "@mui/material/Badge";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  return (
    <Badge sx={{ fontSize: "14px", p: 1, borderRadius: "4px" }}>{score}</Badge>
  );
};

export default CriticScore;
