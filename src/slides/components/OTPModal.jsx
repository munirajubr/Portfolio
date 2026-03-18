import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconShield, IconRefresh } from '../icons';

const PIN_LENGTH = 6;

// ─── PIN Display Component (Star + Last Char mode) ───────────────────────────
const PinDisplay = ({ value, isError, isFocused }) => {
  const chars = value.split('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 8 }}>
      <div style={{ 
        display: 'flex', 
        gap: 15, 
        fontSize: 36, 
        fontWeight: 800, 
        fontFamily: 'Syne, sans-serif', 
        minHeight: 50,
        letterSpacing: 4,
        color: isError ? '#ff8282' : '#000'
      }}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => {
          let displayChar = '';
          if (i < chars.length) {
            // "after entering pin the previous digit turn to star"
            // If it's the last character typed AND we are still typing/focused, show the char?
            // Actually, usually users mean: 
            // - show the character briefly? 
            // - OR show only the very last character of the current string?
            if (i === chars.length - 1) {
              displayChar = chars[i];
            } else {
              displayChar = '*'; // star mode
            }
          } else if (i === chars.length && isFocused) {
            displayChar = '_'; // cursor
          }
          return <span key={i} style={{ width: 30, textAlign: 'center' }}>{displayChar}</span>;
        })}
      </div>
      {/* "use the below line inly" */}
      <div style={{ 
        width: '80%', 
        height: 4, 
        background: isError ? '#ff8282' : '#000', 
        borderRadius: 2,
        boxShadow: isFocused ? '0 0 10px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.2s'
      }} />
    </div>
  );
};

// ─── OTP Box Display Component (Legacy structure but for OTP) ────────────────
const OTPInputBox = ({ value, isFocused, isError }) => (
  <div style={{
    width: 48, height: 58,
    border: `3px solid ${isError ? '#ff8282' : isFocused ? '#000' : '#000'}`,
    borderRadius: 10,
    background: isFocused ? '#c0f7fe' : '#fff',
    boxShadow: isFocused ? `4px 4px 0 #000` : `3px 3px 0 #000`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 800, fontFamily: 'Syne, sans-serif',
    color: '#000',
  }}>
    {value || ''}
  </div>
);

