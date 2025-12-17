import React from "react";
import { toolbarSize } from "../app-bar/config";
import { SearchBarType } from "./interface";
import { KEY_PRESS_TIMEOUT, MAX_SUGGESTION_LIMIT } from "./config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search as SearchIcon, Loader2 } from "lucide-react";

const SearchBar: React.FC<SearchBarType> = ({
  sx: propStyles = {},
  optionList,
  handleOnChange,
  handleOnSubmit,
  loading,
}) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [showSearchAdornment, setShowSearchAdornment] =
    React.useState<boolean>(false);

  // Wait some time between characters before calling the handleOnChange function
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      handleOnChange(searchText);
    }, KEY_PRESS_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <div
      className="flex flex-row items-center justify-between"
      style={{ height: toolbarSize * 0.6 + "px", maxWidth: "600px", ...(propStyles as React.CSSProperties) }}
    >
      <div className="relative flex w-full h-full items-center">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="pl-9 pr-9 rounded-l-full border-2 h-full"
            onFocus={() => setShowSearchAdornment(true)}
            onBlur={() => setShowSearchAdornment(false)}
          />
          {searchText.length > 0 && (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground"
              onClick={() => setSearchText("")}
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {optionList.length > 0 && (showSearchAdornment || searchText.length > 0) && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
            <ul className="max-h-72 overflow-y-auto py-1 text-sm">
              {(optionList.length > MAX_SUGGESTION_LIMIT
                ? optionList.slice(0, MAX_SUGGESTION_LIMIT)
                : optionList
              ).map((opt, idx) => (
                <li
                  key={`${opt}-${idx}`}
                  className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onMouseDown={(e) => {
                    // onMouseDown to prevent input blur before click
                    handleOnSubmit(opt);
                    setSearchText(opt);
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        className="flex items-center justify-center h-full border-2 border-l-0 rounded-r-full px-4"
      >
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={() => handleOnSubmit(searchText)}
          disabled={loading}
          className="rounded-full"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <SearchIcon className="size-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
