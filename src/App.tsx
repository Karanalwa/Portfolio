// @ts-nocheck
// ============================================================================
//  Karan Alwa — Cyber-Terminal Portfolio  (self-contained)
//  Drop-in replacement for src/App.tsx in your Vite + React repo.
//  Uses libs already in your package.json (gsap, lenis) and images already in
//  /public/images. No other files need to change. `npm run dev` to preview,
//  then commit + push — Vite builds and deploys it as usual.
// ============================================================================
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const IMG = "/images";

const NAV = ["about", "experience", "skills", "projects", "contact"];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/karanalwa" },
  { label: "GitHub", href: "https://github.com/Karanalwa" },
  { label: "Email", href: "mailto:karanalwa0@gmail.com" },
];

const HIGHLIGHTS = [
  { tag: "CERT", title: "Microsoft Certified", desc: "Power Platform Developer Associate (PL-400)" },
  { tag: "DEV", title: "Full-Stack CRM Dev", desc: "C#, .NET, JavaScript, TypeScript, Web APIs" },
  { tag: "AI", title: "AI & Automation", desc: "MCP servers, LLM agents, Copilot Studio, AI Builder" },
  { tag: "CLOUD", title: "Cloud Integrations", desc: "Azure Functions, REST APIs, 4+ accounting platforms" },
];

const TIER = { Expert: 100, Proficient: 66, Familiar: 38 };
const SKILLS = [
  { tag: "PP", title: "Dynamics & Power Platform", skills: [
    { name: "Dynamics 365 CE", tier: "Expert" }, { name: "Dataverse", tier: "Expert" },
    { name: "Model-Driven & Canvas Apps", tier: "Expert" }, { name: "Power Automate", tier: "Expert" },
    { name: "Power Pages", tier: "Proficient" }, { name: "Business Process Flows", tier: "Proficient" } ] },
  { tag: "DEV", title: "Development", skills: [
    { name: "C# / .NET", tier: "Expert" }, { name: "Custom Plugins & Workflows", tier: "Expert" },
    { name: "JavaScript (Xrm / Client API)", tier: "Proficient" }, { name: "TypeScript", tier: "Proficient" },
    { name: "FetchXML / OData / Web API", tier: "Expert" }, { name: "Web Resources", tier: "Proficient" } ] },
  { tag: "CLD", title: "Integrations & Cloud", skills: [
    { name: "REST APIs", tier: "Expert" }, { name: "Azure Functions", tier: "Proficient" },
    { name: "Azure AD / Entra ID", tier: "Proficient" }, { name: "QuickBooks / SevDesk / Xubio", tier: "Proficient" },
    { name: "Business Central", tier: "Familiar" } ] },
  { tag: "AI", title: "AI & Automation", skills: [
    { name: "MCP Servers", tier: "Proficient" }, { name: "LLM Agent Design", tier: "Proficient" },
    { name: "Prompt Engineering", tier: "Expert" }, { name: "Claude / OpenAI APIs", tier: "Proficient" },
    { name: "AI Builder", tier: "Proficient" }, { name: "Copilot Studio", tier: "Familiar" } ] },
  { tag: "OPS", title: "DevOps & Web", skills: [
    { name: "Solution ALM / Pipelines", tier: "Proficient" }, { name: "Git / Azure DevOps", tier: "Proficient" },
    { name: "Angular", tier: "Familiar" }, { name: "HTML5 / CSS3", tier: "Expert" } ] },
].map((c) => ({ ...c, skills: c.skills.map((s) => ({ ...s, pct: TIER[s.tier] })) }));

const EXPERIENCES = [
  { company: "Alphavima Technologies", location: "Ahmedabad, India", branch: "power-platform/main", roles: [
    { hash: "a1f9c3", title: "Engineer — Power Platform", period: "Apr 2025 – Present", highlights: [
      "Engineered D365 CE solutions across 6+ modules for 200+ users; shipped 10+ C# plugins for pricing, tax & invoicing logic, cutting manual errors by 40%",
      "Automated rental, billing & approval processes with 15+ Power Automate cloud flows, reducing processing time by 30%",
      "Integrated D365 with 4 accounting platforms (QuickBooks, SevDesk, Xubio, Business Central) via REST APIs & Azure Functions",
      "Built an MCP server for Dynamics 365 exposing CRM data to LLM agents for natural-language record retrieval & workflow execution",
      "Developed a Sales Validation AI Agent using LLM reasoning over Dataverse, reducing invalid sales records by 35%" ] },
    { hash: "7e2b40", title: "Associate Engineer — Power Platform", period: "Oct 2023 – Mar 2025", highlights: [
      "Customized 30+ Dataverse entities, forms, views & dashboards; wrote 20+ JavaScript (Xrm) scripts for validations & calculations",
      "Built & maintained 2 Power Pages portals with secure role-based external access; resolved 90%+ of production defects within SLA" ] } ] },
  { company: "Tosscall Service", location: "Bhilai, India", branch: "web-dev/intern", roles: [
    { hash: "c4d810", title: "Web Developer Intern", period: "Jan 2023 – Jun 2023", highlights: [
      "Developed 10+ responsive web components (HTML, CSS, JS) and supported backend integrations & bug fixes, reducing UI issues by 20%" ] } ] },
];

