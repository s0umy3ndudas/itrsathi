const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteerExtra.use(StealthPlugin());
require('dotenv').config();
const axios = require('axios');
const path = require('path');

async function automateLoginAndScrape(pan, password, maxRetries = 3) {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`🌀 Attempt ${attempt} of ${maxRetries}`);
    
    let browser;
    let page;
    
    try {
      browser = await puppeteerExtra.launch({
        headless: 'new', // Changed from 'true' for better stability
        // executablePath: path.resolve(__dirname, '../chrome-bin/chrome-linux/chrome'),
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--window-size=1280,800',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-background-networking',
          '--memory-pressure-off',
          '--max_old_space_size=4096',
          '--disable-blink-features=AutomationControlled',
          '--disable-extensions',
          '--disable-plugins',
          '--disable-images',
          '--disable-javascript-harmony-shipping',
          '--disable-ipc-flooding-protection',
          '--disable-frame-rate-limit',
          '--disable-default-apps'
        ],
        ignoreDefaultArgs: ['--enable-automation'],
        defaultViewport: null
      });

      // Get existing page or create new one
      const pages = await browser.pages();
      page = pages.length > 0 ? pages[0] : await browser.newPage();
      
      // Set user agent
      await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
      
      // Set headers
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document'
      });

      // Add error listeners
      page.on('error', (error) => {
        console.error('Page error:', error);
      });

      page.on('pageerror', (error) => {
        console.error('Page script error:', error);
      });

      // Enhanced navigation with fallback
      console.log('Navigating to login page...');
      
      try {
        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', {
          waitUntil: 'networkidle2', // Changed for better stability
          timeout: 90000
        });
      } catch (navError) {
        console.log('Primary navigation failed, trying fallback...');
        
        // Fallback navigation
        await page.goto('https://eportal.incometax.gov.in/', {
          waitUntil: 'domcontentloaded',
          timeout: 60000
        });
        
        await delay(3000);
        
        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', {
          waitUntil: 'domcontentloaded',
          timeout: 60000
        });
      }

      await delay(5000);

      let currentUrl = page.url();
      console.log(`Current page URL: ${currentUrl}`);

      if (currentUrl.includes('captcha') || currentUrl.includes('security')) {
        console.log('Detected security/captcha page. Manual intervention required.');
        await delay(30000);
      }

      // Step 2: Enter PAN/User ID with better error handling
      console.log('Looking for input field...');
      await delay(3000);

      const userIdSelectors = [
        'input[formcontrolname="userId"]',
        'input#userId',
        'input[name="userId"]',
        'input[placeholder*="PAN"]',
        'input[type="text"]'
      ];

      let inputFieldFound = false;
      for (const selector of userIdSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000, visible: true });
          console.log(`Found input with selector: ${selector}`);
          await page.focus(selector);
          await page.keyboard.type(pan, { delay: 100 });
          inputFieldFound = true;
          break;
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!inputFieldFound) {
        console.log('Could not find input field.');
        throw new Error('User ID input field not found');
      }

      // Step 3: Click Continue/Login button with enhanced detection
      let buttonFound = false;
      const staticSelectors = [
        'button[type="submit"]',
        'button.submit-button',
        'button.continue-button'
      ];

      for (const selector of staticSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000, visible: true });
          console.log(`Found button with selector: ${selector}`);
          await page.click(selector);
          buttonFound = true;
          break;
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!buttonFound) {
        console.log('Trying fallback button search...');
        buttonFound = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          for (const btn of buttons) {
            const text = btn.innerText.trim().toLowerCase();
            if (text.includes('continue') || text.includes('login')) {
              btn.click();
              return true;
            }
          }
          return false;
        });
      }

      if (!buttonFound) {
        throw new Error('Continue/Login button not found');
      }

      // Step 4: Wait for password page with verification
      console.log('Waiting for password page to load...');
      
      try {
        await page.waitForFunction(
          () => window.location.href.includes('/login/password') || 
                document.querySelector('input[type="password"]') !== null,
          { timeout: 30000 }
        );
        console.log('Password page detected');
      } catch (waitError) {
        // Fallback check
        await delay(5000);
        const passwordPageReached = await page.evaluate(() => {
          return window.location.href.includes('/login/password') ||
                 document.querySelector('input[type="password"]') !== null;
        });
        
        if (!passwordPageReached) {
          throw new Error('Password page not detected');
        }
      }

      // Step 5: Handle checkbox with better error handling
      console.log('Looking for checkbox...');
      const checkboxSelectors = [
        'mat-checkbox input[type="checkbox"]',
        'mat-checkbox',
        'input[type="checkbox"]',
        '.mat-checkbox'
      ];

      for (const selector of checkboxSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000, visible: true });
          console.log(`Found checkbox: ${selector}`);
          await page.click(selector);
          break;
        } catch (e) {
          console.log(`Checkbox selector ${selector} not found, continuing...`);
        }
      }

      // Step 6: Enter password with enhanced detection
      console.log('Looking for password field...');
      const passwordSelectors = [
        'input[formcontrolname="password"]',
        'input[type="password"]',
        'input#password',
        'input[name="password"]'
      ];

      let passwordEntered = false;
      for (const selector of passwordSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 10000, visible: true });
          console.log(`Found password field: ${selector}`);
          await page.focus(selector);
          await page.keyboard.type(password, { delay: 100 });
          passwordEntered = true;
          break;
        } catch (e) {
          console.log(`Password selector ${selector} not found, trying next...`);
        }
      }

      if (!passwordEntered) {
        throw new Error('Password input not found');
      }

      // Enhanced login process
      console.log('Clicking login button...');
      let loginButtonClicked = false;
      
      for (const selector of staticSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000, visible: true });
          await page.click(selector);
          loginButtonClicked = true;
          break;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!loginButtonClicked) {
        loginButtonClicked = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          for (const btn of buttons) {
            const text = btn.innerText.trim().toLowerCase();
            if (text.includes('login') || text.includes('continue')) {
              btn.click();
              return true;
            }
          }
          return false;
        });
      }
      
      if (!loginButtonClicked) {
        throw new Error('Login button not found');
      }
      
      console.log('Initial login button clicked. Waiting for page update...');
      await delay(10000);
      
      // Check for "Login Here" button
      const loginHereFound = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        for (const btn of buttons) {
          const text = btn.innerText.trim().toLowerCase();
          if (text.includes('login here')) {
            btn.click();
            return true;
          }
        }
        return false;
      });
      
      if (loginHereFound) {
        console.log('"Login Here" button found and clicked. Waiting...');
        await delay(8000);
      } else {
        console.log('"Login Here" button not found. Proceeding...');
      }
      
      // Verify login success
      const loginSuccessful = await page.evaluate(() => {
        return !window.location.href.includes('/login') &&
               !document.querySelector('input[formcontrolname="userId"]') &&
               !document.querySelector('input[formcontrolname="password"]');
      });
      
      if (!loginSuccessful) {
        const errorMessage = await page.evaluate(() => {
          const errorElements = document.querySelectorAll('.error, .error-message, .alert');
          return Array.from(errorElements).map(el => el.textContent).join(' ');
        });
      
        if (errorMessage) {
          throw new Error(`Login failed: ${errorMessage}`);
        } else {
          throw new Error('Login verification failed (no error message detected)');
        }
      }
      
      console.log('Login successful!');
       
      // Get cookies
      const cookies = await page.cookies();
      const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

      if (cookieHeader) {
        console.log(`Found COOKIE: ${cookieHeader}`);
        
        try {
          console.log('calling for type FYA');
          await axios.post(`${process.env.API_URL}/sync`, {
            cookie: cookieHeader,
            pan,
            password,
            type: 'FYA',
          });

          console.log('calling for type FYI');
          await axios.post(`${process.env.API_URL}/sync`, {
            cookie: cookieHeader,
            pan,
            password,
            type: 'FYI',
          });

          console.log('🔍 Reading all demands');
          await axios.post(`${process.env.API_URL}/demands`, {
            cookie: cookieHeader,
            pan,
          });

          console.log('🔍 Reading all itrs');
          await axios.post(`${process.env.API_URL}/itr`, {
            cookie: cookieHeader,
            pan,
          });

          console.log('🔍 Reading all audits');
          await axios.post(`${process.env.API_URL}/audit`, {
            cookie: cookieHeader,
            pan,
          });
        } catch (e) {
          console.log('sync call error: ' + e.message);
        }
      } else {
        console.log('⚠️ No cookie found to save.');
      }

      await browser.close();
      return { success: true, message: 'Login and scrape successful' };

    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error.message);
      
      // Take screenshot for debugging
      if (page) {
        try {
          await page.screenshot({ path: `error_screenshot_${attempt}_${Date.now()}.png` });
        } catch (screenshotError) {
          console.log('Could not take screenshot:', screenshotError.message);
        }
      }
      
      if (browser) {
        try {
          await browser.close();
        } catch (closeError) {
          console.log('Error closing browser:', closeError.message);
        }
      }

      if (attempt === maxRetries) {
        console.error('🛑 Max retries reached. Giving up.');
        return { success: false, message: error.message };
      }

      console.log('⏳ Waiting 10 seconds before retrying...');
      await delay(10000);
    }
  }
}

// Additional helper function to handle frame detection issues
async function waitForPageStability(page, timeout = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        try {
            // Check if page is still attached
            await page.evaluate(() => document.readyState);
            
            // Check if there are any frames that might be causing issues
            const frames = await page.frames();
            console.log(`Found ${frames.length} frames`);
            
            // Wait a bit and check again
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // If we get here without errors, the page is stable
            return true;
        } catch (error) {
            console.log('Page stability check failed:', error.message);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    return false;
}

// Enhanced navigation function
async function navigateWithRetry(page, url, options = {}) {
    const maxRetries = 3;
    const defaultOptions = {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
        ...options
    };
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`Navigation attempt ${i + 1} to ${url}`);
            
            await page.goto(url, defaultOptions);
            
            // Wait for page stability
            const isStable = await waitForPageStability(page);
            
            if (isStable) {
                console.log('Navigation successful and page is stable');
                return true;
            } else {
                throw new Error('Page is not stable after navigation');
            }
            
        } catch (error) {
            console.log(`Navigation attempt ${i + 1} failed:`, error.message);
            
            if (i === maxRetries - 1) {
                throw error;
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}




module.exports = { automateLoginAndScrape };
