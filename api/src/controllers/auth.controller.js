import { login, register } from "../services/auth.service.js";

export const authController = {
    register: register,
    login: login
}