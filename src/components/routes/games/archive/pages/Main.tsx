// import {
//   Box,
//   Grid,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import GameGrid from "../components/GameGrid";
// import GameHeading from "../components/GameHeading";
// import GenreList from "../components/GenreList";
// import PlatformSelector from "../components/PlatformSelector";
// import SortSelector from "../components/SortSelector";

import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <Typography>hi</Typography>
    </Box>
    // <>
    //   <Accordion>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel2-content"
    //       id="panel2-header"
    //     >
    //       Accordion
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Grid item paddingX={5}>
    //         <GenreList />
    //       </Grid>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Box paddingLeft={2}>
    //     <GameHeading />
    //     <Box sx={{ display: "flex" }} marginBottom={5}>
    //       <Box marginRight={5}>
    //         <PlatformSelector />
    //       </Box>
    //       <SortSelector />
    //     </Box>
    //   </Box>
    //   <GameGrid />
    // </>
  );
};

export default HomePage;
