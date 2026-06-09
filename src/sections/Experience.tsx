import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Alphavima Technologies",
    location: "Ahmedabad, India",
    roles: [
      {
        title: "Engineer \u2014 Power Platform",
        period: "Apr 2025 \u2013 Present",
        highlights: [
          "Engineered D365 CE solutions across 6+ modules supporting 200+ users; shipped 10+ C# plugins for pricing, tax, and invoicing logic, cutting manual errors by 40%",
          "Automated rental, billing, and approval processes with 15+ Power Automate cloud flows, reducing processing time by 30%",
          "Integrated D365 with 4 accounting platforms (QuickBooks, SevDesk, Xubio, Business Central) via REST APIs and Azure Functions",
          "Built an MCP server for Dynamics 365 exposing CRM data to LLM agents for natural-language record retrieval and workflow execution",
          "Developed a Sales Validation AI Agent using LLM reasoning over Dataverse, reducing invalid sales records by 35%",
        ],
      },
      {
        title: "Associate Engineer \u2014 Power Platform",
        period: "Oct 2023 \u2013 Mar 2025",
        highlights: [
          "Customized 30+ Dataverse entities, forms, views, and dashboards; wrote 20+ JavaScript (Xrm) scripts for validations and calculations",
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
        period: "Jan 2023 \u2013 Jun 2023",
        highlights: [
          "Developed 10+ responsive web components (HTML, CSS, JS) and supported backend integrations and bug fixes, reducing UI issues by 20%",
        ],
      },
    ],
  },
];

function TiltCard3D({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(5px)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => { card.removeEventListener("mousemove", handleMouseMove); card.removeEventListener("mouseleave", handleMouseLeave); };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        padding: "20px",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, box-shadow 0.3s",
        willChange: "transform",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 40px rgba(193,127,78,0.12)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {children}
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Timeline line grows on scroll
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 50%", scrub: 1 },
          }
        );
      }

      // 3D entrance for each experience block
      gsap.utils.toArray<HTMLElement>(".exp-3d-block").forEach((block) => {
        gsap.fromTo(block,
          { rotateX: 20, y: 80, opacity: 0 },
          {
            rotateX: 0, y: 0, opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="px-4 sm:px-6 lg:px-10 py-24 lg:py-32" style={{ perspective: "1200px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="block font-sans font-medium uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          Career Journey
        </motion.span>
        <h2 className="font-sans font-bold mb-12 sm:mb-16" style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}>
          Professional Experience
        </h2>

        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Animated timeline line */}
          <div
            ref={timelineRef}
            className="hidden md:block absolute left-4 top-0 bottom-0 w-px origin-top"
            style={{ background: "var(--timeline)", transformOrigin: "top center" }}
          />

          <div className="flex flex-col gap-10 sm:gap-12">
            {experiences.map((exp, expIdx) => (
              <div key={expIdx} className="exp-3d-block relative md:pl-12" style={{ transformStyle: "preserve-3d" }}>
                {/* Timeline dot */}
                <div
                  className="hidden md:flex absolute left-4 top-2 w-4 h-4 rounded-full -translate-x-1/2 items-center justify-center"
                  style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)", zIndex: 2 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--bg-primary)" }} />
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                  <h3 className="font-sans font-bold text-lg sm:text-xl md:text-[22px]" style={{ color: "var(--text-primary)" }}>{exp.company}</h3>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{exp.location}</span>
                </div>

                <div className="mb-5 sm:mb-6" style={{ height: "1px", background: "var(--border)" }} />

                <div className="flex flex-col gap-5 sm:gap-7">
                  {exp.roles.map((role, roleIdx) => (
                    <motion.div
                      key={roleIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: roleIdx * 0.15 }}
                    >
                      <TiltCard3D>
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
                      </TiltCard3D>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
