import { useState, useEffect } from 'react';

const SESSION_KEY = 'slides_auth_verified';
const SESSION_TTL = 1000 * 60 * 60; // 1 hour

export function useAuth() {
  const [status, setStatus] = useState('idle'); // idle | sending | awaiting | verifying | verified | error
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [token, setToken] = useState(null); // stateless JWT token from backend

  // Restore session
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const { ts } = JSON.parse(raw);
        if (Date.now() - ts < SESSION_TTL) {
          setStatus('verified');
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (e) {
      console.error("Session restore failed", e);
    }
  }, []);

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
    setStatus('verifying');
    setError('');
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, token }), // Send both
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid OTP');
      
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() }));
      setStatus('verified');
    } catch (e) {
      setError(e.message);
      setStatus('awaiting'); // Go back to awaiting so they can try again or switch to password
    }
  };

  const verifyPassword = async (password) => {
    setStatus('verifying');
    setError('');
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }), // Send static password
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Incorrect Password');
      
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() }));
      setStatus('verified');
    } catch (e) {
      setError(e.message);
      setStatus('awaiting');
    }
  };

  const reset = () => {
    setStatus('idle');
    setError('');
    setToken(null);
  };

  return { status, error, cooldown, requestOTP, verifyOTP, verifyPassword, reset };
}
