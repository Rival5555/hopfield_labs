const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const BREAKPOINTS = [
  { id: '320px', width: 320, height: 568, label: '320px (iPhone SE)' },
  { id: '375px', width: 375, height: 667, label: '375px (iPhone 12/13/14)' },
  { id: '375px-landscape', width: 667, height: 375, label: '375px Landscape' },
  { id: '414px', width: 414, height: 896, label: '414px (Large Phone)' },
  { id: '768px', width: 768, height: 1024, label: '768px (iPad Portrait)' },
  { id: '768px-landscape', width: 1024, height: 768, label: '768px Landscape' },
  { id: '1024px', width: 1024, height: 768, label: '1024px (Small Laptop)' },
  { id: '1280px', width: 1280, height: 800, label: '1280px (Laptop)' },
  { id: '1440px', width: 1440, height: 900, label: '1440px (Desktop)' },
  { id: '1920px', width: 1920, height: 1080, label: '1920px (Large Desktop)' },
];

const PAGES = [
  { id: 'home', path: '/' },
  { id: 'services', path: '/services' },
  { id: 'services-slug', path: '/services/web-development' },
  { id: 'work', path: '/work' },
  { id: 'work-slug', path: '/work/aura-health' },
  { id: 'about', path: '/about' },
  { id: 'contact', path: '/contact' },
];

