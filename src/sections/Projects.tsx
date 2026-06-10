import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Hisab \u2014 POS & GST Invoicing",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "/images/project-hisab.jpg",
    description: "A complete point-of-sale and GST invoicing platform for Indian businesses with secure authentication, inventory management, and GST-compliant invoice generation.",
    metrics: "Live Project",
    link: "https://hisab-9zl3.vercel.app/login",
  },
  {
    name: "UNO Blitz",
    tags: ["React", "TypeScript", "WebSocket"],
    image: "/images/project-uno.jpg",
    description: "A real-time multiplayer UNO card game with player avatars, custom game rooms, and live gameplay featuring a polished dark UI with smooth animations.",
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
    name: "Prexa365 \u2014 Rental Management",
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
    description: "Architected Power Pages portals integrated with Dataverse for real-time bid submission, quote management, and rental bookings with automated approvals.",
    metrics: "Real-time processing",
    link: null,
  },
];

function ProjectCard3D({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLive = !!project.link;

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => { card.removeEventListener("mousemove", handleMouseMove); card.removeEventListener("mouseleave", handleMouseLeave); };
  }, []);

  const CardContent = (
    <div
      ref={cardRef}
      style={{
        backgroundColor: "var(--bg-card)",
        border: `1px solid ${isLive ? "rgba(34,197,94,0.12)" : "var(--border)"}`,
        borderRadius: "14px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, box-shadow 0.3s",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isLive
          ? "0 24px 60px rgba(34,197,94,0.15), 0 0 40px rgba(34,197,94,0.08)"
          : "0 24px 60px rgba(193,127,78,0.15), 0 0 40px rgba(193,127,78,0.08)";
      }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "clamp(150px, 25vw, 210px)" }}>
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          src={project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, var(--bg-card) 100%)" }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="absolute top-3 right-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-1 flex items-center gap-1"
          style={{ backgroundColor: isLive ? "rgba(34,197,94,0.9)" : "var(--accent)", color: "#fff", borderRadius: "4px" }}
        >
          {isLive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          {project.metrics}
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {project.tags.map((tag, ti) => (
            <span key={ti} className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--input-bg)", color: "var(--accent)" }}>{tag}</span>
          ))}
          {isLive && <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider ml-auto" style={{ color: "var(--text-faint)" }}>&#8599; Open</span>}
        </div>
        <h3 className="font-sans font-bold text-sm sm:text-base mb-1.5" style={{ color: "var(--text-primary)" }}>{project.name}</h3>
        <p className="font-sans flex-1 text-xs sm:text-sm" style={{ lineHeight: 1.6, color: "var(--text-muted)" }}>{project.description}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 25, y: 60 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="h-full"
      style={{ perspective: "1000px" }}
    >
      {isLive ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full" style={{ textDecoration: "none" }}>
          {CardContent}
        </a>
      ) : CardContent}
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // 3D perspective shift on scroll
      gsap.fromTo(".projects-header",
        { rotateX: 10, opacity: 0.5 },
        {
          rotateX: 0, opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 40%", scrub: 1 },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="px-4 sm:px-6 lg:px-10 py-24 lg:py-32" style={{ perspective: "1200px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="projects-header" style={{ transformStyle: "preserve-3d" }}>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
            Featured Work
          </motion.span>
          <h2 className="font-sans font-bold mb-8 sm:mb-12" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
            Key Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8" style={{ perspective: "1000px" }}>
          {projects.map((proj, i) => (
            <ProjectCard3D key={i} project={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
