import jwt from 'jsonwebtoken';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import crypto from 'crypto';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secure_jwt_secret_v2';
const STATIC_PASSWORD = '829615'; 
const RECIPIENT_EMAIL = 'munirajgowdaraj@outlook.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_APP_PASSWORD,
  },
});

app.post('/api/otp/send', async (req, res) => {
  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const token = jwt.sign({ otpHash }, JWT_SECRET, { expiresIn: '10m' });

    await transporter.sendMail({
      from: `"Slides Access" <${process.env.OTP_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject: '🔐 Your Access OTP',
      html: `<div style="padding:20px; font-family:sans-serif; text-align:center;">
        <h2>Your OTP Code</h2>
        <div style="font-size:32px; font-weight:bold; letter-spacing:10px; padding:20px; background:#f0f0f0; border-radius:10px;">${otp}</div>
        <p>This code will expire in 10 minutes.</p>
      </div>`
    });

    res.json({ ok: true, token, v: "2.0" });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Mail server error.', v: "2.0" });
  }
});

app.post('/api/otp/verify', (req, res) => {
  const { otp, token, password } = req.body;

  // 1. Check PIN first (Priority)
  if (password) {
    if (password === STATIC_PASSWORD) {
      return res.json({ ok: true, message: 'PIN Verified', v: "2.0" });
    }
    return res.status(401).json({ ok: false, message: 'Incorrect PIN', v: "2.0" });
  }

  // 2. Check OTP next
  if (otp && token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const inputHash = crypto.createHash('sha256').update(otp.trim()).digest('hex');

      if (inputHash === decoded.otpHash) {
        return res.json({ ok: true, message: 'OTP Verified', v: "2.0" });
      }
      return res.status(401).json({ ok: false, message: 'Invalid OTP', v: "2.0" });
    } catch (e) {
      return res.status(401).json({ ok: false, message: 'Token expired', v: "2.0" });
    }
  }

  // If we reach here, neither was provided correctly
  return res.status(400).json({ ok: false, message: 'PIN is required to continue.', v: "2.0" });
});

export default app;
