import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/LoadingProvider";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import { setProgress } from "../Loading";
import {
  HERO_SPHERES,
  createSphereTexture,
  SphereParticle,
} from "./utils/sphereCluster";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const containerEl = canvasDiv.current;
    if (!containerEl) return;

    const rect = containerEl.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;
    const aspect = width / height;

    const scene = sceneRef.current;
    scene.clear();

    // 1. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not supported:", e);
      setLoading(100);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    containerEl.appendChild(renderer.domElement);

    // 2. Camera Setup (tuned for hero cluster)
    const camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 100);
    camera.position.set(0, 0, 9.6);
    camera.updateProjectionMatrix();

    // 3. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x28193f, 1.4);
    scene.add(ambientLight);

    // Primary key directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(6, 8, 10);
    scene.add(keyLight);

    // Vibrant purple/violet rim light (studio highlight matching brand)
    const rimLight = new THREE.DirectionalLight(0xc481ff, 3.8);
    rimLight.position.set(-6, -6, -8);
    scene.add(rimLight);

    // Top soft accent fill light
    const fillLight = new THREE.PointLight(0xa374ff, 1.6, 30);
    fillLight.position.set(0, 4, 6);
    scene.add(fillLight);

    // Cyan subtle accent for rich dual-tone sheen
    const cyanAccent = new THREE.DirectionalLight(0x54a0ff, 1.2);
    cyanAccent.position.set(-8, 4, 4);
    scene.add(cyanAccent);

    // 4. Cluster Group & Shared Geometry
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const sphereData = isMobile ? HERO_SPHERES.slice(0, 7) : HERO_SPHERES;

    const segments = isMobile ? 36 : 48;
    const sharedGeometry = new THREE.SphereGeometry(1, segments, segments);

    const scaleMultiplier = isMobile ? 0.68 : isTablet ? 0.84 : 1.0;
    const coordMultiplier = isMobile ? 0.62 : isTablet ? 0.82 : 1.0;

    const particles: SphereParticle[] = [];

    sphereData.forEach((config) => {
      const { texture, cleanup } = createSphereTexture(
        config.image,
        config.brandColor,
        config.name.includes("Orb")
      );

      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: new THREE.Color(config.brandColor),
        emissiveMap: texture,
        emissiveIntensity: 0.22,
        metalness: 0.22,
        roughness: 0.14,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.88,
      });

      const mesh = new THREE.Mesh(sharedGeometry, material);
      const actualScale = config.scale * scaleMultiplier;
      mesh.scale.setScalar(actualScale);

      const startX = config.anchor[0] * coordMultiplier;
      const startY = config.anchor[1] * coordMultiplier;
      const startZ = config.anchor[2];

      mesh.position.set(startX, startY, startZ);
      mesh.rotation.set(0, 0, 0);
      clusterGroup.add(mesh);

      particles.push({
        mesh,
        material,
        textureCleanup: cleanup,
        pos: new THREE.Vector3(startX, startY, startZ),
        vel: new THREE.Vector3(0, 0, 0),
        force: new THREE.Vector3(0, 0, 0),
        home: new THREE.Vector3(startX, startY, startZ),
        scale: actualScale,
        radius: actualScale,
        mass: config.mass,
        phase: config.phase,
        floatSpeed: config.floatSpeed,
        floatAmp: config.floatAmp,
        rotSpeed: config.rotSpeed,
      });
    });

    // Connect clusterGroup to GSAP Scroll Timeline
    setCharTimeline(clusterGroup, camera);
    setAllTimeline();

    // Signal preloader progress completion smoothly
    const progress = setProgress((value) => setLoading(value));
    progress.loaded().then(() => {
      // Progress complete
    });

    // 5. Interactive Cursor Physics Tracking
    const pointerWorld = new THREE.Vector3(999, 999, 0);
    const targetPointerWorld = new THREE.Vector3(999, 999, 0);
    let isPointerActive = false;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX: number, clientY: number;
      if ("touches" in e) {
        if (!e.touches || e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (!containerEl) return;
      const cRect = containerEl.getBoundingClientRect();

      // Only track within or near the hero canvas
      if (
        clientX >= cRect.left - 80 &&
        clientX <= cRect.right + 80 &&
        clientY >= cRect.top - 80 &&
        clientY <= cRect.bottom + 80
      ) {
        const nx = ((clientX - cRect.left) / cRect.width) * 2 - 1;
        const ny = -(((clientY - cRect.top) / cRect.height) * 2 - 1);

        const vHalfH =
          camera.position.z *
          Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
        const vHalfW = vHalfH * camera.aspect;

        targetPointerWorld.x = nx * vHalfW;
        targetPointerWorld.y = ny * vHalfH;
        isPointerActive = true;
      } else {
        isPointerActive = false;
      }
    };

    const onPointerLeave = () => {
      isPointerActive = false;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchmove", onPointerMove, { passive: true });
      landingDiv.addEventListener("touchend", onPointerLeave);
    }

    // 6. Viewport Resize Handler
    const onResize = () => {
      if (!containerEl) return;
      const nRect = containerEl.getBoundingClientRect();
      const nWidth = nRect.width || window.innerWidth;
      const nHeight = nRect.height || window.innerHeight;
      renderer.setSize(nWidth, nHeight);
      camera.aspect = nWidth / nHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // 7. Visibility Observer (pauses loop when scrolled far away)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerEl);

    // 8. Physics & Render Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.033);
      const elapsedTime = clock.getElapsedTime();
      const numParticles = particles.length;

      // A. Organic zero-gravity orbital float
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        const t = elapsedTime * p.floatSpeed;

        // Multi-frequency non-repeating drift
        const driftX =
          Math.sin(t + p.phase) * p.floatAmp[0] +
          Math.cos(t * 0.61 + p.phase * 1.5) * (p.floatAmp[0] * 0.4);
        const driftY =
          Math.cos(t * 0.88 + p.phase * 1.2) * p.floatAmp[1] +
          Math.sin(t * 0.45 + p.phase) * (p.floatAmp[1] * 0.35);
        const driftZ =
          Math.sin(t * 0.7 + p.phase * 0.85) * p.floatAmp[2] +
          Math.cos(t * 0.52 + p.phase * 1.6) * (p.floatAmp[2] * 0.3);

        // Gentle collective breathing / orbit precession
        const orbitAngle = elapsedTime * 0.07;
        const cosO = Math.cos(orbitAngle);
        const sinO = Math.sin(orbitAngle);
        const orbX =
          p.home.x * 0.98 + (p.home.x * cosO - p.home.z * sinO) * 0.02;
        const orbZ =
          p.home.z * 0.98 + (p.home.x * sinO + p.home.z * cosO) * 0.02;

        const targetX = orbX + driftX;
        const targetY = p.home.y + driftY;
        const targetZ = orbZ + driftZ;

        // Elastic Hooke's restoring spring to floating target
        const kSpring = 14.0;
        p.force.x += (targetX - p.pos.x) * kSpring;
        p.force.y += (targetY - p.pos.y) * kSpring;
        p.force.z += (targetZ - p.pos.z) * kSpring;
      }

      // B. Inter-Sphere Collision & Repulsion (Natural kinetic bouncing)
      for (let i = 0; i < numParticles; i++) {
        const pA = particles[i];
        for (let j = i + 1; j < numParticles; j++) {
          const pB = particles[j];
          const dx = pA.pos.x - pB.pos.x;
          const dy = pA.pos.y - pB.pos.y;
          const dz = pA.pos.z - pB.pos.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const minDist = (pA.radius + pB.radius) * 1.08;

          if (dist < minDist && dist > 0.0001) {
            const overlap = minDist - dist;
            const forceMag = overlap * 28.0;
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;

            pA.force.x += nx * forceMag;
            pA.force.y += ny * forceMag;
            pA.force.z += nz * forceMag;

            pB.force.x -= nx * forceMag;
            pB.force.y -= ny * forceMag;
            pB.force.z -= nz * forceMag;
          }
        }
      }

      // C. Cursor Proximity Repulsion
      if (isPointerActive) {
        pointerWorld.x += (targetPointerWorld.x - pointerWorld.x) * 0.25;
        pointerWorld.y += (targetPointerWorld.y - pointerWorld.y) * 0.25;
        pointerWorld.z = 0;

        for (let i = 0; i < numParticles; i++) {
          const p = particles[i];
          const dx = p.pos.x - pointerWorld.x;
          const dy = p.pos.y - pointerWorld.y;
          const dist2D = Math.hypot(dx, dy);
          const interactRadius = p.radius + 1.8;

          if (dist2D < interactRadius) {
            const safeDist = Math.max(dist2D, 0.06);
            const nx = dx / safeDist;
            const ny = dy / safeDist;
            const u = dist2D / interactRadius;
            const pushMag = Math.pow(1.0 - u, 1.7) * 70.0;

            p.force.x += nx * pushMag;
            p.force.y += ny * pushMag;
            p.force.z += (p.pos.z >= 0 ? 1 : -1) * pushMag * 0.25;
          }
        }
      } else {
        pointerWorld.set(999, 999, 0);
      }

      // D. Viscous Damping & Position Integration (Frame-rate independent)
      const damping = Math.pow(0.89, dt * 60);

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // a = F / m -> dv = a * dt
        p.vel.x += (p.force.x / p.mass) * dt;
        p.vel.y += (p.force.y / p.mass) * dt;
        p.vel.z += (p.force.z / p.mass) * dt;

        // Viscous damping
        p.vel.x *= damping;
        p.vel.y *= damping;
        p.vel.z *= damping;

        // Velocity speed cap
        const speed = Math.hypot(p.vel.x, p.vel.y, p.vel.z);
        if (speed > 12.0) {
          const s = 12.0 / speed;
          p.vel.x *= s;
          p.vel.y *= s;
          p.vel.z *= s;
        }

        // Update position
        p.pos.x += p.vel.x * dt;
        p.pos.y += p.vel.y * dt;
        p.pos.z += p.vel.z * dt;

        // Reset force
        p.force.set(0, 0, 0);

        // Smooth physical rolling rotation
        p.mesh.rotation.x += (p.vel.y * 0.35 + p.rotSpeed[0]) * dt;
        p.mesh.rotation.y += (-p.vel.x * 0.35 + p.rotSpeed[1]) * dt;

        // Direct mesh matrix update (0 React state re-renders)
        p.mesh.position.copy(p.pos);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 9. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      if (landingDiv) {
        landingDiv.removeEventListener("touchmove", onPointerMove);
        landingDiv.removeEventListener("touchend", onPointerLeave);
      }

      particles.forEach((p) => {
        p.textureCleanup();
        p.material.dispose();
      });
      sharedGeometry.dispose();
      scene.clear();
      renderer.dispose();

      if (
        containerEl &&
        renderer.domElement &&
        containerEl.contains(renderer.domElement)
      ) {
        containerEl.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
