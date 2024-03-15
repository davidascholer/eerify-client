import { Heading } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import { useAppSelector } from "../../../../redux/hooks";

const GameHeading = () => {
  const genreId = useAppSelector((state) => state.games.genreId);
  const genre = useGenre(genreId);

  const platformId = useAppSelector((state) => state.games.platformId);
  const platform = usePlatform(platformId);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
