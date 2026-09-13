const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // Standard configuration for Gmail
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

const sendOtpEmail = async (toEmail, otp) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"MindVault" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: 'Your Registration OTP',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">Welcome to MindVault!</h2>
                <p style="font-size: 16px; color: #555;">To complete your registration, please use the following One-Time Password (OTP):</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; padding: 10px 20px; font-size: 24px; font-weight: bold; color: #fff; background-color: #007bff; border-radius: 5px; letter-spacing: 2px;">
                        ${otp}
                    </span>
                </div>
                <p style="font-size: 14px; color: #777; text-align: center;">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (toEmail, otp) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"MindVault" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: 'Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">MindVault Password Reset</h2>
                <p style="font-size: 16px; color: #555;">You requested a password reset. Please use the following One-Time Password (OTP) to reset your password:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; padding: 10px 20px; font-size: 24px; font-weight: bold; color: #fff; background-color: #007bff; border-radius: 5px; letter-spacing: 2px;">
                        ${otp}
                    </span>
                </div>
                <p style="font-size: 14px; color: #777; text-align: center;">This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendOtpEmail,
    sendPasswordResetEmail
};
