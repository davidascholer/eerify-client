import { validationSchema } from "./helpers";

export type FormikObjectValuesProps = {
  email: string;
  password: string;
};

export type FormikObjectProps = {
  initialValues: FormikObjectValuesProps;
  validationSchema: typeof validationSchema;
  onSubmit: any;
};

export type VerifyTokenType = {
  verified?: boolean;
  type?: "auth" | "refresh" | unknown;
};

export const TOKEN_NAMES = {
  auth: "app-auth",
  refresh: "app-refresh",
};

export const SIMPLE_JWT_TOKEN_PREFIX = "JWT ";
