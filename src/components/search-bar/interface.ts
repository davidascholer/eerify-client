export type SearchBarType = {
  handleOnChange: (value: string) => void;
  handleOnSearch: () => void;
  setUpdateFlag: () => void;
  optionList: string[];
  sx?: object;
};
