/*
    Requires a Formik parent.
*/
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FormikObjectValuesProps } from "../../util/constants";

type PasswordVerifyFieldProps = {
  styles: object;
};

const PasswordVerifyField: React.FC<PasswordVerifyFieldProps> = ({
  styles,
}) => {
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
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="off"
        value={context.values.confirmPassword}
        onChange={context.handleChange}
        onBlur={context.handleBlur}
        error={
          context.touched.confirmPassword &&
          Boolean(context.errors.confirmPassword)
        }
      />
      <Typography sx={[styles]} variant="caption" color="error">
        {context.touched.confirmPassword && context.errors.confirmPassword}
      </Typography>
    </Box>
  );
};

export default PasswordVerifyField;
