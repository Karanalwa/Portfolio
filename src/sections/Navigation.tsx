import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const navBg = scrolled
    ? isDark ? "rgba(10,10,15,0.95)" : "rgba(245,240,232,0.95)"
    : "transparent";
  const borderColor = scrolled
    ? isDark ? "rgba(193,127,78,0.1)" : "rgba(184,114,45,0.1)"
    : "transparent";
  const textColor = isDark ? "rgba(232,228,222,0.7)" : "rgba(26,24,20,0.6)";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "64px",
          backgroundColor: navBg,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: `1px solid ${borderColor}`,
          transition: "all 0.5s ease",
        }}
      >
        <div
          className="flex items-center justify-between h-full mx-auto px-4 sm:px-6 lg:px-10"
          style={{ maxWidth: "1200px" }}
        >
          {/* Logo */}
          <button
            onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-sans font-bold uppercase tracking-widest shrink-0"
            style={{ color: "var(--accent)", letterSpacing: "0.12em", fontSize: "14px" }}
          >
            KARAN ALWA
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: "24px" }}>
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-sans font-medium text-xs uppercase tracking-wider transition-colors duration-300 hover:text-[var(--accent)]"
                style={{ color: textColor, letterSpacing: "0.06em" }}
              >
                {link.label}
              </button>
            ))}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--accent)",
                cursor: "pointer",
              }}
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </motion.button>
          </div>

          {/* Mobile: hamburger + theme */}
          <div className="flex md:hidden items-center" style={{ gap: "8px" }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full"
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--accent)",
                cursor: "pointer",
              }}
            >
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </motion.button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col justify-center items-center"
              style={{ width: "34px", height: "34px", gap: "5px", cursor: "pointer", background: "none", border: "none" }}
              aria-label="Toggle menu"
            >
              <span className="block transition-all duration-300" style={{
                width: "22px", height: "2px", backgroundColor: "var(--text-primary)",
                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
              }} />
              <span className="block transition-all duration-300" style={{
                width: "22px", height: "2px", backgroundColor: "var(--text-primary)",
                opacity: mobileOpen ? 0 : 1
              }} />
              <span className="block transition-all duration-300" style={{
                width: "22px", height: "2px", backgroundColor: "var(--text-primary)",
                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{
              backgroundColor: isDark ? "rgba(10,10,15,0.98)" : "rgba(245,240,232,0.98)",
              backdropFilter: "blur(20px)",
              paddingTop: "64px",
            }}
          >
            <div className="flex flex-col items-center" style={{ gap: "28px" }}>
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.id)}
                  className="font-sans font-semibold uppercase tracking-widest"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "18px",
                    letterSpacing: "0.1em",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
