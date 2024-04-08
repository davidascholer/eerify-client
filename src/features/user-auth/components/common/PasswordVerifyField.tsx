/*
    Requires a Formik parent.
*/
import React from "react";
import { TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FormikObjectProps } from "../../util/constants";

type PasswordVerifyFieldProps = {
  formikObject: FormikObjectProps;
  styles: object;
};

const PasswordVerifyField: React.FC<PasswordVerifyFieldProps> = ({
  formikObject,
  styles,
}) => {
  const formik = useFormik(formikObject);
  return (
    <>
      <TextField
        sx={[styles]}
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="off"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
      />
      <Typography sx={[styles, { mb: 1 }]} variant="caption" color="error">
        {formik.touched.password && formik.errors.password}
      </Typography>
    </>
  );
};

export default PasswordVerifyField;
