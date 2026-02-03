const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://www.writeplus.in",
    "https://writeplus.in",
  ],
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  whatsapp: String,
  timestamp: { type: Date, default: Date.now },
});

const Lead = mongoose.model("Lead", LeadSchema);

app.post("/api/save-lead", async (req, res) => {
  try {
    const { name, email, whatsapp } = req.body;
    const newLead = new Lead({ name, email, whatsapp });
    await newLead.save();
    res.json({ success: true, message: "Form data saved" });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ error: "Failed to save form data" });
  }
});

const templatePath = path.join(__dirname, "email-template.html");
if (!fs.existsSync(templatePath)) {
  console.error("❌ Email template not found at:", templatePath);
  process.exit(1);
}
const emailTemplate = fs.readFileSync(templatePath, "utf8");

const ebookPath = path.join(__dirname, "ebook.pdf");
if (!fs.existsSync(ebookPath)) {
  console.error("❌ Ebook file not found at:", ebookPath);
  process.exit(1);
}

app.post("/api/send-ebook", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid or missing email address" });
  }

  try {
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

    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timeout")), 30000),
    );

    await Promise.race([sendPromise, timeoutPromise]);

    res.json({ success: true, message: "Ebook sent successfully" });
  } catch (error) {
    console.error("❌ Email sending error:", {
      message: error.message,
      stack: error.stack,
      email,
      time: new Date().toISOString(),
    });

    const knownErrors = {
      "Invalid login": "Email server authentication failed",
      timeout: "Email server response timeout",
    };

    const errorKey = Object.keys(knownErrors).find((key) =>
      error.message.includes(key),
    );

    res.status(500).json({
      error: knownErrors[errorKey] || "Failed to send email",
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
