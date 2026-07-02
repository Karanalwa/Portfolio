// @ts-nocheck
// ============================================================================
//  KARAN ALWA — HUD-Futurist Portfolio (v2 redesign)
//  Drop-in replacement for src/App.tsx in your Vite + React repo.
//  Uses only libs already in package.json (gsap + ScrollTrigger, lenis) and
//  images already in /public/images. No other files need to change.
//  `npm run dev` to preview → commit → push.
//  Accent color: change --ac in the CSS block below.
// ============================================================================
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const IMG = "/images";

const NAV = [
  ["01", "about"],
  ["02", "build"],
  ["03", "stack"],
  ["04", "work"],
  ["05", "path"],
];

const MARQUEE = [
  "DYNAMICS 365 CE", "POWER PLATFORM", "C# / .NET", "DATAVERSE", "POWER AUTOMATE",
  "POWER PAGES", "AI AGENTS", "MCP SERVERS", "AZURE FUNCTIONS", "PL-400 CERTIFIED",
];

const STATS = [
  ["2", "+", "YEARS"],
  ["200", "+", "USERS"],
  ["10", "+", "PLUGINS"],
  ["15", "+", "FLOWS"],
];

const BUILD = [
  { n: "01", t: "Enterprise CRM", d: "Dynamics 365 CE solutions across 6+ modules for 200+ users — plugins for pricing, tax and invoicing logic that cut manual errors by 40%.", tags: ["D365 CE", "C#", ".NET"] },
  { n: "02", t: "Power Platform", d: "Model-driven apps, Power Pages portals and 15+ Power Automate flows automating rental, billing and approvals — 30% faster processing.", tags: ["POWER APPS", "POWER AUTOMATE", "DATAVERSE"] },
  { n: "03", t: "AI Agents", d: "LLM agents reasoning over live Dataverse records — like a sales validator that cut invalid submissions by 35%.", tags: ["LLM AGENTS", "AI BUILDER"] },
  { n: "04", t: "MCP Servers & Integrations", d: "MCP servers exposing D365 to LLM clients, plus REST / Azure Functions integrations with 4 accounting platforms.", tags: ["MCP", "AZURE FUNCTIONS", "REST APIS"] },
];

const TIER = { Expert: 100, Proficient: 66, Familiar: 38 };
const STACK = [
  { title: "Dynamics & Power Platform", skills: [["Dynamics 365 CE", "Expert"], ["Dataverse", "Expert"], ["Model-Driven & Canvas Apps", "Expert"], ["Power Automate", "Expert"], ["Power Pages", "Proficient"], ["Business Process Flows", "Proficient"]] },
  { title: "Development", skills: [["C# / .NET", "Expert"], ["Custom Plugins & Workflows", "Expert"], ["FetchXML / OData / Web API", "Expert"], ["JavaScript (Xrm / Client API)", "Proficient"], ["TypeScript", "Proficient"], ["Web Resources", "Proficient"]] },
  { title: "Integrations & Cloud", skills: [["REST APIs", "Expert"], ["Azure Functions", "Proficient"], ["Azure AD / Entra ID", "Proficient"], ["QuickBooks / SevDesk / Xubio", "Proficient"], ["Business Central", "Familiar"]] },
  { title: "AI & Automation", skills: [["Prompt Engineering", "Expert"], ["MCP Servers", "Proficient"], ["LLM Agent Design", "Proficient"], ["Claude / OpenAI APIs", "Proficient"], ["AI Builder", "Proficient"], ["Copilot Studio", "Familiar"]] },
  { title: "DevOps & Web", skills: [["HTML5 / CSS3", "Expert"], ["Solution ALM / Pipelines", "Proficient"], ["Git / Azure DevOps", "Proficient"], ["Angular", "Familiar"]] },
];

const PROJECTS = [
  { name: "Hisab — POS & GST Invoicing", img: `${IMG}/project-hisab.jpg`, live: true, href: "https://hisab-9zl3.vercel.app/login", badge: "LIVE PROJECT", desc: "Complete point-of-sale and GST invoicing platform for Indian businesses — secure auth, inventory management, GST-compliant invoice generation.", tags: ["REACT", "NODE.JS", "POSTGRESQL"] },
  { name: "UNO Blitz", img: `${IMG}/project-uno.jpg`, live: true, href: "https://uno-blitz.vercel.app/", badge: "LIVE PROJECT", desc: "Real-time multiplayer UNO card game — player avatars, custom game rooms, live gameplay with a polished dark UI and smooth animations.", tags: ["REACT", "TYPESCRIPT", "WEBSOCKET"] },
  { name: "MCP Server for Dynamics 365 CRM", img: `${IMG}/project-2.jpg`, live: false, badge: "CRM-TO-AI BRIDGE", glyph: "⌘", desc: "MCP server exposing D365 entities and operations as tools consumable by LLM clients like Claude and Copilot — scoped permissions, secure auth.", tags: ["MCP", "D365 WEB API"] },
  { name: "Sales Validation AI Agent", img: `${IMG}/project-6.jpg`, live: false, badge: "35% FEWER INVALID", glyph: "⚡", desc: "AI agent validating quotes against pricing tiers and discount policies — integrated with Power Automate to auto-flag invalid records.", tags: ["LLM AGENT", "D365", "POWER AUTOMATE"] },
  { name: "Prexa365 — Rental Management", img: `${IMG}/project-1.jpg`, live: false, badge: "30% EFFORT CUT", glyph: "▣", desc: "End-to-end rental modules with complex pricing/tax logic and integrations to 4 accounting systems.", tags: ["D365 CE", "C# PLUGINS", "POWER AUTOMATE"] },
  { name: "Transport Bidding & Booking", img: `${IMG}/project-5.jpg`, live: false, badge: "REAL-TIME PROCESSING", glyph: "⇄", desc: "Power Pages portals integrated with Dataverse — real-time bid submission, quote management, rental bookings with automated approvals.", tags: ["POWER PAGES", "ANGULAR", "D365 CE"] },
];

