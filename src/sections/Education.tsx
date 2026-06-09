import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";

export default function Education() {
  return (
    <section id="education" className="px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          Background
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans font-bold mb-8 sm:mb-12" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
          Education & Certifications
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Education Card */}
          <motion.div initial={{ opacity: 0, y: 30, rotateY: -10 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <TiltCard tiltAmount={10} style={{ padding: "clamp(20px, 4vw, 36px)", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-2xl sm:text-3xl shrink-0">
                  &#127891;
                </motion.span>
                <div className="min-w-0">
                  <h3 className="font-sans font-bold text-sm sm:text-lg truncate" style={{ color: "var(--text-primary)" }}>
                    Master of Computer Applications
                  </h3>
                  <p className="font-sans text-xs sm:text-sm truncate" style={{ color: "var(--text-muted)" }}>
                    Bhilai Institute of Technology (BIT), Durg
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                  2021 - 2023
                </span>
                <motion.span whileHover={{ scale: 1.1 }} className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1" style={{ color: "var(--accent)", border: "1px solid var(--border)", borderRadius: "4px" }}>
                  CGPA: 7.5
                </motion.span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Certification Card */}
          <motion.div initial={{ opacity: 0, y: 30, rotateY: 10 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <TiltCard tiltAmount={10} style={{ padding: "clamp(20px, 4vw, 36px)", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-2xl sm:text-3xl shrink-0">
                  &#127942;
                </motion.span>
                <div className="min-w-0">
                  <h3 className="font-sans font-bold text-sm sm:text-lg truncate" style={{ color: "var(--text-primary)" }}>
                    Microsoft Certified
                  </h3>
                  <p className="font-sans text-xs sm:text-sm truncate" style={{ color: "var(--text-muted)" }}>
                    Power Platform Developer Associate
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                  PL-400
                </span>
                <motion.span whileHover={{ scale: 1.1 }} className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1" style={{ color: "var(--success)", border: "1px solid var(--success-glow)", borderRadius: "4px", boxShadow: "0 0 8px var(--success-glow)" }}>
                  Active
                </motion.span>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
