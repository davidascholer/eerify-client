/*
    Requires a Formik parent.
*/
import React from "react";
import { TextField, Typography } from "@mui/material";
import { FormikObjectValuesProps } from "../../util/constants";
import { useFormikContext } from "formik";

type PasswordFieldProps = {
  styles: object;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ styles }) => {
  const context = useFormikContext<FormikObjectValuesProps>();
  return (
    <>
      <TextField
        sx={[styles]}
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={context.values.password}
        onChange={context.handleChange}
        onBlur={context.handleBlur}
        error={context.touched.password && Boolean(context.errors.password)}
      />
      <Typography sx={[styles, { mb: 1 }]} variant="caption" color="error">
        {context.touched.password && context.errors.password}
      </Typography>
    </>
  );
};

export default PasswordField;
