const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Send eBook route
app.post("/api/send-ebook", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"WritePlus" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your WritePlus eBook is Here – Attached Inside!",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your WritePlus eBook is Ready</title>
    <style>
        body { 
            font-family: 'Helvetica Neue', Arial, sans-serif; 
            background-color: #f8fafc; 
            margin: 0; 
            padding: 20px 0; 
            color: #334155; 
            line-height: 1.6;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff; 
            padding: 40px; 
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header { 
            text-align: center; 
            padding-bottom: 30px;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 30px;
        }
        .hero { 
            background: radial-gradient(
    circle at top right,
    rgb(125, 155, 223) 0%,
    rgb(125, 155, 223) 14.286%,
    rgb(114, 141, 216) 14.286%,
    rgb(114, 141, 216) 28.572%,
    rgb(102, 127, 209) 28.572%,
    rgb(102, 127, 209) 42.858%,
    rgb(91, 114, 203) 42.858%,
    rgb(91, 114, 203) 57.144%,
    rgb(79, 100, 196) 57.144%,
    rgb(79, 100, 196) 71.43%,
    rgb(68, 86, 189) 71.43%,
    rgb(68, 86, 189) 85.716%,
    rgb(56, 72, 182) 85.716%,
    rgb(56, 72, 182) 100.002%
  );
            color: #ffffff; 
            padding: 32px; 
            border-radius: 8px; 
            margin-bottom: 30px;
        }
        .hero h2 {
            font-weight: 600;
            margin-top: 0;
            font-size: 24px;
        }
        .cta-button { 
            display: inline-block; 
            padding: 16px 32px; 
            margin: 20px 0; 
            background: radial-gradient(
    circle at top right,
    rgb(125, 155, 223) 0%,
    rgb(125, 155, 223) 14.286%,
    rgb(114, 141, 216) 14.286%,
    rgb(114, 141, 216) 28.572%,
    rgb(102, 127, 209) 28.572%,
    rgb(102, 127, 209) 42.858%,
    rgb(91, 114, 203) 42.858%,
    rgb(91, 114, 203) 57.144%,
    rgb(79, 100, 196) 57.144%,
    rgb(79, 100, 196) 71.43%,
    rgb(68, 86, 189) 71.43%,
    rgb(68, 86, 189) 85.716%,
    rgb(56, 72, 182) 85.716%,
    rgb(56, 72, 182) 100.002%
  );
            color: white; 
            text-decoration: none; 
            font-weight: 600; 
            border-radius: 6px; 
            font-size: 16px;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .footer { 
            font-size: 13px; 
            text-align: center; 
            color: #64748b; 
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
        }
        a { 
            color: #3848B6; 
            text-decoration: none;
            font-weight: 500;
        }
        a:hover {
            text-decoration: underline;
        }
        h3 {
            color: #0f172a;
            font-size: 20px;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 10px;
        }
        hr {
            border: 0;
            height: 1px;
            background: #e2e8f0;
            margin: 30px 0;
        }
        .attachment-box {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            display: flex;
            align-items: center;
        }
        .attachment-icon {
            font-size: 24px;
            margin-right: 15px;
            color: #3848B6;
        }
        .attachment-info {
            flex: 1;
        }
        .attachment-name {
            font-weight: 600;
            margin-bottom: 5px;
        }
        .attachment-size {
            font-size: 13px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://yourdomain.com/images/writeplus-logo.webp" alt="WritePlus Logo" width="200" style="max-width:100%; height:auto;" />
        </div>

        <div class="hero">
            <h2>📘 Welcome to the AI-Powered Research Revolution</h2>
            <p>Congratulations! Your WritePlus eBook is attached to this email.</p>
        </div>

        <h3>📎 Your eBook Attachment</h3>
        <div class="attachment-box">
            <div class="attachment-icon">📚</div>
            <div class="attachment-info">
                <div class="attachment-name">WritePlus - AI Research Accelerator.pdf</div>
                <div class="attachment-size">PDF • 5.2 MB</div>
            </div>
        </div>

        <hr />

        <h3>💡 What You'll Learn Inside</h3>
        <ul>
            <li>How to complete <strong>PhD-level work in days</strong> instead of months</li>
            <li>The best AI tools for research, writing & data analysis</li>
            <li>Step-by-step workflows used by top academics</li>
            <li>Productivity hacks that eliminate burnout while accelerating results</li>
        </ul>

        <h3>🚀 What's Next?</h3>
        <p>Start reading today and watch your academic productivity transform. Tomorrow, you'll receive bonus materials and walkthroughs right in your inbox.</p>

        <p>Need assistance? Simply reply to this email or contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>

        <div class="footer">
            <p>You received this email because you purchased <strong>WritePlus</strong> at <a href="https://writeplus.in">Writeplus.in</a>.</p>
            <p>123 Academic Lane, Research City, USA</p>
            <p>
                <a href="#" style="color: #64748b;">Unsubscribe</a> &nbsp;|&nbsp; 
                <a href="#" style="color: #64748b;">Privacy Policy</a> &nbsp;|&nbsp;
                <a href="#" style="color: #64748b;">Manage Preferences</a>
            </p>
        </div>
    </div>
</body>
</html>
      `,
      attachments: [
        {
          filename: "WritePlus - AI Research Accelerator.pdf",
          path: "./ebook.pdf",
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
