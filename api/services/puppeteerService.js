const { chromium } = require('playwright');
const { executablePath } = require('playwright');
require('dotenv').config();
const axios = require('axios');
const path = require('path');
 
// At the top of your main file - add this import
const {
  syncEProceedingsData,
  syncDemandsData, 
  syncITRData,
  syncAuditData,
  uploadPdfToS3
} = require('../services/automationFunctions');
const { log } = require('console');

 const { Assessee, Itr} = require('../models/models');


const puppeteer = require('puppeteer');
const fs = require('fs');
const fetch = require('node-fetch');


const bucketName = "playwright-docs";
const region = "ap-south-1";  // your bucket is in Mumbai region




async function saveForm26AS(pan, form26asData) {
  // Check if assessee exists
  let assessee = await Assessee.findOne({ pan });
  if (!assessee) {
    assessee = await Assessee.create({ pan });
  }

  // Loop through each year and create ITR entry
  for (const item of form26asData) {
    const existing = await Itr.findOne({
      assessee: assessee._id,
      assessmentYear: item.assessmentYear,
      itrForm: 'Form26AS'
    });

    if (!existing) {
      await Itr.create({
        assessee: assessee._id,
        assessmentYear: item.assessmentYear,
           // Or use actual filing date if known
        form26asPdfUrl: item.pdfUrl
      });   
    } else {
      // Optionally update URL if changed
      existing.form26asPdfUrl = item.pdfUrl;
      await existing.save();
    }
  }

  // Return JSON structure consumable by frontend
  return {
    pan,
    form26as: form26asData
  };
}
 
