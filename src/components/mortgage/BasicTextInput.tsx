import TextField from "@mui/material/TextField";
import { Box, InputAdornment } from "@mui/material";

function BasicTextInput({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ m: 1, mb: 4 }}>
      <TextField
        id="filled-read-only-input"
        label={label}
        value={value}
        InputProps={{
          readOnly: true,
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Box>
  );
}

export default BasicTextInput;
