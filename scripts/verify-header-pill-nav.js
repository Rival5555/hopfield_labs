const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.join(__dirname, '..', 'qa', 'pill-nav-verification');

async function captureHeader() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // 1. Home page header
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, '07_header_home_dark.png') });

    // 2. Hover over "Services" in header
    const links = await page.$$('header nav nav a');
    if (links[1]) {
      await links[1].hover();
      await new Promise((r) => setTimeout(r, 450));
      await page.screenshot({ path: path.join(OUT_DIR, '08_header_hover_services.png') });
    }

    // 3. Navigate to /services
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, '09_header_active_services.png') });

    // 4. Light mode on /services
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUT_DIR, '10_header_services_light.png') });

    console.log('Header verification screenshots captured successfully!');
  } catch (err) {
    console.error('Error capturing header:', err);
  } finally {
    await browser.close();
  }
}

captureHeader();
