import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const otpStore = new Map();
const STATIC_PASSWORD = '829615'; // Exact PIN required

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
    const expiresAt = Date.now() + (10 * 60 * 1000);
    otpStore.set('slides_otp', { otp, expiresAt });

    await transporter.sendMail({
      from: `"Slides Access" <${process.env.OTP_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: '🔐 Your Access OTP',
      html: `<h2>Your OTP Code: ${otp}</h2>`
    });

    res.json({ ok: true, message: 'OTP sent', v: '2.0-local' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Mail server error.', v: '2.0-local' });
  }
});

app.post('/api/otp/verify', (req, res) => {
  const { otp, password } = req.body;

  // 🛡 1. PIN CHECK (Highest Priority)
  if (password) {
    if (password === STATIC_PASSWORD) {
      return res.json({ ok: true, message: 'PIN Verified', v: '2.0-local' });
    }
    return res.status(401).json({ ok: false, message: 'Incorrect PIN', v: '2.0-local' });
  }

  // 🛡 2. OTP CHECK (Fallback)
  if (otp) {
    const record = otpStore.get('slides_otp');
    if (!record) return res.status(400).json({ ok: false, message: 'No OTP requested.', v: '2.0-local' });
    if (Date.now() > record.expiresAt) return res.status(400).json({ ok: false, message: 'OTP expired.', v: '2.0-local' });

    if (otp.trim() === record.otp) {
      otpStore.delete('slides_otp');
      return res.json({ ok: true, message: 'OTP Verified', v: '2.0-local' });
    }
    return res.status(401).json({ ok: false, message: 'Incorrect OTP code.', v: '2.0-local' });
  }

  // 🛡 3. FINAL ERROR (Neither was provided correctly)
  return res.status(401).json({ ok: false, message: 'PIN is required to continue.', v: '2.0-local' });
});

app.listen(PORT, () => console.log(`✅ Verified v2.0-local: Running at http://localhost:${PORT}`));
