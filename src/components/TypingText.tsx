import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export default function TypingText({ text, speed = 50, delay = 0, className, style, onComplete }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={className} style={style}>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          backgroundColor: "#c17f4e",
          marginLeft: "2px",
          verticalAlign: "text-bottom",
          animation: "caret-blink 1s step-end infinite",
        }}
      />
    </span>
  );
}
