import bcrypt from "bcryptjs";
import UserModel from '../models/userModel.js';
import { generateTemporaryPassword } from '../utils/password.js';
import { sendEmail } from './emailService.js';

const checkDuplicateEmail = async (email) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const createUser = async ({ name, email, password, profileImage }) => {
    return await UserModel.create({
        name,
        email,
        password,
        profileImage
    });
};

const sendTemporaryPasswordEmail = async (email, temporaryPassword) => {
    await sendEmail({
        to: email,
        subject: "Temporary Password",
        text: ""
    });
};

export const registerUser = async ({ name, email, profileImage }) => {
    try {
        await checkDuplicateEmail(email);

        const temporaryPassword = generateTemporaryPassword();

        const hashedPassword = await hashPassword(temporaryPassword);

        const newUser = await createUser({
            name,
            email,
            password: hashedPassword,
            profileImage,
        });

        await sendTemporaryPasswordEmail(email, temporaryPassword);

        return newUser;

    } catch (error) {
        throw new Error(error.message);
    }
}