const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            secure: false,
            auth: {
                user: "YOUR_EMAIL@example.com",
                pass: "YOUR_SMTP_PASSWORD" // from Elastic Email
            }
        });

        await transporter.sendMail({
            from: "YOUR_EMAIL@example.com",
            to,
            subject,
            html: message
        });

        return res.json({ success: true, msg: "Email sent successfully!" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: "Email failed" });
    }
};

module.exports = {
    sendEmail,
}