async function navigateAndDownloadForm26AS(context, page, pan) {
  // Step 1: Hover e-File
  const eFileSelector = 'text="e-File"';
  await page.waitForSelector(eFileSelector, { timeout: 15000 });
  await page.hover(eFileSelector);
  await page.waitForTimeout(1000);

  // Step 2: Hover "Income Tax Returns"
  const itrSelector = 'text="Income Tax Returns"';
  await page.waitForSelector(itrSelector, { timeout: 10000 });
  await page.hover(itrSelector);
  await page.waitForTimeout(1000);

  // Step 3: Click "View Form 26AS"
  const form26ASSelector = 'text="View Form 26AS"';
  await page.waitForSelector(form26ASSelector, { timeout: 10000 });
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click(form26ASSelector)
  ]);

  // Step 4: Wait for welcome page
  await newPage.waitForLoadState('domcontentloaded');
  console.log(`Form 26AS page opened: ${newPage.url()}`);

  let viewerPage = newPage; // default

  // Step 5: Handle TRACES overlay & consent
  try {
    await newPage.waitForSelector(
      'text=I agree to the usage and acceptance of Form 16 / 16A generated from TRACES',
      { timeout: 5000 }
    );
    console.log("ℹ️ TRACES overlay detected");

    await newPage.check('input[type="checkbox"]');
    console.log("✅ Consent checkbox ticked");

    // Try multiple possible selectors for Proceed
    const proceedSelectors = [
      'text=Proceed',
      'input[value="Proceed"]',
      'button:has-text("Proceed")',
      'span:has-text("Proceed")'
    ];

    let proceedClicked = false;
    for (const sel of proceedSelectors) {
      if (await newPage.$(sel)) {
        await newPage.click(sel, { force: true });
        console.log(`✅ Proceed button clicked with selector: ${sel}`);
        proceedClicked = true;
        break;
      }
    }

    if (!proceedClicked) {
      console.log("❌ Proceed button not found!");
      throw new Error("❌ Proceed button not found!");
    }

    // Step 6: Click "View Tax Credit" link → same tab navigation
    await newPage.waitForSelector(
      'text=View Tax Credit (Form 26AS/Annual Tax Statement)',
      { timeout: 15000 }
    );

    await Promise.all([
      newPage.waitForNavigation({
        url: /view26AS\.xhtml$/,
        waitUntil: 'domcontentloaded'
      }),
      newPage.click('text=View Tax Credit (Form 26AS/Annual Tax Statement)')
    ]);

    console.log("✅ Entered Form 26AS viewer:", newPage.url());
    viewerPage = newPage;
  } catch (err) {
    console.log("ℹ️ No TRACES overlay found, maybe already in viewer.");
    viewerPage = newPage; // still assign so Step 7 works
  }

  // Step 7: Loop over all years - FIXED VERSION
  try {
    let workingFrame = newPage;
    console.log("Using main page for form interaction");
    
    // Wait for page to be fully loaded before proceeding
    await workingFrame.waitForLoadState('domcontentloaded', { timeout: 30000 });
    
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 1; // Assessment year is typically current year + 1
    
    for (let year = 2009; year <= endYear; year++) {
      console.log(`📄 Processing Form 26AS for AY ${year}-${(year + 1).toString().slice(-2)}...`);

      try {
        // Wait for the form to be ready
        await workingFrame.waitForTimeout(2000);
        
        // Method 1: Find assessment year dropdown - FIXED
        console.log("Looking for assessment year dropdown...");
        
        // Get all select elements properly
        const allSelects = await workingFrame.$$('select');
        console.log(`Total select elements found: ${allSelects.length}`);
        
        if (allSelects.length === 0) {
          console.log(`⚠️ No select elements found for year ${year}, skipping...`);
          continue;
        }
        
        // Debug all select elements
        for (let i = 0; i < allSelects.length; i++) {
          try {
            const selectInfo = await allSelects[i].evaluate((el) => {
              return {
                name: el.name || '',
                id: el.id || '',
                className: el.className || '',
                placeholder: el.getAttribute('placeholder') || '',
                options: Array.from(el.options).map(opt => ({
                  value: opt.value,
                  text: opt.textContent.trim()
                }))
              };
            });
            console.log(`Select ${i}:`, selectInfo);
          } catch (evalErr) {
            console.log(`Select ${i}: Error getting info - ${evalErr.message}`);
          }
        }
        
        // Find the Assessment Year dropdown by ID or name
        let assessmentDropdown = null;
        for (let i = 0; i < allSelects.length; i++) {
          const selectInfo = await allSelects[i].evaluate((el) => ({
            name: el.name || '',
            id: el.id || '',
            options: Array.from(el.options).length
          }));
          
          // Look for dropdown with AssessmentYear in name/id or with many year options
          if (selectInfo.id === 'AssessmentYearDropDown' || 
              selectInfo.name.includes('AssessmentYear') ||
              selectInfo.options > 10) { // Assessment year dropdown has many options
            assessmentDropdown = allSelects[i];
            console.log(`✅ Found assessment dropdown at index ${i}`);
            break;
          }
        }
        
        if (!assessmentDropdown) {
          console.log(`⚠️ No assessment dropdown found for year ${year}, skipping...`);
          continue;
        }

        // Get all options from the assessment year dropdown
        console.log("Getting assessment year dropdown options...");
        const optionData = await assessmentDropdown.evaluate((selectElement) => {
          const options = selectElement.querySelectorAll('option');
          const result = [];
          for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            result.push({
              value: opt.value || '',
              text: (opt.textContent || opt.innerText || '').trim()
            });
          }
          return result;
        });
        
        console.log(`Available assessment year options:`, optionData);
        
        if (optionData.length <= 1) { // Only "Select" option
          console.log(`⚠️ No valid options in assessment dropdown for year ${year}, skipping...`);
          continue;
        }
        
        // Find matching year option - more flexible matching
        const targetOption = optionData.find(opt => {
          const text = opt.text.toLowerCase();
          const value = opt.value.toLowerCase();
          
          // Skip the default "select" option
          if (text.includes('select') || value === '' || value === 'select') {
            return false;
          }
          
          return (
            text.includes(year.toString()) ||
            value.includes(year.toString()) ||
            text.includes(`${year}-${(year + 1).toString().slice(-2)}`) ||
            text.includes(`${year}-${year + 1}`) ||
            value === year.toString()
          );
        });
        
        if (!targetOption) {
          console.log(`⚠️ Year ${year} option not found. Available: ${optionData.map(o => o.text).join(', ')}`);
          continue;
        }

        // Select the year
        console.log(`Selecting year option: ${targetOption.text} (value: ${targetOption.value})`);
        await assessmentDropdown.selectOption(targetOption.value);
        console.log(`✅ Selected assessment year: ${year}`);
        
        // Wait for any dynamic content to load after year selection
        await workingFrame.waitForTimeout(3000);

        // Find View Type dropdown by ID or name
        let viewAsDropdown = null;
        for (let i = 0; i < allSelects.length; i++) {
          const selectInfo = await allSelects[i].evaluate((el) => ({
            name: el.name || '',
            id: el.id || ''
          }));
          
          if (selectInfo.id === 'viewType' || 
              selectInfo.name.includes('viewType') ||
              selectInfo.name.includes('ViewType')) {
            viewAsDropdown = allSelects[i];
            console.log(`✅ Found viewType dropdown at index ${i}`);
            break;
          }
        }
        
        if (viewAsDropdown) {
          // Get view options
          const viewOptionData = await viewAsDropdown.evaluate((selectElement) => {
            const options = selectElement.querySelectorAll('option');
            const result = [];
            for (let i = 0; i < options.length; i++) {
              const opt = options[i];
              result.push({
                value: opt.value || '',
                text: (opt.textContent || opt.innerText || '').trim()
              });
            }
            return result;
          });
          
          console.log(`Available view options:`, viewOptionData);
          
          // Find HTML option or use first non-empty option
          const htmlOption = viewOptionData.find(opt => {
            const text = opt.text.toLowerCase();
            const value = opt.value.toLowerCase();
            return (value === 'html' || text.includes('html')) && !text.includes('select');
          });
          
          const selectedOption = htmlOption || viewOptionData.find(opt => 
            opt.value !== '' && !opt.text.toLowerCase().includes('select')
          );
          
          if (selectedOption) {
            await viewAsDropdown.selectOption(selectedOption.value);
            console.log(`✅ Selected view format: ${selectedOption.text}`);
            await workingFrame.waitForTimeout(2000);
          }
        }

        // Method 3: Look for View/Download buttons
        console.log("Looking for action buttons...");
        
        // Wait a bit more after dropdown selections
        await workingFrame.waitForTimeout(3000);
        
        const buttonSelectors = [
          'input[value*="View"]',
          'input[value*="Download"]',
          'button:has-text("View")',
          'button:has-text("Download")',  
          'input[value*="Export"]',
          'button:has-text("Export")',
          'input[type="submit"]',
          'button[type="submit"]',
          // More specific selectors based on common patterns
          'input[value="View / Download"]',
          'input[value="Export as PDF"]'
        ];

        let actionButton = null;
        for (const selector of buttonSelectors) {
          try {
            const element = await workingFrame.$(selector);
            if (element) {
              const isVisible = await element.isVisible();
              const isEnabled = await element.isEnabled();
              if (isVisible && isEnabled) {
                actionButton = element;
                console.log(`✅ Found action button: ${selector}`);
                break;
              }
            }
          } catch (btnErr) {
            console.log(`Button selector ${selector} failed: ${btnErr.message}`);
          }
        }

        if (!actionButton) {
          console.log(`⚠️ No action button found for year ${year}`);
          
          // Take screenshot for debugging
          await workingFrame.screenshot({ 
            path: `debug-no-button-year-${year}.png`, 
            fullPage: true 
          });
          continue;
        }

        // Click action button and handle download
        console.log(`Clicking action button for year ${year}...`);
        
        // First, click the View button to load the form data
        await actionButton.click();
        console.log("✅ View button clicked, waiting for form to load...");
        
        // Wait for the form content to load
        await workingFrame.waitForTimeout(5000);
        
        // Now look for export/download options
        console.log("Looking for export/download options...");
        
        const exportSelectors = [
          'input[value*="Export as PDF"]',
          'input[value*="Export"]', 
          'button:has-text("Export as PDF")',
          'button:has-text("Export")',
          'a:has-text("Export as PDF")',
          'a:has-text("PDF")',
          'input[value*="Download"]',
          'button:has-text("Download")',
          // More specific patterns
          'input[type="submit"][value*="Export"]',
          'input[type="button"][value*="Export"]',
          'input[onclick*="export"]',
          'button[onclick*="export"]'
        ];
        
        let exportButton = null;
        for (const exportSel of exportSelectors) {
          try {
            const element = await workingFrame.$(exportSel);
            if (element) {
              const isVisible = await element.isVisible();
              const isEnabled = await element.isEnabled();
              if (isVisible && isEnabled) {
                exportButton = element;
                console.log(`✅ Found export button: ${exportSel}`);
                break;
              }
            }
          } catch (exportErr) {
            console.log(`Export selector ${exportSel} failed: ${exportErr.message}`);
          }
        }
        
 if (exportButton) {
  try {
    console.log(`Clicking export button for year ${year}...`);

    // Setup download listener with longer timeout
    const exportDownloadPromise = workingFrame.waitForEvent('download', { timeout: 30000 });

    // Click the export button
    await exportButton.click();

    // Wait for download
    const download = await exportDownloadPromise;
    console.log(`✅ Download started for year ${year}`);

    const pdfPath = await download.path();
    const fileName = `26AS_AY_${year}-${(year + 1).toString().slice(-2)}.pdf`;

    // ✅ Read file into a buffer (just like you do in ITR flow)
    const pdfBuffer = await fs.promises.readFile(pdfPath);

    // ✅ Correct usage: (key, buffer)
    const fileKey = `AAMCS1784N/itr/26as-form/${fileName}`;
    const form26asUrl = await uploadPdfToS3(fileKey, pdfBuffer);

    console.log(`✅ Uploaded AY ${year}-${(year + 1).toString().slice(-2)} to S3`);

    // Save to DB
    await saveForm26AS(pan, [{
      assessmentYear: `${year}`,
      pdfUrl: form26asUrl
    }]);

  } catch (err) {
    console.error(`❌ Failed for year ${year}: ${err.message}`);
  }
}

        // Wait between years to avoid overwhelming the server
        await workingFrame.waitForTimeout(3000);

      } catch (yearErr) {
        console.log(`❌ Error processing year ${year}: ${yearErr.message}`);
        
        // Take screenshot for debugging
        await workingFrame.screenshot({ 
          path: `debug-error-year-${year}.png`, 
          fullPage: true 
        });
        
        // Continue with next year instead of stopping
        continue;
      }
    }

    console.log("✅ Completed processing all years");

  } catch (err) {
    console.error("❌ Critical error in Step 7:", err.message);
    
    // Take a screenshot for debugging
    await newPage.screenshot({ 
      path: 'debug-critical-error.png', 
      fullPage: true 
    });
    
    throw err;
  }
}

 
 
