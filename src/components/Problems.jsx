import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/ui/eyebrow";
import { problems } from "@/data/content";
import { useScenePreset } from "@/hooks/useScenePreset";

gsap.registerPlugin(ScrollTrigger);

export default function Problems() {
  const root = useRef(null);
  const list = useRef(null);
  const line = useRef(null);
  useScenePreset(root, "problem");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray("[data-problem]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          item.querySelector("[data-problem-stat]"),
          { yPercent: 25 },
          {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" ref={root} className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <Eyebrow data-reveal>The problem</Eyebrow>
          <h2
            data-reveal
            className="mt-8 max-w-[14ch] font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.025em]"
          >
            Navigation optimises minutes. Your body feels the rest.
          </h2>
          <p data-reveal className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
            The environmental and health costs of a commute are invisible to conventional routing.
            CoolCommute makes them part of the decision.
          </p>
        </div>

        <div ref={list} className="relative lg:pl-12">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-border lg:block">
            <div ref={line} className="h-full w-px origin-top bg-accent" />
          </div>
          {problems.map((problem) => (
            <article
              key={problem.index}
              data-problem
              className="flex min-h-[62vh] flex-col justify-center gap-10 border-t py-14 first:border-t-0 md:flex-row md:items-end md:justify-between"
            >
              <div className="max-w-md">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {problem.index}
                </div>
                <h3 className="mt-5 font-display text-5xl leading-none tracking-tight md:text-6xl">
                  {problem.title}
                </h3>
                <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
                  {problem.body}
                </p>
              </div>
              <div className="md:text-right">
                <div
                  data-problem-stat
                  className="font-display text-[clamp(4rem,9vw,8rem)] italic leading-none tracking-[-0.03em] text-accent"
                >
                  {problem.stat}
                </div>
                <div className="mt-3 text-[13px] text-muted-foreground">{problem.caption}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}