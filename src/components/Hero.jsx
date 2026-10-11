import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { heroStats } from "@/data/content";
import { scrollToTarget } from "@/lib/scroll";
import { useScenePreset } from "@/hooks/useScenePreset";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: "Routes that", italic: false },
  { text: "keep you", italic: false },
  { text: "cool.", italic: true },
];

export default function Hero({ onGet }) {
  const root = useRef(null);
  useScenePreset(root, "hero", "top 80%", "bottom 55%");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.2 });
      timeline
        .from("[data-hero-line]", { yPercent: 118, duration: 1.5, stagger: 0.12 })
        .from("[data-hero-fade]", { opacity: 0, y: 22, duration: 1.2, stagger: 0.1 }, "-=1");

      gsap.to("[data-hero-content]", {
        yPercent: -10,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative z-10 flex min-h-svh flex-col justify-between px-6 pb-10 pt-32 md:px-12"
    >
      <div
        data-hero-content
        className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center"
      >
        <Eyebrow data-hero-fade>Climate-aware routing</Eyebrow>
        <h1 className="mt-8 font-display text-[clamp(3.6rem,10.5vw,10.5rem)] leading-[0.9] tracking-[-0.03em]">
          {lines.map((line) => (
            <span key={line.text} className="block overflow-hidden pb-[0.08em]">
              <span
                data-hero-line
                className={line.italic ? "block italic text-accent" : "block text-foreground"}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-hero-fade
          className="mt-10 max-w-md text-[17px] leading-relaxed text-muted-foreground"
        >
          CoolCommute plans commutes around urban heat islands and polluted corridors, and nudges
          you toward public transit, tuned to how you actually travel.
        </p>
        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
          <Button size="lg" variant="accent" onClick={onGet}>
            Get the app
            <ArrowRight />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToTarget("#showcase")}>
            Watch the demo
          </Button>
        </div>
      </div>

      <div
        data-hero-fade
        className="mx-auto mt-16 grid w-full max-w-[1400px] grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3"
      >
        {heroStats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-4">
            <span className="font-display text-4xl leading-none tracking-tight">{stat.value}</span>
            <span className="max-w-[16ch] text-[13px] leading-snug text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}