import { useState } from "react";
import { motion } from "framer-motion";
import TypingText from "../components/TypingText";
import TechOrbit from "../components/TechOrbit";

export default function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { num: "2+", label: "Years" },
    { num: "200+", label: "Users" },
    { num: "10+", label: "Plugins" },
    { num: "15+", label: "Flows" },
  ];

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden min-h-screen px-4 sm:px-6 pt-20 sm:pt-24 pb-8"
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center mx-auto gap-8 lg:gap-12 w-full" style={{ maxWidth: "1200px" }}>
        {/* Left: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 w-full">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mb-5 sm:mb-6 mt-4"
          >
            <div
              className="relative mx-auto lg:mx-0"
              style={{
                width: "clamp(100px, 20vw, 140px)",
                height: "clamp(100px, 20vw, 140px)",
                borderRadius: "50%",
                padding: "3px",
                background: "linear-gradient(135deg, var(--accent) 0%, #4682B4 50%, var(--accent) 100%)",
                animation: "spin 8s linear infinite",
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="Karan Alwa"
                className="w-full h-full object-cover"
                style={{ borderRadius: "50%", border: "3px solid var(--bg-primary)", animation: "spin 8s linear infinite reverse" }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <h1
              className="font-sans font-extrabold"
              style={{ fontSize: "clamp(32px, 8vw, 80px)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--text-primary)" }}
            >
              <TypingText text="Karan Alwa" speed={80} delay={500} onComplete={() => setShowSubtitle(true)} />
            </h1>
          </motion.div>

          {/* Subtitle */}
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-sans font-medium mt-3 sm:mt-4"
              style={{ fontSize: "clamp(13px, 3vw, 22px)", color: "var(--accent)", letterSpacing: "0.02em" }}
              onAnimationComplete={() => setShowStats(true)}
            >
              <TypingText
                text="Power Platform Developer | Dynamics 365 CE | AI Integrations"
                speed={30}
                delay={200}
                onComplete={() => setShowCta(true)}
              />
            </motion.p>
          )}

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start mt-3"
            style={{ gap: "8px" }}
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Ahmedabad, India
            </span>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5" style={{ color: "var(--accent)", border: "1px solid var(--border)", borderRadius: "4px" }}>
              PL-400 Certified
            </span>
          </motion.div>

          {/* Stats */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start mt-6 sm:mt-8"
              style={{ gap: "12px" }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="text-center px-3 py-1.5 sm:px-4 sm:py-2"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: "8px", minWidth: "60px" }}
                >
                  <span className="font-sans font-bold text-lg sm:text-xl" style={{ color: "var(--accent)" }}>{stat.num}</span>
                  <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-faint)" }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTAs */}
          {showCta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start mt-6 sm:mt-8"
              style={{ gap: "10px" }}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="font-sans font-medium uppercase transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
                  color: "#fff", padding: "12px 24px", borderRadius: "8px",
                  letterSpacing: "0.06em", border: "none", cursor: "pointer",
                  boxShadow: "0 4px 20px var(--accent-glow)",
                }}
              >
                View My Projects
              </button>
              <a
                href="mailto:karanalwa0@gmail.com"
                className="font-sans font-medium uppercase transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                style={{ backgroundColor: "transparent", color: "var(--text-primary)", border: "1px solid var(--border)", padding: "12px 24px", borderRadius: "8px", letterSpacing: "0.06em", textDecoration: "none" }}
              >
                Get In Touch
              </a>
            </motion.div>
          )}

          {/* Socials */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="flex items-center justify-center lg:justify-start mt-5 sm:mt-6" style={{ gap: "16px" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/karanalwa" },
              { label: "GitHub", href: "https://github.com/Karanalwa" },
              { label: "Email", href: "mailto:karanalwa0@gmail.com" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 hover:text-[var(--accent-hover)] hover:scale-110" style={{ color: "var(--text-faint)", textDecoration: "none" }}>
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Tech Orbit - hidden on small screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
          className="hidden lg:flex items-center justify-center flex-shrink-0"
        >
          <TechOrbit />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="scroll-indicator" style={{ color: "var(--text-faint)", fontSize: "16px" }}>&#8595;</span>
      </motion.div>
    </section>
  );
}
