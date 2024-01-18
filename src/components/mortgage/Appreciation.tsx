import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const styles = {
  menuItem: {
    justifyContent: "center",
  },
};
function Appreciation({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(parseFloat(event.target.value));
  };
  return (
    <Box sx={{ minWidth: 120, mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Expected Yearly Appreciation
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(value)}
          label="Expected Yearly Appreciation"
          onChange={handleChange}
        >
          <MenuItem sx={styles.menuItem} value={2}>
            2%
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={2.5}>
            2.5%
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={3}>
            3%
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={3.5}>
            3.5%
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={4}>
            4%
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={4.5}>
            4.5%
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Appreciation;
