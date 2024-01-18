import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";

function PercentageInput({ value }: { value: string }) {
  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth disabled>
        <OutlinedInput
          id="outlined-adornment-amount"
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          value={value}
        />
      </FormControl>
    </Box>
  );
}

export default PercentageInput;
