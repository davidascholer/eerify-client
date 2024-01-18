import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";

function MoneyInput({
  label,
  setValue,
}: {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };
  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label={label}
          onChange={handleChange}
          type={"number"}
        />
      </FormControl>
    </Box>
  );
}

export default MoneyInput;
