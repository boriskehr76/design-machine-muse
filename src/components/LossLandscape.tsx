import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Loss landscape with a ball performing gradient descent on a sum-of-gaussians surface.
 * Decorative; sits behind the hero text.
 */

// Gaussian "wells" defining the loss surface. (cx, cy, amplitude, sigma)
// Negative amplitude = valley, positive = peak.
const WELLS: Array<[number, number, number, number]> = [
  [-2.2, -1.4, -2.6, 1.5],
  [2.0, 1.6, -2.2, 1.4],
  [-1.6, 2.4, -1.8, 1.2],
  [2.6, -2.2, -1.4, 1.1],
  [0.0, 0.0, 1.6, 1.8],
  [-3.2, 2.0, 1.2, 1.3],
  [3.0, -0.5, 1.0, 1.2],
];

const SIZE = 10; // world units, plane spans -SIZE/2..SIZE/2 in x and z
const SEGMENTS = 90;

function loss(x: number, y: number) {
  let z = 0;
  for (const [cx, cy, a, s] of WELLS) {
    const dx = x - cx;
    const dy = y - cy;
    z += a * Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
  }
  return z;
}

function gradient(x: number, y: number) {
  let gx = 0;
  let gy = 0;
  for (const [cx, cy, a, s] of WELLS) {
    const dx = x - cx;
    const dy = y - cy;
    const e = a * Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
    gx += e * (-dx / (s * s));
    gy += e * (-dy / (s * s));
  }
  return [gx, gy] as const;
}

// Color stops in HSL.
const C_LOW = new THREE.Color("hsl(178, 70%, 55%)"); // teal (accent)
const C_MID = new THREE.Color("hsl(262, 70%, 60%)"); // violet
const C_HIGH = new THREE.Color("hsl(18, 85%, 62%)"); // warm

function heightColor(t: number, out: THREE.Color) {
  // t in 0..1; blend low->mid->high
  if (t < 0.5) {
    out.copy(C_LOW).lerp(C_MID, t * 2);
  } else {
    out.copy(C_MID).lerp(C_HIGH, (t - 0.5) * 2);
  }
  return out;
}

