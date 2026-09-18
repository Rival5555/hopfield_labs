const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '..', 'qa', 'intake-verification');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('--- Starting Intake Flow Verification ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const results = [];

  try {
    // -------------------------------------------------------------
    // Test 1: Load /start and verify Step 1 (Services)
    // -------------------------------------------------------------
    console.log('1. Loading /start ...');
    await page.goto(`${BASE_URL}/start`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(OUT_DIR, '01_step1_services.png') });
    
    const pageTitle = await page.title();
    console.log(`Page title: "${pageTitle}"`);
    results.push({ test: 'Load /start', ok: pageTitle.includes('Intake') || pageTitle.includes('Start') });

    // -------------------------------------------------------------
    // Test 2: Step 2 - Scope & Stage (Testing University Student auto-routing)
    // -------------------------------------------------------------
    console.log('2. Navigating to Step 2...');
    // Click "Continue to Step 02"
    const continueBtn = await page.waitForSelector('button:has-text("Continue to Step 02")', { timeout: 5000 })
      .catch(() => page.$('button.px-6'));
    if (continueBtn) await continueBtn.click();
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({ path: path.join(OUT_DIR, '02_step2_default.png') });

    // Select "University student" stage
    console.log('Clicking "University student" stage...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const studentBtn = buttons.find((b) => b.textContent.includes('University student'));
      if (studentBtn) studentBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const academicBannerVisible = await page.evaluate(() => {
      return document.body.textContent.includes('Academic Capstone & FYP Track Auto-Routed');
    });
    console.log('Academic auto-routing banner visible:', academicBannerVisible);
    results.push({ test: 'University student auto-routing banner', ok: academicBannerVisible });
    await page.screenshot({ path: path.join(OUT_DIR, '02_step2_student_selected.png') });

    // -------------------------------------------------------------
    // Test 3: Step 3 - Budget
    // -------------------------------------------------------------
    console.log('3. Navigating to Step 3...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent.includes('Continue to Step 03'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Select "Not sure yet"
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const undecidedBtn = buttons.find((b) => b.textContent.includes('Not sure yet'));
      if (undecidedBtn) undecidedBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUT_DIR, '03_step3_budget_undecided.png') });

    // -------------------------------------------------------------
    // Test 4: Step 4 - Instant Ballpark Estimate
    // -------------------------------------------------------------
    console.log('4. Navigating to Step 4 (Estimate)...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent.includes('Continue to Step 04'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    const estimateText = await page.evaluate(() => {
      return document.querySelector('.text-3xl, .text-5xl')?.textContent || '';
    });
    console.log('Computed Ballpark Estimate displayed:', estimateText);
    const hasEstimate = estimateText.includes('$');
    results.push({ test: 'Instant Estimate Displayed with "Not sure yet" budget', ok: hasEstimate });
    await page.screenshot({ path: path.join(OUT_DIR, '04_step4_estimate_student.png') });

    // -------------------------------------------------------------
    // Test 5: Step 5 - Contact, Attachments, Attribution & Cal qualification
    // -------------------------------------------------------------
    console.log('5. Navigating to Step 5 (Contact & Attachments)...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const continueBtn = buttons.find((b) => b.textContent.includes('Looks good, continue'));
      if (continueBtn) continueBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    await page.screenshot({ path: path.join(OUT_DIR, '05_step5_contact_student.png') });

    // Because stage is "university-student" AND budget is "undecided", Cal.com button should NOT be present
    const calPresentForStudent = await page.evaluate(() => {
      return document.body.textContent.includes('Or skip the form and book a call directly');
    });
    console.log('Cal.com branch hidden for university student / undecided:', !calPresentForStudent);
    results.push({ test: 'Cal.com branch hidden for university student', ok: !calPresentForStudent });

    // Check dynamic link field label for student:
    const linkLabel = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('label'));
      const l = labels.find((el) => el.textContent.includes('Proposal doc link'));
      return l ? l.textContent : '';
    });
    console.log('Dynamic link label for student:', linkLabel);
    results.push({ test: 'Dynamic link label matches student context', ok: linkLabel.includes('Proposal doc') });

    // -------------------------------------------------------------
    // Test 6: Qualified Lead Cal.com Branch Verification
    // (Funded Startup + 6k-12k)
    // -------------------------------------------------------------
    console.log('6. Testing Qualified Lead with Cal.com Branch...');
    // Jump back to step 2 via stepper pill
    await page.evaluate(() => {
      const pills = Array.from(document.querySelectorAll('button'));
      const scopePill = pills.find((b) => b.textContent.includes('Scope & Stage'));
      if (scopePill) scopePill.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Select Funded Startup
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const fundedBtn = buttons.find((b) => b.textContent.includes('Funded startup'));
      if (fundedBtn) fundedBtn.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    // Step 3
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent.includes('Continue to Step 03'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Select 6k-12k
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const budgetBtn = buttons.find((b) => b.textContent.includes('$6,000 – $12,000'));
      if (budgetBtn) budgetBtn.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    // Step 4
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent.includes('Continue to Step 04'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const fundedEstimate = await page.evaluate(() => {
      return document.querySelector('.text-3xl, .text-5xl')?.textContent || '';
    });
    console.log('Funded Startup Estimate displayed:', fundedEstimate);
    results.push({ test: 'Funded Startup Estimate ($7,500 – $12,500)', ok: fundedEstimate.includes('7,500') || fundedEstimate.includes('12,500') });
    await page.screenshot({ path: path.join(OUT_DIR, '06_step4_funded_startup_estimate.png') });

    // Step 5
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const continueBtn = buttons.find((b) => b.textContent.includes('Looks good, continue'));
      if (continueBtn) continueBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    // Now Cal.com option MUST be visible!
    const calPresentForFunded = await page.evaluate(() => {
      return document.body.textContent.includes('Or skip the form and book a call directly');
    });
    console.log('Cal.com branch visible for funded startup with qualified budget:', calPresentForFunded);
    results.push({ test: 'Cal.com branch visible for qualified funded lead', ok: calPresentForFunded });
    await page.screenshot({ path: path.join(OUT_DIR, '07_step5_funded_with_cal_branch.png') });

    // Click "Or skip the form and book a call directly"
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const calBtn = buttons.find((b) => b.textContent.includes('Or skip the form and book a call directly'));
      if (calBtn) calBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUT_DIR, '08_step5_cal_embed_opened.png') });

    // -------------------------------------------------------------
    // Test 7: Save-and-Resume Rehydration
    // -------------------------------------------------------------
    console.log('7. Testing Save-and-Resume Rehydration...');
    const draftToken = await page.evaluate(() => {
      const stored = sessionStorage.getItem('hopfield_intake_v1');
      return stored ? JSON.parse(stored).draftToken : null;
    });
    console.log('Current session draft token:', draftToken);
    results.push({ test: 'Draft token generated in session', ok: !!draftToken });

    // Print summary
    console.log('\n--- VERIFICATION RESULTS ---');
    console.table(results);

  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    await browser.close();
  }
}

runVerification();
