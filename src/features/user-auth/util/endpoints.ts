// https://djoser.readthedocs.io/en/latest/getting_started.html for a full list of auth endpoints
const USER_ENDPOINTS = {
  activate: "users/activation/",
  createUser: "users/",
  me: "users/me",
  verify: "users/auth/jwt/verify/",
  refresh: "users/auth/jwt/refresh/",
  login: "users/auth/jwt/create/",
  resetPassword: "users/reset_password/",
  resetPasswordConfirm: "users/reset_password_confirm/",
  resendActivation: "users/resend_activation/",
  verifyEmail: "users/exists/",
};

export default USER_ENDPOINTS;
