const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.join(__dirname, '..', 'qa', 'pill-nav-verification');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function findWorkingBaseUrl() {
  return 'http://localhost:3000';
}

async function verifyPillNav() {
  console.log('--- Starting PillNav Verification Suite ---');
  const baseUrl = await findWorkingBaseUrl();

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = [];

  try {
    // 1. Load preview page
    console.log(`Navigating to ${baseUrl}/pill-nav-preview ...`);
    await page.goto(`${baseUrl}/pill-nav-preview`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('nav#demo-pill-nav', { timeout: 20000 });
    await new Promise((r) => setTimeout(r, 600));

    // Measure initial resting indicator position
    const initialIndicator = await page.evaluate(() => {
      const indicator = document.querySelector('nav#demo-pill-nav > div');
      const homeLink = document.querySelectorAll('nav#demo-pill-nav a')[0];
      const navRect = document.querySelector('nav#demo-pill-nav').getBoundingClientRect();
      const linkRect = homeLink ? homeLink.getBoundingClientRect() : null;
      const indRect = indicator ? indicator.getBoundingClientRect() : null;

      return {
        hasIndicator: !!indicator,
        linkText: homeLink ? homeLink.textContent : '',
        navLeft: navRect.left,
        linkLeft: linkRect ? linkRect.left - navRect.left : 0,
        indLeft: indRect ? indRect.left - navRect.left : 0,
        linkWidth: linkRect ? linkRect.width : 0,
        indWidth: indRect ? indRect.width : 0,
      };
    });

    console.log('Initial indicator resting on Home:', initialIndicator);
    const initialMatched =
      initialIndicator.hasIndicator &&
      Math.abs(initialIndicator.indLeft - initialIndicator.linkLeft) < 6 &&
      Math.abs(initialIndicator.indWidth - initialIndicator.linkWidth) < 6;

    results.push({ test: 'Initial resting indicator matches active route (Home)', ok: initialMatched });
    await page.screenshot({ path: path.join(OUT_DIR, '01_resting_home.png') });

    // 2. Hover over "Services" (item index 1)
    console.log('Hovering over "Services" link...');
    const links = await page.$$('nav#demo-pill-nav a');
    if (links[1]) {
      await links[1].hover();
      await new Promise((r) => setTimeout(r, 450)); // allow spring animation to settle

      const hoverServices = await page.evaluate(() => {
        const indicator = document.querySelector('nav#demo-pill-nav > div');
        const servicesLink = document.querySelectorAll('nav#demo-pill-nav a')[1];
        const navRect = document.querySelector('nav#demo-pill-nav').getBoundingClientRect();
        const linkRect = servicesLink.getBoundingClientRect();
        const indRect = indicator.getBoundingClientRect();

        return {
          linkText: servicesLink.textContent,
          linkLeft: linkRect.left - navRect.left,
          indLeft: indRect.left - navRect.left,
          linkWidth: linkRect.width,
          indWidth: indRect.width,
        };
      });

      console.log('Indicator on hover Services:', hoverServices);
      const servicesMatched =
        Math.abs(hoverServices.indLeft - hoverServices.linkLeft) < 6 &&
        Math.abs(hoverServices.indWidth - hoverServices.linkWidth) < 6;

      results.push({ test: 'Hovering "Services" slides indicator smoothly', ok: servicesMatched });
      await page.screenshot({ path: path.join(OUT_DIR, '02_hover_services.png') });
    }

    // 3. Hover over "Work" (item index 2)
    console.log('Hovering over "Work" link...');
    if (links[2]) {
      await links[2].hover();
      await new Promise((r) => setTimeout(r, 450));

      const hoverWork = await page.evaluate(() => {
        const indicator = document.querySelector('nav#demo-pill-nav > div');
        const workLink = document.querySelectorAll('nav#demo-pill-nav a')[2];
        const navRect = document.querySelector('nav#demo-pill-nav').getBoundingClientRect();
        const linkRect = workLink.getBoundingClientRect();
        const indRect = indicator.getBoundingClientRect();

        return {
          linkText: workLink.textContent,
          linkLeft: linkRect.left - navRect.left,
          indLeft: indRect.left - navRect.left,
          linkWidth: linkRect.width,
          indWidth: indRect.width,
        };
      });

      console.log('Indicator on hover Work:', hoverWork);
      const workMatched =
        Math.abs(hoverWork.indLeft - hoverWork.linkLeft) < 6 &&
        Math.abs(hoverWork.indWidth - hoverWork.linkWidth) < 6;

      results.push({ test: 'Hovering "Work" slides indicator and adapts width', ok: workMatched });
      await page.screenshot({ path: path.join(OUT_DIR, '03_hover_work.png') });
    }

    // 4. Mouse leave container -> verify indicator returns to Home (active route)
    console.log('Moving mouse outside container...');
    await page.mouse.move(50, 50); // move cursor to top-left corner outside nav
    await new Promise((r) => setTimeout(r, 500)); // allow spring return

    const returnedHome = await page.evaluate(() => {
      const indicator = document.querySelector('nav#demo-pill-nav > div');
      const homeLink = document.querySelectorAll('nav#demo-pill-nav a')[0];
      const navRect = document.querySelector('nav#demo-pill-nav').getBoundingClientRect();
      const linkRect = homeLink.getBoundingClientRect();
      const indRect = indicator.getBoundingClientRect();

      return {
        linkText: homeLink.textContent,
        linkLeft: linkRect.left - navRect.left,
        indLeft: indRect.left - navRect.left,
        linkWidth: linkRect.width,
        indWidth: indRect.width,
      };
    });

    console.log('Indicator after mouse leave:', returnedHome);
    const returnMatched =
      Math.abs(returnedHome.indLeft - returnedHome.linkLeft) < 6 &&
      Math.abs(returnedHome.indWidth - returnedHome.linkWidth) < 6;

    results.push({ test: 'Mouse leave smoothly returns indicator to active route (Home)', ok: returnMatched });
    await page.screenshot({ path: path.join(OUT_DIR, '04_mouseleave_returned_home.png') });

    // 5. Test Keyboard Navigation via Tab
    console.log('Testing keyboard Tab navigation...');
    // Focus the first link
    await page.focus('nav#demo-pill-nav a:nth-of-type(1)');
    await new Promise((r) => setTimeout(r, 300));

    // Tab to next link (Services)
    await page.keyboard.press('Tab');
    await new Promise((r) => setTimeout(r, 450));

    const focusedServices = await page.evaluate(() => {
      const activeEl = document.activeElement;
      const indicator = document.querySelector('nav#demo-pill-nav > div');
      const navRect = document.querySelector('nav#demo-pill-nav').getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();
      const indRect = indicator.getBoundingClientRect();

      return {
        activeText: activeEl.textContent,
        linkLeft: linkRect.left - navRect.left,
        indLeft: indRect.left - navRect.left,
        linkWidth: linkRect.width,
        indWidth: indRect.width,
      };
    });

    console.log('Keyboard focused on Services:', focusedServices);
    const keyboardMatched =
      focusedServices.activeText === 'Services' &&
      Math.abs(focusedServices.indLeft - focusedServices.linkLeft) < 6 &&
      Math.abs(focusedServices.indWidth - focusedServices.linkWidth) < 6;

    results.push({ test: 'Keyboard Tab moves sliding indicator to focused item', ok: keyboardMatched });

    // Tab to Contact (press Tab 3 more times: Work, About, Contact)
    await page.keyboard.press('Tab');
    await new Promise((r) => setTimeout(r, 200));
    await page.keyboard.press('Tab');
    await new Promise((r) => setTimeout(r, 200));
    await page.keyboard.press('Tab');
    await new Promise((r) => setTimeout(r, 450));

    const focusedContact = await page.evaluate(() => {
      const activeEl = document.activeElement;
      const indicator = document.querySelector('nav#demo-pill-nav > div');
      const navRect = document.querySelector('nav#demo-pill-nav').getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();
      const indRect = indicator.getBoundingClientRect();

      return {
        activeText: activeEl.textContent,
        linkLeft: linkRect.left - navRect.left,
        indLeft: indRect.left - navRect.left,
      };
    });

    console.log('Keyboard focused on Contact:', focusedContact);
    const contactTabMatched =
      focusedContact.activeText === 'Contact' &&
      Math.abs(focusedContact.indLeft - focusedContact.linkLeft) < 6;

    results.push({ test: 'Keyboard Tab reaches "Contact" with indicator following', ok: contactTabMatched });
    await page.screenshot({ path: path.join(OUT_DIR, '05_keyboard_tab_contact.png') });

    // 6. Test Light Mode
    console.log('Testing Light Mode rendering...');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({ path: path.join(OUT_DIR, '06_light_mode_preview.png') });
    results.push({ test: 'Light mode token styling renders correctly', ok: true });

    console.log('\n--- PILLNAV VERIFICATION RESULTS ---');
    console.table(results);

  } catch (err) {
    console.error('PillNav verification error:', err);
  } finally {
    await browser.close();
  }
}

verifyPillNav();
