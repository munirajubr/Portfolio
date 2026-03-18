// server/otpServer.js
// ─────────────────────────────────────────────────────────────────────────────
// Standalone Express server that handles OTP send + verify for the Slides page.
//
// Setup:
//   1. npm install express nodemailer cors dotenv
//   2. Add to your .env:
//        OTP_EMAIL=your.email@gmail.com
//        OTP_APP_PASSWORD=xxxx xxxx xxxx xxxx   ← Gmail App Password (no spaces needed)
//   3. Run alongside Vite:  node server/otpServer.js
//   4. Add to vite.config.js proxy so /api/* → http://localhost:3001
//
// ─────────────────────────────────────────────────────────────────────────────

import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Allow the production domain or all for simplicity in this portfolio context
app.use(cors({ 
  origin: process.env.FRONTEND_URL || '*', 
  credentials: true 
}));
app.use(express.json());

// ── In-memory OTP store (expires in 10 minutes) ───────────────────────────────
const otpStore = new Map(); // key: 'slides_otp', value: { otp, expiresAt, attempts }

const OTP_TTL_MS    = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS  = 5;
const OTP_DIGITS    = 6;

function generateOTP() {
  return crypto.randomInt(10 ** (OTP_DIGITS - 1), 10 ** OTP_DIGITS).toString();
}

// ── Nodemailer transporter (Gmail App Password) ───────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_APP_PASSWORD,
  },
});

// ── POST /api/otp/send ────────────────────────────────────────────────────────
app.post('/api/otp/send', async (req, res) => {
  try {
    const otp = generateOTP();
    const expiresAt = Date.now() + OTP_TTL_MS;

    otpStore.set('slides_otp', { otp, expiresAt, attempts: 0 });

    await transporter.sendMail({
      from: `"Portfolio Slides" <${process.env.OTP_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: '🔐 Your Slides Access OTP',
      html: `
        <div style="font-family: 'Syne', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #fdfcf0; border: 3px solid #000; border-radius: 16px;">
          <div style="background: #c0f7fe; border: 3px solid #000; border-radius: 10px; padding: 6px 0; text-align: center; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">PORTFOLIO · SLIDES ACCESS</p>
          </div>

          <h1 style="font-size: 28px; font-weight: 800; text-transform: uppercase; margin: 0 0 8px 0;">Your OTP</h1>
          <p style="font-size: 15px; opacity: 0.65; margin: 0 0 28px 0;">Use this code to access the Slides page. It expires in 10 minutes.</p>

          <div style="background: #fff; border: 3px solid #000; border-radius: 14px; box-shadow: 6px 6px 0 #000; padding: 24px; text-align: center; margin-bottom: 28px;">
            <p style="font-size: 48px; font-weight: 900; letter-spacing: 12px; margin: 0; color: #000;">${otp}</p>
          </div>

          <p style="font-size: 13px; opacity: 0.5; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    res.json({ ok: true, message: 'OTP sent' });
  } catch (err) {
    console.error('Send OTP error:', err.message);
    res.status(500).json({ ok: false, message: 'Failed to send OTP. Check server config.' });
  }
});

// ── POST /api/otp/verify ──────────────────────────────────────────────────────
app.post('/api/otp/verify', (req, res) => {
  const { otp } = req.body;

  if (!otp) return res.status(400).json({ ok: false, message: 'OTP is required.' });

  const record = otpStore.get('slides_otp');

  if (!record) return res.status(400).json({ ok: false, message: 'No OTP requested. Please request a new one.' });

  if (Date.now() > record.expiresAt) {
    otpStore.delete('slides_otp');
    return res.status(400).json({ ok: false, message: 'OTP has expired. Please request a new one.' });
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    otpStore.delete('slides_otp');
    return res.status(429).json({ ok: false, message: 'Too many attempts. Please request a new OTP.' });
  }

  record.attempts += 1;

  if (otp.trim() !== record.otp) {
    const remaining = MAX_ATTEMPTS - record.attempts;
    return res.status(401).json({ ok: false, message: `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.` });
  }

  // ✅ Correct
  otpStore.delete('slides_otp');
  res.json({ ok: true, message: 'Verified' });
});

app.listen(PORT, () => {
  console.log(`✅ OTP server running at http://localhost:${PORT}`);
});
