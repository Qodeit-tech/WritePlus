const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: [
    "https://www.writeplus.in", // Add www version
    "https://writeplus.in", // Non-www version
  ],
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Verify email template exists
const templatePath = path.join(__dirname, "email-template.html");
if (!fs.existsSync(templatePath)) {
  console.error("Email template not found at:", templatePath);
  process.exit(1);
}
const emailTemplate = fs.readFileSync(templatePath, "utf8");

// Verify ebook exists
const ebookPath = path.join(__dirname, "ebook.pdf");
if (!fs.existsSync(ebookPath)) {
  console.error("Ebook file not found at:", ebookPath);
  process.exit(1);
}

// Email sending endpoint
app.post("/api/send-ebook", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // Create transporter with better configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();

    const mailOptions = {
      from: `"WritePlus" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your WritePlus eBook is Here – Attached Inside!",
      html: emailTemplate,
      attachments: [
        {
          filename: "WritePlus - AI Research Accelerator.pdf",
          path: ebookPath,
          contentType: "application/pdf",
        },
      ],
    };
    // Send email with timeout
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timeout")), 15000)
    );
    await Promise.race([sendPromise, timeoutPromise]);
    res.json({ success: true, message: "Ebook sent successfully" });
  } catch (error) {
    console.error("Detailed email sending error:", {
      error: error.message,
      stack: error.stack,
      email: email,
      time: new Date().toISOString(),
    });
    let errorMessage = "Failed to send email";
    if (error.message.includes("Invalid login")) {
      errorMessage = "Email server authentication failed";
    } else if (error.message.includes("timeout")) {
      errorMessage = "Email server response timeout";
    }
    res.status(500).json({
      error: "Failed to send email",
    });
  }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
