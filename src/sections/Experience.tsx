import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";

const experiences = [
  {
    company: "Alphavima Technologies",
    location: "Ahmedabad, India",
    roles: [
      {
        title: "Engineer - Power Platform",
        period: "Apr 2025 - Present",
        highlights: [
          "Engineered D365 CE solutions across 6+ modules supporting 200+ users; shipped 10+ C# plugins for pricing, tax, and invoicing logic, cutting manual errors by 40%",
          "Automated rental, billing, and approval processes with 15+ Power Automate cloud flows, reducing processing time by 30%",
          "Integrated D365 with 4 accounting platforms (QuickBooks, SevDesk, Xubio, Business Central) via REST APIs and Azure Functions, cutting reconciliation effort by 25%",
          "Built an MCP server for Dynamics 365 exposing CRM data and actions to LLM agents for natural-language record retrieval, updates, and workflow execution",
          "Developed a Sales Validation AI Agent using LLM reasoning over Dataverse to validate quotes and pricing rules, reducing invalid sales records by 35%",
        ],
      },
      {
        title: "Associate Engineer - Power Platform",
        period: "Oct 2023 - Mar 2025",
        highlights: [
          "Customized 30+ Dataverse entities, forms, views, and dashboards; wrote 20+ JavaScript (Xrm) scripts for validations and calculations, reducing user errors by 35%",
          "Built and maintained 2 Power Pages portals with secure, role-based external access; resolved 90%+ of production defects within SLA",
        ],
      },
    ],
  },
  {
    company: "Tosscall Service",
    location: "Bhilai, India",
    roles: [
      {
        title: "Web Developer Intern",
        period: "Jan 2023 - Jun 2023",
        highlights: [
          "Developed 10+ responsive web components (HTML, CSS, JS) and supported backend integrations and bug fixes, reducing UI issues by 20%",
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-4 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          Career Journey
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans font-bold mb-12 sm:mb-16" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
          Professional Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <motion.div initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} className="hidden md:block absolute left-4 top-0 w-px" style={{ background: "var(--timeline)" }} />

          <div className="flex flex-col gap-10 sm:gap-12">
            {experiences.map((exp, expIdx) => (
              <motion.div key={expIdx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: expIdx * 0.2 }} className="relative md:pl-12">
                {/* Timeline dot - hidden on mobile */}
                <div className="hidden md:flex absolute left-4 top-1 w-4 h-4 rounded-full -translate-x-1/2 items-center justify-center" style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--bg-primary)" }} />
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                  <h3 className="font-sans font-bold text-lg sm:text-xl md:text-[22px]" style={{ color: "var(--text-primary)" }}>{exp.company}</h3>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{exp.location}</span>
                </div>

                <div className="mb-5 sm:mb-6" style={{ height: "1px", background: "var(--border)" }} />

                <div className="flex flex-col gap-5 sm:gap-7">
                  {exp.roles.map((role, roleIdx) => (
                    <motion.div key={roleIdx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: roleIdx * 0.15 }}>
                      <TiltCard tiltAmount={5} style={{ padding: "18px sm:px-6 sm:py-5", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                          <h4 className="font-sans font-semibold text-sm sm:text-base" style={{ color: "var(--accent)" }}>{role.title}</h4>
                          <span className="font-mono text-[10px] sm:text-xs" style={{ color: "var(--text-faint)" }}>{role.period}</span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {role.highlights.map((h, hi) => (
                            <li key={hi} className="font-sans flex items-start text-xs sm:text-sm" style={{ lineHeight: 1.6, color: "var(--text-secondary)" }}>
                              <span className="shrink-0 mt-1 mr-2 text-[6px] sm:text-[8px]" style={{ color: "var(--accent)" }}>&#9650;</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
