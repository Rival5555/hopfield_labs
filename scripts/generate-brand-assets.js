const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function createIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + count * dirEntrySize;
  
  let totalSize = dirSize;
  for (const item of pngBuffers) {
    totalSize += item.buffer.length;
  }
  
  const icoBuffer = Buffer.alloc(totalSize);
  
  // Header
  icoBuffer.writeUInt16LE(0, 0); // Reserved
  icoBuffer.writeUInt16LE(1, 2); // Type 1 = ICO
  icoBuffer.writeUInt16LE(count, 4); // Number of images
  
  let currentOffset = dirSize;
  for (let i = 0; i < count; i++) {
    const item = pngBuffers[i];
    const entryOffset = headerSize + i * dirEntrySize;
    
    icoBuffer.writeUInt8(item.width >= 256 ? 0 : item.width, entryOffset + 0);
    icoBuffer.writeUInt8(item.height >= 256 ? 0 : item.height, entryOffset + 1);
    icoBuffer.writeUInt8(0, entryOffset + 2); // Color palette
    icoBuffer.writeUInt8(0, entryOffset + 3); // Reserved
    icoBuffer.writeUInt16LE(1, entryOffset + 4); // Color planes
    icoBuffer.writeUInt16LE(32, entryOffset + 6); // Bits per pixel
    icoBuffer.writeUInt32LE(item.buffer.length, entryOffset + 8); // Image size
    icoBuffer.writeUInt32LE(currentOffset, entryOffset + 12); // Offset
    
    item.buffer.copy(icoBuffer, currentOffset);
    currentOffset += item.buffer.length;
  }
  
  return icoBuffer;
}

