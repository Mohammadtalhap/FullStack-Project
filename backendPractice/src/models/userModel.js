import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            default: "default.png",
        },
        verificationCode: {
            type: String,
            default: null,
        },
        verificationCodeExpires: {
            type: Date,
            default: null,
        }
    },
    {
        timeStamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;