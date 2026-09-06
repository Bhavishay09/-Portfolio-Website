const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const publicImages = path.join(__dirname, '..', 'public', 'images');

const projects = [
  {
    name: 'project-1',
    title: 'Python Automation & AI Tool',
    tag: 'Python • REST API • Automation',
    color1: '#3776AB',
    color2: '#FFD438',
    bg: '#0c121e',
    accent: '#387eb8',
    snippet: 'import asyncio\nimport aiohttp\n\nasync def process_stream(data):\n    return await pipeline.execute(data)'
  },
  {
    name: 'project-2',
    title: 'Java Enterprise System',
    tag: 'Java • Spring • Multi-Threading',
    color1: '#EA2D2E',
    color2: '#5382A1',
    bg: '#180c10',
    accent: '#f89820',
    snippet: 'public class SystemEngine {\n    public static void main(String[] args) {\n        EnginePool.initWorkers();\n    }\n}'
  },
  {
    name: 'project-3',
    title: 'Ultra-Smooth Web UI',
    tag: 'HTML5 • Modern CSS3 • GSAP',
    color1: '#E34F26',
    color2: '#1572B6',
    bg: '#0d1117',
    accent: '#c2a4ff',
    snippet: '.smooth-viewport {\n  scroll-behavior: smooth;\n  transform: translate3d(0,0,0);\n}'
  },
  {
    name: 'project-4',
    title: 'Algorithm & DSA Visualizer',
    tag: 'Java • Python • Algorithms',
    color1: '#7b42f6',
    color2: '#00f2fe',
    bg: '#100b1e',
    accent: '#a855f7',
    snippet: 'def dijkstra_shortest_path(graph, start):\n    distances = {node: float("inf") for node in graph}\n    distances[start] = 0'
  },
  {
    name: 'project-5',
    title: 'Full-Stack Data Hub',
    tag: 'Python • React • SQL Database',
    color1: '#10b981',
    color2: '#3b82f6',
    bg: '#091512',
    accent: '#10b981',
    snippet: 'SELECT user_id, COUNT(*) AS activities\nFROM user_events\nGROUP BY user_id ORDER BY activities DESC;'
  },
  {
    name: 'project-6',
    title: 'Interactive 3D Experience',
    tag: 'Three.js • Rapier Physics • WebGL',
    color1: '#f43f5e',
    color2: '#8b5cf6',
    bg: '#150a18',
    accent: '#f43f5e',
    snippet: 'const canvas = new Canvas({ shadows: true });\nconst physics = new RapierPhysics();\nscene.add(physics);'
  }
];

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="grad-${p.name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.color1}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${p.color2}" stop-opacity="0.8"/>
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="transparent"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" rx="24" fill="${p.bg}"/>
    <rect x="2" y="2" width="796" height="496" rx="22" fill="none" stroke="url(#grad-${p.name})" stroke-width="2" stroke-opacity="0.4"/>
    
    <!-- Header bar -->
    <rect x="40" y="40" width="720" height="50" rx="12" fill="#ffffff" fill-opacity="0.05"/>
    <circle cx="70" cy="65" r="7" fill="#ff5f56"/>
    <circle cx="95" cy="65" r="7" fill="#ffbd2e"/>
    <circle cx="120" cy="65" r="7" fill="#27c93f"/>
    <text x="730" y="70" fill="${p.accent}" font-family="monospace" font-size="14" font-weight="bold" text-anchor="end">${p.tag}</text>

    <!-- Project Title -->
    <text x="50" y="160" fill="#ffffff" font-family="sans-serif" font-size="34" font-weight="bold">${p.title.replace(/&/g, '&amp;')}</text>
    
    <!-- Code Editor Card -->
    <rect x="50" y="200" width="700" height="240" rx="16" fill="#000000" fill-opacity="0.5" stroke="#ffffff" stroke-opacity="0.1"/>
    <rect x="50" y="200" width="700" height="4" fill="url(#grad-${p.name})"/>
    
    <!-- Code Text -->
    ${p.snippet.split('\n').map((line, idx) => 
      `<text x="80" y="${250 + idx * 35}" fill="#88c0d0" font-family="monospace" font-size="18">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>`
    ).join('')}

    <!-- Live Badge -->
    <rect x="630" y="380" width="100" height="36" rx="18" fill="url(#grad-${p.name})"/>
    <text x="680" y="403" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">bhavishay09</text>
  </svg>`;

  const svgPath = path.join(publicImages, `${p.name}.svg`);
  const pngPath = path.join(publicImages, `${p.name}.png`);
  fs.writeFileSync(svgPath, svg);
  execSync(`sips -s format png "${svgPath}" --out "${pngPath}"`);
  console.log(`Generated ${pngPath}`);
}
