import Pentagram from "@/assets/icons/Pentagram";

interface FavoriteIconProps {
  isFavorite?: boolean;
  size?: number;
}

export function FavoriteIcon({
  isFavorite = false,
  size = 20,
}: FavoriteIconProps) {
  return (
    <Pentagram
      className={isFavorite ? "fill-primary" : "fill-white"}
      style={{ width: size, height: size }}
    />
  );
}