async function run() {
  console.log('Launching headless browser for responsive baseline capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const auditReport = [];

  for (const p of PAGES) {
    const pageDir = path.join(__dirname, '..', 'qa', 'responsive', p.id);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    console.log(`\nAuditing Page: ${p.id} (${p.path})`);
    const url = `http://localhost:3000${p.path}`;
    
    // Set initial viewport and navigate once
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1000));

    for (const bp of BREAKPOINTS) {
      await page.setViewport({
        width: bp.width,
        height: bp.height,
        deviceScaleFactor: 1,
      });

      // Short delay for media queries to settle and animations to update
      await new Promise((r) => setTimeout(r, 500));

      // Programmatic audit checks
      const metrics = await page.evaluate((bpWidth) => {
        const docScrollWidth = document.documentElement.scrollWidth;
        const windowInnerWidth = window.innerWidth;
        const hasHorizontalScroll = docScrollWidth > windowInnerWidth;

        // Find overflowing elements if any
        const overflowingElements = [];
        if (hasHorizontalScroll) {
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            const rect = el.getBoundingClientRect();
            if (rect.right > windowInnerWidth + 1) {
              const tag = el.tagName.toLowerCase();
              const cls = typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join('.') : '';
              overflowingElements.push(`${tag}.${cls} (right: ${Math.round(rect.right)}px vs viewport: ${windowInnerWidth}px)`);
              if (overflowingElements.length >= 5) break;
            }
          }
        }

        // Touch target check (below 1024px)
        const smallTouchTargets = [];
        if (bpWidth < 1024) {
          const clickables = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
          for (const el of clickables) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
              // Ignore hidden or small decorative items
              if (el.offsetParent !== null && rect.top > -100 && rect.top < 3000) {
                const text = (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 20);
                smallTouchTargets.push({
                  tag: el.tagName.toLowerCase(),
                  text,
                  width: Math.round(rect.width),
                  height: Math.round(rect.height),
                });
                if (smallTouchTargets.length >= 10) break;
              }
            }
          }
        }

        // Check font-size < 16px on form inputs (causes iOS auto-zoom)
        const inputsUnder16px = [];
        const formInputs = document.querySelectorAll('input, select, textarea');
        for (const input of formInputs) {
          const fs = window.getComputedStyle(input).fontSize;
          const fsNum = parseFloat(fs);
          if (fsNum < 16) {
            inputsUnder16px.push({
              name: input.getAttribute('name') || input.getAttribute('placeholder') || input.tagName,
              fontSize: fs,
            });
          }
        }

        return {
          docScrollWidth,
          windowInnerWidth,
          hasHorizontalScroll,
          overflowingElements,
          smallTouchTargetsCount: smallTouchTargets.length,
          smallTouchTargets: smallTouchTargets.slice(0, 5),
          inputsUnder16px,
        };
      }, bp.width);

      // Save screenshot
      const screenshotPath = path.join(pageDir, `${bp.id}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const status = metrics.hasHorizontalScroll ? 'FAIL (Horizontal Scroll)' : 'PASS';
      console.log(`  [${bp.id}] ${status} — scrollWidth: ${metrics.docScrollWidth}px / viewport: ${metrics.windowInnerWidth}px`);
      if (metrics.hasHorizontalScroll) {
        console.log(`    Overflowing elements:`, metrics.overflowingElements);
      }
      if (metrics.inputsUnder16px.length > 0) {
        console.log(`    Inputs < 16px:`, metrics.inputsUnder16px);
      }

      auditReport.push({
        page: p.id,
        path: p.path,
        breakpoint: bp.id,
        width: bp.width,
        height: bp.height,
        label: bp.label,
        metrics,
        screenshotRel: `${p.id}/${bp.id}.png`,
      });
    }
  }

  await browser.close();

  // Write audit data
  const jsonPath = path.join(__dirname, '..', 'qa', 'responsive', 'audit-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(auditReport, null, 2));

  // Generate qa/responsive/index.html
  generateGridHtml(auditReport);
  console.log('\nBaseline audit completed successfully.');
  console.log(`Grid page generated at: qa/responsive/index.html`);
}

function generateGridHtml(auditReport) {
  const pages = [...new Set(auditReport.map((a) => a.page))];
  const breakpoints = [...new Set(auditReport.map((a) => a.breakpoint))];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hopfield Labs — Responsive Baseline Audit Grid</title>
  <style>
    :root {
      --bg: #08090C;
      --surface: #101319;
      --surface-2: #161A22;
      --border: #232935;
      --border-strong: #323A4A;
      --fg: #E9ECF2;
      --fg-muted: #939CB0;
      --accent: #4F7DFF;
      --signal: #00D6A4;
      --danger: #FF5C5C;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--fg);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      padding: 32px 24px;
      line-height: 1.5;
    }
    .header {
      max-width: 1400px;
      margin: 0 auto 32px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
    }
    .eyebrow {
      font-family: monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--signal);
    }
    h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 8px 0;
    }
    p {
      color: var(--fg-muted);
      font-size: 14px;
      max-width: 800px;
    }
    .summary-stats {
      display: flex;
      gap: 16px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
    .stat-pill {
      background: var(--surface-2);
      border: 1px solid var(--border);
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-family: monospace;
    }
    .tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      flex-wrap: wrap;
    }
    .tab-btn {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--fg-muted);
      padding: 8px 16px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 12px;
      cursor: pointer;
      text-transform: uppercase;
    }
    .tab-btn.active {
      background: var(--signal);
      color: #08090C;
      font-weight: 600;
      border-color: var(--signal);
    }
    .page-section {
      max-width: 1400px;
      margin: 0 auto 48px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .badge {
      font-size: 11px;
      font-family: monospace;
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid var(--border);
    }
    .badge-pass { color: var(--signal); border-color: rgba(0,214,164,0.3); background: rgba(0,214,164,0.1); }
    .badge-fail { color: var(--danger); border-color: rgba(255,92,92,0.3); background: rgba(255,92,92,0.1); }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .card-header {
      padding: 12px 16px;
      background: var(--surface-2);
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-family: monospace;
    }
    .card-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .img-wrap {
      width: 100%;
      height: 380px;
      overflow-y: auto;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: #000;
    }
    .img-wrap img {
      width: 100%;
      display: block;
    }
    .audit-notes {
      font-size: 11px;
      font-family: monospace;
      color: var(--fg-muted);
      line-height: 1.4;
      padding: 6px 8px;
      background: var(--surface-2);
      border-radius: 4px;
    }
    .audit-fail {
      color: var(--danger);
      background: rgba(255, 92, 92, 0.1);
      border: 1px solid rgba(255, 92, 92, 0.2);
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="eyebrow">HOPFIELD LABS // RESPONSIVE AUDIT TESTBENCH</div>
    <h1>Baseline Responsive Visual Verification Grid</h1>
    <p>
      Programmatic audit across 7 core pages and 10 device breakpoints (320px to 1920px, including phone and tablet landscape orientations).
      Evaluated for horizontal scrollbars, touch target minimums, iOS font-size thresholds, and viewport layout constraints.
    </p>
    <div class="summary-stats">
      <div class="stat-pill">TOTAL SCREENSHOTS: <strong>${auditReport.length}</strong></div>
      <div class="stat-pill">PAGES AUDITED: <strong>${pages.length}</strong></div>
      <div class="stat-pill">BREAKPOINTS: <strong>${breakpoints.length}</strong></div>
      <div class="stat-pill" style="color: ${auditReport.some((a) => a.metrics.hasHorizontalScroll) ? 'var(--danger)' : 'var(--signal)'};">
        OVERFLOW DETECTED: <strong>${auditReport.filter((a) => a.metrics.hasHorizontalScroll).length}</strong>
      </div>
    </div>
  </div>

  ${pages
    .map((pageId) => {
      const items = auditReport.filter((a) => a.page === pageId);
      const pageFail = items.some((i) => i.metrics.hasHorizontalScroll);
      return `
    <section class="page-section" id="page-${pageId}">
      <div class="section-title">
        <span>Page: <code>/${pageId === 'home' ? '' : items[0].path.replace('/', '')}</code></span>
        <span class="badge ${pageFail ? 'badge-fail' : 'badge-pass'}">
          ${pageFail ? 'HAS OVERFLOW' : 'ZERO HORIZONTAL SCROLL'}
        </span>
      </div>

      <div class="grid">
        ${items
          .map(
            (item) => `
          <div class="card">
            <div class="card-header">
              <span><strong>${item.label}</strong></span>
              <span class="${item.metrics.hasHorizontalScroll ? 'badge-fail' : 'badge-pass'} badge">
                ${item.metrics.hasHorizontalScroll ? 'OVERFLOW' : 'PASS'}
              </span>
            </div>
            <div class="card-body">
              <div class="img-wrap">
                <img src="${item.screenshotRel}" alt="${item.page} at ${item.breakpoint}" loading="lazy" />
              </div>
              <div class="audit-notes ${item.metrics.hasHorizontalScroll ? 'audit-fail' : ''}">
                <div>ScrollWidth: ${item.metrics.docScrollWidth}px / Viewport: ${item.metrics.windowInnerWidth}px</div>
                ${
                  item.metrics.hasHorizontalScroll
                    ? `<div>⚠️ Overflow: ${item.metrics.overflowingElements[0] || 'Container edge'}</div>`
                    : `<div>✓ No horizontal overflow</div>`
                }
                ${
                  item.metrics.inputsUnder16px.length > 0
                    ? `<div style="color: #FFB347;">⚠️ ${item.metrics.inputsUnder16px.length} input(s) &lt; 16px font</div>`
                    : ''
                }
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>
      `;
    })
    .join('')}
</body>
</html>`;

  const indexPath = path.join(__dirname, '..', 'qa', 'responsive', 'index.html');
  fs.writeFileSync(indexPath, html);
}

run().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
