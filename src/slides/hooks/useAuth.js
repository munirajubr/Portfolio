import { useState, useEffect } from 'react';

export function useAuth() {
  const [status, setStatus] = useState('idle'); // idle | sending | awaiting | verifying | verified | error
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [token, setToken] = useState(null); // stateless JWT token from backend

  // NO SESSION STORAGE: refresh forces re-auth as per user request.

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const requestOTP = async () => {
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/otp/send', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      
      setToken(data.token);
      setStatus('awaiting');
      setCooldown(60);
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  };

  const verifyOTP = async (otp) => {
    setStatus('otp_verifying');
    setError('');
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid OTP');
      
      setStatus('verified');
    } catch (e) {
      setError(e.message);
      setStatus('otp_error');
      // After a delay, go back to awaiting if it was an OTP error
      setTimeout(() => setStatus('awaiting'), 1000);
    }
  };

  const verifyPassword = async (password) => {
    setStatus('pin_verifying');
    setError('');
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Incorrect PIN');
      
      setStatus('verified');
    } catch (e) {
      setError(e.message);
      setStatus('pin_error');
      // After a delay, go back to idle (PIN mode)
      setTimeout(() => setStatus('idle'), 1000);
    }
  };

  const reset = () => {
    setStatus('idle');
    setError('');
    setToken(null);
  };

  return { status, error, cooldown, requestOTP, verifyOTP, verifyPassword, reset };
}
