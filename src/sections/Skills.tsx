import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "../components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Dynamics & Power Platform",
    icon: "\u{2699}",
    skills: [
      { name: "Dynamics 365 CE", level: 95 },
      { name: "Dataverse", level: 92 },
      { name: "Model-Driven & Canvas Apps", level: 90 },
      { name: "Power Automate", level: 93 },
      { name: "Power Pages", level: 85 },
      { name: "Business Process Flows", level: 88 },
    ],
  },
  {
    title: "Development",
    icon: "\u{1F4BB}",
    skills: [
      { name: "C# / .NET", level: 90 },
      { name: "Custom Plugins & Workflows", level: 92 },
      { name: "JavaScript (Xrm/Client API)", level: 88 },
      { name: "TypeScript", level: 80 },
      { name: "FetchXML / OData / Web API", level: 90 },
      { name: "Web Resources", level: 85 },
    ],
  },
  {
    title: "Integrations & Cloud",
    icon: "\u{1F310}",
    skills: [
      { name: "REST APIs", level: 92 },
      { name: "Azure Functions", level: 85 },
      { name: "Azure AD / Entra ID", level: 80 },
      { name: "QuickBooks / SevDesk / Xubio", level: 88 },
      { name: "Business Central", level: 78 },
    ],
  },
  {
    title: "AI & Automation",
    icon: "\u{26A1}",
    skills: [
      { name: "MCP Servers", level: 88 },
      { name: "LLM Agent Design", level: 85 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Anthropic Claude / OpenAI APIs", level: 85 },
      { name: "AI Builder", level: 80 },
      { name: "Copilot Studio", level: 78 },
    ],
  },
  {
    title: "DevOps & Web",
    icon: "\u{1F527}",
    skills: [
      { name: "Solution ALM / Pipelines", level: 85 },
      { name: "Git / Azure DevOps", level: 88 },
      { name: "Angular", level: 75 },
      { name: "HTML5 / CSS3", level: 90 },
    ],
  },
];

export default function Skills() {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    barsRef.current.forEach((bar) => {
      if (!bar) return;
      const targetWidth = bar.getAttribute("data-width");
      gsap.fromTo(bar,
        { width: "0%" },
        { width: targetWidth + "%", duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 90%", toggleActions: "play none none none" }
        }
      );
    });
  }, []);

  let barIndex = 0;

  return (
    <section id="skills" className="px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          Technical Expertise
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans font-bold mb-8 sm:mb-12" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div key={ci} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
              <TiltCard tiltAmount={6} style={{ padding: "20px sm:py-6 sm:px-6 lg:px-7", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", height: "100%" }}>
                <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                  <span className="text-lg sm:text-xl" style={{ filter: "drop-shadow(0 0 6px var(--accent-glow))" }}>{cat.icon}</span>
                  <h3 className="font-sans font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)", letterSpacing: "0.02em" }}>{cat.title}</h3>
                </div>

                <div className="flex flex-col gap-3 sm:gap-3.5">
                  {cat.skills.map((skill, si) => {
                    const currentIdx = barIndex++;
                    return (
                      <div key={si}>
                        <div className="flex justify-between mb-1">
                          <span className="font-sans text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>{skill.name}</span>
                          <span className="font-mono text-[10px] sm:text-xs" style={{ color: "var(--text-faint)" }}>{skill.level}%</span>
                        </div>
                        <div className="h-1.5 sm:h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--input-bg)" }}>
                          <div
                            ref={(el) => { barsRef.current[currentIdx] = el; }}
                            data-width={skill.level}
                            className="h-full rounded-full"
                            style={{
                              width: "0%",
                              background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-hover) 50%, var(--accent) 100%)",
                              boxShadow: "0 0 8px var(--accent-glow)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