async function navigateToAIS(context, page){
  // 1) Click "AIS" on the e-File dashboard (may open a new tab OR same tab)

  console.log('step 1.1');
  
  const sel =  'a:has-text("AIS")' ;

   
    const el = page.locator(sel).first();
    // if (!(await el.count())) continue;

    await page.waitForTimeout(250);

    // Race: new page OR same-tab navigation
    const navResult = await Promise.race([
      context.waitForEvent('page', { timeout: 15000 }).then(p => ({ kind: 'new' , page: p })),
      page.waitForNavigation({
        url: /ais\.insight\.gov\.in\/complianceportal\/ais\/.*/i,
        waitUntil: 'domcontentloaded',
        timeout: 15000
      }).then(() => ({ kind: 'same' , page }))
    ]).catch(async () => {
      // Try click again once if race failed (sites can swallow first click)
      const [fallback] = await Promise.all([
        context.waitForEvent('page', { timeout: 10000 }).catch(() => null),
        el.click({ timeout: 8000, force: true })
      ]);
      return fallback ? { kind: 'new', page: fallback } : null;
    });

  //  if (!navResult) continue;
     console.log('step 1.2');

    const newPage = navResult.page;
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await newPage.waitForURL(/ais\.insight\.gov\.in\/complianceportal\/ais\/.*/i, { timeout: 30000 });
    console.log(`✅ AIS portal opened: ${newPage.url()}`);
    console.log("used selector for ais:" + sel)


      console.log('step 1.3');
    // 2) We expect to be on /ais/instructions first
    // Make sure the tab strip is visible (shows both "Instructions" and "AIS")
    await newPage.waitForSelector('text=Instructions', { timeout: 10000 }).catch(() => {});
    await newPage.waitForLoadState('domcontentloaded');

    // --- CLICK THE **TAB** "AIS" (3rd AIS on the screen) ---
    // Strategy: limit to the element with role=tablist; click role=tab[name="AIS"] within it.
    let clicked = false;

    const tabWithinTablist = newPage.locator('[role="tablist"] >> role=tab[name="AIS"]');
    if (await tabWithinTablist.count()) {
      await tabWithinTablist.first().click({ timeout: 8000, force: true });
      clicked = true;
      console.log('✅ Clicked AIS tab via role=tablist');
    }

    // Fallback #1: Angular Material tabs
    if (!clicked) {
      const matTab = newPage.locator(
        '.mat-tab-label-container .mat-tab-label-content:has-text("AIS")'
      );
      if (await matTab.count()) {
        await matTab.last().click({ timeout: 8000, force: true });
        clicked = true;
        console.log('✅ Clicked AIS tab via Angular Material locator');
      }
    }

    // Fallback #2: Generic tab bars that contain both labels
    if (!clicked) {
      const tabBar = newPage.locator(
        'nav, .nav-tabs, .tabs, .tabset, ul[role="tablist"]'
      ).filter({ hasText: 'Instructions' }).filter({ hasText: 'AIS' });

      if (await tabBar.count()) {
        const aisInBar = tabBar.last().locator('a:has-text("AIS"), button:has-text("AIS"), span:has-text("AIS")');
        if (await aisInBar.count()) {
          await aisInBar.last().click({ timeout: 8000, force: true });
          clicked = true;
          console.log('✅ Clicked AIS tab via generic tab bar locator');
        }
      }
    }

    // Fallback #3: As a last resort, click the LAST visible "AIS" on the page
    if (!clicked) {
      const allAis = newPage.locator('text=AIS');
      const n = await allAis.count();
      if (n > 0) {
        await allAis.nth(n - 1).click({ timeout: 8000, force: true });
        clicked = true;
        console.log('✅ Clicked last visible AIS text as fallback');
      }
    }

    if (!clicked) {
      await newPage.screenshot({ path: 'debug-ais-tab-not-found.png', fullPage: true });
      throw new Error('Could not find/click the AIS tab (the 3rd AIS).');
    }

    // 3) Verify we reached the AIS home (image 2)
    await Promise.race([
      newPage.waitForURL(/\/ais\/home$/i, { timeout: 20000 }).catch(() => null),
      // Visual anchors: F.Y. dropdown or the two cards (TIS / AIS)
      newPage.waitForSelector('text=F.Y.', { timeout: 20000 }).catch(() => null),
      newPage.waitForSelector('text=Taxpayer Information Summary', { timeout: 20000 }).catch(() => null),
      newPage.waitForSelector('text=Annual Information Statement', { timeout: 20000 }).catch(() => null),
    ]);
 
    console.log('step 1.4');

    // Small extra wait to let the cards render
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.waitForTimeout(600);

    // Sanity: ensure at least one of the anchors is present; otherwise screenshot & error
    const anchorsFound =
      (await newPage.locator('text=F.Y.').count()) > 0 ||
      (await newPage.locator('text=Taxpayer Information Summary').count()) > 0 ||
      (await newPage.locator('text=Annual Information Statement').count()) > 0 ||
      /\/ais\/home$/i.test(newPage.url());

    if (!anchorsFound) {
      await newPage.screenshot({ path: 'debug-ais-home-not-loaded.png', fullPage: true });
      throw new Error('AIS home did not load after clicking the tab.');
    }

    console.log('✅ Reached AIS home (tab view).');
      await newPage.screenshot({ path: 'last.png', fullPage: true });
    return newPage;
  
 
}




