import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingText from "../components/TypingText";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "2+", label: "Years" },
  { num: "200+", label: "Users" },
  { num: "10+", label: "Plugins" },
  { num: "15+", label: "Flows" },
];

// 3D perspective card for profile
function ProfileCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow layer */}
        <div
          className="absolute -inset-4 rounded-full opacity-40 blur-xl"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
        {/* Main image container */}
        <div
          className="relative mx-auto lg:mx-0"
          style={{
            width: "clamp(110px, 18vw, 150px)",
            height: "clamp(110px, 18vw, 150px)",
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(135deg, var(--accent) 0%, #4682B4 40%, var(--accent) 100%)",
          }}
        >
          <img
            src="/images/profile.jpg"
            alt="Karan Alwa"
            className="w-full h-full object-cover rounded-full"
            style={{ border: "3px solid var(--bg-primary)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Parallax scroll effect - hero content moves up faster
      gsap.to(".hero-parallax", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center overflow-hidden min-h-screen px-4 sm:px-6 lg:px-10 pt-24 pb-12"
    >
      <div className="hero-parallax relative z-10 flex flex-col items-center text-center mx-auto w-full" style={{ maxWidth: "900px" }}>
        {/* 3D Profile */}
        <div className="mb-6">
          <ProfileCard3D />
        </div>

        {/* Name with 3D text shadow */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ perspective: "800px" }}
        >
          <h1
            className="font-sans font-extrabold"
            style={{
              fontSize: "clamp(36px, 9vw, 90px)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "var(--text-primary)",
              textShadow: "0 0 40px var(--accent-glow), 0 0 80px var(--accent-glow)",
            }}
          >
            <TypingText text="Karan Alwa" speed={80} delay={500} onComplete={() => setShowSubtitle(true)} />
          </h1>
        </motion.div>

        {/* Subtitle */}
        {showSubtitle && (
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-medium mt-4"
            style={{ fontSize: "clamp(13px, 3vw, 22px)", color: "var(--accent)", letterSpacing: "0.02em" }}
            onAnimationComplete={() => setShowStats(true)}
          >
            <TypingText
              text="Power Platform Developer | Dynamics 365 CE | AI Integrations"
              speed={35}
              delay={200}
              onComplete={() => setShowCta(true)}
            />
          </motion.p>
        )}

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-wrap items-center justify-center mt-3 gap-2"
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
            className="flex flex-wrap justify-center mt-8 gap-3"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                className="text-center px-4 py-2.5"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  minWidth: "65px",
                  transformStyle: "preserve-3d",
                }}
              >
                <span className="font-sans font-bold text-lg sm:text-xl" style={{ color: "var(--accent)" }}>{stat.num}</span>
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--text-faint)" }}>{stat.label}</p>
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
            className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-3"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="font-sans font-medium uppercase text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
                color: "#fff", padding: "14px 32px", borderRadius: "8px",
                letterSpacing: "0.06em", border: "none",
                boxShadow: "0 4px 20px var(--accent-glow)",
                minHeight: "48px",
              }}
            >
              View My Projects
            </button>
            <a
              href="mailto:karanalwa0@gmail.com"
              className="font-sans font-medium uppercase text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "transparent", color: "var(--text-primary)", border: "1.5px solid var(--border)", padding: "14px 32px", borderRadius: "8px", letterSpacing: "0.06em", textDecoration: "none", minHeight: "48px" }}
            >
              Get In Touch
            </a>
          </motion.div>
        )}

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex items-center justify-center mt-6 gap-5"
        >
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/karanalwa" },
            { label: "GitHub", href: "https://github.com/Karanalwa" },
            { label: "Email", href: "mailto:karanalwa0@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 hover:text-[var(--accent)] hover:-translate-y-1"
              style={{ color: "var(--text-faint)", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="scroll-indicator block" style={{ color: "var(--text-faint)", fontSize: "20px" }}>&#8595;</span>
      </motion.div>
    </section>
  );
}
