import express from 'express';
import { changePasswordController, loginController, registerController } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerController);
router.post('/login', loginController);
// Api for update-password with authMiddleware
router.patch('/auth/change-password', authMiddleware, changePasswordController);

export default router;