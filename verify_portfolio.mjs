const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });

  // Wait for loading screen to finish
  await page.waitForTimeout(2500);

  // Screenshot: Hero
  await page.screenshot({ path: 'verify_hero.png', fullPage: false });

  // Scroll to Skills
  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'verify_skills.png', fullPage: false });

  // Scroll to Experience
  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'verify_experience.png', fullPage: false });

  // Scroll to Projects
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'verify_projects.png', fullPage: false });

  // Scroll to Contact
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'verify_contact.png', fullPage: false });

  // Check for console errors
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  console.log('DONE');
  await browser.close();
})();
