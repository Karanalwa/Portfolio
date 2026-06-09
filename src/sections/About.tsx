import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";

const highlights = [
  { icon: "\u{1F3C6}", title: "Microsoft Certified", desc: "Power Platform Developer Associate (PL-400)" },
  { icon: "\u{1F4BB}", title: "Full-Stack CRM Dev", desc: "C#, .NET, JavaScript, TypeScript, Web APIs" },
  { icon: "\u{26A1}", title: "AI & Automation", desc: "MCP servers, LLM agents, Copilot Studio, AI Builder" },
  { icon: "\u{1F310}", title: "Cloud Integrations", desc: "Azure Functions, REST APIs, 4+ accounting platforms" },
];

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text */}
          <div>
            <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
              About Me
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-sans font-bold mb-6" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
              Building intelligent systems that bridge CRM and AI.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="font-sans mb-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Microsoft Certified (PL-400) Dynamics 365 CE & Power Platform Developer with 2+ years of experience building enterprise CRM solutions across Dataverse, Model-Driven Apps, Power Automate, Power Pages, and custom C# plugins.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="font-sans mb-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Proven record of automating processes, integrating third-party systems, and shipping scalable solutions for 200+ users. Recently extended into AI by building MCP servers and LLM-powered agents that connect Dynamics 365 with modern AI tooling.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="font-sans" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Passionate about creating infrastructure that eliminates friction — from automated CI/CD pipelines to intelligent documentation systems, I build platforms that let engineers focus on engineering.
            </motion.p>
          </div>

          {/* Right - Highlights */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {highlights.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <TiltCard tiltAmount={8} style={{ padding: "20px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl sm:text-2xl shrink-0" style={{ lineHeight: 1, filter: "drop-shadow(0 0 6px var(--accent-glow))" }}>{item.icon}</span>
                    <div>
                      <h4 className="font-sans font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>{item.title}</h4>
                      <p className="font-sans mt-1 text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
