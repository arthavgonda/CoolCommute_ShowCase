import { ArrowUpRight, Globe, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { testflightUrl, webAppUrl } from "@/data/content";

const options = [
  {
    key: "web",
    icon: Globe,
    title: "Open the web app",
    detail: "Runs in any modern browser. No install or account setup needed.",
    href: webAppUrl,
  },
  {
    key: "ios",
    icon: Smartphone,
    title: "Install on iPhone",
    detail:
      "Join the beta through TestFlight. Requires the free TestFlight app from the App Store.",
    href: testflightUrl,
  },
].filter((option) => option.href);

export default function GetAppDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get CoolCommute</DialogTitle>
          <DialogDescription>Try it in your browser or install it on your phone.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 overflow-y-auto p-7">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <a
                key={option.key}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-5 rounded-xl border bg-card p-5 outline-none transition-[border-color,background-color] duration-300 hover:border-accent/50 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border text-steel transition-colors duration-300 group-hover:text-accent">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <span className="flex-1">
                  <span className="block text-[15px] font-medium tracking-tight">
                    {option.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {option.detail}
                  </span>
                </span>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}