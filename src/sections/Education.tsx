import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function EduCard3D({ children, delay, rotateDir }: { children: React.ReactNode; delay: number; rotateDir: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => { card.removeEventListener("mousemove", handleMouseMove); card.removeEventListener("mouseleave", handleMouseLeave); };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateY: rotateDir * 25, y: 40 }}
      whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      style={{
        padding: "clamp(20px, 4vw, 36px)",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, box-shadow 0.3s",
        willChange: "transform",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 50px rgba(193,127,78,0.12)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {children}
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="px-4 sm:px-6 lg:px-10 py-24 lg:py-32" style={{ backgroundColor: "var(--bg-secondary)", perspective: "1200px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          Background
        </motion.span>
        <h2 className="font-sans font-bold mb-8 sm:mb-12" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
          Education & Certifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8" style={{ perspective: "1000px" }}>
          {/* Education Card */}
          <EduCard3D delay={0} rotateDir={-1}>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-2xl sm:text-3xl shrink-0">
                &#127891;
              </motion.span>
              <div className="min-w-0">
                <h3 className="font-sans font-bold text-sm sm:text-lg truncate" style={{ color: "var(--text-primary)" }}>Master of Computer Applications</h3>
                <p className="font-sans text-xs sm:text-sm truncate" style={{ color: "var(--text-muted)" }}>Bhilai Institute of Technology (BIT), Durg</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>2021 &ndash; 2023</span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1" style={{ color: "var(--accent)", border: "1px solid var(--border)", borderRadius: "4px" }}>CGPA: 7.5</span>
            </div>
          </EduCard3D>

          {/* Certification Card */}
          <EduCard3D delay={0.15} rotateDir={1}>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-2xl sm:text-3xl shrink-0">
                &#127942;
              </motion.span>
              <div className="min-w-0">
                <h3 className="font-sans font-bold text-sm sm:text-lg truncate" style={{ color: "var(--text-primary)" }}>Microsoft Certified</h3>
                <p className="font-sans text-xs sm:text-sm truncate" style={{ color: "var(--text-muted)" }}>Power Platform Developer Associate</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>PL-400</span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1" style={{ color: "var(--success)", border: "1px solid var(--success-glow)", borderRadius: "4px", boxShadow: "0 0 8px var(--success-glow)" }}>Active</span>
            </div>
          </EduCard3D>
        </div>
      </div>
    </section>
  );
}
