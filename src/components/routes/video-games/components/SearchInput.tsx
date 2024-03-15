import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { setSearchText } from "../../../../redux/slices/gamesSlice";
import { useAppDispatch } from "../../../../redux/hooks";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleSetSearchText = (searchText: string) => {
    dispatch(setSearchText(searchText));
  };
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          handleSetSearchText(ref.current.value);
          navigate("/");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
