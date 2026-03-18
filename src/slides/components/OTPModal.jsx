import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconShield, IconRefresh } from '../icons';

const OTP_LENGTH = 6;

// ─── Individual OTP digit box ─────────────────────────────────────────────────
const OTPInput = ({ value, isFocused, isError }) => (
  <div style={{
    width: 48, height: 58,
    border: `3px solid ${isError ? '#ff8282' : isFocused ? '#000' : '#000'}`,
    borderRadius: 10,
    background: isFocused ? '#c0f7fe' : '#fff',
    boxShadow: isFocused
      ? `4px 4px 0 #000`
      : isError
        ? `4px 4px 0 #ff8282`
        : `3px 3px 0 #000`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 800, fontFamily: 'Syne, sans-serif',
    transition: 'all 0.15s',
    color: '#000',
    flexShrink: 0,
  }}>
    {value || ''}
  </div>
);

// ─── OTP Modal ────────────────────────────────────────────────────────────────
export default function OTPModal({ status, error, cooldown, onRequest, onVerify }) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [focusIdx, setFocusIdx] = useState(0);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);
  
  const isAwaiting = status === 'awaiting' || status === 'verifying';
  const isSending = status === 'sending';

  // Focus hidden input whenever awaiting
  useEffect(() => {
    if (isAwaiting && inputRef.current) inputRef.current.focus();
  }, [isAwaiting]);

  // Flash error on wrong OTP
  useEffect(() => {
    if (error && status !== 'sending') {
      setIsError(true);
      setDigits(Array(OTP_LENGTH).fill(''));
      setFocusIdx(0);
      const t = setTimeout(() => setIsError(false), 800);
      return () => clearTimeout(t);
    }
  }, [error, status]);

  const handleKey = (e) => {
    if (isSending) return;
    if (e.key === 'Backspace') {
      const next = [...digits];
      if (next[focusIdx]) {
        next[focusIdx] = '';
        setDigits(next);
      } else if (focusIdx > 0) {
        next[focusIdx - 1] = '';
        setDigits(next);
        setFocusIdx(i => i - 1);
      }
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = [...digits];
    next[focusIdx] = e.key;
    setDigits(next);
    if (focusIdx < OTP_LENGTH - 1) {
      setFocusIdx(i => i + 1);
    } else {
      // All filled — auto-submit
      const otp = [...next].join('');
      if (otp.length === OTP_LENGTH) onVerify(otp);
    }
  };

  const handlePaste = (e) => {
    if (isSending) return;
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setDigits(next);
    setFocusIdx(Math.min(pasted.length, OTP_LENGTH - 1));
    if (pasted.length === OTP_LENGTH) onVerify(pasted);
  };

  return (
    // Full-screen frosted overlay
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(253,252,240,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* Dot pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(black 1px, transparent 1px)',
        backgroundSize: '12px(12px)',
      }} />

      {/* Card */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          background: '#fff',
          border: '3px solid #000',
          borderRadius: 24,
          boxShadow: '10px 10px 0 #000',
          padding: '40px 44px',
          maxWidth: 460,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent stripe top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#c0f7fe', borderBottom: '3px solid #000' }} />

        <AnimatePresence mode="wait">
          <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#000' }}>
              <IconShield size={40} />
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>
              {status === 'verifying' ? 'Verifying…' : 'Enter OTP'}
            </h2>
            <p style={{ fontSize: 14, fontFamily: 'Outfit, sans-serif', opacity: 0.6, lineHeight: 1.5, marginBottom: 28, textAlign: 'center' }}>
              {status === 'sending' ? 'Sending a one-time password to your email…' : (
                <>A 6-digit code was sent to your email.<br />Enter it below to gain access.</>
              )}
            </p>

            {/* Hidden real input for mobile keyboard + paste */}
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              maxLength={OTP_LENGTH}
              onKeyDown={handleKey}
              onPaste={handlePaste}
              onChange={() => {}}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
              aria-label="OTP input"
            />

            {/* Visual digit boxes */}
            <motion.div
              animate={isError ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => inputRef.current?.focus()}
              style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24, cursor: 'text', position: 'relative' }}
            >
              {digits.map((d, i) => (
                <OTPInput key={i} value={d} isFocused={focusIdx === i && status !== 'verifying'} isError={isError} />
              ))}
              
              {/* Sending overlay */}
              {isSending && (
                <div style={{ position: 'absolute', inset: -4, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, zIndex: 5 }}>
                  <div style={{ width: 30, height: 30, border: '3px solid #000', borderTopColor: '#c0f7fe', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                </div>
              )}
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {(error || status === 'error') && !isError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    background: '#ff8282', border: '2px solid #000', borderRadius: 10,
                    padding: '9px 14px', marginBottom: 16, fontSize: 13,
                    fontFamily: 'Outfit, sans-serif', fontWeight: 600, textAlign: 'center',
                  }}
                >
                  {error || 'Failed to send OTP.'}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Verify button */}
            <button
              onClick={() => onVerify(digits.join(''))}
              disabled={digits.join('').length < OTP_LENGTH || status === 'verifying' || status === 'sending'}
              style={{
                width: '100%', background: digits.join('').length === OTP_LENGTH ? '#9ae885' : '#f0efe3',
                border: '3px solid #000', borderRadius: 14,
                padding: '13px 20px', fontSize: 14, fontWeight: 800,
                fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
                cursor: digits.join('').length === OTP_LENGTH ? 'pointer' : 'not-allowed',
                boxShadow: '5px 5px 0 #000',
                transition: 'all 0.15s', marginBottom: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (digits.join('').length === OTP_LENGTH) { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '7px 7px 0 #000'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '5px 5px 0 #000'; }}
            >
              {status === 'verifying' ? 'Verifying…' : 'Verify & Enter'}
            </button>

            {/* Resend / Action */}
            <div style={{ textAlign: 'center' }}>
              {(status === 'error' || (error && status !== 'verifying')) ? (
                <button
                  onClick={onRequest}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#000', textDecoration: 'underline' }}
                >
                  Try sending again
                </button>
              ) : (
                <button
                  onClick={onRequest}
                  disabled={cooldown > 0 || status === 'sending'}
                  style={{
                    background: 'none', border: 'none', cursor: (cooldown > 0 || status === 'sending') ? 'not-allowed' : 'pointer',
                    fontSize: 13, fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                    opacity: (cooldown > 0 || status === 'sending') ? 0.4 : 0.8,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    color: '#000',
                  }}
                >
                  <IconRefresh size={13} />
                  {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
                </button>
              )}
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
