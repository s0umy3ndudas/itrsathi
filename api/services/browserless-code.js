// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');

// module.exports = async ({ page, context }) => {
//   const { pan, password, maxRetries = 3 } = context;

//   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//   for (let attempt = 1; attempt <= maxRetries; attempt++) {
//     console.log(`🌀 Attempt ${attempt} of ${maxRetries}`);

//     const browser = await puppeteer.connect({
//       browserWSEndpoint: `wss://chrome.browserless.io?token=2SNpR4ONaJEQwHwf1b1103c7d3c7ba602ffdd8c1eb4b7299c`
//     });

//     const page = await browser.newPage();
//     page.on('console', msg => console.log('PAGE LOG:', msg.text()));

//     try {
//       await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', {
//         waitUntil: 'domcontentloaded',
//         timeout: 90000
//       });

//       await delay(5000);

//       const userIdSelectors = [
//         'input[formcontrolname="userId"]',
//         'input#userId',
//         'input[name="userId"]',
//         'input[placeholder*="PAN"]',
//         'input[type="text"]'
//       ];

//       let inputFieldFound = false;
//       for (const selector of userIdSelectors) {
//         const inputExists = await page.$(selector);
//         if (inputExists) {
//           await page.type(selector, pan, { delay: 100 });
//           inputFieldFound = true;
//           break;
//         }
//       }

//       if (!inputFieldFound) throw new Error('User ID input field not found');

//       const staticSelectors = [
//         'button[type="submit"]',
//         'button.submit-button',
//         'button.continue-button'
//       ];

//       let buttonFound = false;
//       for (const selector of staticSelectors) {
//         const btn = await page.$(selector);
//         if (btn) {
//           await btn.click();
//           buttonFound = true;
//           break;
//         }
//       }

//       if (!buttonFound) {
//         buttonFound = await page.evaluate(() => {
//           const buttons = Array.from(document.querySelectorAll('button'));
//           for (const btn of buttons) {
//             const text = btn.innerText.trim().toLowerCase();
//             if (text.includes('continue') || text.includes('login')) {
//               btn.click();
//               return true;
//             }
//           }
//           return false;
//         });
//       }

//       if (!buttonFound) throw new Error('Continue/Login button not found');

//       await delay(5000);

//       const checkbox = await page.$('input[type="checkbox"]');
//       if (checkbox) await checkbox.click();

//       const passwordField = await page.$('input[formcontrolname="password"]');
//       if (!passwordField) throw new Error('Password input field not found');
//       await passwordField.type(password, { delay: 100 });

//       let loginButtonClicked = false;
//       for (const selector of staticSelectors) {
//         const btn = await page.$(selector);
//         if (btn) {
//           await btn.click();
//           loginButtonClicked = true;
//           break;
//         }
//       }

//       if (!loginButtonClicked) {
//         loginButtonClicked = await page.evaluate(() => {
//           const buttons = Array.from(document.querySelectorAll('button'));
//           for (const btn of buttons) {
//             const text = btn.innerText.trim().toLowerCase();
//             if (text.includes('login') || text.includes('continue')) {
//               btn.click();
//               return true;
//             }
//           }
//           return false;
//         });
//       }

//       if (!loginButtonClicked) throw new Error('Login button not found');

//       await delay(10000);

//       const loginSuccess = await page.evaluate(() => {
//         return !window.location.href.includes('/login') &&
//           !document.querySelector('input[formcontrolname="userId"]') &&
//           !document.querySelector('input[formcontrolname="password"]');
//       });

//       if (!loginSuccess) throw new Error('Login may have failed');

//       const cookies = await page.cookies();
//       const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');
//       await browser.close();

//       const dotenvPath = path.join(__dirname, '..', '.env');
//       const dotenvDir = path.dirname(dotenvPath);
//       if (!fs.existsSync(dotenvDir)) fs.mkdirSync(dotenvDir, { recursive: true });

//       let envContent = '';
//       if (fs.existsSync(dotenvPath)) {
//         envContent = fs.readFileSync(dotenvPath, 'utf8');
//         if (/^COOKIE\s*=.*$/m.test(envContent)) {
//           envContent = envContent.replace(/^COOKIE\s*=.*$/m, `COOKIE='${cookieHeader}'`);
//         } else {
//           envContent += `\nCOOKIE='${cookieHeader}'\n`;
//         }
//       } else {
//         envContent = `COOKIE='${cookieHeader}'\n`;
//       }

//       fs.writeFileSync(dotenvPath, envContent);
//       console.log('✅ COOKIE updated in .env');

//       // Call downstream APIs
//       try {
//         await axios.post(`${process.env.API_URL}/sync`, { cookie: cookieHeader, pan, password, type: 'FYA' });
//         await axios.post(`${process.env.API_URL}/sync`, { cookie: cookieHeader, pan, password, type: 'FYI' });
//         await axios.post(`${process.env.API_URL}/demands`, { cookie: cookieHeader, pan });
//         await axios.post(`${process.env.API_URL}/itr`, { cookie: cookieHeader, pan });
//         await axios.post(`${process.env.API_URL}/audit`, { cookie: cookieHeader, pan });
//       } catch (e) {
//         console.log('sync call error: ' + e.message);
//       }

