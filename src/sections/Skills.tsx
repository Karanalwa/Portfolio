import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Honest proficiency tiers instead of arbitrary self-assigned percentages.
type Tier = "Expert" | "Proficient" | "Familiar";

// Each tier maps to a fill amount for the animated bar.
const tierWidth: Record<Tier, number> = {
  Expert: 100,
  Proficient: 66,
  Familiar: 38,
};

const skillCategories = [
  {
    title: "Dynamics & Power Platform",
    icon: "\u{2699}",
    skills: [
      { name: "Dynamics 365 CE", tier: "Expert" as Tier },
      { name: "Dataverse", tier: "Expert" as Tier },
      { name: "Model-Driven & Canvas Apps", tier: "Expert" as Tier },
      { name: "Power Automate", tier: "Expert" as Tier },
      { name: "Power Pages", tier: "Proficient" as Tier },
      { name: "Business Process Flows", tier: "Proficient" as Tier },
    ],
  },
  {
    title: "Development",
    icon: "\u{1F4BB}",
    skills: [
      { name: "C# / .NET", tier: "Expert" as Tier },
      { name: "Custom Plugins & Workflows", tier: "Expert" as Tier },
      { name: "JavaScript (Xrm/Client API)", tier: "Proficient" as Tier },
      { name: "TypeScript", tier: "Proficient" as Tier },
      { name: "FetchXML / OData / Web API", tier: "Expert" as Tier },
      { name: "Web Resources", tier: "Proficient" as Tier },
    ],
  },
  {
    title: "Integrations & Cloud",
    icon: "\u{1F310}",
    skills: [
      { name: "REST APIs", tier: "Expert" as Tier },
      { name: "Azure Functions", tier: "Proficient" as Tier },
      { name: "Azure AD / Entra ID", tier: "Proficient" as Tier },
      { name: "QuickBooks / SevDesk / Xubio", tier: "Proficient" as Tier },
      { name: "Business Central", tier: "Familiar" as Tier },
    ],
  },
  {
    title: "AI & Automation",
    icon: "\u{26A1}",
    skills: [
      { name: "MCP Servers", tier: "Proficient" as Tier },
      { name: "LLM Agent Design", tier: "Proficient" as Tier },
      { name: "Prompt Engineering", tier: "Expert" as Tier },
      { name: "Anthropic Claude / OpenAI APIs", tier: "Proficient" as Tier },
      { name: "AI Builder", tier: "Proficient" as Tier },
      { name: "Copilot Studio", tier: "Familiar" as Tier },
    ],
  },
  {
    title: "DevOps & Web",
    icon: "\u{1F527}",
    skills: [
      { name: "Solution ALM / Pipelines", tier: "Proficient" as Tier },
      { name: "Git / Azure DevOps", tier: "Proficient" as Tier },
      { name: "Angular", tier: "Familiar" as Tier },
      { name: "HTML5 / CSS3", tier: "Expert" as Tier },
    ],
  },
];

function SkillCard3D({ cat, index }: { cat: typeof skillCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(5px)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Animate skill bars (respect reduced-motion: show final fill instantly)
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    barsRef.current.forEach((bar) => {
      if (!bar) return;
      const target = bar.getAttribute("data-width");
      if (prefersReduced) {
        bar.style.width = target + "%";
        return;
      }
      gsap.fromTo(bar, { width: "0%" }, {
        width: target + "%", duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: bar, start: "top 90%", toggleActions: "play none none none" },
      });
    });

    return () => { card.removeEventListener("mousemove", handleMouseMove); card.removeEventListener("mouseleave", handleMouseLeave); };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateY: -25, x: -40 }}
      whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        padding: "24px",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, box-shadow 0.3s",
        willChange: "transform",
        height: "100%",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 50px rgba(193,127,78,0.12)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-lg sm:text-xl">{cat.icon}</span>
        <h3 className="font-sans font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>{cat.title}</h3>
      </div>

      <div className="flex flex-col gap-3 sm:gap-3.5">
        {cat.skills.map((skill, si) => (
          <div key={si}>
            <div className="flex justify-between mb-1">
              <span className="font-sans text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>{skill.name}</span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>{skill.tier}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--input-bg)" }}>
              <div
                ref={(el) => { barsRef.current[si] = el; }}
                data-width={tierWidth[skill.tier]}
                className="h-full rounded-full"
                style={{ width: "0%", background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-hover) 50%, var(--accent) 100%)", boxShadow: "0 0 6px var(--accent-glow)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 lg:px-10 py-24 lg:py-32" style={{ backgroundColor: "var(--bg-secondary)", perspective: "1200px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          Technical Expertise
        </motion.span>
        <h2 className="font-sans font-bold mb-8 sm:mb-12" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6" style={{ perspective: "1000px" }}>
          {skillCategories.map((cat, ci) => (
            <SkillCard3D key={ci} cat={cat} index={ci} />
          ))}
        </div>
      </div>
    </section>
  );
}
