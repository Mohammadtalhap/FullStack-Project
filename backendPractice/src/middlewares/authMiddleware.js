import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Auth header stating with: ", authHeader);
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token Invalid !!" });
    }
};

export default authMiddleware;