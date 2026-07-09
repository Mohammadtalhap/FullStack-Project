import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDb from './src/config/db.js';
import transporter from './src/config/mail.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import { generateResetToken } from './src/utils/token.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("src/public/images/uploads"));
app.use(productRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
    res.send("Hello From Backend !!");
});

const verifyTransporter = async () => {
    try {
        await transporter.verify();
        console.log("SMTP is ready to send emails.");
    } catch (error) {
        console.log("Email configuration error: ", error);
        throw error;
    }
}

const startServer = async () => {
    try {
        await connectDb();
        await verifyTransporter();

        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();

console.log(generateResetToken());
console.log(generateResetToken());
console.log(generateResetToken());