//       return { message: 'FINALLY GOT THE COOKIE' };

//     } catch (error) {
//       await browser.close();
//       console.error(`❌ Attempt ${attempt} failed:`, error.message);

//       if (attempt === maxRetries) {
//         return { success: false, message: error.message };
//       }

//       console.log('⏳ Waiting 10 seconds before retrying...');
//       await delay(10000);
//     }
//   }
// };



// DO NOT use require() — puppeteer is already injected
// browserless-code.js - Improved version with better error handling
module.exports = async ({ page, context }) => {
    const { pan, password, config = {} } = context;
    
    // Input validation
    if (!pan || !password) {
        return {
            success: false,
            message: 'PAN and password are required'
        };
    }
  
    try {
        console.log('🚀 Starting Income Tax Portal automation...');
        
        // Navigate to login page with extended timeout
        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', {
            waitUntil: 'networkidle2',
            timeout: config.timeout || 120000,
        });
        
        console.log('📄 Page loaded successfully');
  
        // Wait for and fill PAN with better error handling
        try {
            await page.waitForSelector('input[formcontrolname="userId"]', { 
                timeout: 15000,
                visible: true 
            });
            
            // Clear field first, then type
            await page.click('input[formcontrolname="userId"]', { clickCount: 3 });
            await page.type('input[formcontrolname="userId"]', pan, { delay: 150 });
            
            console.log('✅ PAN entered successfully');
        } catch (error) {
            console.log('❌ Failed to enter PAN:', error.message);
            return {
                success: false,
                message: 'Failed to locate or fill PAN field: ' + error.message
            };
        }
  
        // Click continue button with retry logic
        try {
            const continueButton = await page.waitForSelector('button[type="submit"]', { 
                timeout: 10000,
                visible: true 
            });
            
            await continueButton.click();
            console.log('✅ Continue button clicked');
            
            // Wait for navigation or password field
            await page.waitForTimeout(5000);
            
        } catch (error) {
            console.log('❌ Failed to click continue button:', error.message);
            return {
                success: false,
                message: 'Failed to click continue button: ' + error.message
            };
        }
  
        // Wait for and fill password
        try {
            await page.waitForSelector('input[formcontrolname="password"]', { 
                timeout: 15000,
                visible: true 
            });
            
            // Clear field first, then type
            await page.click('input[formcontrolname="password"]', { clickCount: 3 });
            await page.type('input[formcontrolname="password"]', password, { delay: 150 });
            
            console.log('✅ Password entered successfully');
        } catch (error) {
            console.log('❌ Failed to enter password:', error.message);
            return {
                success: false,
                message: 'Failed to locate or fill password field: ' + error.message
            };
        }
  
        // Click final login button
        try {
            const loginButton = await page.waitForSelector('button[type="submit"]', { 
                timeout: 10000,
                visible: true 
            });
            
            await loginButton.click();
            console.log('✅ Login button clicked');
            
        } catch (error) {
            console.log('❌ Failed to click login button:', error.message);
            return {
                success: false,
                message: 'Failed to click login button: ' + error.message
            };
        }
  
        // Wait for login to complete and check for success indicators
        console.log('⏳ Waiting for login to complete...');
        await page.waitForTimeout(15000);
        
        // Check if login was successful by looking for common success indicators
        const currentUrl = page.url();
        const pageTitle = await page.title();
        
        // Look for error messages
        const errorElements = await page.$$('div.error, .alert-danger, .login-error, [class*="error"]');
        
        if (errorElements.length > 0) {
            const errorText = await page.evaluate(() => {
                const errorEl = document.querySelector('div.error, .alert-danger, .login-error, [class*="error"]');
                return errorEl ? errorEl.textContent.trim() : 'Unknown login error';
            });
            
            return {
                success: false,
                message: `Login failed: ${errorText}`,
                url: currentUrl
            };
        }
        
        // Check if still on login page (indicates failure)
        if (currentUrl.includes('/login')) {
            return {
                success: false,
                message: 'Login appears to have failed - still on login page',
                url: currentUrl
            };
        }
  
        // Get cookies for session management
        const cookies = await page.cookies();
        const cookieHeader = cookies
            .filter(c => c.value && c.value.length > 0) // Filter out empty cookies
            .map(c => `${c.name}=${c.value}`)
            .join('; ');
  
        console.log('🎉 Login completed successfully!');
        
        return {
            cookie: cookieHeader,
            url: currentUrl,
            title: pageTitle,
            success: true,
            cookieCount: cookies.length,
            timestamp: new Date().toISOString()
        };
  
    } catch (error) {
        console.error('💥 Automation failed:', error.message);
        
        // Try to get current page info for debugging
        let currentUrl = '';
        let pageTitle = '';
        
        try {
            currentUrl = page.url();
            pageTitle = await page.title();
        } catch (e) {
            // Ignore errors when trying to get debug info
        }
        
        return {
            success: false,
            message: error.message,
            stack: error.stack,
            url: currentUrl,
            title: pageTitle,
            timestamp: new Date().toISOString()
        };
    }
};