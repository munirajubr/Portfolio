import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const fullText = "Hello, I'm Muniraju B R";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(typingInterval);
        // Start exit timer after typing is done
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }, 800);
      }
    }, 80); // Speed of typing

    return () => clearInterval(typingInterval);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader ${isExiting ? 'exiting' : ''}`}>
      <div className="preloader-content">
        <h1 className="preloader-text">
          {displayedText}
          <span className="typing-cursor">|</span>
        </h1>
        {/* <p className="preloader-subtitle">Welcome</p> */}
      </div>
    </div>
  );
}
