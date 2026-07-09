import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import { changePassword, registerUser } from '../services/authService.js';
import generateToken from '../utils/generateToken.js';

export const registerController = async (req, res) => {
    try {
        const { name, email } = req.body;
        const profileImage = req.file ? req.file.filename : 'default.png';

        const user = await registerUser({ name, email, profileImage });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Error Registering User", error: error.message });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        console.log("Email: ", email, "Password: ", password);

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const changePasswordController = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        await changePassword({
            userId: req.user._id,
            currentPassword,
            newPassword
        });

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, 
            error: error.message
        });
    }
}