async function generateAssets() {
  console.log('Generating Hopfield Labs Brand Deliverables...');
  
  const faviconSvg = fs.readFileSync('brand/favicon.svg', 'utf8');
  // For favicon, use crisp signal green or bright foreground for high visibility
  const faviconSvgColored = faviconSvg.replace(/currentColor/g, '#00D6A4');
  
  // 1. Favicon sizes for ICO
  const p16 = await sharp(Buffer.from(faviconSvgColored), { density: 300 }).resize(16, 16).png().toBuffer();
  const p32 = await sharp(Buffer.from(faviconSvgColored), { density: 300 }).resize(32, 32).png().toBuffer();
  const p48 = await sharp(Buffer.from(faviconSvgColored), { density: 300 }).resize(48, 48).png().toBuffer();
  
  const ico = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ]);
  
  fs.writeFileSync('brand/favicon.ico', ico);
  fs.writeFileSync('public/favicon.ico', ico);
  console.log('✓ brand/favicon.ico (16/32/48 multi-size) created');

  // Also copy favicon.svg to public/
  fs.copyFileSync('brand/favicon.svg', 'public/favicon.svg');

  // 2. Apple Touch Icon: 180×180, solid #08090C background, safe margins
  const appleTouchSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
    <!-- Solid dark background -->
    <rect width="180" height="180" rx="40" fill="#08090C" />
    <rect width="180" height="180" rx="40" fill="none" stroke="#232935" stroke-width="2" />
    
    <!-- Centered primary mark at 100x100 with safe padding -->
    <g transform="translate(40, 40) scale(2.0833)" fill="none" stroke="#E9ECF2">
      <!-- Recurrence Loop -->
      <path
        d="M 31,24.5 C 42,24.5 42,6.5 21,6.5 C 15,6.5 11,9 11,11.5"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <!-- Stems & Crossbar -->
      <line x1="11" y1="11.5" x2="11" y2="37.5" stroke-width="2.75" stroke-linecap="round" />
      <line x1="31" y1="11.5" x2="31" y2="37.5" stroke-width="2.75" stroke-linecap="round" />
      <line x1="11" y1="24.5" x2="31" y2="24.5" stroke-width="2.75" stroke-linecap="round" />
      <!-- Vertex Nodes -->
      <circle cx="11" cy="11.5" r="3.75" fill="#00D6A4" stroke="none" />
      <circle cx="11" cy="24.5" r="3.25" fill="#E9ECF2" stroke="none" />
      <circle cx="11" cy="37.5" r="3.25" fill="#E9ECF2" stroke="none" />
      <circle cx="31" cy="11.5" r="3.25" fill="#E9ECF2" stroke="none" />
      <circle cx="31" cy="24.5" r="3.25" fill="#E9ECF2" stroke="none" />
      <circle cx="31" cy="37.5" r="3.25" fill="#E9ECF2" stroke="none" />
    </g>
  </svg>
  `;
  
  await sharp(Buffer.from(appleTouchSvg))
    .resize(180, 180)
    .png()
    .toFile('brand/apple-touch-icon.png');
  fs.copyFileSync('brand/apple-touch-icon.png', 'public/apple-touch-icon.png');
  console.log('✓ brand/apple-touch-icon.png (180x180) created');

  // 3. OG Image: 1200×630, mark + wordmark, dark background (#08090C)
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <radialGradient id="bg-glow" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#4F7DFF" stop-opacity="0.14" />
        <stop offset="60%" stop-color="#00D6A4" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#08090C" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="card-border" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#323A4A" />
        <stop offset="100%" stop-color="#161A22" />
      </linearGradient>
    </defs>
    
    <!-- Deep Canvas Background -->
    <rect width="1200" height="630" fill="#08090C" />
    <rect width="1200" height="630" fill="url(#bg-glow)" />

    <!-- 1px Structural Grid Framing -->
    <rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="url(#card-border)" stroke-width="1.5" />
    
    <!-- Top Meta Strip -->
    <g transform="translate(80, 90)">
      <circle cx="6" cy="6" r="4" fill="#00D6A4" />
      <text x="24" y="10" font-family="'Geist Mono', monospace" font-size="14" font-weight="600" letter-spacing="0.16em" fill="#939CB0">HOPFIELD LABS // SOFTWARE &amp; AI STUDIO</text>
    </g>

    <!-- Center Hero Lockup: Mark + Wordmark -->
    <g transform="translate(80, 200)">
      <!-- Mark (Height 120px) -->
      <g transform="scale(2.5)" fill="none" stroke="#E9ECF2">
        <path
          d="M 31,24.5 C 42,24.5 42,6.5 21,6.5 C 15,6.5 11,9 11,11.5"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <line x1="11" y1="11.5" x2="11" y2="37.5" stroke-width="2.75" stroke-linecap="round" />
        <line x1="31" y1="11.5" x2="31" y2="37.5" stroke-width="2.75" stroke-linecap="round" />
        <line x1="11" y1="24.5" x2="31" y2="24.5" stroke-width="2.75" stroke-linecap="round" />
        <circle cx="11" cy="11.5" r="3.75" fill="#00D6A4" stroke="none" />
        <circle cx="11" cy="24.5" r="3.25" fill="#E9ECF2" stroke="none" />
        <circle cx="11" cy="37.5" r="3.25" fill="#E9ECF2" stroke="none" />
        <circle cx="31" cy="11.5" r="3.25" fill="#E9ECF2" stroke="none" />
        <circle cx="31" cy="24.5" r="3.25" fill="#E9ECF2" stroke="none" />
        <circle cx="31" cy="37.5" r="3.25" fill="#E9ECF2" stroke="none" />
      </g>

      <!-- Wordmark Typography -->
      <g transform="translate(160, 48)">
        <text font-family="'Geist Mono', monospace" font-size="52" font-weight="700" letter-spacing="0.14em" fill="#E9ECF2">HOPFIELD LABS</text>
        <text y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#939CB0">Engineering resilient web, mobile &amp; GenAI systems</text>
      </g>
    </g>

    <!-- Capabilities Footer Strip -->
    <g transform="translate(80, 490)">
      <line x1="0" y1="0" x2="1040" y2="0" stroke="#232935" stroke-width="1" />
      <g transform="translate(0, 36)" font-family="'Geist Mono', monospace" font-size="13" letter-spacing="0.12em" fill="#939CB0">
        <text x="0" y="0">01 WEB ENGINEERING</text>
        <text x="220" y="0">02 NATIVE MOBILE</text>
        <text x="420" y="0">03 GENAI INTEGRATION</text>
        <text x="660" y="0">04 APPLIED AI/ML</text>
        <text x="880" y="0">05 FYP CAPSTONES</text>
      </g>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile('brand/og-image.png');
  fs.copyFileSync('brand/og-image.png', 'public/og-image.png');
  console.log('✓ brand/og-image.png (1200x630) created');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
