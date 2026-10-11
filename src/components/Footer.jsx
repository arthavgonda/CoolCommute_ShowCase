import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { testflightUrl, webAppUrl } from "@/data/content";
import { scrollToTarget } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const explore = [
  { label: "Features", href: "#features" },
  { label: "Tech stack", href: "#tech" },
  { label: "Showcase", href: "#showcase" },
  { label: "Problem", href: "#problem" },
];

const linkClass =
  "group inline-flex items-center gap-1.5 text-[15px] text-[#0e0f0f] transition-opacity hover:opacity-60";

export default function Footer({ onOpen }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-wordmark]", {
        yPercent: 70,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={root}
      className="relative z-10 overflow-hidden bg-[#ebe7de] px-6 pt-24 text-[#0e0f0f] md:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-16 md:flex-row">
          <div className="max-w-md">
            <h2 className="font-display text-5xl leading-none tracking-tight">CoolCommute</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[#0e0f0f]/65">
              A climate-aware routing app built with Expo, React Native and AWS to help commuters
              avoid heat and pollution while encouraging green public transit.
            </p>
          </div>

          <div className="flex gap-20 md:gap-28">
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0e0f0f]/55">
                Explore
              </span>
              <ul className="flex flex-col gap-3.5">
                {explore.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={linkClass}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToTarget(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:contact@coolcommute.org" className={linkClass}>
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0e0f0f]/55">
                Connect
              </span>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a
                    href={webAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Web app
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
                {testflightUrl ? (
                  <li>
                    <a
                      href={testflightUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      TestFlight
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </li>
                ) : null}
                <li>
                  <button type="button" className={linkClass} onClick={() => onOpen("team")}>
                    Meet the team
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[#0e0f0f]/15 pt-6 text-[13px] text-[#0e0f0f]/60 sm:flex-row">
          <span>© 2026 CoolCommute. All rights reserved.</span>
          <div className="flex gap-6">
            <button
              type="button"
              className="transition-colors hover:text-[#0e0f0f]"
              onClick={() => onOpen("privacy")}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="transition-colors hover:text-[#0e0f0f]"
              onClick={() => onOpen("terms")}
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        data-wordmark
        className="pointer-events-none mt-10 select-none text-center font-display text-[clamp(4rem,19vw,19rem)] leading-[0.78] tracking-[-0.04em] text-[#0e0f0f]"
      >
        CoolCommute
      </div>
    </footer>
  );
}