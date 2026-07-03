import bcrypt from "bcryptjs";
import UserModel from '../models/userModel.js';
import { generateTemporaryPassword } from '../utils/password.js';
import { sendEmail } from './emailService.js';
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

const checkDuplicateEmail = async (email) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
};

const hashPassword = async (password) => {
    console.log("Salt Rounds : ", SALT_ROUNDS);
    return await bcrypt.hash(password, SALT_ROUNDS);
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
        text: "Your temporary password is: " + temporaryPassword,
    });
};

export const registerUser = async ({ name, email, profileImage }) => {

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
}

const findUserById = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found !");
    }
    return user;
}

const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

const sendNewPasswordEmail = async (email, newPassword) => {
    await sendEmail({
        to: email,
        subject: "Changed Password Successfully",
        text: `Your password has been changed successfully.\nIf you did not perform this action, \nplease contact support immediately.`,
    });
}

export const changePassword = async ({ userId, currentPassword, newPassword }) => {

    const user = await findUserById(userId);

    const isPasswordMatch = await verifyPassword(currentPassword, user.password);

    if (!isPasswordMatch) {
        throw new Error("Current password is incorrect.");
    }

    const isSamePassword = await verifyPassword(newPassword, user.password);

    if (isSamePassword) {
        throw new Error("New password cannot be same as current password.");
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;

    await user.save();

    await sendNewPasswordEmail(user.email, newPassword);

    return user;
}