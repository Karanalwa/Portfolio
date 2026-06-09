import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";

const projects = [
  {
    name: "Hisab - POS & GST Invoicing",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "/images/project-hisab.jpg",
    description: "A complete point-of-sale and GST invoicing platform for Indian businesses. Features secure authentication, inventory management, GST-compliant invoice generation, sales analytics dashboard, and multi-shop support.",
    metrics: "Live Project",
    link: "https://hisab-9zl3.vercel.app/login",
  },
  {
    name: "UNO Blitz",
    tags: ["React", "TypeScript", "WebSocket"],
    image: "/images/project-uno.jpg",
    description: "A real-time multiplayer UNO card game with player avatars, photo uploads, custom game rooms, and live gameplay. Features a polished dark UI with smooth animations and responsive design.",
    metrics: "Live Project",
    link: "https://uno-blitz.vercel.app/",
  },
  {
    name: "MCP Server for Dynamics 365 CRM",
    tags: ["MCP", "D365 Web API"],
    image: "/images/project-2.jpg",
    description: "Designed an MCP server exposing D365 entities and operations as tools consumable by LLM clients like Claude and Copilot, with scoped permissions and secure auth.",
    metrics: "CRM-to-AI Bridge",
    link: null,
  },
  {
    name: "Sales Validation AI Agent",
    tags: ["LLM Agent", "D365", "Power Automate"],
    image: "/images/project-6.jpg",
    description: "Built an AI agent validating quotes against pricing tiers and discount policies; integrated with Power Automate to auto-flag invalid records, cutting invalid submissions by 35%.",
    metrics: "35% fewer invalid",
    link: null,
  },
  {
    name: "Prexa365 - Rental Management",
    tags: ["D365 CE", "C# Plugins", "Power Automate"],
    image: "/images/project-1.jpg",
    description: "Delivered end-to-end rental modules with complex pricing/tax logic and integrations to 4 accounting systems, reducing manual effort by 30%.",
    metrics: "30% effort cut",
    link: null,
  },
  {
    name: "Transport Bidding & Booking",
    tags: ["Power Pages", "Angular", "D365 CE"],
    image: "/images/project-5.jpg",
    description: "Architected Power Pages portals integrated with Dataverse for real-time bid submission, quote management, and rental bookings.",
    metrics: "Real-time processing",
    link: null,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          Featured Work
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans font-bold mb-8 sm:mb-12" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
          Key Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {projects.map((proj, i) => {
            const isLive = !!proj.link;
            const CardContent = (
              <TiltCard tiltAmount={8} glowColor={isLive ? "rgba(34,197,94,0.15)" : "var(--accent-glow)"} style={{ backgroundColor: "var(--bg-card)", border: `1px solid ${isLive ? "rgba(34,197,94,0.12)" : "var(--border)"}`, borderRadius: "12px", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "clamp(140px, 25vw, 200px)" }}>
                  <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, var(--bg-card) 100%)" }} />
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="absolute top-2 right-2 sm:top-3 sm:right-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-1" style={{ backgroundColor: isLive ? "rgba(34,197,94,0.9)" : "var(--accent)", color: "#fff", borderRadius: "4px", boxShadow: isLive ? "0 0 10px var(--success-glow)" : "0 0 10px var(--accent-glow)" }}>
                    {isLive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    {proj.metrics}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2 sm:mb-3">
                    {proj.tags.map((tag, ti) => (
                      <span key={ti} className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--input-bg)", color: "var(--accent)" }}>{tag}</span>
                    ))}
                    {isLive && <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider ml-auto" style={{ color: "var(--text-faint)" }}>&#8599; Open</span>}
                  </div>
                  <h3 className="font-sans font-bold text-sm sm:text-base mb-1.5 sm:mb-2" style={{ color: "var(--text-primary)" }}>{proj.name}</h3>
                  <p className="font-sans flex-1 text-xs sm:text-sm" style={{ lineHeight: 1.6, color: "var(--text-muted)" }}>{proj.description}</p>
                </div>
              </TiltCard>
            );

            return (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="h-full">
                {isLive ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="block h-full" style={{ textDecoration: "none" }}>{CardContent}</a>
                ) : CardContent}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
