import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconShield, IconRefresh } from '../icons';

const CODE_LENGTH = 6;

// ─── Individual Digit Slot (Separate underline for each digit) ──────────────────
const DigitSlot = ({ char, isFocused, isError, showAsStar }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, gap: 10 }}>
      {/* Digit / Star / Cursor */}
      <div style={{ 
        fontSize: 32, 
        fontWeight: 800, 
        fontFamily: 'Syne, sans-serif', 
        height: 40, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: isError ? '#ff8282' : '#000',
        transition: 'color 0.2s'
      }}>
        {char || (isFocused ? '_' : '')}
      </div>
      
      {/* Underline for the digit */}
      <div style={{ 
        width: '100%', 
        height: 4, 
        background: isError ? '#ff8282' : isFocused ? '#c0f7fe' : '#000', 
        borderRadius: 2,
        boxShadow: isFocused ? '0 0 12px rgba(192,247,254,0.6)' : 'none',
        transition: 'all 0.2s'
      }} />
    </div>
  );
};

export default function OTPModal({ status, error, cooldown, onRequest, onVerify, onVerifyPassword }) {
  const [value, setValue] = useState('');
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
        setIsError(true);
        // We keep it red for 1s then reset
        setTimeout(() => {
          setIsError(false);
          setValue('');
        }, 800);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [error, isSending]);

  // Focus input
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isPinMode, status]);

  const handleChar = (char) => {
    if (value.length < CODE_LENGTH) {
      const next = value + char;
      setValue(next);
      if (next.length === CODE_LENGTH) {
        if (isPinMode) onVerifyPassword(next);
        else onVerify(next);
      }
    }
  };

  const handleBackspace = () => {
    setValue(v => v.slice(0, -1));
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(253,252,240,0.92)',
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
          boxShadow: '15px 15px 0 #000',
          padding: '50px 60px',
          maxWidth: 520,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: isPinMode ? '#000' : '#c0f7fe', borderBottom: '4px solid #000' }} />

        <div style={{ marginBottom: 24 }}>
          <IconShield size={48} />
        </div>

        <h2 style={{ fontSize: 34, fontWeight: 900, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', marginBottom: 12 }}>
          {isPinMode ? 'Security PIN' : 'OTP Verification'}
        </h2>

        <p style={{ fontSize: 16, fontFamily: 'Outfit, sans-serif', opacity: 0.6, lineHeight: 1.5, marginBottom: 45 }}>
          {isPinMode ? (
            <>Please enter the 6-digit access PIN<br />to reveal the presentation materials.</>
          ) : (
            <>Verification code sent to your inbox.<br />Please enter it to continue.</>
          )}
        </p>

        {/* Updated Input UI: Separate slot for each digit */}
        <div 
          style={{ display: 'flex', justifyContent: 'center', gap: 15, marginBottom: 50, position: 'relative' }} 
          onClick={() => inputRef.current?.focus()}
        >
          {Array.from({ length: CODE_LENGTH }).map((_, i) => {
            let char = currentChars[i] || '';
            
            // Masking logic for PIN
            if (isPinMode && char && i < currentChars.length - 1) {
              char = '*';
            }

            return (
              <DigitSlot 
                key={i} 
                char={char} 
                isFocused={i === currentChars.length && !isVerifying} 
                isError={isError} 
              />
            );
          })}

          {isVerifying && (
             <div style={{ position: 'absolute', inset: -15, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, zIndex: 10 }}>
                <div style={{ width: 44, height: 44, border: '5px solid #000', borderTopColor: '#c0f7fe', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
             </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <button
            onClick={() => isPinMode ? onVerifyPassword(value) : onVerify(value)}
            disabled={value.length < CODE_LENGTH || isVerifying || isSending}
            style={{
              background: '#000', color: '#fff', border: 'none', padding: '18px', borderRadius: 18,
              fontSize: 16, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
              cursor: value.length < CODE_LENGTH ? 'not-allowed' : 'pointer', transition: 'all 0.1s',
              opacity: value.length < CODE_LENGTH ? 0.3 : 1
            }}
            onMouseDown={e => { if(value.length === CODE_LENGTH) e.currentTarget.style.transform = 'scale(0.97)'; }}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Authorize Access
          </button>

          <button
            onClick={toggleMode}
            style={{
              background: 'none', border: 'none', padding: '10px',
              fontSize: 14, fontWeight: 700, fontFamily: 'Outfit, sans-serif',
              textDecoration: 'underline', opacity: 0.6, cursor: 'pointer',
              color: '#000'
            }}
          >
            {isPinMode ? 'Use Email OTP instead' : 'Back to PIN mode'}
          </button>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </motion.div>
    </motion.div>
  );
}
