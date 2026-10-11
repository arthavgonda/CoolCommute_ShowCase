import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/content";
import { scrollToTarget } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function Nav({ onGet }) {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(null);
  const bar = useRef(null);

  useEffect(() => {
    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(bar.current, { scaleX: self.progress });
        setSolid(self.scroll() > 48);
      },
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      progress.kill();
      observer.disconnect();
    };
  }, []);

  const go = (event, href) => {
    event.preventDefault();
    scrollToTarget(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        solid
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            scrollToTarget(0);
          }}
          className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight"
        >
          <svg viewBox="0 0 32 32" className="size-6" fill="none" aria-hidden="true">
            <path d="M16 6.5 25.5 11.5 16 16.5 6.5 11.5 16 6.5Z" fill="#ebe7de" />
            <path
              d="M6.5 16 16 21 25.5 16"
              stroke="#8ea3ab"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 20.5 16 25.5 25.5 20.5"
              stroke="#c9673f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          CoolCommute
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => go(event, link.href)}
              className={cn(
                "text-[13px] transition-colors duration-300",
                active === link.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button size="sm" variant="outline" onClick={onGet}>
          Get CoolCommute
        </Button>
      </div>
      <div
        ref={bar}
        style={{ transform: "scaleX(0)" }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
      />
    </header>
  );
}