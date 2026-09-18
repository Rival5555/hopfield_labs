const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyAll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('=== 1. VERIFYING DESKTOP HEADER PILLNAV CLICKS ===');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Home', path: '/' },
  ];

  for (const item of navItems) {
    console.log(`\nClicking header nav item: ${item.name} -> ${item.path}`);
    const selector = `#header-pill-nav a[href="${item.path}"]`;
    console.log('1. Waiting for selector:', selector);
    await page.waitForFunction(() => document.querySelector('#header-pill-nav') !== null, { timeout: 15000 });
    await page.waitForFunction((sel) => !!document.querySelector(sel), { timeout: 15000 }, selector);
    
    console.log('2. Hovering to verify cursor tracking...');
    await page.hover(selector);
    await new Promise(r => setTimeout(r, 250));

    console.log('3. Clicking...');
    await page.click(selector);
    console.log('4. Polling URL...');
    const clickStart = Date.now();
    while (Date.now() - clickStart < 10000) {
      const p = new URL(page.url()).pathname;
      if (p === item.path) {
        console.log(`Matched URL ${p}`);
        break;
      }
      await new Promise(r => setTimeout(r, 200));
    }
    console.log(`After click poll, current URL: ${page.url()}`);
    // Allow Next.js route transition to settle
    await new Promise(r => setTimeout(r, 1200));

    const currentUrl = new URL(page.url()).pathname;
    console.log(`Resulting path: ${currentUrl}`);
    if (currentUrl !== item.path) {
      throw new Error(`Click navigation failed for ${item.name}! Expected ${item.path}, got ${currentUrl}`);
    }
    console.log(`✓ Successfully navigated to ${item.path}`);
  }

  console.log('\n=== 2. VERIFYING KEYBOARD (TAB / FOCUS + ENTER) ON ALL 5 ITEMS ===');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  for (const item of navItems) {
    console.log(`\nKeyboard Enter on nav item: ${item.name} -> ${item.path}`);
    const selector = `#header-pill-nav a[href="${item.path}"]`;
    await page.waitForFunction(() => document.querySelector('#header-pill-nav') !== null, { timeout: 15000 });
    await page.waitForFunction((sel) => !!document.querySelector(sel), { timeout: 15000 }, selector);

    await page.focus(selector);
    await new Promise(r => setTimeout(r, 200));
    await page.keyboard.press('Enter');
    const enterStart = Date.now();
    while (Date.now() - enterStart < 10000) {
      if (new URL(page.url()).pathname === item.path) break;
      await new Promise(r => setTimeout(r, 100));
    }
    // Allow Next.js route transition to settle
    await new Promise(r => setTimeout(r, 1200));

    const currentUrl = new URL(page.url()).pathname;
    console.log(`Resulting path: ${currentUrl}`);
    if (currentUrl !== item.path) {
      throw new Error(`Keyboard navigation failed for ${item.name}! Expected ${item.path}, got ${currentUrl}`);
    }
    console.log(`✓ Successfully navigated via keyboard to ${item.path}`);
  }

  console.log('\n=== 3. VERIFYING PILLNAV PREVIEW PAGE (/pill-nav-preview) ===');
  await page.goto('http://localhost:3000/pill-nav-preview', { waitUntil: 'domcontentloaded' });
  const previewSelector = '#demo-pill-nav a[href="/services"]';
  await page.waitForSelector(previewSelector, { visible: true });
  await page.click(previewSelector);
  await new Promise(r => setTimeout(r, 1200));

  const previewCurrent = new URL(page.url()).pathname;
  console.log(`Preview click navigated to: ${previewCurrent}`);
  if (previewCurrent !== '/services') {
    throw new Error(`Preview click failed! Expected /services, got ${previewCurrent}`);
  }
  console.log(`✓ Successfully navigated from preview demo to /services`);

  await browser.close();
  console.log('\n========================================');
  console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  console.log('========================================');
}

verifyAll().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