function Surface() {
  const { geometry, wireGeometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    geo.rotateX(-Math.PI / 2); // lay flat in XZ plane
    const pos = geo.attributes.position as THREE.BufferAttribute;
    let zMin = Infinity;
    let zMax = -Infinity;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = loss(x, z);
      pos.setY(i, y);
      if (y < zMin) zMin = y;
      if (y > zMax) zMax = y;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    // Vertex colors based on height
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = (y - zMin) / (zMax - zMin || 1);
      heightColor(t, c);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const wire = new THREE.WireframeGeometry(geo);
    return { geometry: geo, wireGeometry: wire, zMin, zMax };
  }, []);

  return (
    <group>
      <mesh geometry={geometry} castShadow={false} receiveShadow={false}>
        <meshStandardMaterial
          vertexColors
          metalness={0.1}
          roughness={0.85}
          transparent
          opacity={0.55}
          emissive={C_LOW}
          emissiveIntensity={0.08}
        />
      </mesh>
      <lineSegments geometry={wireGeometry}>
        <lineBasicMaterial color={C_LOW} transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

const TRAIL_LEN = 60;

function Ball({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const stateRef = useRef({
    x: 3.2,
    y: 2.6,
    vx: 0,
    vy: 0,
    settledFrames: 0,
    fade: 0, // 0..1 visibility
    fadingOut: false,
  });
  const trailRef = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL_LEN }, () => new THREE.Vector3(3.2, 0, 2.6)),
  );
  const [, force] = useState(0);

  const respawn = () => {
    const s = stateRef.current;
    // Pick a high-ish point
    let best = { x: 0, y: 0, z: -Infinity };
    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * (SIZE - 2);
      const y = (Math.random() - 0.5) * (SIZE - 2);
      const z = loss(x, y);
      if (z > best.z) best = { x, y, z };
    }
    s.x = best.x;
    s.y = best.y;
    s.vx = 0;
    s.vy = 0;
    s.settledFrames = 0;
    s.fadingOut = false;
    s.fade = 0;
    // reset trail
    for (const v of trailRef.current) v.set(s.x, loss(s.x, s.y) + 0.18, s.y);
  };

  useEffect(() => {
    respawn();
  }, []);

  useFrame((_, delta) => {
    const s = stateRef.current;
    const dt = Math.min(delta, 1 / 30);

    if (!reduced) {
      if (s.fadingOut) {
        s.fade = Math.max(0, s.fade - dt * 1.6);
        if (s.fade <= 0) respawn();
      } else {
        s.fade = Math.min(1, s.fade + dt * 1.6);
        // Gradient descent step
        const lr = 0.9;
        const friction = 0.86;
        const [gx, gy] = gradient(s.x, s.y);
        s.vx = s.vx * friction - lr * gx * dt;
        s.vy = s.vy * friction - lr * gy * dt;
        s.x += s.vx * dt * 3;
        s.y += s.vy * dt * 3;
        // Clamp to plane bounds
        const lim = SIZE / 2 - 0.3;
        if (s.x > lim) { s.x = lim; s.vx = -s.vx * 0.4; }
        if (s.x < -lim) { s.x = -lim; s.vx = -s.vx * 0.4; }
        if (s.y > lim) { s.y = lim; s.vy = -s.vy * 0.4; }
        if (s.y < -lim) { s.y = -lim; s.vy = -s.vy * 0.4; }

        const speed = Math.hypot(s.vx, s.vy);
        if (speed < 0.04) {
          s.settledFrames += 1;
          if (s.settledFrames > 90) s.fadingOut = true;
        } else {
          s.settledFrames = 0;
        }
      }
    }

    const z = loss(s.x, s.y);
    if (meshRef.current) {
      meshRef.current.position.set(s.x, z + 0.18, s.y);
      const m = meshRef.current.material as THREE.MeshStandardMaterial;
      m.opacity = s.fade;
      m.emissiveIntensity = 1.2 * s.fade;
    }

    // Update trail
    const trail = trailRef.current;
    for (let i = trail.length - 1; i > 0; i--) trail[i].copy(trail[i - 1]);
    trail[0].set(s.x, z + 0.18, s.y);
    force((n) => (n + 1) % 1000000);
  });

  const trailPoints = trailRef.current.map((v) => [v.x, v.y, v.z] as [number, number, number]);
  const fade = stateRef.current.fade;

  return (
    <group>
      <Line
        points={trailPoints}
        color={C_HIGH}
        lineWidth={2}
        transparent
        opacity={0.55 * fade}
      />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={C_HIGH}
          emissive={C_HIGH}
          emissiveIntensity={1.2}
          transparent
          opacity={1}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      {/* Halo light following the ball */}
      <pointLight
        position={meshRef.current ? meshRef.current.position.toArray() : [0, 2, 0]}
        color={C_HIGH}
        intensity={1.2 * fade}
        distance={4}
      />
    </group>
  );
}

function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  const t = useRef(0);
  useFrame((_, delta) => {
    if (reduced) return;
    t.current += delta * 0.08;
    const r = 9.5;
    const yaw = Math.sin(t.current) * 0.35; // gentle sway
    camera.position.x = Math.sin(yaw) * r;
    camera.position.z = Math.cos(yaw) * r;
    camera.position.y = 5.2 + Math.sin(t.current * 0.7) * 0.2;
    camera.lookAt(0, -0.4, 0);
  });
  return null;
}

export function LossLandscape() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = () => setReduced(m.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 5.2, 9.5], fov: 45 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 4]} intensity={0.9} color={"#ffffff"} />
        <directionalLight position={[-5, 4, -3]} intensity={0.4} color={"hsl(262, 70%, 70%)"} />
        <Surface />
        <Ball reduced={reduced} />
        <CameraRig reduced={reduced} />
      </Canvas>
      {/* Overlay to keep hero text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
    </div>
  );
}
