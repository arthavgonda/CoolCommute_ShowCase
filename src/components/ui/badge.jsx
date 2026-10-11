import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground/10 text-foreground",
        outline: "border-input text-muted-foreground",
        accent: "border-accent/40 bg-accent/10 text-accent",
        steel: "border-steel/40 bg-steel/10 text-steel",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}