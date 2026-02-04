const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: ["https://writeplus.in", "https://www.writeplus.in"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  whatsapp: String,
  timestamp: { type: Date, default: Date.now },
});

const Lead = mongoose.model("Lead", LeadSchema);

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  next();
});

// API Routes
app.post("/api/save-lead", async (req, res) => {
  console.log("📥 /api/save-lead request:", req.body);

  try {
    const { name, email, whatsapp } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const newLead = new Lead({ name, email, whatsapp });
    await newLead.save();

    console.log("✅ Lead saved:", { name, email, whatsapp });
    res.json({ success: true, message: "Form data saved" });
  } catch (error) {
    console.error("❌ Error saving form:", error);
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

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for:`);
  console.log(`   - https://writeplus.in`);
  console.log(`   - https://www.writeplus.in`);
});