export default function OTPModal({ status, error, cooldown, onRequest, onVerify, onVerifyPassword }) {
  const [pinValue, setPinValue] = useState('');
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const [otpFocusIdx, setOtpFocusIdx] = useState(0);
  
  const [isPinMode, setIsPinMode] = useState(true); // PRIMARY IS PIN
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);

  const isVerifying = status === 'verifying';
  const isSending = status === 'sending';

  // Handle errors
  useEffect(() => {
    if (error && !isSending) {
      setIsError(true);
      const t = setTimeout(() => {
        setIsError(false);
        if (isPinMode) setPinValue('');
        else {
          setOtpDigits(Array(6).fill(''));
          setOtpFocusIdx(0);
        }
      }, 800);
      return () => clearTimeout(t);
    }
  }, [error, isSending, isPinMode]);

  // Focus input
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isPinMode, status]);

  const handleChar = (val) => {
    if (isPinMode) {
      const next = (pinValue + val).slice(0, PIN_LENGTH);
      setPinValue(next);
      if (next.length === PIN_LENGTH) onVerifyPassword(next);
    } else {
      const next = [...otpDigits];
      next[otpFocusIdx] = val;
      setOtpDigits(next);
      if (otpFocusIdx < 5) {
        setOtpFocusIdx(otpFocusIdx + 1);
      } else {
        onVerify(next.join(''));
      }
    }
  };

  const handleBackspace = () => {
    if (isPinMode) {
      setPinValue(v => v.slice(0, -1));
    } else {
      const next = [...otpDigits];
      if (next[otpFocusIdx]) {
        next[otpFocusIdx] = '';
      } else if (otpFocusIdx > 0) {
        next[otpFocusIdx - 1] = '';
        setOtpFocusIdx(otpFocusIdx - 1);
      }
      setOtpDigits(next);
    }
  };

  const onRealChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val && pinValue) {
       // Possible backspace/clear
    }
    // We handle logic in onKeyDown mostly for granular control, 
    // but we can use onChange for mobile friendliness.
  };

  const handleKeyDown = (e) => {
    if (isVerifying || isSending) return;
    if (e.key === 'Backspace') {
      handleBackspace();
    } else if (/^\d$/.test(e.key)) {
      handleChar(e.key);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PIN_LENGTH);
    if (!pasted) return;
    if (isPinMode) {
      setPinValue(pasted);
      if (pasted.length === PIN_LENGTH) onVerifyPassword(pasted);
    } else {
      const next = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
      setOtpDigits(next);
      setOtpFocusIdx(Math.min(pasted.length, 5));
      if (pasted.length === PIN_LENGTH) onVerify(pasted.join(''));
    }
  };

  const toggleMode = () => {
    const switchingToOtp = isPinMode;
    setIsPinMode(!isPinMode);
    setIsError(false);
    setPinValue('');
    setOtpDigits(Array(6).fill(''));
    setOtpFocusIdx(0);
    
    // If switching TO OTP, trigger the email
    if (switchingToOtp) {
      onRequest();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(253,252,240,0.9)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoFocus
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={() => {}}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: '#fff',
          border: '4px solid #000',
          borderRadius: 32,
          boxShadow: '12px 12px 0 #000',
          padding: '48px 50px',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: isPinMode ? '#000' : '#c0f7fe', borderBottom: '4px solid #000' }} />

        <div style={{ marginBottom: 20 }}>
          <IconShield size={44} />
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 900, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', marginBottom: 10 }}>
          {isPinMode ? 'System Locked' : 'Verify Email'}
        </h2>

        <p style={{ fontSize: 15, fontFamily: 'Outfit, sans-serif', opacity: 0.6, lineHeight: 1.5, marginBottom: 40 }}>
          {isPinMode ? (
            <>Please enter your 6-digit access PIN<br />to view the protected slides.</>
          ) : (
            <>A code was sent to your email.<br />Enter it to gain access.</>
          )}
        </p>

        {/* Input UI */}
        <div style={{ marginBottom: 40, position: 'relative' }} onClick={() => inputRef.current?.focus()}>
          {isPinMode ? (
            <PinDisplay value={pinValue} isError={isError} isFocused={true} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              {otpDigits.map((d, i) => (
                <OTPInputBox key={i} value={d} isFocused={otpFocusIdx === i} isError={isError} />
              ))}
            </div>
          )}

          {isVerifying && (
             <div style={{ position: 'absolute', inset: -10, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                <div style={{ width: 40, height: 40, border: '4px solid #000', borderTopColor: '#c0f7fe', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
             </div>
          )}
        </div>

        {/* Error Notification */}
        <AnimatePresence>
          {error && !isError && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: '#ff8282', fontWeight: 700, marginBottom: 20, fontSize: 14 }}>
                {error}
             </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <button
            onClick={() => {
              if (isPinMode) onVerifyPassword(pinValue);
              else onVerify(otpDigits.join(''));
            }}
            style={{
              background: '#000', color: '#fff', border: 'none', padding: '16px', borderRadius: 16,
              fontSize: 16, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'transform 0.1s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Authenticate
          </button>

          <button
            onClick={toggleMode}
            style={{
              background: 'none', border: 'none', padding: '10px',
              fontSize: 14, fontWeight: 700, fontFamily: 'Outfit, sans-serif',
              textDecoration: 'underline', opacity: 0.6, cursor: 'pointer'
            }}
          >
            {isPinMode ? 'Request OTP via Email' : 'Back to PIN entry'}
          </button>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </motion.div>
    </motion.div>
  );
}
