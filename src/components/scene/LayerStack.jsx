import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Edges, Line } from "@react-three/drei";
import * as THREE from "three";
import { scene, pointer } from "@/lib/scene-store";

const SIZE = 3.4;
const RADIUS = 0.64;
const DEPTH = 0.2;
const TOP = DEPTH / 2 + 0.03;

function createSlabGeometry() {
  const s = SIZE / 2;
  const r = RADIUS;
  const shape = new THREE.Shape();
  shape.moveTo(-s + r, -s);
  shape.lineTo(s - r, -s);
  shape.absarc(s - r, -s + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(s, s - r);
  shape.absarc(s - r, s - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-s + r, s);
  shape.absarc(-s + r, s - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-s, -s + r);
  shape.absarc(-s + r, -s + r, r, Math.PI, Math.PI * 1.5, false);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 4,
    curveSegments: 32,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -DEPTH / 2, 0);
  geometry.computeVertexNormals();
  return geometry;
}

function createRoute() {
  const curve = new THREE.CatmullRomCurve3(
    [
      [-1.25, -1.15],
      [-0.55, -0.85],
      [-0.1, -0.25],
      [0.55, -0.05],
      [0.85, 0.55],
      [1.2, 1.1],
    ].map(([x, z]) => new THREE.Vector3(x, TOP + 0.008, z)),
    false,
    "centripetal",
  );
  return { curve, points: curve.getPoints(90) };
}

function createGrid() {
  const y = TOP + 0.003;
  const lines = [];
  const limit = 1.45;
  for (let i = -3; i <= 3; i += 1) {
    const p = i * 0.46;
    lines.push(-limit, y, p, limit, y, p);
    lines.push(p, y, -limit, p, y, limit);
  }
  return new Float32Array(lines);
}

const layerSpecs = [
  {
    key: "heat",
    color: "#b4573a",
    roughness: 0.42,
    metalness: 0.15,
    opacity: 1,
    edge: "#e08a63",
  },
  {
    key: "air",
    color: "#7f98a3",
    roughness: 0.22,
    metalness: 0.1,
    opacity: 0.88,
    edge: "#b9ccd3",
  },
  {
    key: "transit",
    color: "#e7e2d7",
    roughness: 0.34,
    metalness: 0,
    opacity: 1,
    edge: "#8d8b84",
  },
];

function Route() {
  const { curve, points } = useMemo(createRoute, []);
  const lineRef = useRef(null);
  const markerRef = useRef(null);

  useFrame((state, delta) => {
    const material = lineRef.current?.material;
    if (material) material.dashOffset -= delta * 0.35;
    if (markerRef.current) {
      const t = (state.clock.elapsedTime * 0.07) % 1;
      markerRef.current.position.copy(curve.getPointAt(t));
      markerRef.current.position.y += 0.05;
    }
  });

  const start = points[0];
  const end = points[points.length - 1];

  return (
    <group>
      <Line
        ref={lineRef}
        points={points}
        color="#c9673f"
        lineWidth={2.4}
        dashed
        dashSize={0.14}
        gapSize={0.09}
      />
      <mesh position={[start.x, start.y + 0.03, start.z]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color="#0e0f0f" roughness={0.4} />
      </mesh>
      <mesh position={[end.x, end.y + 0.03, end.z]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#c9673f" emissive="#c9673f" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshBasicMaterial color="#0e0f0f" />
      </mesh>
    </group>
  );
}

export default function LayerStack() {
  const groupRef = useRef(null);
  const layerRefs = useRef([]);
  const heatMaterial = useRef(null);
  const size = useThree((state) => state.size);
  const geometry = useMemo(createSlabGeometry, []);
  const grid = useMemo(createGrid, []);

  useFrame((state, delta) => {
    const current = scene.current;
    const target = scene.target;
    const k = 1 - Math.exp(-delta * 2.6);
    for (const key in target) {
      current[key] += (target[key] - current[key]) * k;
    }

    const pk = 1 - Math.exp(-delta * 4);
    pointer.x += (pointer.tx - pointer.x) * pk;
    pointer.y += (pointer.ty - pointer.y) * pk;

    const wide = size.width >= 1024;
    const group = groupRef.current;
    if (group) {
      const offset = wide ? current.x : 0;
      group.position.set(offset * 0.7071, current.y, -offset * 0.7071);
      group.scale.setScalar(current.scale * (wide ? 1 : 0.78));
      group.rotation.y = current.spin + pointer.x * 0.22 + state.clock.elapsedTime * 0.035;
      group.rotation.x = pointer.y * 0.06;
    }

    const gap = 0.36 + current.explode * 1.5;
    layerRefs.current.forEach((layer, index) => {
      if (layer) layer.position.y = (index - 1) * gap;
    });

    if (heatMaterial.current) {
      heatMaterial.current.emissiveIntensity = 0.08 + current.heat * 0.6;
    }

    const dom = state.gl.domElement.parentElement;
    if (dom) dom.style.opacity = String(Math.min(current.fade, wide ? 1 : 0.4));
  });

  return (
    <group ref={groupRef}>
      {layerSpecs.map((spec, index) => (
        <group
          key={spec.key}
          ref={(node) => {
            layerRefs.current[index] = node;
          }}
        >
          <mesh geometry={geometry}>
            <meshPhysicalMaterial
              ref={spec.key === "heat" ? heatMaterial : undefined}
              color={spec.color}
              roughness={spec.roughness}
              metalness={spec.metalness}
              transparent={spec.opacity < 1}
              opacity={spec.opacity}
              clearcoat={0.5}
              clearcoatRoughness={0.3}
              emissive={spec.key === "heat" ? "#c9673f" : "#000000"}
              emissiveIntensity={spec.key === "heat" ? 0.1 : 0}
            />
            <Edges threshold={20} color={spec.edge} />
          </mesh>
          {spec.key === "transit" ? (
            <>
              <lineSegments>
                <bufferGeometry>
                  <bufferAttribute attach="attributes-position" args={[grid, 3]} />
                </bufferGeometry>
                <lineBasicMaterial color="#8d8b84" transparent opacity={0.35} />
              </lineSegments>
              <Route />
            </>
          ) : null}
        </group>
      ))}
    </group>
  );
}