import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setPreset } from "@/lib/scene-store";

export function useScenePreset(ref, name, start = "top 55%", end = "bottom 55%") {
  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      onEnter: () => setPreset(name),
      onEnterBack: () => setPreset(name),
    });
    return () => trigger.kill();
  }, [ref, name, start, end]);
}