import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.1;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 200}px, ${posRef.current.y - 200}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: isDark
          ? "radial-gradient(circle, rgba(193,127,78,0.08) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(184,114,45,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
        filter: "blur(60px)",
        willChange: "transform",
        transition: "background 0.5s ease",
      }}
    />
  );
}
