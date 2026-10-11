import { Suspense, lazy, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Process from "@/components/Process";
import Features from "@/components/Features";
import TechSection from "@/components/TechSection";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";
import LegalDialog from "@/components/LegalDialog";
import { startScroll, stopScroll } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const Scene = lazy(() => import("@/components/scene/Scene"));

export default function Mentor() {
  const [dialog, setDialog] = useState(null);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMotionOk(false);
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add("js-motion");
    startScroll();

    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.09,
            overwrite: true,
          }),
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      stopScroll();
      root.classList.remove("js-motion");
    };
  }, []);

  return (
    <div className="relative bg-background text-foreground">
      {motionOk ? (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      ) : null}
      <Nav />
      <main className="relative">
        <Hero />
        <Problems />
        <Process />
        <Features />
        <TechSection />
        <Showcase />
      </main>
      <Footer onOpen={setDialog} />
      <LegalDialog type={dialog} onClose={() => setDialog(null)} />
    </div>
  );
}