const ROLES = [
  { period: "APR 2025 — PRESENT", accent: true, title: "Engineer — Power Platform", org: "ALPHAVIMA TECHNOLOGIES · AHMEDABAD", pts: [
    "Engineered D365 CE solutions across 6+ modules supporting 200+ users; shipped 10+ C# plugins for pricing, tax, and invoicing logic, cutting manual errors by 40%",
    "Automated rental, billing, and approval processes with 15+ Power Automate cloud flows, reducing processing time by 30%",
    "Integrated D365 with 4 accounting platforms (QuickBooks, SevDesk, Xubio, Business Central) via REST APIs and Azure Functions",
    "Built an MCP server for Dynamics 365 exposing CRM data to LLM agents for natural-language record retrieval and workflow execution",
    "Developed a Sales Validation AI Agent using LLM reasoning over Dataverse, reducing invalid sales records by 35%",
  ]},
  { period: "OCT 2023 — MAR 2025", accent: true, title: "Associate Engineer — Power Platform", org: "ALPHAVIMA TECHNOLOGIES · AHMEDABAD", pts: [
    "Customized 30+ Dataverse entities, forms, views, and dashboards; wrote 20+ JavaScript (Xrm) scripts for validations and calculations",
    "Built and maintained 2 Power Pages portals with secure, role-based external access; resolved 90%+ of production defects within SLA",
  ]},
  { period: "JAN 2023 — JUN 2023", accent: false, title: "Web Developer Intern", org: "TOSSCALL SERVICE · BHILAI", pts: [
    "Developed 10+ responsive web components (HTML, CSS, JS) and supported backend integrations and bug fixes, reducing UI issues by 20%",
  ]},
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
.kp{
  --ac:#3DF2B6;
  --bg:#06090D; --panel:#080C11; --ink:#E7EEF2; --mut:#93A1AB; --dim:#A6B4BD; --faint:#6B7A85;
  --line:rgba(231,238,242,.1); --line2:rgba(231,238,242,.14);
  --mono:'JetBrains Mono',ui-monospace,monospace; --sans:'Space Grotesk',system-ui,sans-serif;
  position:relative;background:var(--bg);color:var(--ink);font-family:var(--sans);
  min-height:100vh;overflow-x:clip;
}
.kp *{box-sizing:border-box;min-width:0}
.kp a{color:inherit;text-decoration:none}
.kp img{display:block;max-width:100%}
.kp ::selection{background:var(--ac);color:var(--bg)}
@keyframes kpMarquee{to{transform:translateX(-50%)}}
@keyframes kpSpin{to{transform:rotate(1turn)}}
@keyframes kpFloatA{from{transform:translate(0,0)}to{transform:translate(4%,7%)}}
@keyframes kpFloatB{from{transform:translate(0,0)}to{transform:translate(-5%,-6%)}}
@keyframes kpPulse{0%,100%{opacity:.25}50%{opacity:1}}

.kp-mono{font-family:var(--mono)}
.kp-progress{position:fixed;top:0;left:0;width:100%;height:2px;background:var(--ac);transform:scaleX(0);transform-origin:left;z-index:90}
.kp-glow{position:fixed;left:0;top:0;width:540px;height:540px;border-radius:50%;pointer-events:none;z-index:4;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;background:radial-gradient(closest-side,color-mix(in oklab,var(--ac) 9%,transparent),transparent 72%)}

.kp-nav{position:fixed;top:2px;left:0;right:0;z-index:80;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:13px clamp(18px,4vw,44px);background:rgba(6,9,13,.6);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(231,238,242,.07)}
.kp-logo{font-family:var(--mono);font-size:12.5px;font-weight:600;letter-spacing:.14em}
.kp-links{display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-end;gap:6px clamp(12px,2.2vw,26px)}
.kp-lnk{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;color:var(--mut);transition:color .2s}
.kp-lnk:hover{color:var(--ink)}
.kp-lnk b{color:var(--ac);font-weight:400}
.kp-cta{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;color:var(--ac);border:1px solid color-mix(in oklab,var(--ac) 45%,transparent);padding:8px 14px;border-radius:999px;transition:all .2s}
.kp-cta:hover{background:var(--ac);color:var(--bg)}

.kp-hero{position:relative;min-height:100svh;display:grid;place-items:center;overflow:clip;padding:130px 24px 90px}
.kp-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(231,238,242,.07) 1px,transparent 1px),radial-gradient(rgba(231,238,242,.035) 1px,transparent 1px);background-size:28px 28px,140px 140px;-webkit-mask-image:radial-gradient(ellipse 90% 80% at 50% 45%,#000 30%,transparent 100%);mask-image:radial-gradient(ellipse 90% 80% at 50% 45%,#000 30%,transparent 100%)}
.kp-orb-a{position:absolute;width:54vw;min-width:420px;aspect-ratio:1;top:-16%;left:-10%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in oklab,var(--ac) 15%,transparent),transparent 70%);filter:blur(50px);animation:kpFloatA 16s ease-in-out infinite alternate}
.kp-orb-b{position:absolute;width:46vw;min-width:360px;aspect-ratio:1;bottom:-20%;right:-12%;border-radius:50%;background:radial-gradient(closest-side,rgba(124,108,240,.13),transparent 70%);filter:blur(50px);animation:kpFloatB 19s ease-in-out infinite alternate}
.kp-ring{position:absolute;inset:0;margin:auto;width:min(58vw,600px);aspect-ratio:1;border:1px dashed color-mix(in oklab,var(--ac) 22%,transparent);border-radius:50%;animation:kpSpin 90s linear infinite}
.kp-scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.015) 0 1px,transparent 1px 3px);pointer-events:none}
.kp-hud{position:absolute;inset:clamp(14px,2.6vw,30px);pointer-events:none;font-family:var(--mono);font-size:9.5px;letter-spacing:.2em;color:var(--faint)}
.kp-hud .c{position:absolute;width:18px;height:18px}
.kp-hud .tl{top:0;left:0;border-top:1px solid rgba(231,238,242,.3);border-left:1px solid rgba(231,238,242,.3)}
.kp-hud .tr{top:0;right:0;border-top:1px solid rgba(231,238,242,.3);border-right:1px solid rgba(231,238,242,.3)}
.kp-hud .bl{bottom:0;left:0;border-bottom:1px solid rgba(231,238,242,.3);border-left:1px solid rgba(231,238,242,.3)}
.kp-hud .br{bottom:0;right:0;border-bottom:1px solid rgba(231,238,242,.3);border-right:1px solid rgba(231,238,242,.3)}
.kp-badge{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:10.5px;letter-spacing:.22em;color:var(--ac);border:1px solid color-mix(in oklab,var(--ac) 35%,transparent);background:color-mix(in oklab,var(--ac) 7%,transparent);padding:8px 15px;border-radius:999px}
.kp-dot{width:6px;height:6px;border-radius:50%;background:var(--ac);animation:kpPulse 2s ease-in-out infinite}
.kp-h1{margin:0;font-size:clamp(54px,12.5vw,162px);font-weight:700;line-height:.92;letter-spacing:-.045em;text-transform:uppercase;text-align:center}
.kp-h1 .w{display:inline-block;white-space:nowrap}
.kp-h1 .o{color:transparent;-webkit-text-stroke:.016em var(--ac)}
.kp-h1 [data-ltr]{display:inline-block}
.kp-sub{margin:0;max-width:640px;font-size:clamp(15.5px,2vw,19px);line-height:1.65;color:var(--mut);text-align:center}
.kp-btn{font-family:var(--mono);font-size:11.5px;font-weight:600;letter-spacing:.14em;color:var(--bg);background:var(--ac);padding:16px 28px;border-radius:6px;transition:all .25s;display:inline-block}
.kp-btn:hover{transform:translateY(-3px);box-shadow:0 12px 40px color-mix(in oklab,var(--ac) 35%,transparent)}
.kp-btn2{font-family:var(--mono);font-size:11.5px;letter-spacing:.14em;color:var(--ink);border:1px solid rgba(231,238,242,.18);padding:16px 28px;border-radius:6px;transition:all .25s;display:inline-block}
.kp-btn2:hover{border-color:var(--ac);color:var(--ac)}
.kp-stat{display:flex;flex-direction:column;align-items:center;gap:3px}
.kp-stat .n{font-family:var(--mono);font-size:clamp(20px,2.4vw,27px);font-weight:600;color:var(--ac)}
.kp-stat .l{font-family:var(--mono);font-size:9.5px;letter-spacing:.2em;color:var(--faint)}