const CY = "var(--cyan)", GR = "var(--green)";
const PROJECTS = [
  { idx: "01", name: "MCP Server for Dynamics 365", tags: ["MCP", "D365-Web-API", "LLM"], image: `${IMG}/project-2.jpg`, description: "An MCP server exposing D365 entities & operations as tools consumable by LLM clients like Claude and Copilot — scoped permissions, secure auth, natural-language CRM.", metric: "CRM → AI bridge", metricColor: CY, cta: "private repo", href: null, target: "_self" },
  { idx: "02", name: "Sales Validation AI Agent", tags: ["LLM-Agent", "D365", "Power-Automate"], image: `${IMG}/project-6.jpg`, description: "An AI agent validating quotes against pricing tiers & discount policies, wired to Power Automate to auto-flag invalid records — cut invalid submissions by 35%.", metric: "35% fewer invalid", metricColor: CY, cta: "case study", href: null, target: "_self" },
  { idx: "03", name: "Prexa365 — Rental Management", tags: ["D365-CE", "C#-Plugins", "Power-Automate"], image: `${IMG}/project-1.jpg`, description: "End-to-end rental modules with complex pricing/tax logic and integrations to 4 accounting systems, reducing manual effort by 30%.", metric: "30% effort cut", metricColor: CY, cta: "case study", href: null, target: "_self" },
  { idx: "04", name: "Transport Bidding & Booking", tags: ["Power-Pages", "Angular", "D365-CE"], image: `${IMG}/project-5.jpg`, description: "Power Pages portals integrated with Dataverse for real-time bid submission, quote management & rental bookings with automated approvals.", metric: "real-time", metricColor: CY, cta: "case study", href: null, target: "_self" },
  { idx: "05", name: "Hisab — POS & GST Invoicing", tags: ["React", "Node.js", "PostgreSQL"], image: `${IMG}/project-hisab.jpg`, description: "A complete point-of-sale & GST invoicing platform for Indian businesses — secure auth, inventory management and GST-compliant invoice generation.", metric: "● LIVE", metricColor: GR, cta: "open live ↗", href: "https://hisab-9zl3.vercel.app/login", target: "_blank" },
  { idx: "06", name: "UNO Blitz", tags: ["React", "TypeScript", "WebSocket"], image: `${IMG}/project-uno.jpg`, description: "A real-time multiplayer UNO game with player avatars, custom rooms & live gameplay — polished dark UI with smooth animations.", metric: "● LIVE", metricColor: GR, cta: "open live ↗", href: "https://uno-blitz.vercel.app/", target: "_blank" },
];

