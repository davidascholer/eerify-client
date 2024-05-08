export type SearchBarType = {
  handleOnSubmit: (value: string) => void;
  handleOnChange: (value: string) => void;
  optionList: string[];
  sx?: object;
  loading?: boolean;
};
