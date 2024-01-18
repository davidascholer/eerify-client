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
function YearsDropDown({ yearsToPayOff, setYearsToPayOff }:{yearsToPayOff:number, setYearsToPayOff:React.Dispatch<React.SetStateAction<number>>}) {
  const handleChange = (event: SelectChangeEvent) => {
    setYearsToPayOff(parseInt(event.target.value));
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Years To Pay Off</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(yearsToPayOff)}
          label="Years To Pay Off"
          onChange={handleChange}
        >
          <MenuItem sx={styles.menuItem} value={1}>
            One
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={2}>
            Two
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={3}>
            Three
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={4}>
            Four
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={5}>
            Five
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={6}>
            Six
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={7}>
            Seven
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={8}>
            Eight
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={9}>
            Nine
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={10}>
            Ten
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={11}>
            Eleven
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={12}>
            Twelve
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={13}>
            Thirteen
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={14}>
            Fourteen
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={15}>
            Fifteen
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={16}>
            Sixteen
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={17}>
            Seventeen
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={18}>
            Eighteen
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={19}>
            Nineteen
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={20}>
            Twenty
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={21}>
            TwentyOne
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={22}>
            TwentyTwo
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={23}>
            TwentyThree
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={24}>
            TwentyFour
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={25}>
            TwentyFive
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={26}>
            TwentySix
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={27}>
            TwentySeven
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={28}>
            TwentyEight
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={29}>
            TwentyNine
          </MenuItem>
          <MenuItem sx={styles.menuItem} value={30}>
            Thirty
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default YearsDropDown;