.kp-marq{border-top:1px solid rgba(231,238,242,.08);border-bottom:1px solid rgba(231,238,242,.08);overflow:clip;padding:17px 0;position:relative;z-index:2;background:rgba(6,9,13,.5)}
.kp-marq-t{display:flex;width:max-content;animation:kpMarquee 34s linear infinite}
.kp-marq-t:hover{animation-play-state:paused}
.kp-marq-g{display:flex;align-items:center;gap:42px;padding-right:42px;font-family:var(--mono);font-size:11.5px;letter-spacing:.18em;color:#8FA0AA;white-space:nowrap}
.kp-marq-g i{color:var(--ac);font-style:normal}

.kp-sec{max-width:1240px;margin:0 auto;padding:clamp(70px,9vh,110px) clamp(20px,5vw,64px);scroll-margin-top:80px}
.kp-label{display:flex;align-items:center;gap:18px}
.kp-label .t{font-family:var(--mono);font-size:11px;letter-spacing:.22em;color:var(--ac)}
.kp-label .r{flex:1;height:1px;background:var(--line)}
.kp-label .x{font-family:var(--mono);font-size:11px;letter-spacing:.22em;color:var(--faint)}
.kp-h2{margin:26px 0 44px;font-size:clamp(32px,4.4vw,54px);font-weight:600;letter-spacing:-.03em;line-height:1.06}
.kp-h2 em{font-style:normal;color:var(--ac)}
.kp-chip{font-family:var(--mono);font-size:10px;letter-spacing:.16em;padding:7px 12px;border:1px solid var(--line2);border-radius:4px;color:var(--dim)}
.kp-chip.ac{border-color:color-mix(in oklab,var(--ac) 40%,transparent);color:var(--ac)}
.kp-tag{font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;padding:5px 9px;border:1px solid var(--line2);border-radius:4px;color:var(--dim)}

.kp-about{display:grid;grid-template-columns:1fr;gap:clamp(40px,6vw,90px);align-items:start;margin-top:40px}
@media(min-width:960px){.kp-about{grid-template-columns:1.05fr .95fr}}
.kp-p{margin:0;font-size:16px;line-height:1.75;color:var(--mut);max-width:60ch}
.kp-photo{position:relative;width:min(100%,430px);justify-self:end}
.kp-photo .frame{position:relative;aspect-ratio:4/5;border:1px solid rgba(231,238,242,.12);border-radius:16px;background:rgba(231,238,242,.04);padding:10px}
.kp-photo img{width:100%;height:100%;object-fit:cover;border-radius:10px}
.kp-photo .ct{position:absolute;top:-1px;right:-1px;width:22px;height:22px;border-top:2px solid var(--ac);border-right:2px solid var(--ac);border-top-right-radius:14px}
.kp-photo .cb{position:absolute;bottom:-1px;left:-1px;width:22px;height:22px;border-bottom:2px solid var(--ac);border-left:2px solid var(--ac);border-bottom-left-radius:14px}
.kp-photo .cap{display:flex;justify-content:space-between;margin-top:12px;font-family:var(--mono);font-size:9.5px;letter-spacing:.18em;color:var(--faint)}

.kp-grid4{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(290px,100%),1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.kp-cell{background:var(--panel);padding:clamp(24px,3vw,36px);display:flex;flex-direction:column;gap:12px;transition:background .3s}
.kp-cell:hover{background:#0B1118}
.kp-cell .n{font-family:var(--mono);font-size:11px;color:var(--ac);letter-spacing:.2em}
.kp-cell h3{margin:6px 0 0;font-size:21px;font-weight:600;letter-spacing:-.01em}
.kp-cell p{margin:0;font-size:14.5px;line-height:1.65;color:var(--mut)}
.kp-cell .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:12px}

.kp-stack{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(310px,100%),1fr));gap:16px}
.kp-cat{border:1px solid var(--line);border-radius:14px;background:var(--panel);padding:clamp(22px,2.6vw,30px);display:flex;flex-direction:column;gap:14px;transition:border-color .3s}
.kp-cat:hover{border-color:color-mix(in oklab,var(--ac) 40%,transparent)}
.kp-cat h3{margin:0 0 4px;font-size:15px;font-weight:600;letter-spacing:.02em;color:var(--ac);font-family:var(--mono);text-transform:uppercase}
.kp-sk .r{display:flex;justify-content:space-between;gap:12px;margin-bottom:4px}
.kp-sk .nm{font-size:13.5px;color:#C7D2D9}
.kp-sk .tr{font-family:var(--mono);font-size:9px;letter-spacing:.16em}
.kp-sk .track{height:3px;border-radius:2px;background:rgba(231,238,242,.07)}
.kp-sk .bar{height:100%;width:0%;border-radius:2px}
.kp-sk .bar.e{background:var(--ac);box-shadow:0 0 6px color-mix(in oklab,var(--ac) 50%,transparent)}
.kp-sk .bar.p{background:color-mix(in oklab,var(--ac) 60%,#4a5a66)}
.kp-sk .bar.f{background:#4a5a66}

.kp-work{scroll-margin-top:60px}
.kp-work-pin{min-height:100svh;display:flex;flex-direction:column;justify-content:center;gap:34px;overflow:clip;padding:70px 0}
.kp-work-head{max-width:1240px;width:100%;margin:0 auto;padding:0 clamp(20px,5vw,64px)}
.kp-track{display:flex;gap:clamp(18px,2.6vw,32px);padding:0 clamp(20px,5vw,64px);width:max-content;will-change:transform;align-items:stretch}
.kp-proj{width:clamp(300px,64vw,620px);border:1px solid rgba(231,238,242,.12);border-radius:16px;background:var(--panel);overflow:hidden;display:flex;flex-direction:column;transition:border-color .3s,transform .3s;flex:0 0 auto}
.kp-proj:hover{border-color:color-mix(in oklab,var(--ac) 50%,transparent);transform:translateY(-4px)}
.kp-proj .shot{position:relative;width:100%;aspect-ratio:16/9;background:rgba(231,238,242,.04);border-bottom:1px solid rgba(231,238,242,.08)}
.kp-proj .shot img{width:100%;height:100%;object-fit:cover}
.kp-proj .badge{position:absolute;top:12px;right:12px;display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:9px;letter-spacing:.16em;padding:6px 10px;border-radius:4px;background:rgba(6,9,13,.8);border:1px solid rgba(231,238,242,.2);color:var(--dim);backdrop-filter:blur(6px)}
.kp-proj .badge.live{border-color:color-mix(in oklab,var(--ac) 45%,transparent);color:var(--ac)}
.kp-proj .badge .d{width:5px;height:5px;border-radius:50%;background:var(--ac);animation:kpPulse 2s ease-in-out infinite}
.kp-proj .body{padding:clamp(20px,2.6vw,28px);display:flex;flex-direction:column;gap:12px;flex:1}
.kp-proj .top{display:flex;align-items:baseline;justify-content:space-between;gap:16px}
.kp-proj h3{margin:0;font-size:clamp(19px,2.2vw,25px);font-weight:600;letter-spacing:-.015em}
.kp-proj .arw{color:var(--ac);font-size:20px;flex-shrink:0}
.kp-proj p{margin:0;font-size:14px;line-height:1.6;color:var(--mut)}
.kp-proj .tags{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:auto}
.kp-open{font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;padding:5px 9px;border:1px solid color-mix(in oklab,var(--ac) 45%,transparent);border-radius:4px;color:var(--ac);transition:all .2s}
.kp-open:hover{background:var(--ac);color:var(--bg)}
.kp-next{width:clamp(260px,44vw,440px);border:1px dashed color-mix(in oklab,var(--ac) 40%,transparent);border-radius:16px;background:color-mix(in oklab,var(--ac) 4%,var(--bg));display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:16px;padding:clamp(28px,4vw,48px);flex:0 0 auto}
.kp-next .k{font-family:var(--mono);font-size:10.5px;letter-spacing:.22em;color:var(--ac)}
.kp-next h3{margin:0;font-size:clamp(26px,3.4vw,40px);font-weight:600;letter-spacing:-.02em;line-height:1.1}

.kp-path{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(400px,100%),1fr));gap:clamp(40px,6vw,80px);align-items:start}
.kp-tl{position:relative;padding-left:34px}
.kp-tl .base{position:absolute;left:4px;top:6px;bottom:6px;width:2px;background:var(--line);border-radius:2px}
.kp-tl .fill{position:absolute;left:4px;top:6px;bottom:6px;width:2px;background:var(--ac);border-radius:2px;transform:scaleY(0);transform-origin:top;box-shadow:0 0 12px color-mix(in oklab,var(--ac) 60%,transparent)}
.kp-role{position:relative;padding-bottom:40px}
.kp-role:last-child{padding-bottom:0}
.kp-role .node{position:absolute;left:-34px;top:5px;width:10px;height:10px;border-radius:50%;background:var(--bg);border:2px solid var(--ac);transform:translateX(-1px)}
.kp-role .node.dim{border-color:rgba(231,238,242,.3)}
.kp-role .per{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;color:var(--faint)}
.kp-role .per.ac{color:var(--ac)}
.kp-role h3{margin:10px 0 4px;font-size:20px;font-weight:600}
.kp-role .org{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--mut);margin-bottom:12px}
.kp-role .pts{display:flex;flex-direction:column;gap:8px;max-width:58ch}
.kp-role .pt{display:flex;gap:10px;font-size:13.5px;line-height:1.6;color:var(--mut)}
.kp-role .pt b{color:var(--ac);flex-shrink:0;font-weight:400}
.kp-cert{border:1px solid color-mix(in oklab,var(--ac) 35%,transparent);background:color-mix(in oklab,var(--ac) 5%,transparent);border-radius:14px;padding:clamp(24px,3vw,32px);position:relative;overflow:hidden}
.kp-cert .wm{position:absolute;top:0;right:0;font-family:var(--mono);font-size:60px;font-weight:600;color:color-mix(in oklab,var(--ac) 12%,transparent);line-height:1;padding:10px 14px}
.kp-cert .k{font-family:var(--mono);font-size:10.5px;letter-spacing:.22em;color:var(--ac)}
.kp-cert h3{margin:12px 0 6px;font-size:21px;font-weight:600;max-width:16ch}
.kp-cert p{margin:0 0 14px;font-size:14px;line-height:1.6;color:var(--mut);max-width:46ch}
.kp-pill{display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);font-size:9.5px;letter-spacing:.18em;color:var(--ac);border:1px solid color-mix(in oklab,var(--ac) 40%,transparent);padding:6px 11px;border-radius:999px}
.kp-edu{border:1px solid rgba(231,238,242,.12);background:var(--panel);border-radius:14px;padding:clamp(24px,3vw,32px)}
.kp-edu .k{font-family:var(--mono);font-size:10.5px;letter-spacing:.22em;color:var(--faint)}
.kp-edu h3{margin:12px 0 4px;font-size:21px;font-weight:600}
.kp-edu p{margin:0 0 16px;font-size:14px;line-height:1.6;color:var(--mut)}

