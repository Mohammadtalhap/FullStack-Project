import express from 'express';
import { loginUser, registerUserController } from '../controllers/authController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerUserController);
router.post('/login', loginUser);

export default router;