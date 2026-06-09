import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const techIcons = [
  "⚡", "🔷", "◈", "◇", "⬡", "◉", "◆", "▣",
];

export default function TechOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const items = orbitRef.current?.querySelectorAll<HTMLDivElement>(".orbit-item");
    if (!items) return;

    const RADIUS = 140;
    const SPEED = 0.001;
    let angle = 0;
    let raf: number;

    const animate = (time: number) => {
      angle = time * SPEED;
      items.forEach((item, i) => {
        const itemAngle = angle + (i / items.length) * Math.PI * 2;
        const x = Math.cos(itemAngle) * RADIUS;
        const y = Math.sin(itemAngle) * RADIUS;
        const scale = (Math.sin(itemAngle) + 2) / 3;
        const opacity = (Math.sin(itemAngle) + 1) / 2 * 0.6 + 0.2;
        item.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        item.style.opacity = `${opacity}`;
        item.style.zIndex = `${Math.round(Math.sin(itemAngle) * 10)}`;
      });
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={orbitRef}
      style={{
        position: "relative",
        width: "300px",
        height: "300px",
      }}
    >
      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(193,127,78,0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(184,114,45,0.2) 0%, transparent 70%)",
          filter: "blur(10px)",
          transition: "background 0.5s ease",
        }}
      />
      {/* Orbit ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          border: isDark
            ? "1px solid rgba(193,127,78,0.1)"
            : "1px solid rgba(184,114,45,0.08)",
          transition: "border-color 0.5s ease",
        }}
      />
      {techIcons.map((icon, i) => (
        <div
          key={i}
          className="orbit-item"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: "-16px",
            marginTop: "-16px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: "var(--accent)",
            textShadow: isDark
              ? "0 0 10px rgba(193,127,78,0.5)"
              : "0 0 10px rgba(184,114,45,0.3)",
            willChange: "transform",
            transition: "color 0.5s ease, text-shadow 0.5s ease",
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
