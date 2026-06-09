import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: "\u{1F3C6}", title: "Microsoft Certified", desc: "Power Platform Developer Associate (PL-400)" },
  { icon: "\u{1F4BB}", title: "Full-Stack CRM Dev", desc: "C#, .NET, JavaScript, TypeScript, Web APIs" },
  { icon: "\u{26A1}", title: "AI & Automation", desc: "MCP servers, LLM agents, Copilot Studio, AI Builder" },
  { icon: "\u{1F310}", title: "Cloud Integrations", desc: "Azure Functions, REST APIs, 4+ accounting platforms" },
];

// 3D tilt card
function TiltCard3D({ children, index }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateY: index % 2 === 0 ? -30 : 30, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{
        padding: "24px",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(193,127,78,0.15), 0 0 60px rgba(193,127,78,0.05)";
        e.currentTarget.style.borderColor = "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // 3D perspective shift on scroll
      gsap.fromTo(".about-3d-text",
        { rotateX: 15, opacity: 0.5, y: 50 },
        {
          rotateX: 0, opacity: 1, y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="px-4 sm:px-6 lg:px-10 py-24 lg:py-32" style={{ perspective: "1200px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text */}
          <div className="about-3d-text" style={{ transformStyle: "preserve-3d" }}>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block font-sans font-medium uppercase mb-4"
              style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)" }}
            >
              About Me
            </motion.span>

            <h2
              className="font-sans font-bold mb-6"
              style={{ fontSize: "clamp(24px, 5vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)" }}
            >
              Building intelligent systems that bridge CRM and AI.
            </h2>

            <p className="font-sans mb-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Microsoft Certified (PL-400) Dynamics 365 CE & Power Platform Developer with 2+ years of experience building enterprise CRM solutions across Dataverse, Model-Driven Apps, Power Automate, Power Pages, and custom C# plugins.
            </p>
            <p className="font-sans mb-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Proven record of automating processes, integrating third-party systems, and shipping scalable solutions for 200+ users. Recently extended into AI by building MCP servers and LLM-powered agents.
            </p>
            <p className="font-sans" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Passionate about creating infrastructure that eliminates friction — I build platforms that let engineers focus on engineering.
            </p>
          </div>

          {/* Right - 3D Tilt Cards */}
          <div className="flex flex-col gap-3 sm:gap-4" style={{ perspective: "1000px" }}>
            {highlights.map((item, i) => (
              <TiltCard3D key={i} index={i}>
                <div className="flex items-start gap-3" style={{ transform: "translateZ(20px)" }}>
                  <span className="text-xl sm:text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-sans font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>{item.title}</h4>
                    <p className="font-sans mt-1 text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
