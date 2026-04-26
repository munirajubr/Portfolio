import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div className="cursor-dot" style={{
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '6px', 
        height: '6px', 
        background: '#fff', 
        borderRadius: '50%', 
        pointerEvents: 'none', 
        zIndex: 10000,
        transform: `translate(${cursorPos.x - 3}px, ${cursorPos.y - 3}px)`
      }} />
      <div className="cursor-circle" style={{
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '36px', 
        height: '36px', 
        border: '1px solid rgba(255,255,255,0.4)', 
        borderRadius: '50%', 
        pointerEvents: 'none', 
        zIndex: 9999,
        transform: `translate(${cursorPos.x - 18}px, ${cursorPos.y - 18}px)`
      }} />
    </>
  );
};

export default CustomCursor;
