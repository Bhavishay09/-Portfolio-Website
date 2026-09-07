import * as THREE from "three";

export interface SphereConfig {
  name: string;
  image: string;
  brandColor: string;
  anchor: [number, number, number];
  scale: number;
  mass: number;
  floatSpeed: number;
  floatAmp: [number, number, number];
  phase: number;
  rotSpeed: [number, number];
}

export const getAssetUrl = (path: string): string => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
};

export const HERO_SPHERES: SphereConfig[] = [
  // 1. Python (Foreground Focus - Key Skill)
  {
    name: "Python",
    image: "/images/python.png",
    brandColor: "#3776ab",
    anchor: [-0.95, 0.45, 0.75],
    scale: 0.70,
    mass: 1.15,
    floatSpeed: 1.05,
    floatAmp: [0.12, 0.18, 0.08],
    phase: 0.0,
    rotSpeed: [0.08, 0.14],
  },
  // 2. Java (Foreground Focus - Key Skill)
  {
    name: "Java",
    image: "/images/java.png",
    brandColor: "#e76f00",
    anchor: [0.95, 0.50, 0.70],
    scale: 0.70,
    mass: 1.15,
    floatSpeed: 1.02,
    floatAmp: [0.11, 0.17, 0.09],
    phase: 1.7,
    rotSpeed: [0.06, -0.12],
  },
  // 3. React (Center Crown)
  {
    name: "React",
    image: "/images/react2.webp",
    brandColor: "#61dafb",
    anchor: [0.0, 1.25, 0.50],
    scale: 0.74,
    mass: 1.2,
    floatSpeed: 0.98,
    floatAmp: [0.10, 0.16, 0.07],
    phase: 0.8,
    rotSpeed: [0.05, 0.15],
  },
  // 4. TypeScript (Left Midground)
  {
    name: "TypeScript",
    image: "/images/typescript.webp",
    brandColor: "#3178c6",
    anchor: [-1.45, -0.35, 0.40],
    scale: 0.65,
    mass: 1.05,
    floatSpeed: 1.10,
    floatAmp: [0.11, 0.15, 0.08],
    phase: 3.4,
    rotSpeed: [-0.07, 0.10],
  },
  // 5. JavaScript (Right Midground)
  {
    name: "JavaScript",
    image: "/images/javascript.webp",
    brandColor: "#f7df1e",
    anchor: [1.45, -0.30, 0.40],
    scale: 0.65,
    mass: 1.05,
    floatSpeed: 1.12,
    floatAmp: [0.11, 0.15, 0.08],
    phase: 2.3,
    rotSpeed: [0.08, -0.10],
  },
  // 6. Node.js (Lower Center Anchor)
  {
    name: "Node.js",
    image: "/images/node2.webp",
    brandColor: "#68a063",
    anchor: [-0.15, -1.15, 0.55],
    scale: 0.67,
    mass: 1.10,
    floatSpeed: 1.0,
    floatAmp: [0.09, 0.15, 0.07],
    phase: 4.1,
    rotSpeed: [0.07, 0.09],
  },
  // 7. HTML5 (Left Lower Wing)
  {
    name: "HTML5",
    image: "/images/html5.png",
    brandColor: "#e44d26",
    anchor: [-1.05, -0.95, 0.15],
    scale: 0.60,
    mass: 0.95,
    floatSpeed: 1.15,
    floatAmp: [0.10, 0.14, 0.06],
    phase: 5.2,
    rotSpeed: [0.09, 0.08],
  },
  // 8. CSS3 (Right Lower Wing)
  {
    name: "CSS3",
    image: "/images/css3.png",
    brandColor: "#264de4",
    anchor: [1.05, -1.00, 0.15],
    scale: 0.60,
    mass: 0.95,
    floatSpeed: 1.14,
    floatAmp: [0.10, 0.14, 0.07],
    phase: 1.1,
    rotSpeed: [-0.08, 0.11],
  },
  // 9. MySQL (Top Right Depth)
  {
    name: "MySQL",
    image: "/images/mysql.webp",
    brandColor: "#00758f",
    anchor: [1.20, 1.10, -0.40],
    scale: 0.56,
    mass: 0.90,
    floatSpeed: 0.94,
    floatAmp: [0.08, 0.13, 0.06],
    phase: 2.8,
    rotSpeed: [0.06, -0.08],
  },
  // 10. MongoDB (Top Left Depth)
  {
    name: "MongoDB",
    image: "/images/mongo.webp",
    brandColor: "#47a248",
    anchor: [-1.20, 1.05, -0.45],
    scale: 0.56,
    mass: 0.90,
    floatSpeed: 0.93,
    floatAmp: [0.08, 0.13, 0.06],
    phase: 4.6,
    rotSpeed: [-0.06, 0.09],
  },
  // 11. Next.js (Center Depth Nucleus)
  {
    name: "Next.js",
    image: "/images/next2.webp",
    brandColor: "#ffffff",
    anchor: [0.05, -0.15, -0.55],
    scale: 0.62,
    mass: 1.0,
    floatSpeed: 0.90,
    floatAmp: [0.07, 0.12, 0.06],
    phase: 3.0,
    rotSpeed: [0.05, 0.07],
  },
  // 12. Express (Rear Left Depth)
  {
    name: "Express",
    image: "/images/express.webp",
    brandColor: "#c2a4ff",
    anchor: [-0.65, -0.55, -0.90],
    scale: 0.52,
    mass: 0.85,
    floatSpeed: 0.88,
    floatAmp: [0.06, 0.11, 0.05],
    phase: 1.9,
    rotSpeed: [0.05, -0.06],
  },
  // 13. Violet Tech Orb (Atmospheric Depth Catalyst)
  {
    name: "Antigravity Orb",
    image: "/images/react2.webp",
    brandColor: "#c481ff",
    anchor: [0.70, 0.15, -1.05],
    scale: 0.48,
    mass: 0.80,
    floatSpeed: 0.85,
    floatAmp: [0.06, 0.10, 0.05],
    phase: 0.4,
    rotSpeed: [-0.04, 0.06],
  },
];

