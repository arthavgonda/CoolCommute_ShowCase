import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { steps } from "@/data/content";
import { useScenePreset } from "@/hooks/useScenePreset";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const root = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => track.current.scrollWidth - window.innerWidth;

      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(bar.current, { scaleX: self.progress });
            setActive(Math.min(steps.length - 1, Math.round(self.progress * (steps.length - 1))));
          },
        },
      });

      gsap.to("[data-process-card]", {
        x: -110,
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
        },
      });

      gsap.to("[data-process-index]", {
        x: 140,
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
        },
      });
    });
    return () => mm.revert();
  }, []);

  useScenePreset(root, "process");

  return (
    <section id="process" ref={root} className="relative z-10">
      <div ref={pin} className="relative overflow-hidden lg:h-svh">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-12 pt-28 lg:flex">
          <Eyebrow>How it works</Eyebrow>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </div>
        </div>

        <div ref={track} className="flex flex-col lg:h-full lg:w-max lg:flex-row">
          {steps.map((step) => (
            <article
              key={step.index}
              className="relative flex w-full flex-col justify-center gap-12 px-6 py-24 md:px-12 lg:h-full lg:w-screen lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:px-24 lg:py-0"
            >
              <div
                data-process-index
                className="text-outline pointer-events-none absolute -top-2 left-4 select-none font-display text-[clamp(10rem,24vw,26rem)] leading-none lg:left-16 lg:top-auto lg:bottom-[-0.12em]"
              >
                {step.index}
              </div>

              <div className="relative max-w-xl lg:max-w-[34rem]">
                <Badge variant="accent">{step.label}</Badge>
                <h3 className="mt-8 font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] tracking-[-0.025em]">
                  {step.title}
                </h3>
                <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>

              <Card
                data-process-card
                className="relative w-full max-w-md shrink-0 bg-card/80 backdrop-blur-md lg:max-w-[26rem]"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{step.label}</span>
                    <span>{step.index}</span>
                  </div>
                  <dl className="divide-y">
                    {step.rows.map(([key, value]) => (
                      <div
                        key={key + value}
                        className="flex items-baseline justify-between gap-6 px-6 py-4"
                      >
                        <dt className="font-mono text-[12px] text-muted-foreground">{key}</dt>
                        <dd className="text-right text-sm text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 hidden h-px bg-border lg:block">
          <div
            ref={bar}
            style={{ transform: "scaleX(0)" }}
            className="h-px origin-left bg-accent"
          />
        </div>
      </div>
    </section>
  );
}