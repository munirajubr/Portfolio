import jwt from 'jsonwebtoken';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import crypto from 'crypto';

const app = express();

// Use middleware to parse JSON and handle CORS
app.use(cors({ 
  origin: '*',
  credentials: true 
}));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const OTP_DIGITS = 6;

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

// GET health check
app.get('/api/check-health', (req, res) => {
  res.json({ ok: true, message: 'Serverless API is alive' });
});

// POST /api/otp/send
app.post('/api/otp/send', async (req, res) => {
  try {
    const otp = generateOTP();
    // Statelessly sign the OTP + hash in a JWT
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const token = jwt.sign({ otpHash }, JWT_SECRET, { expiresIn: '10m' });

    await transporter.sendMail({
      from: `"Portfolio Slides" <${process.env.OTP_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: '🔐 Your Slides Access OTP',
      html: `
        <div style="font-family: 'Syne', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #fdfcf0; border: 3px solid #000; border-radius: 16px;">
          <h1 style="font-size: 28px; font-weight: 800; text-transform: uppercase;">Your OTP Code</h1>
          <p>Use the code below to gain access to the Slides page.</p>
          <div style="background: #fff; border: 3px solid #000; border-radius: 14px; box-shadow: 6px 6px 0 #000; padding: 24px; text-align: center; margin: 20px 0;">
            <p style="font-size: 48px; font-weight: 900; letter-spacing: 12px; margin: 0;">${otp}</p>
          </div>
          <p style="font-size: 13px; opacity: 0.5;">Expires in 10 minutes.</p>
        </div>
      `,
    });

    res.json({ ok: true, token }); // Give the client the token to send back for verification
  } catch (err) {
    console.error('Send OTP error:', err.message);
    res.status(500).json({ ok: false, message: 'Server failed to send email. Check API logs.' });
  }
});

// POST /api/otp/verify
app.post('/api/otp/verify', (req, res) => {
  const { otp, token } = req.body;
  if (!otp || !token) return res.status(400).json({ ok: false, message: 'Missing OTP or Token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const inputHash = crypto.createHash('sha256').update(otp.trim()).digest('hex');

    if (inputHash === decoded.otpHash) {
      return res.json({ ok: true, message: 'Verified successfully' });
    }
    return res.status(401).json({ ok: false, message: 'Invalid OTP' });
  } catch (e) {
    console.error('Verify error:', e.message);
    return res.status(401).json({ ok: false, message: 'Token expired or invalid. Please resend code.' });
  }
});

export default app;
