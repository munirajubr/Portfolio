import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ 
  origin: process.env.FRONTEND_URL || '*', 
  credentials: true 
}));
app.use(express.json());

const otpStore = new Map();
const OTP_TTL_MS    = 10 * 60 * 1000;
const MAX_ATTEMPTS  = 5;
const OTP_DIGITS    = 6;

const STATIC_PASSWORD = '829615'; // Requested PIN

function generateOTP() {
  return crypto.randomInt(10 ** (OTP_DIGITS - 1), 10 ** OTP_DIGITS).toString();
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_APP_PASSWORD,
  },
});

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
          <h1 style="font-size: 28px; font-weight: 800; text-transform: uppercase;">Your OTP Code</h1>
          <p>Use the code below to access the Slides page.</p>
          <div style="background: #fff; border: 3px solid #000; border-radius: 14px; box-shadow: 6px 6px 0 #000; padding: 24px; text-align: center; margin: 20px 0;">
            <p style="font-size: 48px; font-weight: 900; letter-spacing: 12px; margin: 0;">${otp}</p>
          </div>
          <p style="font-size: 13px; opacity: 0.5;">Expires in 10 minutes.</p>
        </div>
      `,
    });

    res.json({ ok: true, message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Failed to send OTP.' });
  }
});

app.post('/api/otp/verify', (req, res) => {
  const { otp, password } = req.body;

  // Handle Static PIN first
  if (password && password === STATIC_PASSWORD) {
    return res.json({ ok: true, message: 'Verified' });
  }

  // Handle OTP fallback
  if (otp) {
    const record = otpStore.get('slides_otp');
    if (!record) return res.status(400).json({ ok: false, message: 'No OTP requested.' });
    if (Date.now() > record.expiresAt) return res.status(400).json({ ok: false, message: 'OTP expired.' });
    if (record.attempts >= MAX_ATTEMPTS) return res.status(429).json({ ok: false, message: 'Too many attempts.' });

    record.attempts += 1;
    if (otp.trim() === record.otp) {
      otpStore.delete('slides_otp');
      return res.json({ ok: true });
    }
    return res.status(401).json({ ok: false, message: 'Incorrect OTP.' });
  }

  return res.status(401).json({ ok: false, message: 'Incorrect PIN' });
});

app.listen(PORT, () => console.log(`✅ Local OTP server: http://localhost:${PORT}`));
