// https://djoser.readthedocs.io/en/latest/getting_started.html for a full list of auth endpoints
const USER_ENDPOINTS = {
  createUser: "users/",
  me: "users/me",
  verify: "users/auth/jwt/verify",
  refresh: "users/auth/jwt/refresh",
  login: "users/auth/jwt/create",
  resetPassword: "users/reset_password",
  forgottenPassword: "users/forgotten_password",
  resendActivation: "users/resend_activation",
};

export default USER_ENDPOINTS;
