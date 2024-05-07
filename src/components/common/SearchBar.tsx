import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete, IconButton } from "@mui/material";
import { Cancel, Search } from "@mui/icons-material";
import { toolbarSize } from "../app-bar/config";

const MAX_SUGGESTION_LIMIT = 8;

type SearchBarType = {
  handleOnChange: (value: string) => void;
  handleOnSearch: () => void;
  setUpdateFlag: () => void;
  optionList: string[];
  sx?: object;
};
const SearchBar: React.FC<SearchBarType> = ({
  handleOnChange,
  handleOnSearch,
  setUpdateFlag,
  sx: propStyles = {},
  optionList,
}) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [showSearchAdornment, setShowSearchAdornment] =
    React.useState<boolean>(false);

  // Wait some time between characters before calling the handleOnChange function
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      handleOnChange(searchText);
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          height: toolbarSize * 0.6 + "px",
          maxWidth: "600px",
        },
        propStyles,
      ]}
    >
      <Box
        component={"form"}
        sx={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
          borderColor: (theme) => theme.colors.iconColor,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Autocomplete
          id="controlled-demo"
          sx={{
            width: "100%",
            pl: 1,
            "& .MuiAutocomplete-clearIndicator": {
              p: 0,
              mr: 1,
            },
          }}
          inputValue={searchText}
          autoComplete
          blurOnSelect
          clearOnEscape
          forcePopupIcon={false}
          noOptionsText={""}
          freeSolo
          disableClearable={searchText.length === 0}
          options={
            optionList.length > MAX_SUGGESTION_LIMIT
              ? optionList.slice(0, MAX_SUGGESTION_LIMIT)
              : optionList
          }
          onInputChange={(e) => {
            const text = (e?.target as HTMLInputElement)?.value;

            if (typeof text === "string") setSearchText(text);
          }}
          onChange={(e, value) => {
            setSearchText(() => (value ? value : ""));
            setUpdateFlag();
          }}
          clearIcon={
            <Cancel
              sx={{
                fill: (theme) => theme.colors.colorPalette.blueOpaque("a"),
                p: 0,
              }}
            />
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              label=""
              variant="standard"
              InputProps={{
                ...params.InputProps,
                startAdornment:
                  showSearchAdornment || searchText.length > 0 ? (
                    <Search sx={{ opacity: 0.75, mr: 1 }} />
                  ) : null,
                disableUnderline: true,
              }}
              onFocus={() => setShowSearchAdornment(true)}
              onBlur={() => setShowSearchAdornment(false)}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          minWidth: "75px",
          borderRightWidth: "2px",
          borderTop: "2px",
          borderBottomWidth: "2px",
          borderLeftWidth: 0,
          borderStyle: "solid",
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "50px",
          borderColor: (theme) => theme.colors.iconColor,
          backgroundColor: (theme) => theme.colors.colorPalette.blueOpaque("7"),
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleOnSearch}>
          <Search />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
