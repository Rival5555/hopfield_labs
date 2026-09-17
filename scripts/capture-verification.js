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
  console.log('Launching headless browser for responsive verification capture...');
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

    console.log(`\nVerifying Page: ${p.id} (${p.path})`);
    const url = `http://localhost:3000${p.path}`;

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await new Promise((r) => setTimeout(r, 800));

    for (const bp of BREAKPOINTS) {
      await page.setViewport({
        width: bp.width,
        height: bp.height,
        deviceScaleFactor: 1,
      });

      await new Promise((r) => setTimeout(r, 450));

      const metrics = await page.evaluate((bpWidth) => {
        const docScrollWidth = document.documentElement.scrollWidth;
        const windowInnerWidth = window.innerWidth;
        const hasHorizontalScroll = docScrollWidth > windowInnerWidth;

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

        // Check font-size < 16px on visible form inputs (causes iOS auto-zoom)
        const inputsUnder16px = [];
        const formInputs = document.querySelectorAll('input, select, textarea');
        for (const input of formInputs) {
          if (input.type === 'hidden' || input.offsetParent === null) continue;
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
          inputsUnder16px,
        };
      }, bp.width);

      // Save fixed screenshot
      const fixedScreenshotPath = path.join(pageDir, `${bp.id}-fixed.png`);
      await page.screenshot({ path: fixedScreenshotPath, fullPage: true });

      const status = metrics.hasHorizontalScroll ? 'FAIL (Horizontal Scroll)' : 'PASS';
      console.log(`  [${bp.id}] ${status} — scrollWidth: ${metrics.docScrollWidth}px / viewport: ${metrics.windowInnerWidth}px | Inputs < 16px: ${metrics.inputsUnder16px.length}`);

      auditReport.push({
        page: p.id,
        path: p.path,
        breakpoint: bp.id,
        width: bp.width,
        height: bp.height,
        label: bp.label,
        metrics,
        beforeScreenshotRel: `${p.id}/${bp.id}.png`,
        afterScreenshotRel: `${p.id}/${bp.id}-fixed.png`,
      });
    }
  }

  await browser.close();

  // Save verification report
  const jsonPath = path.join(__dirname, '..', 'qa', 'responsive', 'verification-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(auditReport, null, 2));

  console.log('\nVerification audit completed successfully.');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
