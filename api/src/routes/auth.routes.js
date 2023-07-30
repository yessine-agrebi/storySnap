import express from 'express';
import { authController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/password/reset/request', authController.requestPasswordReset);
router.post('/password/reset', authController.resetPassword);
router.post('/email/verify/request', authController.requestEmailVerification);
router.post('/email/verify', authController.verifyEmail);

export default router;
