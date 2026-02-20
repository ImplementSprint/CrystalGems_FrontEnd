/**
 * Selenium E2E Test Runner — System A
 *
 * Usage: node tests/e2e/run-selenium.js
 *
 * Requires:
 *  - selenium-webdriver (npm install -D selenium-webdriver)
 *  - A running instance of the app (or a deployed URL)
 *  - Chrome/ChromeDriver available in PATH
 */
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async () => {
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    const baseUrl = process.env.E2E_BASE_URL || 'http://localhost:5173';
    await driver.get(baseUrl);

    // Wait for the page to load
    await driver.wait(until.titleContains('Vite'), 10000);
    console.log('✅ Page loaded successfully');

    // Example: verify a heading exists
    const heading = await driver.findElement(By.css('h1'));
    const text = await heading.getText();
    console.log(`✅ Found heading: ${text}`);

    console.log('✅ All E2E tests passed');
  } catch (err) {
    console.error('❌ E2E test failed:', err.message);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();
