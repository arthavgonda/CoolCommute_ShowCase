import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useScenePreset } from "@/hooks/useScenePreset";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const root = useRef(null);
  const frame = useRef(null);
  useScenePreset(root, "showcase");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { scale: 0.86, borderRadius: 48 },
        {
          scale: 1,
          borderRadius: 20,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top 95%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={root}
      className="relative z-10 px-6 pb-32 pt-32 md:px-12 md:pb-44 md:pt-44"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Eyebrow data-reveal>Showcase</Eyebrow>
            <h2
              data-reveal
              className="mt-8 font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.025em]"
            >
              See it in motion.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Real-time climate exposure routing and profile sync, walked through end to end.
          </p>
        </div>

        <div
          ref={frame}
          className="mt-16 overflow-hidden rounded-[20px] border bg-black shadow-2xl shadow-black/60 will-change-transform"
        >
          <video
            className="block max-h-[640px] w-full object-contain"
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="metadata"
          >
            <source src="/CommuteVedio/commute.mov" type="video/quicktime" />
            <source src="/CommuteVedio/commute.mp4" type="video/mp4" />
            <source
              src="/CommuteVedio/WhatsApp Video 2026-10-11 at 01.15.43.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div
          data-reveal
          className="mt-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline"
        >
          <h3 className="font-display text-2xl tracking-tight">CoolCommute Showcase 2026</h3>
          <p className="text-sm text-muted-foreground">
            Smart real-time climate exposure routing and sync walkthrough
          </p>
        </div>
      </div>
    </section>
  );
}