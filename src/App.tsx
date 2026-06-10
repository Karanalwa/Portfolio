import { useEffect, Suspense } from "react";
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
    const lenis = new Lenis({ lerp: 0.08, duration: 1.2 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
