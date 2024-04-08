/*
    Requires a Formik parent.
*/
import React from "react";
import { TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FormikObjectValuesProps } from "../../util/constants";

type EmailFieldProps = {
  styles: object;
};

const EmailField: React.FC<EmailFieldProps> = ({ styles }) => {
  const context = useFormikContext<FormikObjectValuesProps>();
  return (
    <>
      <TextField
        sx={[styles]}
        fullWidth
        id="email"
        name="email"
        label="Email"
        autoComplete="email"
        value={context.values.email}
        onChange={context.handleChange}
        onBlur={context.handleBlur}
        error={context.touched.email && Boolean(context.errors.email)}
      />
      <Typography sx={[styles]} variant="caption" color="error">
        {context.touched.email && context.errors.email}
      </Typography>
    </>
  );
};

export default EmailField;