export interface SphereParticle {
  mesh: THREE.Mesh;
  material: THREE.MeshPhysicalMaterial;
  textureCleanup: () => void;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  force: THREE.Vector3;
  home: THREE.Vector3;
  scale: number;
  radius: number;
  mass: number;
  phase: number;
  floatSpeed: number;
  floatAmp: [number, number, number];
  rotSpeed: [number, number];
}

/**
 * Creates a glossy, jewel-like canvas texture for a tech sphere:
 * - Deep obsidian/violet vignette gradient
 * - Concentric neon accent rings matching the tech's brand color
 * - Soft luminous radial halo
 * - High-resolution centered logo
 */
export function createSphereTexture(
  imagePath: string,
  brandColor: string,
  isPureOrb: boolean = false
): { texture: THREE.CanvasTexture; cleanup: () => void } {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d", { willReadFrequently: false });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  let isDisposed = false;

  const render = (img?: HTMLImageElement) => {
    if (isDisposed || !ctx) return;
    ctx.clearRect(0, 0, 512, 512);

    // 1. Deep dark obsidian / cosmic gradient
    const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 256);
    grad.addColorStop(0, "#221a36");
    grad.addColorStop(0.55, "#140f25");
    grad.addColorStop(1, "#090613");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // 2. Ambient neon brand glow
    const glowGrad = ctx.createRadialGradient(256, 256, 10, 256, 256, 190);
    glowGrad.addColorStop(0, brandColor + "55");
    glowGrad.addColorStop(0.7, brandColor + "15");
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(256, 256, 190, 0, Math.PI * 2);
    ctx.fill();

    // 3. Delicate holographic concentric tech rings
    ctx.save();
    ctx.strokeStyle = brandColor;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(256, 256, 215, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(256, 256, 226, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Subtle orbital tech tick marks
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
      const x1 = 256 + Math.cos(a) * 228;
      const y1 = 256 + Math.sin(a) * 228;
      const x2 = 256 + Math.cos(a) * 236;
      const y2 = 256 + Math.sin(a) * 236;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();

    // 5. Draw centered tech logo
    if (!isPureOrb && img && img.complete && img.naturalWidth > 0) {
      const maxDim = 200;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const ratio = Math.min(maxDim / w, maxDim / h);
      w = w * ratio;
      h = h * ratio;
      ctx.drawImage(img, 256 - w / 2, 256 - h / 2, w, h);
    }

    texture.needsUpdate = true;
  };

  // Immediate synchronous render for 0ms delay
  render();

  if (!isPureOrb && imagePath) {
    const fullUrl = getAssetUrl(imagePath);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = fullUrl;
    img.onload = () => render(img);
    img.onerror = () => render();
  }

  const cleanup = () => {
    isDisposed = true;
    texture.dispose();
  };

  return { texture, cleanup };
}
