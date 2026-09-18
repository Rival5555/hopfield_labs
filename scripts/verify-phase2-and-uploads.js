const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '..', 'qa', 'intake-verification');

async function testUploadsAndMagicLink() {
  console.log('--- Testing File Uploads & Magic Link Save-and-Resume ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const results = [];

  try {
    // 1. Navigate to /start
    await page.goto(`${BASE_URL}/start`, { waitUntil: 'networkidle0' });

    // Step 1: Select "Mobile App"
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const mobileBtn = buttons.find((b) => b.textContent.includes('Native Mobile App'));
      if (mobileBtn) mobileBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Next to Step 2
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent.includes('Continue to Step 02'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Step 2: Select "Solo founder"
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const soloBtn = buttons.find((b) => b.textContent.includes('Solo founder'));
      if (soloBtn) soloBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // 2. Test "Want to finish this later?" inline prompt on Step 2
    console.log('Testing magic link input on Step 2...');
    await page.waitForSelector('input[placeholder="Enter your email..."]', { timeout: 4000 });
    await page.type('input[placeholder="Enter your email..."]', 'founder@teststartup.io');
    
    // Click "Email link" button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const emailBtn = buttons.find((b) => b.textContent.includes('Email link'));
      if (emailBtn) emailBtn.click();
    });

    await new Promise((r) => setTimeout(r, 1200));

    const emailSentMsg = await page.evaluate(() => {
      return document.body.textContent.includes('Resume link sent to founder@teststartup.io') ||
             document.body.textContent.includes('Magic resume link sent to your email');
    });
    console.log('Magic link dispatched:', emailSentMsg);
    results.push({ test: 'Magic link email prompt sends successfully', ok: emailSentMsg });

    // Grab draft token from session
    const draftToken = await page.evaluate(() => {
      const stored = sessionStorage.getItem('hopfield_intake_v1');
      return stored ? JSON.parse(stored).draftToken : null;
    });
    console.log('Saved draft token for resume:', draftToken);

    // 3. Open fresh incognito context / page to simulate cross-device / cross-session resume
    console.log('Simulating cross-session restore with ?resume=<token>...');
    const context = await browser.createBrowserContext();
    const resumePage = await context.newPage();
    await resumePage.setViewport({ width: 1280, height: 900 });

    await resumePage.goto(`${BASE_URL}/start?resume=${encodeURIComponent(draftToken)}`, {
      waitUntil: 'networkidle0',
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Check if the service and stage rehydrated
    const rehydratedStage = await resumePage.evaluate(() => {
      const stored = sessionStorage.getItem('hopfield_intake_v1');
      return stored ? JSON.parse(stored) : null;
    });
    console.log('Rehydrated state on fresh browser session:', rehydratedStage);
    const isRehydrated = rehydratedStage && rehydratedStage.service === 'mobile-development' && rehydratedStage.stage === 'solo-founder';
    results.push({ test: 'Cross-session rehydration via ?resume=<token>', ok: !!isRehydrated });
    await resumePage.screenshot({ path: path.join(OUT_DIR, '09_resume_rehydrated.png') });

    // 4. Test File Upload in Step 5 on the original page
    console.log('Navigating forward through Steps 2 -> 3 -> 4 -> 5...');
    // Step 2 -> 3
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent.includes('Continue to Step 03'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Step 3 -> 4
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent.includes('Continue to Step 04'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Step 4 -> 5
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const contBtn = buttons.find((b) => b.textContent.includes('Looks good, continue'));
      if (contBtn) contBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    // Create a temporary test document for upload
    const testFilePath = path.join(OUT_DIR, 'architecture_spec.pdf');
    fs.writeFileSync(testFilePath, '%PDF-1.4 Mock PDF Architecture Specification for Testing');

    // Upload via file input
    const fileInput = await page.$('#attachment-file-input');
    if (fileInput) {
      await fileInput.uploadFile(testFilePath);
      console.log('Test file attached to dropzone.');
      await new Promise((r) => setTimeout(r, 1200));

      const fileUploaded = await page.evaluate(() => {
        return document.body.textContent.includes('architecture_spec.pdf') &&
               (document.body.textContent.includes('Uploaded') || document.body.textContent.includes('MB'));
      });
      console.log('File upload completed in UI:', fileUploaded);
      results.push({ test: 'Direct file upload with progress bar', ok: fileUploaded });
      await page.screenshot({ path: path.join(OUT_DIR, '10_step5_file_uploaded.png') });

      // Test remove file
      await page.evaluate(() => {
        const removeBtn = document.querySelector('button[aria-label="Remove file"]');
        if (removeBtn) removeBtn.click();
      });
      await new Promise((r) => setTimeout(r, 400));

      const fileRemoved = await page.evaluate(() => {
        return !document.body.textContent.includes('architecture_spec.pdf');
      });
      console.log('File removed before final submit:', fileRemoved);
      results.push({ test: 'Remove uploaded file', ok: fileRemoved });
    }

    // 5. Fill and submit Step 5 form
    console.log('Filling contact info and transmitting project brief...');
    await page.type('input[placeholder="e.g. Alex Rivera"]', 'Sarah Jenkins');
    await page.type('input[placeholder="alex@company.com"]', 'sarah@prismtechnologies.io');
    await page.type('input[placeholder="e.g. Acme Health or Self"]', 'Prism Technologies');
    await page.select('select[name="heardFrom"]', 'linkedin');
    await page.type('input[placeholder="https://figma.com/file/..."]', 'https://figma.com/file/12345/Prism-Mobile');
    await page.type('textarea', 'Engineering a high-performance cross-platform mobile app with BLE sensors and offline synchronization.');

    await page.screenshot({ path: path.join(OUT_DIR, '11_step5_ready_to_submit.png') });

    // Submit
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitBtn = buttons.find((b) => b.textContent.includes('Transmit Project Specification'));
      if (submitBtn) submitBtn.click();
    });

    await new Promise((r) => setTimeout(r, 1500));

    const successScreen = await page.evaluate(() => {
      return document.body.textContent.includes('Project Brief Transmitted Successfully') ||
             document.body.textContent.includes('12H SLA');
    });
    console.log('Final submission success screen shown:', successScreen);
    results.push({ test: 'Final project brief submission & success screen', ok: successScreen });
    await page.screenshot({ path: path.join(OUT_DIR, '12_final_submission_success.png') });

    console.log('\n--- PHASE 2 & UPLOAD VERIFICATION RESULTS ---');
    console.table(results);

  } catch (err) {
    console.error('Phase 2 verification error:', err);
  } finally {
    await browser.close();
  }
}

testUploadsAndMagicLink();
