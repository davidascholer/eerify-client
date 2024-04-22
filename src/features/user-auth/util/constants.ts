export type FormikObjectValuesProps = {
  email: string;
  password?: string;
  confirmPassword?: string;
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
