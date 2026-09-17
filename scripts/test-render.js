const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function test() {
  const primarySvg = fs.readFileSync('brand/logo-mark.svg');
  
  // Single-path simplified mono SVG
  const monoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke="currentColor">
  <!-- Hopfield Labs — Single-Path Simplified Mark (Optimized for Sub-24px & Monochrome Icons) -->
  <path
    d="M 11,11.5 L 11,37.5 M 31,11.5 L 31,37.5 M 11,24.5 L 31,24.5 M 31,24.5 C 42,24.5 42,6.5 21,6.5 C 15,6.5 11,9 11,11.5"
    stroke-width="3.2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <circle cx="11" cy="11.5" r="4" fill="currentColor" stroke="none" />
</svg>`;

  fs.writeFileSync('brand/logo-mark-mono.svg', monoSvg);

  // Render at 16px and 48px to compare
  await sharp(Buffer.from(primarySvg.toString().replace(/currentColor/g, '#FFFFFF')), { density: 300 })
    .resize(16, 16)
    .png()
    .toFile('brand/test-primary-16.png');

  await sharp(Buffer.from(monoSvg.replace(/currentColor/g, '#FFFFFF')), { density: 300 })
    .resize(16, 16)
    .png()
    .toFile('brand/test-mono-16.png');

  await sharp(Buffer.from(monoSvg.replace(/currentColor/g, '#FFFFFF')), { density: 300 })
    .resize(48, 48)
    .png()
    .toFile('brand/test-mono-48.png');

  console.log('Renders completed successfully');
}

test().catch(console.error);
