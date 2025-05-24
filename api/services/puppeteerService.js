const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');


const fs = require('fs');
const path = require('path');

require('dotenv').config(); // Load environment variables from the .env file




puppeteer.use(StealthPlugin());
console.log('Puppeteer version:', puppeteer.version);

 


async function automateLoginAndScrape(pan, password, maxRetries = 3) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`🌀 Attempt ${attempt} of ${maxRetries}`);

        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 50,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

      try {
        // Step 1: Navigate to login page
        console.log('Navigating to login page...');
        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', {
            waitUntil: 'domcontentloaded',
            timeout: 90000
        });

        await new Promise(resolve => setTimeout(resolve, 5000));
        await page.screenshot({ path: 'login-page.png' });

        let currentUrl = page.url();
        console.log(`Current page URL: ${currentUrl}`);

        if (currentUrl.includes('captcha') || currentUrl.includes('security')) {
            console.log('Detected security/captcha page. Manual intervention required.');
            await new Promise(resolve => setTimeout(resolve, 30000));
        }

        // Step 2: Enter PAN/User ID
        console.log('Looking for input field...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        const userIdSelectors = [
            'input[formcontrolname="userId"]',
            'input#userId',
            'input[name="userId"]',
            'input[placeholder*="PAN"]',
            'input[type="text"]'
        ];

        let inputFieldFound = false;
        for (const selector of userIdSelectors) {
            const inputExists = await page.$(selector);
            if (inputExists) {
                console.log(`Found input with selector: ${selector}`);
                await page.type(selector, pan, { delay: 100 });
                inputFieldFound = true;
                break;
            }
        }

        if (!inputFieldFound) {
            console.log('Could not find input field.');
            await page.screenshot({ path: 'input-field-missing.png' });
            throw new Error('User ID input field not found');
        }

        // Step 3: Click Continue/Login button
        let buttonFound = false;
        const staticSelectors = [
            'button[type="submit"]',
            'button.submit-button',
            'button.continue-button'
        ];

        for (const selector of staticSelectors) {
            const btn = await page.$(selector);
            if (btn) {
                console.log(`Found button with selector: ${selector}`);
                await btn.click();
                buttonFound = true;
                break;
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
            await page.screenshot({ path: 'button-missing.png' });
            throw new Error('Continue/Login button not found');
        }

        // Step 4: Wait for password page
        console.log('Waiting for password page to load...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        const passwordPageReached = await page.evaluate(() => {
            return window.location.href.includes('/login/password') ||
                document.querySelector('input[type="password"]') !== null;
        });

        if (!passwordPageReached) {
            await page.screenshot({ path: 'no-password-page.png' });
            throw new Error('Password page not detected');
        }

        await page.screenshot({ path: 'password-page.png' });

        // Step 5: Click secure access checkbox
        console.log('Looking for checkbox...');
        const checkboxSelectors = [
            'mat-checkbox input[type="checkbox"]',
            'mat-checkbox',
            'input[type="checkbox"]',
            '.mat-checkbox'
        ];

        for (const selector of checkboxSelectors) {
            try {
                const checkboxExists = await page.$(selector);
                if (checkboxExists) {
                    console.log(`Found checkbox: ${selector}`);
                    await page.click(selector);
                    break;
                }
            } catch (e) {
                console.log(`Checkbox selector ${selector} failed:`, e.message);
            }
        }

        // Step 6: Enter password
        console.log('Looking for password field...');
        const passwordSelectors = [
            'input[formcontrolname="password"]',
            'input[type="password"]',
            'input#password',
            'input[name="password"]'
        ];

        let passwordEntered = false;
        for (const selector of passwordSelectors) {
            const passwordField = await page.$(selector);
            if (passwordField) {
                console.log(`Found password field: ${selector}`);
                await page.type(selector, password, { delay: 100 });
                passwordEntered = true;
                break;
            }
        }

        if (!passwordEntered) {
            await page.screenshot({ path: 'password-field-missing.png' });
            throw new Error('Password input not found');
        }

        // Step 7: Click login
        // console.log('Clicking login button...');
        // let loginButtonClicked = false;

        // for (const selector of staticSelectors) {
        //     const btn = await page.$(selector);
        //     if (btn) {
        //         await btn.click();
        //         loginButtonClicked = true;
        //         break;
        //     }
        // }

        // if (!loginButtonClicked) {
        //     loginButtonClicked = await page.evaluate(() => {
        //         const buttons = Array.from(document.querySelectorAll('button'));
        //         for (const btn of buttons) {
        //             const text = btn.innerText.trim().toLowerCase();
        //             if (text.includes('login') || text.includes('continue')) {
        //                 btn.click();
        //                 return true;
        //             }
        //         }
        //         return false;
        //     });
        // }

        console.log('Clicking login button...');
        let loginButtonClicked = false;
        
        // Step 1: Mandatory login button click from known selectors
        for (const selector of staticSelectors) {
            const btn = await page.$(selector);
            if (btn) {
                await btn.click();
                loginButtonClicked = true;
                break;
            }
        }
        
        // Fallback: Try finding a generic login/continue button
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
            await page.screenshot({ path: 'login-button-missing.png' });
            throw new Error('Login button not found');
        }
        
        console.log('Initial login button clicked. Waiting for page update...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        // Step 2: Check for "Login Here" button after initial login
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
            await new Promise(resolve => setTimeout(resolve, 8000));
        } else {
            console.log('"Login Here" button not found. Proceeding...');
        }
        
        // Step 3: Final login check
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
        
            await page.screenshot({ path: 'login-failed.png' });
        
            if (errorMessage) {
                throw new Error(`Login failed: ${errorMessage}`);
            } else {
                throw new Error('Login verification failed (no error message detected)');
            }
        }
        
        console.log('Login successful!');
        await page.screenshot({ path: 'post-login.png' });
        
        // Step 4: Save cookies
        const cookies = await page.cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');