const CONTACT = [
  { k: "email", v: "karanalwa0@gmail.com", href: "mailto:karanalwa0@gmail.com" },
  { k: "phone", v: "+91 9300594844", href: "tel:+919300594844" },
  { k: "location", v: "Ahmedabad, India", href: "#contact" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
.kx{
  --bg:#06080f; --bg-2:#0a0e1a; --panel:#0a1020; --panel-2:#0c1426;
  --text:#d8e4f5; --text-dim:rgba(216,228,245,.62); --text-faint:rgba(216,228,245,.40);
  --cyan:#22d3ee; --cyan-2:#67e8f9; --blue:#3b82f6; --green:#34d399; --amber:#fbbf24;
  --line:rgba(34,211,238,.14); --line-2:rgba(34,211,238,.30);
  --grid:rgba(59,130,246,.06); --glow:rgba(34,211,238,.35); --cyan-soft:rgba(34,211,238,.07);
  --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,monospace;
  --sans:'Space Grotesk',system-ui,sans-serif;
  position:relative; min-height:100vh; background:var(--bg); color:var(--text);
  font-family:var(--sans); overflow-x:hidden;
}
[data-theme="light"] .kx{
  --bg:#eaeef4; --bg-2:#e1e8f1; --panel:#ffffff; --panel-2:#f3f7fc;
  --text:#0b1220; --text-dim:rgba(11,18,32,.64); --text-faint:rgba(11,18,32,.44);
  --cyan:#0891b2; --cyan-2:#0e7490; --blue:#2563eb; --green:#059669; --amber:#b45309;
  --line:rgba(8,145,178,.18); --line-2:rgba(8,145,178,.34);
  --grid:rgba(37,99,235,.07); --glow:rgba(8,145,178,.20); --cyan-soft:rgba(8,145,178,.06);
}
.kx *{box-sizing:border-box}
.kx a{color:inherit;text-decoration:none;min-width:0}
.kx button{font-family:inherit}
.kx img{max-width:100%;display:block}
.kx ::selection{background:var(--cyan);color:#04121a}
.kx .mono{font-family:var(--mono)}
@keyframes kxBlink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes kxFloaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes kxBob{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
@keyframes kxPulse{0%,100%{box-shadow:0 0 0 0 var(--glow)}50%{box-shadow:0 0 0 7px transparent}}
@keyframes kxGrid{0%{background-position:0 0}100%{background-position:64px 64px}}
@keyframes kxName{0%,100%{text-shadow:0 0 26px var(--glow)}50%{text-shadow:0 0 44px var(--glow),0 0 78px var(--glow)}}

.kx-rain{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.kx-grid-l{position:fixed;inset:0;z-index:1;pointer-events:none;
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:64px 64px;animation:kxGrid 24s linear infinite;
  -webkit-mask-image:radial-gradient(circle at 50% 30%,#000 0%,transparent 80%);mask-image:radial-gradient(circle at 50% 30%,#000 0%,transparent 80%)}
.kx-scan{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.5;mix-blend-mode:multiply;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,0) 0,rgba(0,0,0,0) 2px,rgba(0,0,0,.10) 3px,rgba(0,0,0,0) 4px)}
.kx-vig{position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(120% 80% at 50% -10%,transparent 40%,var(--bg) 100%)}

.kx-topbar{position:fixed;top:0;left:0;right:0;height:2px;z-index:60;pointer-events:none}
.kx-topfill{height:100%;width:0%;background:linear-gradient(90deg,var(--blue),var(--cyan));box-shadow:0 0 12px var(--glow)}

.kx-rail{position:fixed;right:18px;top:50%;transform:translateY(-50%);z-index:40;display:none;flex-direction:column;align-items:center;gap:10px;pointer-events:none}
.kx-rail .pct{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--cyan)}
.kx-rail .bar{position:relative;width:2px;height:150px;background:var(--line);border-radius:2px;overflow:hidden}
.kx-rail .fill{position:absolute;top:0;left:0;width:100%;height:0%;background:linear-gradient(var(--cyan),var(--blue))}
.kx-rail .lbl{font-family:var(--mono);font-size:9px;letter-spacing:.14em;color:var(--text-faint);writing-mode:vertical-rl;text-transform:uppercase}
@media(min-width:1101px){.kx-rail{display:flex}}

.kx-ring{position:fixed;left:0;top:0;width:32px;height:32px;margin:-16px 0 0 -16px;border:1px solid var(--cyan);border-radius:50%;z-index:9999;pointer-events:none;mix-blend-mode:difference;transition:background .2s;will-change:transform;display:none}
.kx-dot{position:fixed;left:0;top:0;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;background:var(--cyan);border-radius:50%;z-index:9999;pointer-events:none;will-change:transform;display:none}
@media(hover:hover) and (pointer:fine){.kx-ring,.kx-dot{display:block}.kx{cursor:none}.kx a,.kx button{cursor:none}}

.kx-nav{position:fixed;top:0;left:0;right:0;height:60px;z-index:50;display:flex;align-items:center;justify-content:center;border-bottom:1px solid transparent;transition:background .4s,border-color .4s,backdrop-filter .4s}
.kx-nav .inner{width:100%;max-width:1240px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(16px,4vw,40px)}
.kx-logo{background:none;border:none;cursor:pointer;font-family:var(--mono);font-size:13px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:6px;padding:0;min-height:auto}
.kx-nav-d{display:none;align-items:center;gap:22px}
.kx-nav-d .lnk{background:none;border:none;cursor:pointer;font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--text-dim);padding:6px 0;transition:color .2s;min-height:auto}
.kx-nav-d .lnk:hover{color:var(--cyan)}
.kx-theme{font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--cyan);background:var(--cyan-soft);border:1px solid var(--line);border-radius:6px;padding:7px 11px;cursor:pointer;min-height:36px}
.kx-nav-m{display:flex;align-items:center;gap:10px}
.kx-burger{width:40px;height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:none;border:1px solid var(--line);border-radius:6px;cursor:pointer}
.kx-burger span{width:18px;height:1.5px;background:var(--text)}
@media(min-width:761px){.kx-nav-d{display:flex}.kx-nav-m{display:none}}

.kx-menu{position:fixed;inset:0;z-index:49;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;background:color-mix(in srgb,var(--bg) 94%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.kx-menu .lnk{background:none;border:none;cursor:pointer;font-family:var(--mono);font-size:22px;font-weight:700;letter-spacing:.04em;color:var(--text)}

.kx-main{position:relative;z-index:2}
.kx-sec{padding:clamp(72px,12vw,140px) clamp(16px,4vw,40px)}
.kx-wrap{max-width:1240px;margin:0 auto}
.kx-cmd{font-family:var(--mono);font-size:13px;color:var(--cyan);margin-bottom:16px}
.kx-cmd .p{color:var(--text-faint)}
.kx-h2{font-family:var(--sans);font-weight:700;font-size:clamp(26px,5vw,46px);letter-spacing:-.02em;color:var(--text);margin:0 0 48px}

/* hero */
.kx-hero{min-height:100vh;display:flex;align-items:center;padding:96px clamp(16px,4vw,40px) 64px}
.kx-hero-grid{width:100%;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1fr;gap:clamp(32px,5vw,56px);align-items:center}
@media(min-width:861px){.kx-hero-grid{grid-template-columns:1.2fr .8fr}}
.kx-prompt{font-family:var(--mono);font-size:13px;margin-bottom:22px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.kx-caret{width:8px;height:15px;background:var(--cyan);display:inline-block;animation:kxBlink 1.1s step-end infinite}
.kx-name{font-family:var(--mono);font-weight:800;font-size:clamp(46px,11vw,116px);line-height:.94;letter-spacing:-.02em;color:var(--text);margin:0;animation:kxName 5s ease-in-out infinite}
.kx-role{font-family:var(--mono);font-size:clamp(12px,2.3vw,17px);color:var(--cyan-2);margin:22px 0 0;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.kx-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.kx-chip{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--line);border-radius:5px;padding:5px 9px}
.kx-stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}
.kx-stat{border:1px solid var(--line);border-radius:10px;padding:12px 15px;background:var(--cyan-soft);min-width:88px}
.kx-stat .n{font-family:var(--mono);font-weight:800;font-size:25px;color:var(--cyan);line-height:1}
.kx-stat .l{font-family:var(--mono);font-size:9px;letter-spacing:.08em;color:var(--text-faint);margin-top:6px;text-transform:uppercase}
.kx-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.kx-btn{font-family:var(--mono);font-size:13px;font-weight:700;letter-spacing:.03em;color:#04121a;background:var(--cyan);border:none;border-radius:8px;padding:15px 24px;min-height:48px;cursor:pointer;box-shadow:0 0 26px var(--glow);transition:transform .2s,box-shadow .2s;display:inline-flex;align-items:center;gap:8px}
.kx-btn:hover{transform:translateY(-2px);box-shadow:0 0 40px var(--glow)}
.kx-btn2{font-family:var(--mono);font-size:13px;font-weight:700;letter-spacing:.03em;color:var(--text);background:transparent;border:1px solid var(--line-2);border-radius:8px;padding:15px 24px;min-height:48px;display:inline-flex;align-items:center;gap:8px;cursor:pointer;transition:border-color .2s,color .2s}
.kx-btn2:hover{border-color:var(--cyan);color:var(--cyan)}
.kx-soc-row{display:flex;gap:20px;margin-top:24px}
.kx-soc{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-faint);transition:color .2s,transform .2s;display:inline-block}
.kx-soc:hover{color:var(--cyan);transform:translateY(-2px)}
.kx-card{justify-self:center;width:100%;max-width:340px}
.kx-card .shell{background:var(--panel);border:1px solid var(--line-2);border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45),0 0 40px var(--cyan-soft);animation:kxFloaty 7s ease-in-out infinite}
.kx-card .bar{display:flex;align-items:center;gap:8px;padding:11px 14px;border-bottom:1px solid var(--line);background:var(--panel-2)}
.kx-card .dot{width:9px;height:9px;border-radius:50%}
.kx-card .fn{font-family:var(--mono);font-size:11px;color:var(--text-faint);margin-left:6px}
.kx-card .photo{position:relative;width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;border:1px solid var(--line-2);box-shadow:0 0 24px var(--glow)}
.kx-card .photo img{width:100%;height:100%;object-fit:cover}
.kx-card .online{position:absolute;left:10px;bottom:10px;font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--green);display:flex;align-items:center;gap:6px;background:color-mix(in srgb,var(--bg) 60%,transparent);padding:4px 7px;border-radius:5px}
.kx-card .meta{display:grid;grid-template-columns:auto 1fr;gap:7px 12px;margin-top:15px;font-family:var(--mono);font-size:12px}
.kx-scroll{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--text-faint);text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:6px;animation:kxBob 2.2s ease-in-out infinite}

/* about */
.kx-about-grid{display:grid;grid-template-columns:1fr;gap:clamp(32px,5vw,56px)}
@media(min-width:861px){.kx-about-grid{grid-template-columns:1.05fr .95fr}}
.kx-lead{font-family:var(--sans);font-weight:700;font-size:clamp(26px,5vw,46px);line-height:1.08;letter-spacing:-.02em;color:var(--text);margin:0 0 24px;max-width:18ch}
.kx-p{font-size:clamp(15px,1.6vw,17px);line-height:1.75;color:var(--text-dim);margin:0 0 16px}
.kx-cards{display:grid;grid-template-columns:1fr;gap:12px}
.kx-hl{display:flex;gap:14px;align-items:flex-start;padding:18px 20px;background:var(--panel);border:1px solid var(--line);border-radius:13px;transition:border-color .25s,transform .25s,box-shadow .25s}
.kx-hl:hover{border-color:var(--line-2);transform:translateY(-3px);box-shadow:0 18px 40px rgba(0,0,0,.3)}
.kx-hl .tag{flex-shrink:0;width:34px;height:34px;border:1px solid var(--line-2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:9px;font-weight:700;color:var(--cyan);background:var(--cyan-soft)}
.kx-hl h4{font-family:var(--sans);font-weight:600;font-size:15px;color:var(--text);margin:0 0 3px}
.kx-hl p{font-family:var(--mono);font-size:12px;line-height:1.55;color:var(--text-faint);margin:0}

/* experience */
.kx-tl{position:relative}
.kx-tl-line{position:absolute;left:7px;top:4px;bottom:4px;width:1px;background:linear-gradient(var(--cyan),var(--blue));transform-origin:top center}
.kx-tl-list{display:flex;flex-direction:column;gap:clamp(32px,5vw,52px)}
.kx-exp{position:relative;padding-left:38px}
.kx-exp .node{position:absolute;left:0;top:3px;width:15px;height:15px;border-radius:50%;background:var(--bg);border:2px solid var(--cyan);box-shadow:0 0 12px var(--glow);display:flex;align-items:center;justify-content:center}
.kx-exp .node i{width:4px;height:4px;border-radius:50%;background:var(--cyan)}
.kx-exp .top{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:4px}
.kx-exp .co{font-family:var(--sans);font-weight:700;font-size:clamp(18px,2.4vw,23px);color:var(--text);margin:0}
.kx-exp .loc{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-faint)}
.kx-exp .br{font-family:var(--mono);font-size:11px;color:var(--blue);margin-bottom:18px}
.kx-erole{background:var(--panel);border:1px solid var(--line);border-radius:13px;padding:18px 20px;transition:border-color .25s,box-shadow .25s}
.kx-erole:hover{border-color:var(--line-2);box-shadow:0 16px 40px rgba(0,0,0,.28)}
.kx-erole h4{font-family:var(--mono);font-weight:700;font-size:14px;color:var(--cyan);margin:0}
.kx-erole .per{font-family:var(--mono);font-size:11px;color:var(--text-faint)}
.kx-erole ul{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:7px}
.kx-erole li{font-family:var(--sans);font-size:14px;line-height:1.6;color:var(--text-dim);display:flex;gap:9px}
.kx-erole li .plus{font-family:var(--mono);color:var(--green);flex-shrink:0}

/* skills */
.kx-skills{background:var(--bg-2)}
.kx-skills-grid{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:621px){.kx-skills-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1001px){.kx-skills-grid{grid-template-columns:repeat(3,1fr)}}
.kx-cat{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:22px}
.kx-cat .head{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.kx-cat .tag{font-family:var(--mono);font-size:9px;font-weight:700;color:var(--cyan);border:1px solid var(--line-2);border-radius:6px;padding:4px 7px;background:var(--cyan-soft)}
.kx-cat h3{font-family:var(--sans);font-weight:600;font-size:15px;color:var(--text);margin:0}
.kx-cat .rows{display:flex;flex-direction:column;gap:13px}
.kx-sk .r{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.kx-sk .nm{font-family:var(--mono);font-size:12.5px;color:var(--text-dim)}
.kx-sk .tr{font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--cyan)}
.kx-sk .track{height:6px;border-radius:4px;background:var(--cyan-soft);overflow:hidden;border:1px solid var(--line)}
.kx-bar{height:100%;width:0%;border-radius:4px;background:linear-gradient(90deg,var(--blue),var(--cyan));box-shadow:0 0 8px var(--glow)}

/* projects */
.kx-projects{min-height:100vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;padding:clamp(56px,9vw,90px) 0}
.kx-proj-head{max-width:1240px;margin:0 auto 30px;width:100%;padding:0 clamp(16px,4vw,40px);display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:14px}
.kx-proj-meter{display:flex;align-items:center;gap:12px;font-family:var(--mono);font-size:11px;color:var(--text-faint)}
.kx-proj-meter .bar{width:90px;height:3px;background:var(--line);border-radius:3px;overflow:hidden}
.kx-proj-meter .fill{height:100%;width:16%;background:linear-gradient(90deg,var(--blue),var(--cyan))}
.kx-proj-vp{overflow:hidden;width:100%}
.kx-proj-track{display:flex;gap:22px;padding:6px clamp(16px,4vw,40px);will-change:transform}
.kx-proj{flex:0 0 auto;width:min(82vw,440px);background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:border-color .25s,box-shadow .25s,transform .25s}
.kx-proj:hover{border-color:var(--line-2);box-shadow:0 26px 60px rgba(0,0,0,.4);transform:translateY(-4px)}
.kx-proj .shot{position:relative;height:clamp(170px,24vw,220px);overflow:hidden}
.kx-proj .shot img{width:100%;height:100%;object-fit:cover}
.kx-proj .shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,var(--panel) 100%)}
.kx-proj .badge{position:absolute;top:12px;font-family:var(--mono);font-size:11px;font-weight:700;color:var(--cyan);background:color-mix(in srgb,var(--bg) 55%,transparent);border:1px solid var(--line);padding:4px 8px;border-radius:6px}
.kx-proj .body{padding:18px 20px 20px;display:flex;flex-direction:column;flex:1}
.kx-proj .tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:11px}
.kx-proj .tags span{font-family:var(--mono);font-size:10px;letter-spacing:.04em;color:var(--blue)}
.kx-proj h3{font-family:var(--sans);font-weight:700;font-size:18px;color:var(--text);margin:0 0 8px}
.kx-proj p{font-family:var(--sans);font-size:14px;line-height:1.6;color:var(--text-dim);margin:0 0 16px;flex:1}
.kx-proj .link{font-family:var(--mono);font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:7px;align-self:flex-start}

