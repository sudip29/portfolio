const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push('PAGE ERROR: ' + err.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'verify_hero.png' });

  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'verify_skills.png' });

  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'verify_experience.png' });

  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'verify_projects.png' });

  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'verify_contact.png' });

  console.log('ERRORS:', JSON.stringify(consoleErrors));
  console.log('DONE');
  await browser.close();
})();
