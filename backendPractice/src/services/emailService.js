import transporter from "../config/mail.js";

export const sendEmail = async ({ to, subject, text }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
}