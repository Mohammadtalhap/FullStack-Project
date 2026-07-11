import express from 'express';
import { changePasswordController, forgotPasswordController, loginController, registerController, resetPasswordController } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerController);
router.post('/login', loginController);
router.patch('/auth/change-password', authMiddleware, changePasswordController);
router.post('/auth/forgot-password', forgotPasswordController);
router.post('/auth/reset-password', resetPasswordController);

export default router;