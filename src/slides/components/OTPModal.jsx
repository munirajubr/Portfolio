import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconShield } from '../icons.jsx';

const CODE_LENGTH = 6;

// ─── Individual Digit Slot (Underline style) ─────────────────────────────────
const DigitSlot = ({ char, isFocused, isError }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, gap: 14 }}>
      <div style={{ 
        fontSize: 30, 
        fontWeight: 400, // Reduced from 800 to be "lite"
        fontFamily: 'Syne, sans-serif', 
        height: 40, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: isError ? '#ff8282' : '#000',
        transition: 'color 0.2s',
        lineHeight: 1,
        position: 'relative'
      }}>
        {char}
        {/* Blinking lite cursor when focused and empty */}
        {isFocused && !char && (
          <div className="blinking-cursor" style={{ 
            width: 2, 
            height: 24, 
            background: '#000',
            opacity: 0.6
          }} />
        )}
      </div>
      
      {/* Lite separate underline */}
      <div style={{ 
        width: '100%', 
        height: 2, // Thinner line
        background: isError ? '#ff8282' : isFocused ? '#000' : '#e0e0e0', 
        borderRadius: 1,
        transition: 'background 0.2s'
      }} />
    </div>
  );
};

export default function OTPModal({ status, error, onRequest, onVerify, onVerifyPassword }) {
  const [value, setValue] = useState('');
  const [isPinMode, setIsPinMode] = useState(true); // PRIMARY IS PIN
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);

  const isVerifying = status === 'verifying';
  const isSending = status === 'sending';

  // Handle errors: shake and clear
  useEffect(() => {
    if (error && !isSending) {
      setIsError(true);
      const t = setTimeout(() => {
        setIsError(false);
        setValue('');
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [error, isSending]);

  // Ensure input is always focused
  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    focus();
    window.addEventListener('click', focus);
    return () => window.removeEventListener('click', focus);
  }, []);

  const handleKeyDown = (e) => {
    if (isVerifying || isSending) return;
    if (e.key === 'Backspace') {
      setValue(v => v.slice(0, -1));
    } else if (/^\d$/.test(e.key)) {
      if (value.length < CODE_LENGTH) {
        const next = value + e.key;
        setValue(next);
        if (next.length === CODE_LENGTH) {
          if (isPinMode) onVerifyPassword(next);
          else onVerify(next);
        }
      }
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;
    setValue(pasted);
    if (pasted.length === CODE_LENGTH) {
      if (isPinMode) onVerifyPassword(pasted);
      else onVerify(pasted);
    }
  };

  const toggleMode = () => {
    const switchingToOtp = isPinMode;
    setIsPinMode(!isPinMode);
    setIsError(false);
    setValue('');
    if (switchingToOtp) onRequest();
  };

  const currentChars = value.split('');

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(253,252,240,0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={() => {}}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: '#fff',
          border: '3px solid #000',
          borderRadius: 24,
          boxShadow: '10px 10px 0 #000',
          padding: '40px 30px',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: isPinMode ? '#000' : '#c0f7fe', borderBottom: '3px solid #000' }} />

        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
          <IconShield size={40} />
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 900, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', marginBottom: 8, color: '#000' }}>
          {isPinMode ? 'Access Required' : 'Verify Email'}
        </h2>

        <p style={{ fontSize: 13, fontFamily: 'Outfit, sans-serif', opacity: 0.6, lineHeight: 1.6, marginBottom: 35, color: '#000' }}>
          {isPinMode ? (
            <>Please enter the 6-digit access PIN<br />for presentation materials.</>
          ) : (
            <>Verification code sent to your inbox.<br />Enter it to continue.</>
          )}
        </p>

        {/* Input Slots */}
        <motion.div 
          animate={isError ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 40, cursor: 'text' }}
          onClick={() => inputRef.current?.focus()}
        >
          {Array.from({ length: CODE_LENGTH }).map((_, i) => {
            let char = currentChars[i] || '';
            if (isPinMode && char && i < currentChars.length - 1) char = '*';
            return (
              <DigitSlot 
                key={i} 
                char={char} 
                isFocused={i === currentChars.length && !isVerifying && !isSending} 
                isError={isError} 
              />
            );
          })}
        </motion.div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <button
            onClick={() => isPinMode ? onVerifyPassword(value) : onVerify(value)}
            disabled={value.length < CODE_LENGTH || isVerifying || isSending}
            style={{
              background: '#000', color: '#fff', border: 'none', padding: '15px', borderRadius: 12,
              fontSize: 14, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
              cursor: value.length < CODE_LENGTH ? 'not-allowed' : 'pointer',
              opacity: value.length < CODE_LENGTH ? 0.3 : 1
            }}
          >
            {isVerifying ? 'Checking...' : isSending ? 'Sending OTP...' : 'Continue'}
          </button>

          <button
            onClick={toggleMode}
            style={{
              background: 'none', border: 'none',
              fontSize: 12, fontWeight: 700, fontFamily: 'Outfit, sans-serif',
              textDecoration: 'underline', opacity: 0.5, cursor: 'pointer', color: '#000'
            }}
          >
            {isPinMode ? 'Request OTP instead' : 'Back to PIN'}
          </button>
        </div>

        {error && !isError && (
          <div style={{ marginTop: 20, color: '#ff8282', fontSize: 13, fontWeight: 700 }}>
            {error}
          </div>
        )}

        <style>{`
          .blinking-cursor {
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            from, to { opacity: 0; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </motion.div>
    </div>
  );
}
