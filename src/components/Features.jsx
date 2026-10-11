import { useRef } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { features } from "@/data/content";
import { useScenePreset } from "@/hooks/useScenePreset";

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Card
      data-reveal
      onPointerMove={onMove}
      className="spotlight group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-none border-0 bg-background/60 backdrop-blur-sm transition-colors duration-500 hover:bg-card/80"
    >
      <CardHeader className="gap-0 p-7">
        <Icon
          className="size-6 text-steel transition-colors duration-500 group-hover:text-accent"
          strokeWidth={1.4}
        />
      </CardHeader>
      <div className="p-7 pt-0">
        <CardTitle className="font-display text-3xl font-normal leading-none tracking-tight">
          {feature.title}
        </CardTitle>
        <CardDescription className="mt-4 max-w-[28ch]">{feature.body}</CardDescription>
      </div>
    </Card>
  );
}

export default function Features() {
  const root = useRef(null);
  useScenePreset(root, "features");

  return (
    <section id="features" ref={root} className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Eyebrow data-reveal>Features</Eyebrow>
            <h2
              data-reveal
              className="mt-8 max-w-[16ch] font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.025em]"
            >
              Everything a healthier commute needs.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Plug-and-play building blocks for routing, identity and sync, designed to be extended
            when your own requirements go further.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}