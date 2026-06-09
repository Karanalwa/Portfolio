import { useRef, useState, useEffect, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltAmount?: number;
  glowColor?: string;
}

export default function TiltCard({ children, className, style, tiltAmount = 15, glowColor = "var(--accent-glow)" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    checkTouch();
    window.addEventListener("touchstart", checkTouch, { once: true });
    return () => window.removeEventListener("touchstart", checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -tiltAmount;
    const rotateY = (x - 0.5) * tiltAmount;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg)");
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transform: transform,
        transformStyle: "preserve-3d",
        transition: isTouch ? "none" : "transform 0.15s ease-out",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect - desktop only */}
      {!isTouch && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor} 0%, transparent 60%)`,
            opacity: 0.6,
            pointerEvents: "none",
            zIndex: 0,
            transition: "background 0.15s ease-out",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
