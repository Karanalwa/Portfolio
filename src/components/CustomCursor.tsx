import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hovering, setHovering] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovering(false);
      }
    };

    let raf: number;
    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        const size = hovering ? 40 : 24;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      // Trail particles
      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        const delay = (i + 1) * 0.05;
        const tx = posRef.current.x - (posRef.current.x - ringPos.current.x) * delay * 2;
        const ty = posRef.current.y - (posRef.current.y - ringPos.current.y) * delay * 2;
        const opacity = 1 - i / 8;
        trail.style.transform = `translate(${tx - 2}px, ${ty - 2}px)`;
        trail.style.opacity = `${opacity * 0.3}`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [hovering]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s",
          boxShadow: "0 0 10px var(--accent-glow)",
          mixBlendMode: "difference",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "width 0.3s, height 0.3s",
          boxShadow: "0 0 15px var(--accent-glow)",
        }}
      />

      {/* Trail particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            pointerEvents: "none",
            zIndex: 9997 - i,
            willChange: "transform",
            opacity: 0,
          }}
        />
      ))}
    </>
  );
}
