import {
  Link,
  Typography,
  Stack,
  List,
  ListItem,
  CircularProgress,
  Paper,
} from "@mui/material";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../lib/redux-toolkit/hooks";
import { setGenreId } from "../../../../redux/slices/gamesSlice";

const GenreList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useAppSelector((state) => state.games.genreId);
  const handleSetGenreId = (genreId: number) => {
    dispatch(setGenreId(genreId));
  };

  if (error) return null;

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h1" fontSize="2xl" marginTop={9} marginBottom={3}>
        Genres
      </Typography>
      <List>
        {data?.results.map((genre) => (
          <ListItem key={genre.id} sx={{ paddingY: "5px" }}>
            <Stack>
              <Paper
                sx={{
                  width: "32px",
                  height: "32px",
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              >
                <img src={getCroppedImageUrl(genre.image_background)} />
              </Paper>
              <Link
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                onClick={() => handleSetGenreId(genre.id)}
                fontSize="md"
              >
                {genre.name}
              </Link>
            </Stack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
