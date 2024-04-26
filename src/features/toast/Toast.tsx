import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Snackbar } from "@mui/material";
import { useState } from "react";

export default function Toast({
  msg,
  open,
  close,
}: {
  msg: string;
  open: boolean;
  close?: undefined | (() => void);
}) {
  const [opened, setOpened] = useState(open);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={opened}
      autoHideDuration={5000}
      onClose={() => {
        setOpened(false);
        close ? close() : null;
      }}
    >
      <Alert
        variant="filled"
        icon={<CheckIcon fontSize="inherit" />}
        sx={{ backgroundColor: (theme) => theme.colors.colorPalette.blue }}
        severity="success"
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
