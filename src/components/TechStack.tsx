import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";

const textureLoader = new THREE.TextureLoader();

const loadTexture = (path: string) => {
  const tex = textureLoader.load(path);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

const sharedSphereGeometry = new THREE.SphereGeometry(1, 32, 32);

interface SphereConfig {
  name: string;
  image: string;
  anchor: [number, number, number];
  scale: number;
  mass: number;
  floatSpeed: number;
  floatAmp: [number, number, number];
  phase: number;
  rotSpeed: [number, number];
}

const SPHERES_DATA: SphereConfig[] = [
  // Core Hero Spheres (Foreground Focus - Bhavishay's key skills)
  {
    name: "Python",
    image: "/images/python.png",
    anchor: [-2.2, 0.4, 1.2],
    scale: 0.98,
    mass: 1.15,
    floatSpeed: 1.1,
    floatAmp: [0.15, 0.25, 0.1],
    phase: 0.0,
    rotSpeed: [0.12, 0.18],
  },
  {
    name: "Java",
    image: "/images/java.png",
    anchor: [2.2, 0.5, 1.1],
    scale: 0.98,
    mass: 1.15,
    floatSpeed: 1.05,
    floatAmp: [0.14, 0.24, 0.12],
    phase: 1.8,
    rotSpeed: [0.1, -0.16],
  },
  {
    name: "HTML5",
    image: "/images/html5.png",
    anchor: [-4.2, -0.8, 0.4],
    scale: 0.88,
    mass: 1.1,
    floatSpeed: 1.2,
    floatAmp: [0.14, 0.22, 0.1],
    phase: 3.2,
    rotSpeed: [0.14, 0.12],
  },
  {
    name: "CSS3",
    image: "/images/css3.png",
    anchor: [4.2, -0.7, 0.4],
    scale: 0.88,
    mass: 1.1,
    floatSpeed: 1.15,
    floatAmp: [0.14, 0.22, 0.12],
    phase: 4.5,
    rotSpeed: [-0.12, 0.15],
  },
  {
    name: "React",
    image: "/images/react2.webp",
    anchor: [0.0, 1.9, 0.6],
    scale: 0.9,
    mass: 1.12,
    floatSpeed: 1.0,
    floatAmp: [0.12, 0.2, 0.08],
    phase: 0.8,
    rotSpeed: [0.08, 0.2],
  },
  {
    name: "JavaScript",
    image: "/images/javascript.webp",
    anchor: [0.1, -1.8, 0.7],
    scale: 0.86,
    mass: 1.05,
    floatSpeed: 1.25,
    floatAmp: [0.14, 0.22, 0.1],
    phase: 2.4,
    rotSpeed: [0.12, -0.14],
  },
  {
    name: "TypeScript",
    image: "/images/typescript.webp",
    anchor: [-3.6, 1.7, -0.4],
    scale: 0.8,
    mass: 1.0,
    floatSpeed: 0.95,
    floatAmp: [0.12, 0.18, 0.08],
    phase: 5.1,
    rotSpeed: [-0.1, 0.14],
  },
  {
    name: "MySQL",
    image: "/images/mysql.webp",
    anchor: [3.6, 1.7, -0.3],
    scale: 0.8,
    mass: 1.0,
    floatSpeed: 1.1,
    floatAmp: [0.12, 0.2, 0.08],
    phase: 1.1,
    rotSpeed: [0.12, -0.12],
  },
  {
    name: "Node.js",
    image: "/images/node2.webp",
    anchor: [-1.9, -1.9, -0.3],
    scale: 0.78,
    mass: 0.95,
    floatSpeed: 1.12,
    floatAmp: [0.1, 0.18, 0.08],
    phase: 3.8,
    rotSpeed: [0.1, 0.12],
  },

  // Depth Companion Spheres (Cinematic 3D Layering)
  {
    name: "Python",
    image: "/images/python.png",
    anchor: [1.8, -1.8, -1.2],
    scale: 0.65,
    mass: 0.85,
    floatSpeed: 0.9,
    floatAmp: [0.08, 0.16, 0.06],
    phase: 2.1,
    rotSpeed: [-0.08, 0.1],
  },
  {
    name: "Java",
    image: "/images/java.png",
    anchor: [-1.2, 2.3, -1.4],
    scale: 0.65,
    mass: 0.85,
    floatSpeed: 0.92,
    floatAmp: [0.08, 0.16, 0.06],
    phase: 4.0,
    rotSpeed: [0.08, -0.1],
  },
  {
    name: "HTML5",
    image: "/images/html5.png",
    anchor: [3.2, 0.1, -1.5],
    scale: 0.6,
    mass: 0.8,
    floatSpeed: 0.98,
    floatAmp: [0.08, 0.14, 0.06],
    phase: 0.5,
    rotSpeed: [0.06, 0.14],
  },
  {
    name: "CSS3",
    image: "/images/css3.png",
    anchor: [-3.2, 0.0, -1.5],
    scale: 0.6,
    mass: 0.8,
    floatSpeed: 1.0,
    floatAmp: [0.08, 0.14, 0.06],
    phase: 3.0,
    rotSpeed: [-0.06, 0.12],
  },
  {
    name: "React",
    image: "/images/react2.webp",
    anchor: [-5.0, 0.7, -2.0],
    scale: 0.54,
    mass: 0.75,
    floatSpeed: 0.85,
    floatAmp: [0.06, 0.12, 0.05],
    phase: 1.5,
    rotSpeed: [0.05, -0.08],
  },
  {
    name: "JavaScript",
    image: "/images/javascript.webp",
    anchor: [5.0, 0.6, -2.0],
    scale: 0.54,
    mass: 0.75,
    floatSpeed: 0.86,
    floatAmp: [0.06, 0.12, 0.05],
    phase: 4.8,
    rotSpeed: [-0.05, 0.08],
  },
  {
    name: "TypeScript",
    image: "/images/typescript.webp",
    anchor: [0.2, -0.2, -1.8],
    scale: 0.56,
    mass: 0.78,
    floatSpeed: 0.82,
    floatAmp: [0.06, 0.12, 0.05],
    phase: 2.7,
    rotSpeed: [0.06, 0.06],
  },
];

const checkWebGLSupported = () => {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

interface ParticleState {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  force: THREE.Vector3;
  rot: THREE.Euler;
  home: THREE.Vector3;
  scale: number;
  radius: number;
  mass: number;
  phase: number;
  floatSpeed: number;
  floatAmp: [number, number, number];
  baseRotSpeed: [number, number];
}

interface PointerCoords {
  x: number;
  y: number;
  active: boolean;
}

function ConstellationScene({
  reducedMotion,
  isActive,
  pointerCoordsRef,
  texturesMap,
}: {
  reducedMotion: boolean;
  isActive: boolean;
  pointerCoordsRef: React.MutableRefObject<PointerCoords>;
  texturesMap: Record<string, THREE.Texture>;
}) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Pre-instantiate shared physical materials once
  const materialsMap = useMemo(() => {
    const map: Record<string, THREE.MeshPhysicalMaterial> = {};
    const uniqueImages = Array.from(new Set(SPHERES_DATA.map((s) => s.image)));
    uniqueImages.forEach((img) => {
      const tex = texturesMap[img];
      map[img] = new THREE.MeshPhysicalMaterial({
        map: tex,
        emissive: "#ffffff",
        emissiveMap: tex,
        emissiveIntensity: 0.26,
        metalness: 0.42,
        roughness: 0.36,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
      });
    });
    return map;
  }, [texturesMap]);

  // Persistent physics particle states in ref (0 React state updates in physics loop)
  const particlesRef = useRef<ParticleState[]>([]);

  if (particlesRef.current.length === 0) {
    particlesRef.current = SPHERES_DATA.map((data) => ({
      pos: new THREE.Vector3(...data.anchor),
      vel: new THREE.Vector3(0, 0, 0),
      force: new THREE.Vector3(0, 0, 0),
      rot: new THREE.Euler(0, 0, 0),
      home: new THREE.Vector3(...data.anchor),
      scale: data.scale,
      radius: data.scale * 1.05,
      mass: data.mass,
      phase: data.phase,
      floatSpeed: data.floatSpeed,
      floatAmp: data.floatAmp,
      baseRotSpeed: data.rotSpeed,
    }));
  }

  // Smooth cursor position in 3D world space
  const cursorWorld = useRef(new THREE.Vector3(999, 999, 0));

  useFrame((state, delta) => {
    if (!isActive) return;

    // Viewport responsiveness factors
    const widthRatio = state.viewport.width / 17;
    const coordFactor = Math.min(1.0, Math.max(0.48, widthRatio));
    const sizeFactor = Math.min(1.0, Math.max(0.58, widthRatio * 0.94));

    // Clamp delta time to avoid large physics leaps
    const dt = Math.min(delta, 0.033);

    // Track 3D cursor position from window pointer events
    const pointer = pointerCoordsRef.current;
    if (pointer.active && !reducedMotion) {
      const targetCursorX = pointer.x * (state.viewport.width * 0.5);
      const targetCursorY = pointer.y * (state.viewport.height * 0.5);

      if (cursorWorld.current.x > 900) {
        cursorWorld.current.set(targetCursorX, targetCursorY, 0);
      } else {
        cursorWorld.current.x = THREE.MathUtils.lerp(cursorWorld.current.x, targetCursorX, 0.4);
        cursorWorld.current.y = THREE.MathUtils.lerp(cursorWorld.current.y, targetCursorY, 0.4);
        cursorWorld.current.z = 0;
      }
    } else {
      // When cursor is outside or inactive, smoothly move force field away
      cursorWorld.current.x = THREE.MathUtils.lerp(cursorWorld.current.x, 999, 0.2);
      cursorWorld.current.y = THREE.MathUtils.lerp(cursorWorld.current.y, 999, 0.2);
    }

    const particles = particlesRef.current;
    const numParticles = particles.length;

    // Boundary limits (safe zone inside container)
    const boundsX = state.viewport.width * 0.43;
    const boundsY = state.viewport.height * 0.40;
    const boundsZ = 2.4;
    const boundaryMargin = 0.65;

    // 1. Calculate Forces for every particle
    for (let i = 0; i < numParticles; i++) {
      const p = particles[i];

      // A. Natural ambient floating around the resting equilibrium position
      const t = state.clock.getElapsedTime() * (reducedMotion ? 0.2 : p.floatSpeed);
      const amp = (reducedMotion ? 0.25 : 1.0) * sizeFactor;
      const ambX = Math.sin(t + p.phase) * p.floatAmp[0] * amp;
      const ambY = Math.cos(t * 0.88 + p.phase * 1.15) * p.floatAmp[1] * amp;
      const ambZ = Math.sin(t * 0.72 + p.phase * 0.85) * p.floatAmp[2] * amp;

      // Resting equilibrium position in the connected cluster
      const restX = p.home.x * coordFactor + ambX;
      const restY = p.home.y * Math.min(1.0, Math.max(0.72, coordFactor * 1.1)) + ambY;
      const restZ = p.home.z + ambZ;

      // Elastic Hooke's restoring spring: gradually and elastically pulls the ball back to rest
      const kReturn = 15.0;
      p.force.x += (restX - p.pos.x) * kReturn;
      p.force.y += (restY - p.pos.y) * kReturn;
      p.force.z += (restZ - p.pos.z) * kReturn;

      // B. Invisible Cursor Force Field (Smooth, distinct localized repulsion)
      if (cursorWorld.current.x < 900) {
        let dx = p.pos.x - cursorWorld.current.x;
        let dy = p.pos.y - cursorWorld.current.y;
        let dist2D = Math.hypot(dx, dy);

        // Interaction radius around this specific ball
        const ballRadius = p.radius * sizeFactor;
        const interactionRadius = Math.max(2.6, (ballRadius + 1.8) * coordFactor);

        // When the cursor enters the ball's interaction radius:
        if (dist2D < interactionRadius) {
          // Dead-center guard: ensure outward push even if cursor is exactly at ball center
          if (dist2D < 0.08) {
            const angle = Math.atan2(p.home.y, p.home.x) || 0.6;
            dx = Math.cos(angle) * 0.08;
            dy = Math.sin(angle) * 0.08;
            dist2D = 0.08;
          }

          const u = dist2D / interactionRadius; // 0 at center, 1 at boundary
          // Smooth power falloff: maximum repulsion at center, zero at edge
          const forceFactor = Math.pow(1.0 - u, 1.6);
          const pushMagnitude = forceFactor * 135.0 * coordFactor;

          p.force.x += (dx / dist2D) * pushMagnitude;
          p.force.y += (dy / dist2D) * pushMagnitude;
          // Slight depth push for 3D realism
          p.force.z += (p.pos.z > 0 ? 1 : -1) * pushMagnitude * 0.2;
        }
      }

      // C. Soft Container Boundary Springs (cushions balls before reaching the boundary)
      if (p.pos.x > boundsX - boundaryMargin) {
        const depth = (p.pos.x - (boundsX - boundaryMargin)) / boundaryMargin;
        p.force.x -= depth * depth * 35.0;
      } else if (p.pos.x < -boundsX + boundaryMargin) {
        const depth = (-boundsX + boundaryMargin - p.pos.x) / boundaryMargin;
        p.force.x += depth * depth * 35.0;
      }

      if (p.pos.y > boundsY - boundaryMargin) {
        const depth = (p.pos.y - (boundsY - boundaryMargin)) / boundaryMargin;
        p.force.y -= depth * depth * 35.0;
      } else if (p.pos.y < -boundsY + boundaryMargin) {
        const depth = (-boundsY + boundaryMargin - p.pos.y) / boundaryMargin;
        p.force.y += depth * depth * 35.0;
      }

      if (p.pos.z > boundsZ - boundaryMargin) {
        const depth = (p.pos.z - (boundsZ - boundaryMargin)) / boundaryMargin;
        p.force.z -= depth * depth * 35.0;
      } else if (p.pos.z < -boundsZ + boundaryMargin) {
        const depth = (-boundsZ + boundaryMargin - p.pos.z) / boundaryMargin;
        p.force.z += depth * depth * 35.0;
      }
    }

    // 2. Inter-Ball Soft Separation Physics (nearby balls react slightly when pushed into)
    for (let i = 0; i < numParticles; i++) {
      const pA = particles[i];
      for (let j = i + 1; j < numParticles; j++) {
        const pB = particles[j];
        const dx = pA.pos.x - pB.pos.x;
        const dy = pA.pos.y - pB.pos.y;
        const dz = pA.pos.z - pB.pos.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const minDist = (pA.radius + pB.radius) * sizeFactor * 1.05;

        if (dist < minDist && dist > 0.001) {
          const overlap = minDist - dist;
          const forceMag = overlap * 28.0;
          const sepX = (dx / dist) * forceMag;
          const sepY = (dy / dist) * forceMag;
          const sepZ = (dz / dist) * forceMag;

          pA.force.x += sepX;
          pA.force.y += sepY;
          pA.force.z += sepZ;

          pB.force.x -= sepX;
          pB.force.y -= sepY;
          pB.force.z -= sepZ;
        }
      }
    }

    // 3. Integrate Velocity & Position (Velocity-Verlet with Viscous Damping)
    const dampingCoeff = Math.pow(reducedMotion ? 0.86 : 0.895, dt * 60);

    for (let i = 0; i < numParticles; i++) {
      const p = particles[i];

      // a = F / m -> dv = a * dt
      p.vel.x += (p.force.x / p.mass) * dt;
      p.vel.y += (p.force.y / p.mass) * dt;
      p.vel.z += (p.force.z / p.mass) * dt;

      // Smooth viscous damping for natural momentum deceleration
      p.vel.x *= dampingCoeff;
      p.vel.y *= dampingCoeff;
      p.vel.z *= dampingCoeff;

      // Limit speed to prevent instability
      const speed = Math.hypot(p.vel.x, p.vel.y, p.vel.z);
      if (speed > 18.0) {
        const s = 18.0 / speed;
        p.vel.x *= s;
        p.vel.y *= s;
        p.vel.z *= s;
      }

      // Update position
      p.pos.x += p.vel.x * dt;
      p.pos.y += p.vel.y * dt;
      p.pos.z += p.vel.z * dt;

      // Reset forces for next tick
      p.force.set(0, 0, 0);

      // Hard Boundary Clamp with Damped Reflection
      if (p.pos.x > boundsX) {
        p.pos.x = boundsX;
        p.vel.x = -Math.abs(p.vel.x) * 0.25;
      } else if (p.pos.x < -boundsX) {
        p.pos.x = -boundsX;
        p.vel.x = Math.abs(p.vel.x) * 0.25;
      }

      if (p.pos.y > boundsY) {
        p.pos.y = boundsY;
        p.vel.y = -Math.abs(p.vel.y) * 0.25;
      } else if (p.pos.y < -boundsY) {
        p.pos.y = -boundsY;
        p.vel.y = Math.abs(p.vel.y) * 0.25;
      }

      if (p.pos.z > boundsZ) {
        p.pos.z = boundsZ;
        p.vel.z = -Math.abs(p.vel.z) * 0.25;
      } else if (p.pos.z < -boundsZ) {
        p.pos.z = -boundsZ;
        p.vel.z = Math.abs(p.vel.z) * 0.25;
      }

      // Velocity-driven rolling rotation (physical rolling feel)
      const rollFactor = 0.45;
      p.rot.x += (p.vel.y * rollFactor + (reducedMotion ? 0.02 : p.baseRotSpeed[0])) * dt;
      p.rot.y += (-p.vel.x * rollFactor + (reducedMotion ? 0.03 : p.baseRotSpeed[1])) * dt;

      // Direct Three.js mesh transform update (0 React state updates in loop)
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.copy(p.pos);
        mesh.rotation.copy(p.rot);
        const targetScale = p.scale * sizeFactor;
        mesh.scale.set(targetScale, targetScale, targetScale);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[6, 8, 10]} intensity={1.8} castShadow />
      <directionalLight position={[-6, -4, -6]} intensity={0.9} color="#c2a4ff" />
      <pointLight position={[0, 0, 6]} intensity={1.2} color="#ffffff" />
      {SPHERES_DATA.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          geometry={sharedSphereGeometry}
          material={materialsMap[data.image]}
          position={data.anchor}
          castShadow
          receiveShadow
        />
      ))}
      <Environment
        files="/models/char_enviorment.hdr"
        environmentIntensity={0.6}
        environmentRotation={[0, 4, 2]}
      />
      <EffectComposer enableNormalPass={false}>
        <N8AO color="#0f002c" aoRadius={1.8} intensity={1.1} />
      </EffectComposer>
    </>
  );
}

