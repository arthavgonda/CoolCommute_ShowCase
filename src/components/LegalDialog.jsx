import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { team } from "@/data/content";

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h4 className="text-sm font-medium tracking-tight text-foreground">{title}</h4>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function Code({ children }) {
  return (
    <code className="rounded-md bg-foreground/10 px-1.5 py-0.5 font-mono text-[12px] text-foreground">
      {children}
    </code>
  );
}

function Privacy() {
  return (
    <>
      <Section title="1. Environmental routing and location data">
        <p>
          CoolCommute requests device location permissions (latitude and longitude) strictly to
          calculate real-time climate exposure routing that minimises your contact with extreme
          urban heat islands and elevated air pollution corridors.
        </p>
        <p>
          Location access is entirely optional. When location permissions are not granted, the
          application provides baseline non-personalised transit recommendations without continuous
          background tracking.
        </p>
      </Section>
      <Section title="2. Profile preferences and sensitivity data">
        <p>
          To personalise your routing experience, CoolCommute stores user-selected preferences
          including:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent">
          <li>
            <Code>airSensitivity</Code> — low, medium, or high pollution vulnerability
          </li>
          <li>
            <Code>heatAvoidance</Code> — heat tolerance and shaded route weighting
          </li>
          <li>
            <Code>tradeoff</Code> — preference for speed, minimal exposure, or balanced transit
          </li>
        </ul>
        <p>
          This data is synced with Amazon API Gateway and protected using Amazon Cognito token
          authentication.
        </p>
      </Section>
      <Section title="3. Account authentication and security">
        <p>
          Authentication is managed via Amazon Cognito User Pools using secure{" "}
          <Code>USER_SRP_AUTH</Code> protocols and verification codes. CoolCommute does not store
          plaintext passwords on client devices.
        </p>
      </Section>
      <Section title="4. Local storage and data deletion">
        <p>
          Profile data is cached on your device for rapid offline access. You retain full control
          over your data and may request remote profile deletion at any time through the app or by
          invoking the <Code>DELETE /profile</Code> endpoint.
        </p>
      </Section>
    </>
  );
}

function Terms() {
  return (
    <>
      <Section title="1. Acceptance of terms">
        <p>
          By accessing or using the CoolCommute application on iOS, Android, or Web, you agree to be
          bound by these Terms of Use and all applicable guidelines.
        </p>
      </Section>
      <Section title="2. Advisory health and climate guidance">
        <p>
          CoolCommute generates suggested transit and walking paths designed to help commuters avoid
          heat stress and elevated air pollution. These routes are advisory estimates generated
          through environmental modelling. Commuters must always prioritise road safety, personal
          judgment, and local traffic directives.
        </p>
      </Section>
      <Section title="3. Permitted platform usage">
        <p>
          CoolCommute is provided for personal, non-commercial use to foster healthier commuter
          habits and reduce private vehicle emissions through public transit adoption. Reverse
          engineering or unauthorised extraction of our API Gateway endpoints is strictly
          prohibited.
        </p>
      </Section>
      <Section title="4. Platform availability">
        <p>
          We strive to provide uninterrupted access across our mobile and web builds (built with
          React Native, Expo, and Skia). However, services may undergo periodic updates or
          maintenance without prior liability.
        </p>
      </Section>
    </>
  );
}

function Team() {
  return (
    <div className="space-y-3">
      {team.map((member) => (
        <div
          key={member.name}
          className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-muted font-mono text-sm text-foreground">
              {member.initials}
            </div>
            <div>
              <div className="text-[15px] font-medium tracking-tight">{member.name}</div>
              <div className="text-[13px] text-muted-foreground">{member.role}</div>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={member.href} target="_blank" rel="noopener noreferrer">
              LinkedIn
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}

const views = {
  privacy: {
    title: "Privacy Policy",
    description: "Last updated October 2026 · CoolCommute",
    body: Privacy,
  },
  terms: {
    title: "Terms of Use",
    description: "Effective October 2026 · CoolCommute Platform",
    body: Terms,
  },
  team: {
    title: "Meet the team",
    description: "The people building climate-conscious commuting.",
    body: Team,
  },
};

export default function LegalDialog({ type, onClose }) {
  const view = type ? views[type] : null;
  const Body = view?.body;

  return (
    <Dialog open={Boolean(type)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {view ? (
          <>
            <DialogHeader>
              <DialogTitle>{view.title}</DialogTitle>
              <DialogDescription>{view.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-7 overflow-y-auto px-7 py-7">
              <Body />
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}