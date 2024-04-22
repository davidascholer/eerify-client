/*
    Requires a Formik parent.
*/
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FormikObjectValuesProps } from "../../util/constants";

type PasswordFieldProps = {
  styles: object;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ styles }) => {
  const context = useFormikContext<FormikObjectValuesProps>();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        sx={[styles]}
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="off"
        value={context.values.password}
        onChange={context.handleChange}
        onBlur={context.handleBlur}
        error={context.touched.password && Boolean(context.errors.password)}
      />
      <Typography sx={[styles]} variant="caption" color="error">
        {context.touched.password && context.errors.password}
      </Typography>
    </Box>
  );
};

export default PasswordField;
