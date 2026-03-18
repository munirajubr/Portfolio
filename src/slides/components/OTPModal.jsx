import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMail, IconShield, IconLock, IconRefresh } from '../icons';

const OTP_LENGTH = 6;


// ─── OTP digit box ────────────────────────────────────────────────────────────
const OTPBox = ({ value, isFocused, isError }) => (
  <div style={{
    width: 46, height: 56,
    border: '3px solid #000',
    borderRadius: 10,
    background: isError ? '#fff0f0' : isFocused ? '#c0f7fe' : '#fff',
    boxShadow: isError ? '4px 4px 0 #ff8282' : isFocused ? '4px 4px 0 #000' : '3px 3px 0 #000',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 22, fontWeight: 800, fontFamily: 'Syne, sans-serif',
    transition: 'all 0.12s', color: '#000', flexShrink: 0,
  }}>
    {value || ''}
  </div>
);

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function OTPModal({ status, error, cooldown, onRequest, onVerify, onVerifyPassword }) {

  // ── PIN state ────────────────────────────────────────────────────────────
  const [pin, setPin]         = useState('');
  const [pinError, setPinError] = useState(false);
  const PIN_LENGTH = 6; // Matching static password in backend

  // ── OTP state ────────────────────────────────────────────────────────────
  const [digits, setDigits]   = useState(Array(OTP_LENGTH).fill(''));
  const [focusIdx, setFocusIdx] = useState(0);
  const [otpError, setOtpError] = useState(false);
  const otpInputRef = useRef(null);
  const pinInputRef = useRef(null);

  // Which view: 'pin' | 'otp'
  const showOTP = ['sending', 'awaiting', 'otp_verifying', 'otp_error'].includes(status);

  useEffect(() => {
    if (!showOTP && pinInputRef.current) {
      pinInputRef.current.focus();
    }
  }, [showOTP]);

  // Focus OTP input when OTP screen shows
  useEffect(() => {
    if ((status === 'awaiting' || status === 'otp_verifying') && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [status]);

  // Flash PIN error
  useEffect(() => {
    if (status === 'pin_error') {
      setPinError(true);
      setPin('');
      const t = setTimeout(() => setPinError(false), 600);
      return () => clearTimeout(t);
    }
  }, [status, error]);

  // Flash OTP error
  useEffect(() => {
    if (error && (status === 'awaiting')) {
      setOtpError(true);
      setDigits(Array(OTP_LENGTH).fill(''));
      setFocusIdx(0);
      const t = setTimeout(() => setOtpError(false), 600);
      return () => clearTimeout(t);
    }
  }, [error, status]);

  // ── PIN keyboard handler ──────────────────────────────────────────────────
  const handlePinKey = (e) => {
    if (e.key === 'Backspace') { setPin(p => p.slice(0, -1)); return; }
    if (!/^\d$/.test(e.key)) return;
    const next = pin + e.key;
    setPin(next);
    if (next.length === PIN_LENGTH) {
      setTimeout(() => onVerifyPassword(next), 120); // slight delay so last dot fills
    }
  };

  // ── OTP keyboard handler ──────────────────────────────────────────────────
  const handleOtpKey = (e) => {
    if (e.key === 'Backspace') {
      const next = [...digits];
      if (next[focusIdx]) { next[focusIdx] = ''; setDigits(next); }
      else if (focusIdx > 0) { next[focusIdx - 1] = ''; setDigits(next); setFocusIdx(i => i - 1); }
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = [...digits];
    next[focusIdx] = e.key;
    setDigits(next);
    if (focusIdx < OTP_LENGTH - 1) { setFocusIdx(i => i + 1); }
    else { const otp = next.join(''); if (otp.length === OTP_LENGTH) onVerify(otp); }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setDigits(next);
    setFocusIdx(Math.min(pasted.length, OTP_LENGTH - 1));
    if (pasted.length === OTP_LENGTH) onVerify(pasted);
  };

  const isVerifyingPin = status === 'pin_verifying';
  const isVerifyingOtp = status === 'otp_verifying';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(253,252,240,0.88)',
        backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* Dot texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(black 1px, transparent 1px)',
        backgroundSize: '12px 12px',
      }} />

      {/* Card */}
      <motion.div
        initial={{ y: 36, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 36, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        style={{
          background: '#fff', border: '3px solid #000',
          borderRadius: 24, boxShadow: '10px 10px 0 #000',
          width: '100%', maxWidth: 420,
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 6, background: '#c0f7fe', borderBottom: '3px solid #000' }} />

        <div style={{ padding: '36px 40px 32px' }}>
          <AnimatePresence mode="wait">

            {/* ════════════════════════════════
                PIN VIEW  (default)
            ════════════════════════════════ */}
            {!showOTP && (
              <motion.div
                key="pin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onClick={() => pinInputRef.current?.focus()}
                style={{ cursor: 'text' }}
              >
                {/* Icon */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <motion.div
                    animate={pinError ? { rotate: [-8, 8, -6, 6, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <IconLock size={52} />
                  </motion.div>
                </div>

                <h2 style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', textAlign: 'center', marginBottom: 6 }}>
                  {isVerifyingPin ? 'Checking PIN...' : 'Enter PIN'}
                </h2>
                <p style={{ fontSize: 14, fontFamily: 'Outfit, sans-serif', opacity: 0.55, textAlign: 'center', lineHeight: 1.5, marginBottom: 4 }}>
                  Type your {PIN_LENGTH}-digit PIN to access slides.
                </p>

                {/* PIN boxes */}
                <motion.div
                  animate={pinError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => pinInputRef.current?.focus()}
                  style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24, cursor: 'text' }}
                >
                  {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                    <OTPBox 
                      key={i} 
                      value={pin[i] ? '*' : ''} 
                      isFocused={pin.length === i && !isVerifyingPin} 
                      isError={pinError} 
                    />
                  ))}
                </motion.div>

                {/* Hidden keyboard catcher */}
                <input
                  ref={pinInputRef}
                  type="password"
                  inputMode="numeric"
                  maxLength={PIN_LENGTH}
                  value={pin}
                  onChange={() => {}}
                  onKeyDown={handlePinKey}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
                  aria-label="PIN input"
                />

                {/* Error */}
                <AnimatePresence>
                  {status === 'pin_error' && !pinError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ background: '#ff8282', border: '2px solid #000', borderRadius: 10, padding: '9px 14px', marginBottom: 14, fontSize: 13, fontFamily: 'Outfit, sans-serif', fontWeight: 600, textAlign: 'center', color: '#000' }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 14px' }}>
                  <div style={{ flex: 1, height: 2, background: '#000', opacity: 0.1 }} />
                  <span style={{ fontSize: 11, fontFamily: 'Outfit, sans-serif', opacity: 0.4, letterSpacing: 1, textTransform: 'uppercase' }}>or</span>
                  <div style={{ flex: 1, height: 2, background: '#000', opacity: 0.1 }} />
                </div>

                {/* OTP option */}
                <button
                  onClick={onRequest}
                  style={{
                    width: '100%', background: 'none',
                    border: '2px dashed rgba(0,0,0,0.25)', borderRadius: 12,
                    padding: '11px 14px', fontSize: 13, fontWeight: 600,
                    fontFamily: 'Outfit, sans-serif', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    color: 'rgba(0,0,0,0.55)', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; e.currentTarget.style.background = '#f0efe3'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.25)'; e.currentTarget.style.color = 'rgba(0,0,0,0.55)'; e.currentTarget.style.background = 'none'; }}
                >
                  <IconMail size={15} />
                  Use OTP instead
                </button>
              </motion.div>
            )}

            {/* ════════════════════════════════
                SENDING SPINNER
            ════════════════════════════════ */}
            {status === 'sending' && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, border: '4px solid #000', borderTopColor: '#c0f7fe', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', marginBottom: 6 }}>Sending OTP…</h2>
                <p style={{ fontSize: 13, fontFamily: 'Outfit, sans-serif', opacity: 0.55 }}>Check your email in a moment.</p>
              </motion.div>
            )}

            {/* ════════════════════════════════
                OTP ENTRY VIEW
            ════════════════════════════════ */}
            {(status === 'awaiting' || isVerifyingOtp || status === 'otp_error') && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                  <IconShield size={40} />
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', textAlign: 'center', marginBottom: 6 }}>
                   {isVerifyingOtp ? 'Verifying OTP...' : 'Enter OTP'}
                </h2>
                <p style={{ fontSize: 13, fontFamily: 'Outfit, sans-serif', opacity: 0.55, textAlign: 'center', lineHeight: 1.5, marginBottom: 24 }}>
                  6-digit code sent to your email.
                </p>

                {/* Hidden input */}
                <input
                  ref={otpInputRef}
                  type="text" inputMode="numeric" maxLength={OTP_LENGTH}
                  onKeyDown={handleOtpKey} onPaste={handleOtpPaste} onChange={() => {}}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
                  aria-label="OTP input"
                />

                {/* Digit boxes */}
                <motion.div
                  animate={otpError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => otpInputRef.current?.focus()}
                  style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20, cursor: 'text' }}
                >
                  {digits.map((d, i) => (
                    <OTPBox key={i} value={d} isFocused={focusIdx === i && !isVerifyingOtp} isError={otpError} />
                  ))}
                </motion.div>

                {/* OTP error */}
                <AnimatePresence>
                  {error && !otpError && status === 'otp_error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ background: '#ff8282', border: '2px solid #000', borderRadius: 10, padding: '8px 14px', marginBottom: 14, fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600, textAlign: 'center' }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verify */}
                <button
                  onClick={() => onVerify(digits.join(''))}
                  disabled={digits.join('').length < OTP_LENGTH || isVerifyingOtp}
                  style={{
                    width: '100%',
                    background: digits.join('').length === OTP_LENGTH ? '#9ae885' : '#f0efe3',
                    border: '3px solid #000', borderRadius: 12,
                    padding: '12px 20px', fontSize: 14, fontWeight: 800,
                    fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
                    cursor: digits.join('').length === OTP_LENGTH ? 'pointer' : 'not-allowed',
                    boxShadow: '5px 5px 0 #000', transition: 'all 0.15s', marginBottom: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#000',
                  }}
                  onMouseEnter={e => { if (digits.join('').length === OTP_LENGTH) { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '7px 7px 0 #000'; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '5px 5px 0 #000'; }}
                >
                  {isVerifyingOtp ? 'Verifying…' : 'Verify & Enter'}
                </button>

                {/* Bottom row: resend + back to PIN */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={onRequest} disabled={cooldown > 0}
                    style={{
                      background: 'none', border: 'none', cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
                      fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                      opacity: cooldown > 0 ? 0.35 : 0.7,
                      display: 'inline-flex', alignItems: 'center', gap: 5, color: '#000',
                    }}
                  >
                    <IconRefresh size={12} />
                    {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
                  </button>

                  <button
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                      opacity: 0.5, color: '#000',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
                    onClick={() => { window.location.reload(); }}
                  >
                    ← Back to PIN
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
