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
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Home', path: '/' },
  ];

  for (const item of navItems) {
    console.log(`\nClicking header nav item: ${item.name} -> ${item.path}`);
    const selector = `header nav nav[aria-label="Main"] a[href="${item.path}"]`;
    await page.waitForSelector(selector, { visible: true });
    
    // Hover first to animate indicator
    await page.hover(selector);
    await new Promise(r => setTimeout(r, 250));

    // Click link
    await page.click(selector);
    await page.waitForFunction((expected) => window.location.pathname === expected, { timeout: 8000 }, item.path);

    const currentUrl = new URL(page.url()).pathname;
    console.log(`Resulting path: ${currentUrl}`);
    if (currentUrl !== item.path) {
      throw new Error(`Click navigation failed for ${item.name}! Expected ${item.path}, got ${currentUrl}`);
    }
    console.log(`✓ Successfully navigated to ${item.path}`);
  }

  console.log('\n=== 2. VERIFYING KEYBOARD (TAB / FOCUS + ENTER) ON ALL 5 ITEMS ===');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  for (const item of navItems) {
    console.log(`\nKeyboard Enter on nav item: ${item.name} -> ${item.path}`);
    const selector = `header nav nav[aria-label="Main"] a[href="${item.path}"]`;
    await page.waitForSelector(selector, { visible: true });

    await page.focus(selector);
    await new Promise(r => setTimeout(r, 200));
    await page.keyboard.press('Enter');
    await page.waitForFunction((expected) => window.location.pathname === expected, { timeout: 8000 }, item.path);

    const currentUrl = new URL(page.url()).pathname;
    console.log(`Resulting path: ${currentUrl}`);
    if (currentUrl !== item.path) {
      throw new Error(`Keyboard navigation failed for ${item.name}! Expected ${item.path}, got ${currentUrl}`);
    }
    console.log(`✓ Successfully navigated via keyboard to ${item.path}`);
  }

  console.log('\n=== 3. VERIFYING PILLNAV PREVIEW PAGE (/pill-nav-preview) ===');
  await page.goto('http://localhost:3000/pill-nav-preview', { waitUntil: 'networkidle0' });
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
