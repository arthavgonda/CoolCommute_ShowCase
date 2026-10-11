import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { authSteps, profileExample, stack } from "@/data/content";
import { useScenePreset } from "@/hooks/useScenePreset";

const tokenPattern = /("(?:[^"\\]|\\.)*"\s*:?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?)/g;

function Json({ code }) {
  return code.split(tokenPattern).map((token, index) => {
    if (!token) return null;
    if (/^".*"\s*:$/.test(token)) {
      return (
        <span key={index} className="text-steel">
          {token}
        </span>
      );
    }
    if (token.startsWith('"')) {
      return (
        <span key={index} className="text-accent">
          {token}
        </span>
      );
    }
    if (/^(true|false|null|-?\d)/.test(token)) {
      return (
        <span key={index} className="text-foreground">
          {token}
        </span>
      );
    }
    return token;
  });
}

export default function TechSection() {
  const root = useRef(null);
  useScenePreset(root, "stack");

  return (
    <section id="tech" ref={root} className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <div className="lg:order-2">
          <Eyebrow data-reveal>Under the hood</Eyebrow>
          <h2
            data-reveal
            className="mt-8 max-w-[14ch] font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.025em]"
          >
            Modern tools for modern problems.
          </h2>
          <p data-reveal className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
            A React Native client, Cognito for identity, and API Gateway for profile sync, assembled
            for a fast, secure, native-feeling product.
          </p>
        </div>

        <div data-reveal className="lg:order-1">
          <Tabs defaultValue="stack">
            <TabsList className="w-full">
              <TabsTrigger value="stack">Stack</TabsTrigger>
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="stack" className="pt-2">
              <ul className="divide-y">
                {stack.map((item, index) => (
                  <li
                    key={item.name}
                    className="group flex items-baseline justify-between gap-6 py-6 transition-colors"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-3xl leading-none tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:text-4xl">
                        {item.name}
                      </span>
                    </div>
                    <span className="hidden text-right text-sm text-muted-foreground sm:block">
                      {item.role}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="auth" className="pt-8">
              <ol className="space-y-8">
                {authSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-6">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs text-muted-foreground">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-medium tracking-tight">{step.title}</h3>
                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </TabsContent>

            <TabsContent value="profile" className="pt-8">
              <div className="overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span>profile.json</span>
                  <span>Synced</span>
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-muted-foreground">
                  <code>
                    <Json code={profileExample} />
                  </code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}