const skillsList = [
  { name: "Python", icon: "/images/python.png" },
  { name: "Java", icon: "/images/java.png" },
  { name: "HTML5", icon: "/images/html5.png" },
  { name: "CSS3", icon: "/images/css3.png" },
  { name: "JavaScript", icon: "/images/javascript.webp" },
  { name: "TypeScript", icon: "/images/typescript.webp" },
  { name: "React", icon: "/images/react2.webp" },
  { name: "MySQL", icon: "/images/mysql.webp" },
];

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [hasWebGL] = useState(() => checkWebGLSupported());
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerCoordsRef = useRef<PointerCoords>({ x: 0, y: 0, active: false });

  // Pre-load all textures once
  const texturesMap = useMemo(() => {
    const map: Record<string, THREE.Texture> = {};
    const uniqueImages = Array.from(new Set(SPHERES_DATA.map((s) => s.image)));
    uniqueImages.forEach((img) => {
      map[img] = loadTexture(img);
    });
    return map;
  }, []);

  useEffect(() => {
    // Reduced motion detection
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", motionListener);

    // Viewport-aware scroll listener: pauses 100% of physics calculations when scrolled past
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight + 80 && rect.bottom > -80;
      setIsActive(inView);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Global pointer tracking relative to the techstack canvas container
    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        // Exact normalized device coordinates [-1, 1] across the 3D canvas
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        pointerCoordsRef.current.x = nx;
        pointerCoordsRef.current.y = ny;
        pointerCoordsRef.current.active = true;
      } else {
        pointerCoordsRef.current.active = false;
      }
    };

    const handlePointerLeave = () => {
      pointerCoordsRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      mediaQuery.removeEventListener("change", motionListener);
    };
  }, []);

  return (
    <div
      className="techstack"
      id="techstack"
      ref={containerRef}
      onPointerMove={(e) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        pointerCoordsRef.current.x = nx;
        pointerCoordsRef.current.y = ny;
        pointerCoordsRef.current.active = true;
      }}
      onPointerLeave={() => {
        pointerCoordsRef.current.active = false;
      }}
    >
      {hasWebGL ? (
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: true }}
          camera={{ position: [0, 0, 18], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.4)}
          className="tech-canvas"
        >
          <ConstellationScene
            reducedMotion={reducedMotion}
            isActive={isActive}
            pointerCoordsRef={pointerCoordsRef}
            texturesMap={texturesMap}
          />
        </Canvas>
      ) : (
        <div className="tech-mobile-container">
          <div className="tech-mobile-grid">
            {skillsList.map((skill) => (
              <div className="tech-mobile-card" key={skill.name}>
                <img src={skill.icon} alt={skill.name} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStack;
