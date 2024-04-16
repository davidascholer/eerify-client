import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../lib/redux-toolkit/hooks";
import { setPlatformId } from "../../../../redux/slices/gamesSlice";
import { useState } from "react";

const PlatformSelector = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data, error } = usePlatforms();
  const handleSetSelectedPlatformId = (platformId: number) => {
    dispatch(setPlatformId(platformId));
  };
  const selectedPlatformId = useAppSelector((state) => state.games.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  if (error) return null;

  return (
    <Menu open={open} onChange={(isOpen) => setOpen(!isOpen)}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<BsChevronDown />}
      >
        {selectedPlatform?.name || "Platforms"}
      </Button>
      {data?.results.map((platform) => (
        <MenuItem
          onClick={() => handleSetSelectedPlatformId(Number(platform.id))}
          key={platform.id}
        >
          {platform.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default PlatformSelector;
