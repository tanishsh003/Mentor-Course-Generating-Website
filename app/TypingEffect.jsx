"use client";
import { useState, useEffect } from "react";
import { STIX_Two_Text } from "next/font/google";

const stix = STIX_Two_Text({ subsets: ["latin"], weight: "400" });

export default function Typewriter({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span
      className={`${stix.className} border-r-2 border-blue-500 pr-1 animate-pulse text-lg`}
    >
      {displayedText}
    </span>
  );
}
