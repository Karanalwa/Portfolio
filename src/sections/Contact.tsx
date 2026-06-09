import { motion } from "framer-motion";

const contactInfo = [
  { icon: "\u{1F4DE}", text: "+91 9300594844", href: "tel:+919300594844", label: "Phone" },
  { icon: "\u{2709}", text: "karanalwa0@gmail.com", href: "mailto:karanalwa0@gmail.com", label: "Email" },
  { icon: "\u{1F4CD}", text: "Ahmedabad, India", href: null, label: "Location" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto text-center" style={{ maxWidth: "700px" }}>
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block font-sans font-medium uppercase mb-4"
          style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}
        >
          Get In Touch
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans font-bold mb-4"
          style={{ fontSize: "clamp(26px, 6vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}
        >
          Let&apos;s build something amazing together.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans mb-8 sm:mb-10"
          style={{ fontSize: "clamp(14px, 2vw, 17px)", lineHeight: 1.7, color: "var(--text-muted)" }}
        >
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10"
        >
          <motion.a
            href="mailto:karanalwa0@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="font-sans font-medium uppercase text-xs sm:text-sm w-full sm:w-auto inline-flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "8px",
              letterSpacing: "0.06em",
              textDecoration: "none",
              boxShadow: "0 4px 20px var(--accent-glow)",
              minHeight: "48px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email Me
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/karanalwa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, borderColor: "var(--accent)" }}
            whileTap={{ scale: 0.98 }}
            className="font-sans font-medium uppercase text-xs sm:text-sm w-full sm:w-auto inline-flex items-center justify-center gap-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              border: "1.5px solid var(--border)",
              padding: "14px 32px",
              borderRadius: "8px",
              letterSpacing: "0.06em",
              textDecoration: "none",
              minHeight: "48px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </motion.a>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          {contactInfo.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-full sm:w-auto"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block w-full sm:w-auto"
                  style={{ textDecoration: "none" }}
                  aria-label={item.label}
                >
                  <div
                    className="flex items-center justify-center sm:justify-start gap-2.5 w-full sm:w-auto"
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      minHeight: "44px",
                    }}
                  >
                    <span className="text-base shrink-0" style={{ color: "var(--accent)" }}>
                      {item.icon}
                    </span>
                    <span
                      className="font-mono text-xs sm:text-sm break-all sm:break-normal"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.text}
                    </span>
                  </div>
                </a>
              ) : (
                <div
                  className="flex items-center justify-center sm:justify-start gap-2.5 w-full sm:w-auto"
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    minHeight: "44px",
                  }}
                >
                  <span className="text-base shrink-0" style={{ color: "var(--accent)" }}>
                    {item.icon}
                  </span>
                  <span className="font-mono text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>
                    {item.text}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto mt-16 sm:mt-20 pt-6 sm:pt-8 px-4"
        style={{ maxWidth: "1200px", borderTop: "1px solid var(--border)" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span
            className="font-mono text-[10px] sm:text-xs text-center sm:text-left"
            style={{ color: "var(--text-faint)" }}
          >
            &copy; 2025 Karan Alwa. All rights reserved.
          </span>
          <div className="flex items-center gap-5 sm:gap-6">
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/karanalwa" },
              { label: "GitHub", href: "https://github.com/Karanalwa" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ color: "var(--accent)", y: -2 }}
                className="font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors duration-300"
                style={{ color: "var(--text-faint)", textDecoration: "none" }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
