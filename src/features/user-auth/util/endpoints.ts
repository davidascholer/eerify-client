// https://djoser.readthedocs.io/en/latest/getting_started.html for a full list of auth endpoints
const USER_ENDPOINTS = {
  postUser: "users",
  me: "users/me",
  create: "users/auth/jwt/create",
  verify: "users/auth/jwt/verify",
  refresh: "users/auth/jwt/refresh",
  resetPassword: "users/reset_password",
  resendActivation: "users/resend_activation",
};

export default USER_ENDPOINTS;
