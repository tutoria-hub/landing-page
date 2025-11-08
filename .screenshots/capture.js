// Quick screenshot capture for header validation
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: '.screenshots/desktop-1440x900.png',
    clip: { x: 0, y: 0, width: 1440, height: 400 } // Header + hero only
  });

  // Tablet
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: '.screenshots/tablet-768x1024.png',
    clip: { x: 0, y: 0, width: 768, height: 600 }
  });

  // Mobile
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: '.screenshots/mobile-375x667.png',
    clip: { x: 0, y: 0, width: 375, height: 500 }
  });

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
