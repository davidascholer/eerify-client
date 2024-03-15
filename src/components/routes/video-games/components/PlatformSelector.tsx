import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setPlatformId } from "../../../../redux/slices/gamesSlice";

const PlatformSelector = () => {
  const dispatch = useAppDispatch();
  const { data, error } = usePlatforms();
  const handleSetSelectedPlatformId = (platformId: number) => {
    dispatch(setPlatformId(platformId));
  };
  const selectedPlatformId = useAppSelector((state) => state.games.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        {data?.results.map((platform) => (
          <MenuItem
            onClick={() => handleSetSelectedPlatformId(Number(platform.id))}
            key={platform.id}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
