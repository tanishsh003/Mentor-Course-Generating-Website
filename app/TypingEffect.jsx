'use client';

import { useEffect, useState } from 'react';

export default function TypingEffect({ text = "Welcome to the Mentor", speed = 100 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h2 className="text-2xl font-bold">{displayedText}</h2>
  );
}
