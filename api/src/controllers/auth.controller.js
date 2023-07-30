import { login, register, requestPasswordReset, resetPassword, requestEmailVerification, verifyEmail } from "../services/auth.service.js";

export const authController = {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  requestEmailVerification,
  verifyEmail,
};