.kp-contact{position:relative;overflow:clip;padding:clamp(100px,16vh,190px) clamp(20px,5vw,64px);scroll-margin-top:80px}
.kp-contact .orb{position:absolute;width:70vw;min-width:480px;aspect-ratio:2/1;left:50%;bottom:-30%;transform:translateX(-50%);background:radial-gradient(closest-side,color-mix(in oklab,var(--ac) 10%,transparent),transparent 70%);filter:blur(60px)}
.kp-contact .in{position:relative;max-width:1000px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center;gap:36px}
.kp-contact h2{margin:0;font-size:clamp(42px,8vw,104px);font-weight:650;letter-spacing:-.04em;line-height:1;text-transform:uppercase}
.kp-contact h2 .o{color:transparent;-webkit-text-stroke:.016em var(--ac)}
.kp-mailbox{display:flex;align-items:center;justify-content:space-between;gap:24px;width:min(100%,760px);border:1px solid rgba(231,238,242,.16);border-radius:14px;padding:clamp(22px,3.4vw,34px) clamp(24px,4vw,40px);color:var(--ink);transition:all .3s}
.kp-mailbox:hover{background:var(--ac);color:var(--bg);border-color:var(--ac);transform:translateY(-4px)}
.kp-mailbox .em{font-size:clamp(17px,2.8vw,28px);font-weight:600;letter-spacing:-.015em;overflow-wrap:anywhere}
.kp-soc{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;color:var(--dim);border:1px solid var(--line2);padding:10px 16px;border-radius:999px;transition:all .2s}
.kp-soc:hover{color:var(--ac);border-color:color-mix(in oklab,var(--ac) 50%,transparent)}
.kp-soc.ghost{border-style:dashed;color:var(--faint)}
.kp-foot{border-top:1px solid rgba(231,238,242,.08);padding:24px clamp(20px,5vw,64px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--faint)}
.kp-foot a{transition:color .2s}
.kp-foot a:hover{color:var(--ac)}

