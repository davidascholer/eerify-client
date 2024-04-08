import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export type FormikObjectValuesProps = {
  email: string;
  password: string;
};

export type FormikObjectProps = {
  initialValues: FormikObjectValuesProps;
  validationSchema: typeof validationSchema;
  onSubmit: (values: any) => void;
};

export const TOKEN_NAMES = {
  auth: "app-auth",
  refresh: "app-refresh",
};
