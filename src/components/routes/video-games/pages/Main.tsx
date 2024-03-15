import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <Grid
    // templateAreas={{
    //   base: `"main"`,
    //   lg: `"aside main"`,
    // }}
    // templateColumns={{
    //   base: "1fr",
    //   lg: "250px 1fr",
    // }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion
        </AccordionSummary>
        <AccordionDetails>
          <Grid item paddingX={5}>
            <GenreList />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid item>
        <Box paddingLeft={2}>
          <GameHeading />
          <Box sx={{ display: "flex" }} marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector />
            </Box>
            <SortSelector />
          </Box>
        </Box>
        <GameGrid />
      </Grid>
    </Grid>
  );
};

export default HomePage;
