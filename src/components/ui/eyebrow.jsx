import { cn } from "@/lib/utils";

export function Eyebrow({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span className="size-1.5 bg-accent" />
      {children}
    </div>
  );
}