/* education */
.kx-edu-grid{display:grid;grid-template-columns:1fr;gap:18px}
@media(min-width:721px){.kx-edu-grid{grid-template-columns:repeat(2,1fr)}}
.kx-json{background:var(--panel);border:1px solid var(--line);border-radius:15px;overflow:hidden}
.kx-json .bar{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid var(--line);background:var(--panel-2)}
.kx-json .dot{width:8px;height:8px;border-radius:50%}
.kx-json .fn{font-family:var(--mono);font-size:11px;color:var(--text-faint);margin-left:6px}
.kx-json .code{padding:20px;font-family:var(--mono);font-size:13px;line-height:1.9}
.kx-json .code .b{color:var(--text-faint)}
.kx-json .code .row{padding-left:18px}
.kx-json .code .key{color:var(--cyan)}
.kx-json .code .val{color:var(--text)}
.kx-json .code .num{color:var(--green)}

/* contact */
.kx-contact{padding:clamp(72px,12vw,140px) clamp(16px,4vw,40px) 0}
.kx-contact .box{max-width:760px;margin:0 auto;text-align:center}
.kx-contact h2{font-family:var(--sans);font-weight:700;font-size:clamp(28px,6vw,54px);line-height:1.06;letter-spacing:-.02em;color:var(--text);margin:0 0 18px;text-shadow:0 0 40px var(--glow)}
.kx-contact .sub{font-size:clamp(14px,2vw,17px);line-height:1.7;color:var(--text-dim);margin:0 auto 32px;max-width:54ch}
.kx-contact .btns{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:32px}
.kx-contact .info{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.kx-contact .info a{font-family:var(--mono);font-size:12.5px;color:var(--text-dim);border:1px solid var(--line);border-radius:9px;padding:11px 16px;min-height:44px;display:inline-flex;align-items:center;gap:9px;transition:border-color .2s}
.kx-contact .info a:hover{border-color:var(--line-2)}
.kx-foot{max-width:1240px;margin:clamp(56px,9vw,90px) auto 0;padding:26px clamp(16px,4vw,40px) 30px;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.kx-foot span{font-family:var(--mono);font-size:11px;color:var(--text-faint)}
.kx-foot .socs{display:flex;gap:18px}
.kx-foot .socs a{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-faint);transition:color .2s}
.kx-foot .socs a:hover{color:var(--cyan)}

@media(prefers-reduced-motion:reduce){
  .kx *{animation:none !important}
}
`;

export default function App() {
  const root = useRef(null);
  const rain = useRef(null);
  const ring = useRef(null);
  const dot = useRef(null);
  const nav = useRef(null);
  const topFill = useRef(null);
  const railFill = useRef(null);
  const railPct = useRef(null);
  const projVp = useRef(null);
  const projTrack = useRef(null);
  const projFill = useRef(null);
  const projIdx = useRef(null);
  const themeColors = useRef({ head: "rgba(34,211,238,.92)", body: "rgba(34,211,238,.30)", bg: "rgba(6,8,15,.16)" });
  const velRef = useRef(0);

  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState("home");

  // ---- theme ----
  useEffect(() => {
    let saved = "dark";
    try { saved = localStorage.getItem("ka_theme") || "dark"; } catch (e) {}
    setTheme(saved === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("ka_theme", theme); } catch (e) {}
    themeColors.current = theme === "light"
      ? { head: "rgba(8,145,178,.6)", body: "rgba(8,145,178,.20)", bg: "rgba(234,238,244,.18)" }
      : { head: "rgba(34,211,238,.92)", body: "rgba(34,211,238,.30)", bg: "rgba(6,8,15,.16)" };
    try { ScrollTrigger.refresh(); } catch (e) {}
  }, [theme]);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; }, [menuOpen]);

  // ---- lenis ref for nav scroll-to ----
  const lenisRef = useRef(null);
  const reducedRef = useRef(false);

  const scrollToId = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 54;
    if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: 1.1 });
    else window.scrollTo({ top, behavior: reducedRef.current ? "auto" : "smooth" });
  };
  const scrollTop = () => {
    setMenuOpen(false);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1 });
    else window.scrollTo({ top: 0, behavior: reducedRef.current ? "auto" : "smooth" });
  };

  // ---- main setup (once) ----
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches || "ontouchstart" in window;
    reducedRef.current = reduced;
    const cleanups = [];

    // progress + nav bg
    const updateProgress = () => {
      const st = window.scrollY || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.max(0, Math.min(1, st / max));
      if (topFill.current) topFill.current.style.width = p * 100 + "%";
      if (railFill.current) railFill.current.style.height = p * 100 + "%";
      if (railPct.current) railPct.current.textContent = String(Math.round(p * 100)).padStart(2, "0") + "%";
    };
    const onScroll = () => {
      const s = window.scrollY > 60;
      const n = nav.current;
      if (n) {
        n.style.background = s ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent";
        n.style.backdropFilter = s ? "blur(14px)" : "none";
        n.style.webkitBackdropFilter = s ? "blur(14px)" : "none";
        n.style.borderBottomColor = s ? "var(--line)" : "transparent";
      }
      updateProgress();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));
    onScroll();

    // custom cursor
    if (!touch && !reduced && ring.current && dot.current) {
      let rx = innerWidth / 2, ry = innerHeight / 2, dx = rx, dy = ry, big = 0, raf = 0;
      const move = (e) => { dx = e.clientX; dy = e.clientY; dot.current.style.transform = `translate(${dx}px,${dy}px)`; };
      window.addEventListener("mousemove", move, { passive: true });
      const loop = () => { rx += (dx - rx) * 0.2; ry += (dy - ry) * 0.2; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) scale(${big ? 1.7 : 1})`; raf = requestAnimationFrame(loop); };
      loop();
      const over = (e) => { if (e.target.closest("a,button,.kx-cursor")) { big = 1; ring.current.style.background = "var(--cyan-soft)"; } };
      const out = (e) => { if (e.target.closest("a,button,.kx-cursor")) { big = 0; ring.current.style.background = "transparent"; } };
      el.addEventListener("mouseover", over);
      el.addEventListener("mouseout", out);
      cleanups.push(() => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); el.removeEventListener("mouseover", over); el.removeEventListener("mouseout", out); });
    }

    // code rain
    if (rain.current) {
      const c = rain.current;
      const ctx = c.getContext("2d");
      const glyphs = "01<>{}[]()=+*/$#&|;:_ABCDEF0123456789ｱｲｳｴｵｶｷｸｹｺ".split("");
      let w, h, cols, drops, fs, raf = 0;
      const resize = () => {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
        c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px";
        fs = 15 * dpr; cols = Math.ceil(w / fs);
        drops = new Array(cols).fill(0).map(() => (Math.random() * h) / fs);
      };
      resize();
      window.addEventListener("resize", resize);
      if (reduced) {
        c.style.opacity = "0.12";
        ctx.fillStyle = themeColors.current.bg; ctx.fillRect(0, 0, w, h);
        ctx.font = fs + "px 'JetBrains Mono', monospace"; ctx.fillStyle = themeColors.current.body;
        for (let i = 0; i < cols; i++) for (let j = 0; j < h / fs; j += 3) ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * fs, j * fs);
      } else {
        c.style.opacity = "0.5";
        let last = 0;
        const draw = (t) => {
          raf = requestAnimationFrame(draw);
          if (t - last < 33) return; last = t;
          const col = themeColors.current;
          ctx.fillStyle = col.bg; ctx.fillRect(0, 0, w, h);
          ctx.font = fs + "px 'JetBrains Mono', monospace";
          const boost = 1 + Math.min(5, Math.abs(velRef.current || 0) * 0.22);
          for (let i = 0; i < cols; i++) {
            const x = i * fs, y = drops[i] * fs;
            ctx.fillStyle = Math.random() < 0.035 ? col.head : col.body;
            ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], x, y);
            if (y > h && Math.random() > 0.972) drops[i] = 0; else drops[i] += 0.55 * boost;
          }
        };
        raf = requestAnimationFrame(draw);
      }
      cleanups.push(() => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); });
    }

    // reveals / counters / bars / scroll animations
    const staticFallback = () => {
      el.querySelectorAll("[data-count]").forEach((n) => { n.textContent = n.dataset.count + (n.dataset.suffix || ""); });
      el.querySelectorAll(".kx-bar").forEach((b) => { b.style.width = (b.dataset.pct || 0) + "%"; });
      if (projVp.current && projTrack.current) { projVp.current.style.overflowX = "auto"; projVp.current.style.scrollSnapType = "x mandatory"; [...projTrack.current.children].forEach((ch) => (ch.style.scrollSnapAlign = "center")); }
    };

    if (reduced) {
      staticFallback();
      return () => cleanups.forEach((f) => f());
    }

    let lenis;
    let ticker;
    try {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenisRef.current = lenis;
      lenis.on("scroll", (e) => { velRef.current = e.velocity || 0; ScrollTrigger.update(); updateProgress(); });
      ticker = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    } catch (e) {}

    const ctx = gsap.context(() => {
      gsap.to(".kx-hero-text", { yPercent: -16, opacity: 0.1, ease: "none", scrollTrigger: { trigger: ".kx-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".kx-card", { yPercent: 26, ease: "none", scrollTrigger: { trigger: ".kx-hero", start: "top top", end: "bottom top", scrub: true } });

      el.querySelectorAll("[data-count]").forEach((n) => {
        const end = parseFloat(n.dataset.count), suf = n.dataset.suffix || "", o = { v: 0 };
        ScrollTrigger.create({ trigger: n, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.4, ease: "power2.out", onUpdate: () => { n.textContent = Math.round(o.v) + suf; } }) });
      });
      el.querySelectorAll(".kx-bar").forEach((b) => {
        gsap.fromTo(b, { width: "0%" }, { width: (parseFloat(b.dataset.pct) || 0) + "%", duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 94%", once: true } });
      });
      el.querySelectorAll(".kx-reveal").forEach((r) => {
        gsap.fromTo(r, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: r, start: "top 92%", once: true } });
      });
      el.querySelectorAll(".kx-wipe").forEach((r) => {
        gsap.fromTo(r, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut", scrollTrigger: { trigger: r, start: "top 90%", once: true } });
      });
      const line = el.querySelector(".kx-tl-line");
      if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".kx-tl", start: "top 72%", end: "bottom 62%", scrub: 1 } });
      const name = el.querySelector(".kx-name");
      if (name) gsap.from(name, { x: -5, skewX: 4, duration: 0.5, ease: "power3.out" });

      // horizontal projects
      const sec = el.querySelector(".kx-projects");
      const vp = projVp.current, track = projTrack.current;
      const desktop = window.innerWidth > 900 && !touch;
      if (sec && vp && track) {
        if (desktop) {
          const dist = () => Math.max(0, track.scrollWidth - vp.clientWidth);
          const count = track.children.length;
          gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: {
            trigger: sec, start: "top top", end: () => "+=" + dist(), scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => { if (projFill.current) projFill.current.style.width = (16 + self.progress * 84).toFixed(1) + "%"; if (projIdx.current) projIdx.current.textContent = String(Math.min(count, Math.floor(self.progress * count) + 1)).padStart(2, "0"); },
          } });
        } else {
          vp.style.overflowX = "auto"; vp.style.scrollSnapType = "x mandatory";
          [...track.children].forEach((ch) => (ch.style.scrollSnapAlign = "center"));
        }
      }
    }, el);
    cleanups.push(() => ctx.revert());

    // active section label
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActiveLabel(en.target.id === "hero" ? "home" : en.target.id); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    ["hero", "about", "experience", "skills", "projects", "education", "contact"].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    cleanups.push(() => io.disconnect());

    const rf = requestAnimationFrame(() => ScrollTrigger.refresh());
    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { try { ScrollTrigger.refresh(); } catch (e) {} }, 160); };
    window.addEventListener("resize", onResize);
    cleanups.push(() => { cancelAnimationFrame(rf); clearTimeout(rt); window.removeEventListener("resize", onResize); });

    return () => {
      cleanups.forEach((f) => { try { f(); } catch (e) {} });
      try { if (ticker) gsap.ticker.remove(ticker); } catch (e) {}
      try { if (lenis) lenis.destroy(); } catch (e) {}
      lenisRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="kx" ref={root}>
      <style>{CSS}</style>

      <canvas className="kx-rain" ref={rain} />
      <div className="kx-grid-l" />
      <div className="kx-scan" />
      <div className="kx-vig" />

      <div className="kx-topbar"><div className="kx-topfill" ref={topFill} /></div>

      <div className="kx-rail">
        <div className="pct" ref={railPct}>00%</div>
        <div className="bar"><div className="fill" ref={railFill} /></div>
        <div className="lbl">{activeLabel}</div>
      </div>

      <div className="kx-ring" ref={ring} />
      <div className="kx-dot" ref={dot} />

      <nav className="kx-nav" ref={nav}>
        <div className="inner">
          <button className="kx-logo" onClick={scrollTop}>
            <span style={{ color: "var(--green)" }}>karan@alwa</span>
            <span style={{ color: "var(--text-faint)" }}>:</span>
            <span style={{ color: "var(--blue)" }}>~</span>
            <span style={{ color: "var(--text-faint)" }}>$</span>
          </button>
          <div className="kx-nav-d">
            {NAV.map((id) => (
              <button key={id} className="lnk" onClick={() => scrollToId(id)}>./{id}</button>
            ))}
            <button className="kx-theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>theme:{theme}</button>
          </div>
          <div className="kx-nav-m">
            <button className="kx-theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>{theme === "dark" ? "[d]" : "[l]"}</button>
            <button className="kx-burger" aria-label="menu" onClick={() => setMenuOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="kx-menu">
          {NAV.map((id) => (
            <button key={id} className="lnk" onClick={() => scrollToId(id)}>./{id}</button>
          ))}
        </div>
      )}

      <main className="kx-main">
        {/* HERO */}
        <section id="hero" className="kx-hero" data-screen-label="Hero">
          <div className="kx-hero-grid">
            <div className="kx-hero-text">
              <div className="kx-prompt">
                <span style={{ color: "var(--green)" }}>karan@alwa:~$</span>
                <span style={{ color: "var(--text-dim)" }}>./init --portfolio</span>
                <span className="kx-caret" />
              </div>
              <h1 className="kx-name">KARAN<br />ALWA</h1>
              <p className="kx-role">
                <span style={{ color: "var(--text-faint)" }}>&gt;</span> Power Platform Developer · Dynamics 365 CE · AI Integrations
                <span className="kx-caret" style={{ width: 7, height: 14 }} />
              </p>
              <div className="kx-chips">
                <span className="kx-chip" style={{ color: "var(--text-faint)" }}>◷ Ahmedabad, India</span>
                <span className="kx-chip" style={{ color: "var(--cyan)", borderColor: "var(--line-2)" }}>✦ PL-400 Certified</span>
                <span className="kx-chip" style={{ color: "var(--green)", borderColor: "color-mix(in srgb,var(--green) 40%,transparent)" }}>● Open to work</span>
              </div>
              <div className="kx-stats">
                {[["2", "+", "years_exp"], ["200", "+", "users_served"], ["10", "+", "c#_plugins"], ["15", "+", "automate_flows"]].map(([n, s, l]) => (
                  <div className="kx-stat" key={l}>
                    <div className="n"><span data-count={n} data-suffix={s}>{n}{s}</span></div>
                    <div className="l">{l}</div>
                  </div>
                ))}
              </div>
              <div className="kx-cta-row">
                <button className="kx-btn kx-cursor" onClick={() => scrollToId("projects")}>./view_projects →</button>
                <a className="kx-btn2 kx-cursor" href="mailto:karanalwa0@gmail.com">./contact</a>
              </div>
              <div className="kx-soc-row">
                {SOCIALS.map((s) => (
                  <a key={s.label} className="kx-soc" href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
                ))}
              </div>
            </div>

            <div className="kx-card">
              <div className="shell">
                <div className="bar">
                  <span className="dot" style={{ background: "var(--green)" }} />
                  <span className="dot" style={{ background: "var(--cyan)" }} />
                  <span className="dot" style={{ background: "var(--blue)" }} />
                  <span className="fn">~/profile.id</span>
                </div>
                <div style={{ padding: 16 }}>
                  <div className="photo">
                    <img src={`${IMG}/profile.jpg`} alt="Karan Alwa" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,color-mix(in srgb,var(--panel) 78%,transparent) 100%)" }} />
                    <div className="online"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "kxPulse 2s ease-in-out infinite" }} />ONLINE</div>
                  </div>
                  <div className="meta">
                    <span style={{ color: "var(--text-faint)" }}>name</span><span>Karan Alwa</span>
                    <span style={{ color: "var(--text-faint)" }}>role</span><span style={{ color: "var(--cyan)" }}>PowerPlatform Engineer</span>
                    <span style={{ color: "var(--text-faint)" }}>loc</span><span>Ahmedabad, IN</span>
                    <span style={{ color: "var(--text-faint)" }}>cert</span><span>PL-400 · Microsoft</span>
                    <span style={{ color: "var(--text-faint)" }}>stack</span><span>D365 · C# · AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="kx-scroll">scroll<span>↓</span></div>
        </section>

        {/* ABOUT */}
        <section id="about" className="kx-sec" data-screen-label="About">
          <div className="kx-wrap">
            <div className="kx-cmd"><span className="p">$</span> cat about.md</div>
            <div className="kx-about-grid">
              <div className="kx-reveal">
                <h2 className="kx-lead kx-wipe">Building intelligent systems that bridge CRM and AI.</h2>
                <p className="kx-p">Microsoft Certified (PL-400) Dynamics 365 CE &amp; Power Platform Developer with 2+ years building enterprise CRM solutions across Dataverse, Model-Driven Apps, Power Automate, Power Pages and custom C# plugins.</p>
                <p className="kx-p">A proven record of automating processes, integrating third-party systems and shipping scalable solutions for 200+ users — recently extended into AI by building MCP servers and LLM-powered agents.</p>
                <p className="kx-p" style={{ marginBottom: 0 }}>I build infrastructure that eliminates friction, so engineers can focus on engineering.</p>
              </div>
              <div className="kx-cards">
                {HIGHLIGHTS.map((h) => (
                  <div className="kx-hl kx-reveal kx-cursor" key={h.title}>
                    <span className="tag">{h.tag}</span>
                    <div><h4>{h.title}</h4><p>{h.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="kx-sec" data-screen-label="Experience">
          <div className="kx-wrap">
            <div className="kx-cmd"><span className="p">$</span> git log --career --oneline</div>
            <h2 className="kx-h2 kx-wipe">Professional Experience</h2>
            <div className="kx-tl">
              <div className="kx-tl-line" />
              <div className="kx-tl-list">
                {EXPERIENCES.map((exp) => (
                  <div className="kx-exp" key={exp.company}>
                    <div className="node"><i /></div>
                    <div className="top">
                      <h3 className="co">{exp.company}</h3>
                      <span className="loc">◷ {exp.location}</span>
                    </div>
                    <div className="br">branch: {exp.branch}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {exp.roles.map((role) => (
                        <div className="kx-erole kx-reveal kx-cursor" key={role.hash}>
                          <div className="top">
                            <h4><span style={{ color: "var(--amber)" }}>{role.hash}</span> {role.title}</h4>
                            <span className="per">{role.period}</span>
                          </div>
                          <ul>
                            {role.highlights.map((hl, i) => (
                              <li key={i}><span className="plus">+</span><span>{hl}</span></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="kx-sec kx-skills" data-screen-label="Skills">
          <div className="kx-wrap">
            <div className="kx-cmd"><span className="p">$</span> ./skills --list --all</div>
            <h2 className="kx-h2 kx-wipe">Skills &amp; Technologies</h2>
            <div className="kx-skills-grid">
              {SKILLS.map((cat) => (
                <div className="kx-cat kx-reveal" key={cat.title}>
                  <div className="head"><span className="tag">{cat.tag}</span><h3>{cat.title}</h3></div>
                  <div className="rows">
                    {cat.skills.map((sk) => (
                      <div className="kx-sk" key={sk.name}>
                        <div className="r"><span className="nm">{sk.name}</span><span className="tr">{sk.tier}</span></div>
                        <div className="track"><div className="kx-bar" data-pct={sk.pct} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="kx-projects" data-screen-label="Projects">
          <div className="kx-proj-head">
            <div>
              <div className="kx-cmd"><span className="p">$</span> ls -la ~/projects</div>
              <h2 className="kx-h2 kx-wipe" style={{ margin: 0 }}>Selected Work</h2>
            </div>
            <div className="kx-proj-meter">
              <span ref={projIdx} style={{ color: "var(--cyan)" }}>01</span><span>/ 06</span>
              <div className="bar"><div className="fill" ref={projFill} /></div>
            </div>
          </div>
          <div className="kx-proj-vp" ref={projVp}>
            <div className="kx-proj-track" ref={projTrack}>
              {PROJECTS.map((p) => (
                <div className="kx-proj kx-cursor" key={p.idx}>
                  <div className="shot">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <div className="shade" />
                    <div className="badge" style={{ left: 12 }}>{p.idx}</div>
                    <div className="badge" style={{ right: 12, color: p.metricColor, display: "flex", alignItems: "center", gap: 5 }}>{p.metric}</div>
                  </div>
                  <div className="body">
                    <div className="tags">{p.tags.map((t) => (<span key={t}>--{t}</span>))}</div>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    {p.href
                      ? <a className="link" href={p.href} target={p.target} rel="noopener noreferrer" style={{ color: p.metricColor }}>{p.cta}</a>
                      : <span className="link" style={{ color: p.metricColor }}>{p.cta}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="kx-sec" data-screen-label="Education">
          <div className="kx-wrap">
            <div className="kx-cmd"><span className="p">$</span> cat credentials.json</div>
            <h2 className="kx-h2 kx-wipe">Education &amp; Certifications</h2>
            <div className="kx-edu-grid">
              <div className="kx-json kx-reveal kx-cursor">
                <div className="bar"><span className="dot" style={{ background: "var(--green)" }} /><span className="dot" style={{ background: "var(--cyan)" }} /><span className="dot" style={{ background: "var(--blue)" }} /><span className="fn">education.json</span></div>
                <div className="code">
                  <div className="b">{"{"}</div>
                  <div className="row"><span className="key">"degree"</span>: <span className="val">"Master of Computer Applications"</span>,</div>
                  <div className="row"><span className="key">"school"</span>: <span className="val">"Bhilai Institute of Technology, Durg"</span>,</div>
                  <div className="row"><span className="key">"years"</span>: <span className="val">"2021 — 2023"</span>,</div>
                  <div className="row"><span className="key">"cgpa"</span>: <span className="num">7.5</span></div>
                  <div className="b">{"}"}</div>
                </div>
              </div>
              <div className="kx-json kx-reveal kx-cursor">
                <div className="bar"><span className="dot" style={{ background: "var(--green)" }} /><span className="dot" style={{ background: "var(--cyan)" }} /><span className="dot" style={{ background: "var(--blue)" }} /><span className="fn">certification.json</span></div>
                <div className="code">
                  <div className="b">{"{"}</div>
                  <div className="row"><span className="key">"cert"</span>: <span className="val">"PL-400"</span>,</div>
                  <div className="row"><span className="key">"title"</span>: <span className="val">"Power Platform Developer Associate"</span>,</div>
                  <div className="row"><span className="key">"issuer"</span>: <span className="val">"Microsoft"</span>,</div>
                  <div className="row"><span className="key">"status"</span>: <span className="num">"ACTIVE"</span> <span style={{ color: "var(--green)" }}>●</span></div>
                  <div className="b">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="kx-contact" data-screen-label="Contact">
          <div className="box">
            <div className="kx-cmd"><span className="p">$</span> ./contact --init</div>
            <h2 className="kx-reveal">Let's build something<br />extraordinary together.</h2>
            <p className="sub kx-reveal">Always open to discussing new projects, ambitious ideas, or opportunities to be part of your vision.</p>
            <div className="btns kx-reveal">
              <a className="kx-btn kx-cursor" href="mailto:karanalwa0@gmail.com">✉ ./email_me</a>
              <a className="kx-btn2 kx-cursor" href="https://linkedin.com/in/karanalwa" target="_blank" rel="noopener noreferrer">in ./linkedin</a>
            </div>
            <div className="info kx-reveal">
              {CONTACT.map((c) => (
                <a key={c.k} href={c.href}><span style={{ color: "var(--cyan)" }}>{c.k}</span><span style={{ color: "var(--text-faint)" }}>:</span>{c.v}</a>
              ))}
            </div>
          </div>
          <footer className="kx-foot">
            <span>© {new Date().getFullYear()} Karan Alwa <span style={{ color: "var(--line-2)" }}>//</span> all rights reserved</span>
            <span>built in the terminal <span style={{ color: "var(--cyan)" }}>_</span></span>
            <div className="socs">
              {SOCIALS.map((s) => (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>))}
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
