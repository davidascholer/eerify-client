import React from "react";
import { Button } from "@mui/material";

type SubmitButtonProps = {
  styles: object;
};

const PasswordField: React.FC<SubmitButtonProps> = ({ styles }) => {
  return (
    <Button
      color="primary"
      variant="contained"
      fullWidth
      type="submit"
      sx={[styles]}
    >
      Submit
    </Button>
  );
};

export default PasswordField;
