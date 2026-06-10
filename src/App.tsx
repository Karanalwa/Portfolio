import { useEffect, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { ThemeProvider } from "./context/ThemeContext";
import ThreeScene from "./components/ThreeScene";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Respect the user's "reduce motion" OS setting: skip smooth (inertia) scroll.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.08, duration: 1.2 });
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(update); lenis.destroy(); };
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }} className="cursor-default md:cursor-none">
          {/* 3D Background Scene */}
          <Suspense fallback={null}>
            <ThreeScene />
          </Suspense>

          {/* Custom Cursor */}
          <CustomCursor />

          {/* Page Content */}
          <div className="relative" style={{ zIndex: 10 }}>
            <Navigation />
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </div>
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