// FULL FUNCTION: Navigate → AIS details → loop FYs → download → upload to S3
// Requires: import fs from 'fs';
async function downloadAISForAllFY(context, page, pan) {
  // 0) Go to AIS home tab
  const aisPage = await navigateToAIS(context, page);
  await aisPage.screenshot({ path: 'downloadAISForAllFY1.png', fullPage: true });
  
  // 1) Click the AIS card (right tile) once to enter the details page
  const aisCard = aisPage
    .locator('div')
    .filter({ hasText: /Annual Information Statement.*\(AIS\)/i })
    .filter({ hasText: /Download/i })
    .first();

  if (!(await aisCard.count())) {
    const aisCardAlt = aisPage
      .locator('div, mat-card, .mat-mdc-card')
      .filter({ hasText: /Annual Information Statement/i })
      .locator('xpath=ancestor-or-self::*[contains(@class, "card") or contains(@class, "mat-card") or self::mat-card]')
      .first();
    
    if (await aisCardAlt.count()) {
      await Promise.all([
        aisPage.waitForNavigation({ url: /\/ais\/details\//i, timeout: 20000 }),
        aisCardAlt.click({ timeout: 8000, force: true })
      ]);
    } else {
      await aisPage.screenshot({ path: 'debug-ais-card-not-found.png', fullPage: true });
      throw new Error('AIS card not found on AIS home. Available cards: ' + 
        await aisPage.locator('div, mat-card, .mat-mdc-card').allTextContents());
    }
  } else {
    await Promise.all([
      aisPage.waitForNavigation({ url: /\/ais\/details\//i, timeout: 20000 }),
      aisCard.click({ timeout: 8000, force: true })
    ]);
  }
  await aisPage.screenshot({ path: 'downloadAISForAllFY2.png', fullPage: true });

  console.log('✅ Opened AIS details page');

async function forceCloseModal(aisPage) {
  await aisPage.evaluate(() => {
    const containers = document.querySelectorAll(
      '.mat-mdc-dialog-container, .mat-dialog-container, .cdk-overlay-pane [role="dialog"]'
    );
    containers.forEach(c => c.remove());

    const backdrops = document.querySelectorAll('.cdk-overlay-backdrop');
    backdrops.forEach(b => b.remove());
  });
  console.log("✅ Force removed all modals/backdrops");
}

  // Helper function to ensure any modal is closed
  async function ensureModalClosed() {
    try {   
      // Wait a bit for any closing animations
      await aisPage.waitForTimeout(500);
      
      // Check if any modal/dialog is still present
      const modals = [
        '.mat-mdc-dialog-container',
        '.mat-dialog-container', 
        '.cdk-overlay-pane [role="dialog"]',
        '.cdk-overlay-container .cdk-overlay-pane'
      ];
      
      for (const modalSelector of modals) {
        const modal = aisPage.locator(modalSelector);
        if (await modal.count() > 0) {
          console.log(`🔄 Found open modal: ${modalSelector}, attempting to close...`);
          
          // Try multiple close methods
          const closeBtn = modal.locator('button[mat-dialog-close], button[aria-label*="close"], button:has-text("×"), button:has-text("Close")').first();
          
          if (await closeBtn.count() > 0) {
            await closeBtn.click({ timeout: 3000 });
            console.log('✅ Closed modal via close button');
          } else {
            // Try clicking backdrop
            const backdrop = aisPage.locator('.cdk-overlay-backdrop').last();
            if (await backdrop.count() > 0) {
              await backdrop.click({ timeout: 3000 });
              console.log('✅ Closed modal via backdrop click');
            } else {
              // Fallback to Escape key
              await aisPage.keyboard.press('Escape');
              console.log('✅ Closed modal via Escape key');
            }
          }
          
          // Wait for modal to close
          await aisPage.waitForSelector(modalSelector, { state: 'detached', timeout: 5000 }).catch(() => {
            console.log('⚠️ Modal may still be present, continuing...');
          });
          break;
        }
      }
    } catch (error) {
      console.log('⚠️ Error ensuring modal closed:', error.message);
    }
   console.log('calling forceCloseModal');
   
      await forceCloseModal(aisPage);
  }

  // Helper function to pick FY with improved reliability
async function   pickFYOnDetails(year) {
  const fyText = `F.Y. ${year}-${(year + 1).toString().slice(-2)}`;

  // Wait for page to be ready
  await aisPage.waitForLoadState('domcontentloaded');
  await aisPage.waitForTimeout(500);

  // Open FY dropdown - try multiple selectors
  const selector = `button:has-text("F.Y.")`;
  let openBtn = aisPage.locator(selector).first();

  if (!(await openBtn.count())) {
    await aisPage.screenshot({ path: `debug-ais-details-no-fy-button-${year}.png`, fullPage: true });
    const allButtons = await aisPage.locator('button, [role="button"], mat-select').allTextContents();
    throw new Error(`FY dropdown button not found on details page. Available buttons: ${allButtons.join(', ')}`);
  }

  console.log(`Found FY dropdown with selector: ${selector}`);

  // Click to open dropdown
  await openBtn.click({ timeout: 8000, force: true });
  await aisPage.waitForTimeout(500);

  // Wait for dropdown options to appear and be visible
  await aisPage.waitForSelector('.mat-select-panel, .mat-option, [role="option"]', { timeout: 5000 }).catch(() => {});

  // The options are rendered in an overlay panel - wait for them to be visible
  const optionSelectors = [
    `text=${fyText}`,
    `.mat-option:has-text("${fyText}")`,
    `[role="option"]:has-text("${fyText}")`,
    `mat-option:has-text("${fyText}")`
  ];

  let option = null;
  for (const selector of optionSelectors) {
    option = aisPage.locator(selector).first();
    if (await option.count() > 0) {
      // Wait for the option to be visible before attempting to click
      try {
        await option.waitFor({ state: 'visible', timeout: 3000 });
        break;
      } catch (e) {
        console.log(`Option found but not visible with selector: ${selector}`);
        continue;
      }
    }
  }

  if (!option || !(await option.count()) || !(await option.isVisible())) {
    // If option is not visible, try clicking outside to close dropdown and retry once
    console.log('Dropdown option not visible, retrying...');
    await aisPage.click('body'); // Click outside to close dropdown
    await aisPage.waitForTimeout(500);
    
    // Try opening dropdown again
    await openBtn.click({ timeout: 6000, force: true });
    await aisPage.waitForTimeout(500);
    
    // Try to find visible option again
    option = aisPage.locator(`text=${fyText}`).first();
    
    if (!(await option.count())) {
      await aisPage.screenshot({ path: `debug-dropdown-options-${year}.png`, fullPage: true });
      const availableOptions = await aisPage.locator('.mat-option, [role="option"]').allTextContents();
      throw new Error(`FY option ${fyText} not found. Available options: ${availableOptions.join(', ')}`);
    }
    
    // Wait for visibility
    try {
      await option.waitFor({ state: 'visible', timeout: 3000 });
    } catch (e) {
      throw new Error(`FY option ${fyText} found but not becoming visible`);
    }
  }

  // Click the option
  await option.click({ timeout: 6000, force: true });

  // Settle content - wait for the page to update with selected year
  await aisPage.waitForLoadState('domcontentloaded');
  await aisPage.waitForTimeout(1000);
  console.log(`🔄 FY selected → ${fyText}`);
}



async function upsertAIS(pan, year, url) {
  // 1) Find assessee by PAN
  let assessee = await Assessee.findOne({ pan });
  if (!assessee) {
    assessee = await Assessee.create({ pan });
    console.log(`🆕 Created new assessee with PAN ${pan}`);
  }

  // 2) Convert FY to AY (A.Y. = F.Y. year+1)
  const assessmentYear = year;

  // 3) Upsert into Itr
  const itr = await Itr.findOneAndUpdate(
    { assessee: assessee._id, assessmentYear },
    { $set: { aisPdfUrl: url } },
    { upsert: true, new: true }
  );

  console.log(`✅ Upserted AIS for A.Y. ${assessmentYear} → ${url}`);
  return itr;
}

  async function clickBlueDownloadAndGetPDF(year) {
    // Ensure any modals are closed first
    await ensureModalClosed();
    
    // Wait for the page to be ready
    await aisPage.waitForLoadState('domcontentloaded');
    await aisPage.waitForTimeout(500);

    // Click the main blue "Download" button
    const downloadSelectors = [
      'button:has-text("Download")',
      'button[color="primary"]:has-text("Download")',
      '.mat-button-base:has-text("Download")',
      '[aria-label*="Download"]'
    ];
    
    let blueDownload = null;
    for (const sel of downloadSelectors) {
      const cand = aisPage.locator(sel).first();
      if (await cand.count()) { 
        blueDownload = cand; 
        break; 
      }
    }
    
    if (!blueDownload) {
      await aisPage.screenshot({ path: `debug-ais-details-no-blue-download-${year}.png`, fullPage: true });
      throw new Error('Blue Download button not found on details page.');
    }
    
    await blueDownload.click({ timeout: 8000, force: true });

    // Wait for the download modal to appear
    const dialog = aisPage.locator('.mat-mdc-dialog-container, .mat-dialog-container, .cdk-overlay-pane [role="dialog"]').first();
    await dialog.waitFor({ timeout: 15000 });

    // Give the dialog content time to render
    await aisPage.waitForTimeout(1200);

    // Check for oversized PDF message with improved detection
    const oversizedSelectors = [
      'text=/Unable\\s+to\\s+generate\\s+PDF\\s+as\\s+data\\s+is\\s+too\\s+large/i',
      '*:has-text("Unable to generate PDF as data is too large")',
      '*:has-text("data is too large")',
      '.mat-dialog-content:has-text("too large")'
    ];

    let isOversized = false;
    for (const selector of oversizedSelectors) {
      if (await dialog.locator(selector).count() > 0) {
        isOversized = true;
        break;
      }
    }

    if (isOversized) {
      console.log(`⚠️  ${year}-${(year + 1).toString().slice(-2)}: PDF too large → skipping to next FY`);

      // Focus on properly closing this specific modal to keep dropdowns working
      let modalClosed = false;
      const maxCloseAttempts = 5;
      
      for (let attempt = 1; attempt <= maxCloseAttempts && !modalClosed; attempt++) {
        try {
          console.log(`🔄 Modal close attempt ${attempt}/${maxCloseAttempts}`);
          
          // Method 1: Try close button (most reliable)
          const closeBtnSelectors = [
            'button[mat-dialog-close]',
            'button[aria-label*="close" i]', 
            'button:has-text("×")',
            'button:has-text("Close")',
            '.mat-dialog-actions button:last-child',
            'button[class*="close"]'
          ];
          
          for (const closeSelector of closeBtnSelectors) {
            const closeBtn = dialog.locator(closeSelector).first();
            if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
              await closeBtn.click({ timeout: 3000 });
              console.log(`✅ Clicked close button: ${closeSelector}`);
              modalClosed = true;
              break;
            }
          }
          
          // Method 2: If no close button, try backdrop click
          if (!modalClosed) {
            const backdrop = aisPage.locator('.cdk-overlay-backdrop').last();
            if (await backdrop.count() > 0) {
              await backdrop.click({ timeout: 3000 });
              console.log('✅ Clicked backdrop');
              modalClosed = true;
            }
          }
          
          // Method 3: Escape key as fallback
          if (!modalClosed) {
            await aisPage.keyboard.press('Escape');
            console.log('✅ Pressed Escape key');
            modalClosed = true;
          }
          
          // Wait and verify modal is actually gone
          if (modalClosed) {
            await aisPage.waitForTimeout(1000);
            const stillVisible = await dialog.isVisible().catch(() => false);
            if (stillVisible) {
              console.log('⚠️ Modal still visible after close attempt');
              modalClosed = false;
            } else {
              console.log('✅ Modal successfully closed');
              break;
            }
          }
          
        } catch (e) {
          console.log(`⚠️ Close attempt ${attempt} failed: ${e.message}`);
          modalClosed = false;
        }
        
        // Wait between attempts
        if (!modalClosed && attempt < maxCloseAttempts) {
          await aisPage.waitForTimeout(1000);
        }
      }

      // Final verification and cleanup
      try {
        await aisPage.waitForSelector('.mat-mdc-dialog-container, .mat-dialog-container', { 
          state: 'detached', 
          timeout: 5000 
        });
        console.log('✅ Confirmed modal is completely gone');
      } catch (e) {
        console.log('⚠️ Modal may still be present, taking screenshot');
        await aisPage.screenshot({ path: `debug-modal-stuck-${year}.png`, fullPage: true });
        // Force close any remaining overlays
        await aisPage.keyboard.press('Escape');
        await aisPage.keyboard.press('Escape');
      }

      // Ensure UI is ready for next iteration
      await aisPage.waitForLoadState('domcontentloaded');
      await aisPage.waitForTimeout(2000);
      
      return; // Skip to next FY
    }

    // If no "too large" message, proceed with download
    const firstDownloadBtn = dialog.locator('button:has-text("Download")').first();
    if (!(await firstDownloadBtn.count())) {
      await aisPage.screenshot({ path: `debug-download-dialog-${year}.png`, fullPage: true });
      throw new Error('No Download buttons found in dialog.');
    }

    const [download] = await Promise.all([
      aisPage.waitForEvent('download', { timeout: 90000 }), // Increased timeout
      firstDownloadBtn.click({ timeout: 8000, force: true })
    ]);

    const pdfPath = await download.path();
    if (!pdfPath) throw new Error('Download did not produce a file path');
    
    const fileName = `AIS_${year}-${(year + 1).toString().slice(-2)}.pdf`;
    const pdfBuffer = await fs.promises.readFile(pdfPath);
    const fileKey = `${pan}/itr/ais-form/${fileName}`;
    const url = await uploadPdfToS3(fileKey, pdfBuffer);
    console.log(`✅ Uploaded ${fileName} → ${url}`);
 
 
    await upsertAIS(pan, year, url);
    // Close the dialog after successful download
    await ensureModalClosed();
  }

  // Main loop with improved error handling
  const startFY = 2025;
  const currentYear = new Date().getFullYear();
const endYear =2020;
  for (let year = startFY; year >= currentYear; year--) {
    const fyLabel = `F.Y. ${year}-${(year - 1).toString().slice(-2)}`;
    console.log(`📄 Processing ${fyLabel} ...`);
    
    try {
      await pickFYOnDetails(year);
      console.log('pickFYOnDetails done');
      
      await clickBlueDownloadAndGetPDF(year);
      await aisPage.waitForTimeout(2000); // Increased wait between downloads
      
    } catch (err) {
      console.log(`❌ Failed ${fyLabel}: ${err.message}`);
      await aisPage.screenshot({ path: `debug-ais-details-failure-${year}.png`, fullPage: true }).catch(() => {});
      
      // Ensure we clean up any modals before continuing
      await ensureModalClosed();
      
      // Additional recovery wait
      await aisPage.waitForTimeout(3000);
      
      // Continue to next year
    }
  }

  console.log('✅ Completed AIS downloads for all financial years.');
}

async function automateLoginAndScrape(pan, password, maxRetries = 2) {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`🌀 Attempt ${attempt} of ${maxRetries}`);
    
    let browser;
    let context;
    let page;
    
    try {
      // Launch browser with stealth configuration
      browser = await chromium.launch({
       headless: false,
     slowMo: 100,
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
          '--disable-ipc-flooding-protection',
          '--disable-frame-rate-limit',
          '--disable-default-apps',
          '--disable-automation',
          '--disable-client-side-phishing-detection',
          '--disable-sync',
          '--disable-translate',
          '--hide-scrollbars',
          '--mute-audio',
          '--no-default-browser-check',
          '--no-pings',
          '--disable-component-extensions-with-background-pages'
        ]
      });

      // Create context with stealth settings
      context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        extraHTTPHeaders: {
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
        },
        javaScriptEnabled: true,
        acceptDownloads: true,
        ignoreHTTPSErrors: true
      });

      // Add stealth scripts to avoid detection
      await context.addInitScript(() => {
        // Remove webdriver property
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined,
        });

        // Mock plugins
        Object.defineProperty(navigator, 'plugins', {
          get: () => [1, 2, 3, 4, 5],
        });

        // Mock languages
        Object.defineProperty(navigator, 'languages', {
          get: () => ['en-US', 'en'],
        });

        // Mock permission query
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) => (
          parameters.name === 'notifications' ?
            Promise.resolve({ state: Cypress ? 'denied' : 'granted' }) :
            originalQuery(parameters)
        );

        // Hide automation indicators
        delete window.cdc_adoQpoasnfa76pfcZLmcfl_Array;
        delete window.cdc_adoQpoasnfa76pfcZLmcfl_Promise;
        delete window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol;
      });

      page = await context.newPage();

      // Enhanced navigation with better error handling
      console.log('Navigating to login page...');
      
      try {
        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', {
          waitUntil: 'networkidle',
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

      // Step 2: Enter PAN/User ID with better selector strategy
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
          await page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
          console.log(`Found input with selector: ${selector}`);
          
          // Clear field and type with human-like delays
          await page.fill(selector, '');
          await page.type(selector, pan, { delay: 100 });
          
          inputFieldFound = true;
          break;
        } catch (e) {
          console.log(`Selector ${selector} not found, trying next...`);
        }
      }

      if (!inputFieldFound) {
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
          await page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
          console.log(`Found button with selector: ${selector}`);
          await page.click(selector);
          buttonFound = true;
          break;
        } catch (e) {
          console.log(`Button selector ${selector} not found, trying next...`);
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

      // Step 4: Wait for password page with better detection
      console.log('Waiting for password page to load...');
      
      try {
        await page.waitForFunction(
          () => window.location.href.includes('/login/password') || 
                document.querySelector('input[type="password"]') !== null,
          { timeout: 30000 }
        );
        console.log('Password page detected');
      } catch (waitError) {
        console.log('Waiting for password page fallback...');
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
          await page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
          console.log(`Found checkbox: ${selector}`);
          
          // Check if already checked
          const isChecked = await page.isChecked(selector);
          if (!isChecked) {
            await page.check(selector);
          }
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
          await page.waitForSelector(selector, { timeout: 10000, state: 'visible' });
          console.log(`Found password field: ${selector}`);
          
          // Clear and type password
          await page.fill(selector, '');
          await page.type(selector, password, { delay: 100 });
          
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
          await page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
          await page.click(selector);
          loginButtonClicked = true;
          break;
        } catch (e) {
          console.log(`Login button selector ${selector} not found, trying next...`);
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
      
      // Verify login success with better detection
      const loginSuccessful = await page.evaluate(() => {
        return !window.location.href.includes('/login') &&
               !document.querySelector('input[formcontrolname="userId"]') &&
               !document.querySelector('input[formcontrolname="password"]');
      });
      
      if (!loginSuccessful) {
        const errorMessage = await page.evaluate(() => {
          const errorElements = document.querySelectorAll('.error, .error-message, .alert, .mat-error');
          return Array.from(errorElements).map(el => el.textContent.trim()).filter(text => text).join(' ');
        });
      
        if (errorMessage) {
          throw new Error(`Login failed: ${errorMessage}`);
        } else {
          throw new Error('Login verification failed (no error message detected)');
        }
      }
      
      console.log('Login successful!');
       
      // Get cookies with Playwright's method
      const cookies = await context.cookies();
      const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

if (cookieHeader) {
  console.log(`Found COOKIE: ${cookieHeader}`);
  

  try {
    console.log('🚀 Starting browser-dependent jobs first...');
    
    // Run browser-dependent jobs sequentially to avoid page conflicts
try {
  console.log("started ais");
  await downloadAISForAllFY(context, page, pan);  // this handles navigation + downloads
  console.log("✅ Finished AIS downloads");
} catch (e) {
  console.log("❌ AIS download failed:", e.message);
}
    
    try {
      console.log("started form 26as");
      await navigateAndDownloadForm26AS(context, page, pan);
      console.log("✅ Finished Form 26AS download");
    } catch (form26asError) {
      console.log("❌ Form 26AS download failed:", form26asError.message);
    }
    
    console.log('🚀 Starting API-based sync jobs in parallel...');
    
    await Promise.allSettled([
      syncEProceedingsData(cookieHeader, pan, password, 'FYA').then(() =>
        console.log('✅ Finished FYA')
      ),
      syncEProceedingsData(cookieHeader, pan, password, 'FYI').then(() =>
        console.log('✅ Finished FYI')
      ),
      syncDemandsData(cookieHeader, pan).then(() =>
        console.log('✅ Finished Demands')
      ),
      syncITRData(pan, cookieHeader).then(() =>
        console.log('✅ Finished ITRs')
      ),
      syncAuditData(pan, cookieHeader).then(() =>
        console.log('✅ Finished Audits')
      ),
    ]);

    console.log('🎉 All jobs completed');
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



// Enhanced helper function for page stability
async function waitForPageStability(page, timeout = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        try {
            // Check if page is still attached and ready
            const readyState = await page.evaluate(() => document.readyState);
            console.log(`Page ready state: ${readyState}`);
            
            // Check for any active network requests
            const networkIdle = await page.waitForLoadState('networkidle', { timeout: 2000 })
                .then(() => true)
                .catch(() => false);
            
            if (readyState === 'complete' && networkIdle) {
                console.log('Page is stable');
                return true;
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.log('Page stability check failed:', error.message);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    console.log('Page stability timeout reached');
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




// Export the main function
module.exports = { automateLoginAndScrape, waitForPageStability };
