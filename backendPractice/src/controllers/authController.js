import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { registerUser } from '../services/authService.js';

export const registerUserController = async (req, res) => {
    try {
        const { name, email } = req.body;
        const profileImage = req.file ? req.file.filename : 'default.png';

        const user = await registerUser({ name, email, profileImage });

        const token = generateToken(user._id);

        res.status(201).json({
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
        res.status(500).json({ message: "Error Registering User", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
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
