import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import LayerStack from "@/components/scene/LayerStack";
import { pointer } from "@/lib/scene-store";

export default function Scene() {
  useEffect(() => {
    const onMove = (event) => {
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 transition-none">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [8.5, 7, 8.5], fov: 26, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 8, 4]} intensity={2.1} color="#fff1e0" />
        <directionalLight position={[-6, 3, -4]} intensity={0.9} color="#9fb6c0" />
        <Environment resolution={256} frames={1}>
          <Lightformer
            form="rect"
            intensity={2.4}
            color="#fff4e6"
            position={[0, 6, -4]}
            scale={[12, 6, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#9fb6c0"
            position={[-6, 2, 3]}
            rotation-y={Math.PI / 2}
            scale={[8, 4, 1]}
          />
          <Lightformer form="ring" intensity={1.2} color="#c9673f" position={[5, 1, 5]} scale={5} />
        </Environment>
        <LayerStack />
        <Sparkles
          count={36}
          scale={[9, 6, 9]}
          size={1.6}
          speed={0.18}
          opacity={0.45}
          color="#8ea3ab"
        />
      </Canvas>
    </div>
  );
}