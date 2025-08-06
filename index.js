const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.static("public"));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

dotenv.config();
// Set up transporter using your Gmail (or other SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Not your Gmail password! See note below
  },
});

app.post("/submit-form", (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject || "New Contact Form Submission",
    text: `
      From: ${firstName} ${lastName}
      Subject: ${subject || "No Subject"}
      -----------
      Email: ${email}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send failed:", error);
      res.status(500).json({ error: "Email failed to send" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Message sent successfully!" });
    }
  });
});

try {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
} catch (err) {
  console.error("Failed to start server:", err);
}