// Define the correct path to your .env file
const dotenvPath = path.join(__dirname, '..', '.env');  // This goes up one directory level

// Check if the directory exists
const dotenvDir = path.dirname(dotenvPath);  // Get the directory path of the .env file
if (!fs.existsSync(dotenvDir)) {
  console.log(`Directory doesn't exist. Creating directory: ${dotenvDir}`);
  fs.mkdirSync(dotenvDir, { recursive: true }); // Create the directory if it doesn't exist
}
        if (cookieHeader) {
            console.log(`Found COOKIE: ${cookieHeader}`);
          
            let envContent = '';
            if (fs.existsSync(dotenvPath)) {
              // Read existing .env content
              envContent = fs.readFileSync(dotenvPath, 'utf8');
          
              // If COOKIE exists, replace it
              if (/^COOKIE\s*=.*$/m.test(envContent)) {
                // Replace the existing COOKIE line (with optional quotes)
                envContent = envContent.replace(/^COOKIE\s*=.*$/m, `COOKIE='${cookieHeader}'`);
              } else {
                // Append if COOKIE not present
                envContent += `\nCOOKIE='${cookieHeader}'\n`;
              }
              
            } else {
              // Create new .env if it doesn't exist
              envContent = `COOKIE='${cookieHeader}'\n`;
            }
          
            // Write the content to .env file
            fs.writeFileSync(dotenvPath, envContent);
            console.log('✅ COOKIE updated in .env');
 
             
 //--------------------
 try {
    console.log('calling for type FYA');
    
    // Call /sync with type: 'FYA'
    await axios.post(`http://localhost:5000/sync`, {
      cookie: cookieHeader,
      pan,
      password,
      type: 'FYA',
    });
  

    console.log('calling for type FYI');

    // Call /sync with type: 'FYI'
    await axios.post(`http://localhost:5000/sync`, {
      cookie: cookieHeader,
      pan,
      password,
      type: 'FYI',
    });


    // Call /demands
    console.log('🔍 Reading all demands');
    
  await axios.post('http://localhost:5000/demands', {
    cookie: cookieHeader,
    pan,
  });

 // Call /itr
    console.log('🔍 Reading all itrs');
    
  await axios.post('http://localhost:5000/itr', {
    cookie: cookieHeader,
    pan,
  });

  // call /audit
 console.log('🔍 Reading all audits');
    
  await axios.post('http://localhost:5000/audit', {
    cookie: cookieHeader,
    pan,
  });
 }catch(e){
    console.log('sync call error'+ e.message);
    
 }


            return {  message: 'FINALLY GOT THE COOKIE'  };

          } else {
            console.log('⚠️ No cookie found to save.');
          }
        


 // Now call your local endpoint with the PAN and cookie
//  try {
//     const result = await axios.post('http://localhost:5000/sync', {
//       cookie: cookieHeader,
//       pan: pan,
//       pageNo: 1
//     });

   
//   } catch (err) {
//     console.error('Error calling /sync:', err.response?.data || err.message);
//   }          
        
    
            await browser.close();
            return { success: true, message: 'Login and scrape successful' };

        } catch (error) {
            console.error(`❌ Attempt ${attempt} failed:`, error.message);
            await page.screenshot({ path: `fatal-error-attempt-${attempt}.png` });
            await browser.close();

            if (attempt === maxRetries) {
                console.error('🛑 Max retries reached. Giving up.');
                return { success: false, message: error.message };
            }

            console.log('⏳ Waiting 10 seconds before retrying...');
            await delay(10000); // 10 seconds before retry
        }
    }
}




module.exports = { automateLoginAndScrape };