@media(prefers-reduced-motion:reduce){.kp *{animation:none !important}}
`;

export default function App() {
  const root = useRef(null);
  const progress = useRef(null);
  const glow = useRef(null);
  const workSec = useRef(null);
  const vp = useRef(null);
  const track = useRef(null);
  const counter = useRef(null);
  const tline = useRef(null);
  const lenisRef = useRef(null);
  const reducedRef = useRef(false);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: 1.1 });
    else window.scrollTo({ top, behavior: reducedRef.current ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches || "ontouchstart" in window;
    reducedRef.current = reduced;
    const cleanups = [];
    const total = PROJECTS.length + 1;

    // scroll progress
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.max(0, Math.min(1, (window.scrollY || 0) / max));
      if (progress.current) progress.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", updateProgress));
    updateProgress();

    // cursor glow
    if (!touch && !reduced && glow.current) {
      let gx = -600, gy = -600, tx = -600, ty = -600, on = false, raf = 0;
      const mm = (e) => { tx = e.clientX; ty = e.clientY; if (!on) { on = true; glow.current.style.opacity = "1"; } };
      window.addEventListener("mousemove", mm, { passive: true });
      const loop = () => {
        gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
        if (glow.current) { glow.current.style.left = gx + "px"; glow.current.style.top = gy + "px"; }
        raf = requestAnimationFrame(loop);
      };
      loop();
      cleanups.push(() => { window.removeEventListener("mousemove", mm); cancelAnimationFrame(raf); });
    }

    const setCount = (p) => {
      if (!counter.current) return;
      const idx = Math.min(total, Math.floor(p * total) + 1);
      counter.current.textContent = "0" + idx + " / 0" + total;
    };

    // reduced-motion static fallback
    if (reduced) {
      el.querySelectorAll(".kp-sk .bar").forEach((b) => { b.style.width = (b.dataset.pct || 0) + "%"; });
      el.querySelectorAll("[data-count]").forEach((n) => { n.textContent = n.dataset.count + (n.dataset.suffix || ""); });
      if (tline.current) tline.current.style.transform = "scaleY(1)";
      if (vp.current && track.current) {
        vp.current.style.overflowX = "auto";
        vp.current.style.scrollSnapType = "x proximity";
        [...track.current.children].forEach((c) => (c.style.scrollSnapAlign = "start"));
      }
      return () => cleanups.forEach((f) => f());
    }

    // lenis smooth scroll
    let lenis, ticker;
    try {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenisRef.current = lenis;
      lenis.on("scroll", () => { ScrollTrigger.update(); updateProgress(); });
      ticker = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    } catch (e) {}

    const ctx = gsap.context(() => {
      // hero letters
      gsap.from("[data-ltr]", { yPercent: 115, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.045, delay: 0.15 });

      // reveals
      el.querySelectorAll("[data-rv]").forEach((r) => {
        gsap.fromTo(r, { y: 26, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          delay: (parseInt(r.dataset.rvd || "0", 10)) / 1000,
          scrollTrigger: { trigger: r, start: "top 92%", once: true },
        });
      });

      // stat counters
      el.querySelectorAll("[data-count]").forEach((n) => {
        const end = parseFloat(n.dataset.count), suf = n.dataset.suffix || "", o = { v: 0 };
        ScrollTrigger.create({ trigger: n, start: "top 95%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.3, ease: "power2.out", onUpdate: () => { n.textContent = Math.round(o.v) + suf; } }) });
      });

      // skill bars
      el.querySelectorAll(".kp-sk .bar").forEach((b) => {
        gsap.fromTo(b, { width: "0%" }, { width: (parseFloat(b.dataset.pct) || 0) + "%", duration: 1, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 94%", once: true } });
      });

      // timeline draw
      if (tline.current) {
        gsap.fromTo(tline.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".kp-tl", start: "top 78%", end: "bottom 55%", scrub: 1 } });
      }

      // pinned horizontal work rail (desktop) / native swipe (mobile)
      const sec = workSec.current, v = vp.current, t = track.current;
      const desktop = window.innerWidth > 900 && !touch;
      if (sec && v && t) {
        if (desktop) {
          const dist = () => Math.max(0, t.scrollWidth - v.clientWidth);
          gsap.to(t, {
            x: () => -dist(), ease: "none",
            scrollTrigger: {
              trigger: sec, start: "top top", end: () => "+=" + dist(), scrub: 0.8,
              pin: true, anticipatePin: 1, invalidateOnRefresh: true,
              onUpdate: (self) => setCount(self.progress),
            },
          });
        } else {
          v.style.overflowX = "auto";
          v.style.scrollSnapType = "x proximity";
          [...t.children].forEach((c) => (c.style.scrollSnapAlign = "start"));
          const onS = () => { const m = v.scrollWidth - v.clientWidth; if (m > 0) setCount(v.scrollLeft / (m + 1)); };
          v.addEventListener("scroll", onS, { passive: true });
          cleanups.push(() => v.removeEventListener("scroll", onS));
        }
      }
    }, el);
    cleanups.push(() => ctx.revert());

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
    };
  }, []);

  return (
    <div className="kp" ref={root}>
      <style>{CSS}</style>

      <div className="kp-progress" ref={progress} />
      <div className="kp-glow" ref={glow} />

      <nav className="kp-nav">
        <a className="kp-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollToId("hero"); }}>
          KARAN<span style={{ color: "var(--ac)" }}>.</span>ALWA
        </a>
        <div className="kp-links">
          {NAV.map(([n, id]) => (
            <a key={id} className="kp-lnk" href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }}>
              <b>{n}</b> {id.toUpperCase()}
            </a>
          ))}
          <a className="kp-cta" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>GET IN TOUCH</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="hero" className="kp-hero" data-screen-label="Hero">
        <div className="kp-dots" />
        <div className="kp-orb-a" />
        <div className="kp-orb-b" />
        <div className="kp-ring" />
        <div className="kp-scan" />
        <div className="kp-hud">
          <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
          <span style={{ position: "absolute", top: 70, left: 26 }}>PORTFOLIO — 2026 EDITION</span>
          <span style={{ position: "absolute", top: 70, right: 26, textAlign: "right" }}>AHMEDABAD · INDIA</span>
          <span style={{ position: "absolute", bottom: 22, left: 26, animation: "kpPulse 2.6s ease-in-out infinite" }}>SCROLL TO EXPLORE ↓</span>
          <span style={{ position: "absolute", bottom: 22, right: 26, color: "var(--ac)" }}>PL-400 CERTIFIED</span>
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 28, maxWidth: 1100 }}>
          <div className="kp-badge"><span className="kp-dot" />MICROSOFT CERTIFIED — PL-400</div>
          <h1 className="kp-h1">
            <span className="w">{"KARAN".split("").map((c, i) => <span data-ltr key={i}>{c}</span>)}</span>{" "}
            <span className="w o">{"ALWA".split("").map((c, i) => <span data-ltr key={i}>{c}</span>)}</span>
          </h1>
          <p className="kp-sub" data-rv>
            Dynamics 365 CE &amp; Power Platform Developer — I build enterprise CRM systems and AI-powered agents. C#, .NET, Dataverse and MCP servers, wired into real business workflows.
          </p>
          <div data-rv data-rvd="120" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            <a className="kp-btn" href="#work" onClick={(e) => { e.preventDefault(); scrollToId("work"); }}>VIEW SELECTED WORK</a>
            <a className="kp-btn2" href="#about" onClick={(e) => { e.preventDefault(); scrollToId("about"); }}>MORE ABOUT ME</a>
          </div>
          <div data-rv data-rvd="200" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 44px", marginTop: 10 }}>
            {STATS.map(([n, s, l]) => (
              <div className="kp-stat" key={l}>
                <span className="n"><span data-count={n} data-suffix={s}>{n}{s}</span></span>
                <span className="l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="kp-marq" data-screen-label="Skills marquee">
        <div className="kp-marq-t">
          {[0, 1].map((k) => (
            <div className="kp-marq-g" key={k}>
              {MARQUEE.map((m) => (<span key={m}>{m} <i style={{ marginLeft: 42 }}>◆</i></span>))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="kp-sec" data-screen-label="About">
        <div className="kp-label" data-rv><span className="t">/01 — ABOUT</span><span className="r" /></div>
        <div className="kp-about">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 className="kp-h2" data-rv style={{ margin: 0 }}>Building intelligent systems that bridge <em>CRM and AI</em>.</h2>
            <p className="kp-p" data-rv>Microsoft Certified (PL-400) Dynamics 365 CE &amp; Power Platform Developer with 2+ years of experience building enterprise CRM solutions across Dataverse, Model-Driven Apps, Power Automate, Power Pages, and custom C# plugins.</p>
            <p className="kp-p" data-rv data-rvd="80">Proven record of automating processes, integrating third-party systems, and shipping scalable solutions for 200+ users. Recently extended into AI by building MCP servers and LLM-powered agents.</p>
            <p className="kp-p" data-rv data-rvd="140">Passionate about creating infrastructure that eliminates friction — I build platforms that let engineers focus on engineering.</p>
            <div data-rv data-rvd="200" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="kp-chip ac">PL-400 CERTIFIED</span>
              <span className="kp-chip">DYNAMICS 365 CE</span>
              <span className="kp-chip">AI AGENTS &amp; MCP</span>
            </div>
          </div>
          <div className="kp-photo" data-rv data-rvd="100">
            <div className="frame">
              <img src={`${IMG}/profile.jpg`} alt="Karan Alwa" />
              <span className="ct" /><span className="cb" />
            </div>
            <div className="cap"><span>KARAN.ALWA — AHMEDABAD, IN</span><span style={{ color: "var(--ac)" }}>FIG. 01</span></div>
          </div>
        </div>
      </section>

      {/* BUILD */}
      <section id="build" className="kp-sec" data-screen-label="Capabilities">
        <div className="kp-label" data-rv><span className="t">/02 — WHAT I BUILD</span><span className="r" /></div>
        <h2 className="kp-h2" data-rv style={{ maxWidth: "18ch" }}>Systems that run the business.</h2>
        <div className="kp-grid4">
          {BUILD.map((b, i) => (
            <div className="kp-cell" data-rv data-rvd={i * 70} key={b.n}>
              <span className="n">{b.n}</span>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
              <div className="tags">{b.tags.map((t) => <span className="kp-tag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="kp-sec" data-screen-label="Stack">
        <div className="kp-label" data-rv><span className="t">/03 — STACK</span><span className="r" /></div>
        <h2 className="kp-h2" data-rv>Skills &amp; technologies.</h2>
        <div className="kp-stack">
          {STACK.map((cat, ci) => (
            <div className="kp-cat" data-rv data-rvd={(ci % 3) * 60} key={cat.title}>
              <h3>{cat.title}</h3>
              {cat.skills.map(([name, tier]) => (
                <div className="kp-sk" key={name}>
                  <div className="r">
                    <span className="nm">{name}</span>
                    <span className="tr" style={{ color: tier === "Expert" ? "var(--ac)" : tier === "Proficient" ? "var(--dim)" : "var(--faint)" }}>{tier.toUpperCase()}</span>
                  </div>
                  <div className="track"><div className={"bar " + (tier === "Expert" ? "e" : tier === "Proficient" ? "p" : "f")} data-pct={TIER[tier]} /></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* WORK — pinned horizontal rail */}
      <section id="work" className="kp-work" data-screen-label="Selected work" ref={workSec}>
        <div className="kp-work-pin">
          <div className="kp-work-head">
            <div className="kp-label" data-rv>
              <span className="t">/04 — SELECTED WORK</span><span className="r" />
              <span className="x" ref={counter}>01 / 07</span>
            </div>
            <h2 className="kp-h2" data-rv style={{ margin: "22px 0 0" }}>Key projects<span style={{ color: "var(--ac)" }}>.</span></h2>
          </div>
          <div style={{ overflow: "clip", width: "100%" }} ref={vp}>
            <div className="kp-track" ref={track}>
              {PROJECTS.map((p) => (
                <article className="kp-proj" key={p.name}>
                  <div className="shot">
                    <img src={p.img} alt={p.name} loading="lazy" />
                    <span className={"badge" + (p.live ? " live" : "")}>{p.live && <span className="d" />}{p.badge}</span>
                  </div>
                  <div className="body">
                    <div className="top">
                      <h3>{p.name}</h3>
                      {p.live
                        ? <a className="arw" href={p.href} target="_blank" rel="noopener noreferrer">↗</a>
                        : <span className="arw">{p.glyph}</span>}
                    </div>
                    <p>{p.desc}</p>
                    <div className="tags">
                      {p.tags.map((t) => <span className="kp-tag" key={t}>{t}</span>)}
                      {p.live && <a className="kp-open" href={p.href} target="_blank" rel="noopener noreferrer">OPEN ↗</a>}
                    </div>
                  </div>
                </article>
              ))}
              <article className="kp-next">
                <span className="k">NEXT PROJECT</span>
                <h3>Could be yours.</h3>
                <a className="kp-btn" style={{ padding: "14px 24px" }} href="#contact" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>GET IN TOUCH →</a>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* PATH */}
      <section id="path" className="kp-sec" data-screen-label="Experience">
        <div className="kp-label" data-rv><span className="t">/05 — PATH</span><span className="r" /></div>
        <h2 className="kp-h2" data-rv>Experience &amp; credentials.</h2>
        <div className="kp-path">
          <div className="kp-tl">
            <span className="base" /><span className="fill" ref={tline} />
            {ROLES.map((r, i) => (
              <div className="kp-role" data-rv data-rvd={i * 60} key={r.title}>
                <span className={"node" + (r.accent ? "" : " dim")} />
                <div className={"per" + (r.accent ? " ac" : "")}>{r.period}</div>
                <h3>{r.title}</h3>
                <div className="org">{r.org}</div>
                <div className="pts">
                  {r.pts.map((pt, j) => (<div className="pt" key={j}><b>▸</b><span>{pt}</span></div>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="kp-cert" data-rv>
              <span className="wm">400</span>
              <div className="k">MICROSOFT CERTIFIED</div>
              <h3>PL-400 · Power Platform Developer Associate</h3>
              <p>Custom development on the Power Platform — plugins, custom APIs, Power Automate and Dataverse.</p>
              <span className="kp-pill"><span className="kp-dot" style={{ width: 5, height: 5 }} />ACTIVE</span>
            </div>
            <div className="kp-edu" data-rv data-rvd="90">
              <div className="k">EDUCATION</div>
              <h3>Master of Computer Applications</h3>
              <p>Bhilai Institute of Technology (BIT), Durg</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <span className="kp-chip">2021 — 2023</span>
                <span className="kp-chip">CGPA 7.5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="kp-contact" data-screen-label="Contact">
        <div className="orb" />
        <div className="in">
          <div className="kp-label" data-rv style={{ width: "100%" }}>
            <span className="r" /><span className="t">/06 — CONTACT</span><span className="r" />
          </div>
          <h2 data-rv>Let's build something<br /><span className="o">extraordinary.</span></h2>
          <p className="kp-p" data-rv data-rvd="60" style={{ maxWidth: 520, textAlign: "center", fontSize: 15.5 }}>Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          <a className="kp-mailbox" data-rv data-rvd="100" href="mailto:karanalwa0@gmail.com">
            <span className="em">karanalwa0@gmail.com</span>
            <span style={{ fontSize: "clamp(22px,3vw,30px)", flexShrink: 0 }}>↗</span>
          </a>
          <div data-rv data-rvd="160" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <a className="kp-soc" href="https://linkedin.com/in/karanalwa" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
            <a className="kp-soc" href="https://github.com/Karanalwa" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
            <a className="kp-soc" href="tel:+919300594844">+91 93005 94844</a>
            <span className="kp-soc ghost">AHMEDABAD · INDIA</span>
          </div>
        </div>
      </section>

      <footer className="kp-foot">
        <span>© {new Date().getFullYear()} KARAN ALWA — ALL RIGHTS RESERVED</span>
        <span style={{ color: "color-mix(in oklab, var(--ac) 70%, #6B7A85)" }}>BUILT TO STAND OUT</span>
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToId("hero"); }}>BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
