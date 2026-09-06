const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const publicImages = path.join(__dirname, '..', 'public', 'images');

const icons = {
  python: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="100" fill="#0f141c"/>
    <g transform="translate(106, 106) scale(0.585)">
      <path fill="url(#python-blue)" d="M245.5 0c-40.3 0-77.5 16.5-104 43-26.6 26.5-43 63.7-43 104v42.5h147v42.5H102c-40.3 0-77.5 16.5-104 43-26.6 26.5-43 63.7-43 104 0 40.3 16.5 77.5 43 104 26.5 26.6 63.7 43 104 43h57v-63.5c0-40.3 16.5-77.5 43-104 26.5-26.6 63.7-43 104-43h147v-42.5H348.5c-40.3 0-77.5-16.5-104-43-26.6-26.5-43-63.7-43-104V0h44z"/>
      <path fill="url(#python-yellow)" d="M266.5 512c40.3 0 77.5-16.5 104-43 26.6-26.5 43-63.7 43-104v-42.5h-147V280h143.5c40.3 0 77.5-16.5 104-43 26.6-26.5 43-63.7 43-104 0-40.3-16.5-77.5-43-104-26.5-26.6-63.7-43-104-43h-57v63.5c0 40.3-16.5 77.5-43 104-26.5 26.6-63.7 43-104 43H62v42.5h103.5c40.3 0 77.5 16.5 104 43 26.6 26.5 43 63.7 43 104v127h-46z"/>
      <circle cx="170" cy="85" r="28" fill="#ffffff"/>
      <circle cx="342" cy="427" r="28" fill="#ffffff"/>
    </g>
    <defs>
      <linearGradient id="python-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#387eb8"/>
        <stop offset="100%" stop-color="#235c8b"/>
      </linearGradient>
      <linearGradient id="python-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffe873"/>
        <stop offset="100%" stop-color="#ffd43b"/>
      </linearGradient>
    </defs>
  </svg>`,

  java: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="100" fill="#0f141c"/>
    <g transform="translate(130, 80) scale(1.1)">
      <path fill="#e76f00" d="M115 170c-25 0-42 12-42 12s16-10 40-10c30 0 45 15 76 15 28 0 41-13 41-13s-14 9-39 9c-29 0-46-13-76-13z"/>
      <path fill="#e76f00" d="M102 140c-35 0-58 17-58 17s22-14 55-14c41 0 62 20 105 20 38 0 56-18 56-18s-19 12-53 12c-40 0-64-17-105-17z"/>
      <path fill="#5382a1" d="M85 85c-15 45 10 70 35 90 0 0-25-25-15-65 10-38 45-55 45-55s-50 7-65 30z"/>
      <path fill="#5382a1" d="M140 60c-15 35 5 55 25 70 0 0-20-20-10-50 10-30 35-45 35-45s-38 5-50 25z"/>
      <path fill="#e76f00" d="M50 200c0 0 35 15 90 15 50 0 95-15 95-15s-25 25-95 25c-65 0-90-25-90-25z"/>
      <path fill="#5382a1" d="M60 215c0 0 35 15 80 15 45 0 75-15 75-15s-20 20-75 20c-50 0-80-20-80-20z"/>
    </g>
    <text x="256" y="420" fill="#f89820" font-family="Arial, sans-serif" font-weight="900" font-size="80" text-anchor="middle" letter-spacing="4">JAVA</text>
  </svg>`,

  html5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="100" fill="#0f141c"/>
    <g transform="translate(106, 70) scale(0.585)">
      <path fill="#e34f26" d="M57 465L18 28h476l-39 437-199 55"/>
      <path fill="#ef652a" d="M256 472l161-45 33-369H256v414z"/>
      <path fill="#ebebeb" d="M256 176H143l8 88h105v-88zm0 152h-57l-4-44h-61l8 96 114 32v-84z"/>
      <path fill="#ffffff" d="M256 176v88h105l-10 112-95 26v84l161-45 1-12 18-205 4-48H256z"/>
    </g>
    <text x="256" y="445" fill="#e34f26" font-family="Arial, sans-serif" font-weight="900" font-size="70" text-anchor="middle" letter-spacing="4">HTML5</text>
  </svg>`,

  css3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="100" fill="#0f141c"/>
    <g transform="translate(106, 70) scale(0.585)">
      <path fill="#1572b6" d="M57 465L18 28h476l-39 437-199 55"/>
      <path fill="#33a9dc" d="M256 472l161-45 33-369H256v414z"/>
      <path fill="#ebebeb" d="M256 176H143l8 88h105v-88zm0 134h-54l-3-38h-62l7 82 112 31v-75z"/>
      <path fill="#ffffff" d="M256 176v64h95l-6 68h-89v64h83l-8 90-80 22v68l145-40 2-25 15-167 4-48H256z"/>
    </g>
    <text x="256" y="445" fill="#33a9dc" font-family="Arial, sans-serif" font-weight="900" font-size="70" text-anchor="middle" letter-spacing="4">CSS3</text>
  </svg>`
};

for (const [name, svgContent] of Object.entries(icons)) {
  const svgPath = path.join(publicImages, `${name}.svg`);
  const pngPath = path.join(publicImages, `${name}.png`);
  fs.writeFileSync(svgPath, svgContent);
  execSync(`sips -s format png "${svgPath}" --out "${pngPath}"`);
  console.log(`Generated ${pngPath}`);
}
