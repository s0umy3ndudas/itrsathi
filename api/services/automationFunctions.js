
 
const axios = require('axios');
  const path = require('path');
  const fs = require('fs');
const JSZip = require('jszip');

  const AWS = require('aws-sdk');

  // Initialize S3
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
 const bucketName = 'playwright-docs';


 const retry = async (fn, {
  retries = 3,
  delayMs = 2000,
  cookie,
  pan,
} = {}) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`❌ Attempt ${i + 1} failed: ${err.message}`);

      // On failure, attempt to extend session
      if (cookie && pan) {
        await extendSession(cookie, pan);
      }

      if (i < retries - 1) {
        console.log(`🔁 Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        throw err;
      }
    }
  }
};



 async function savePdfByDocId(docId, cookie, pan) {
  const url = `https://eportal.incometax.gov.in/iec/document/${docId}`;
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Cookie': cookie,
    'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
    'Sec-Ch-Ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
  };

  try {
    const response = await retry(
      () => axios.get(url, { headers, responseType: 'arraybuffer' }),
      { cookie, pan }
    );

    const s3Key = `${pan}/${docId}.pdf`;

    await s3.putObject({
      Bucket: bucketName,
      Key: s3Key,
      Body: response.data,
      ContentType: 'application/pdf'
    }).promise();

    console.log(`✅ Uploaded PDF to S3: s3://${bucketName}/${s3Key}`);
  } catch (error) {
    console.error(`❌ Failed to upload docId ${docId} for PAN ${pan}:`, error.message);
  }
}



 const {Assessee,EProceeding,Notice,Demand,Itr,Audit} = require('../models/models');


// MongoDB connection string for local setup
const mongoose = require('mongoose');







// Extract business logic functions from API endpoints

async function getAssesseeDetails(pan, cookie) {
    const response = await axios.post(
      'https://eportal.incometax.gov.in/iec/servicesapi/auth/saveEntity',
      {
        serviceName: 'myPanDetailsService',
        contactPan: pan,
        userId: pan
      },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Cookie': cookie,
          'Origin': 'https://eportal.incometax.gov.in',
          'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
        }
      }
    );
    return response.data;
  }
  


  async function getEProceedings(pan, cookie, type, pageNo = 1) {
    const response = await axios.post(
      'https://eportal.incometax.gov.in/iec/returnservicesapi/auth/getEntity',
      {
        serviceName: 'eProceedingsPaginatedService',
        pan,
        prcdngStatusFlag: type,
        prcdngTypeFlag: 'self',
        header: {
          formName: 'FO-041_PCDNG',
        },
        pageConfig: {
          pageSize: 50,
          pageNo,
          searchTerm: '',
          sortBy: 'createdDt',
          sortAsc: false,
          filters: {},
        },
      },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US,en;q=0.9',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
          'Origin': 'https://eportal.incometax.gov.in',
          'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
          'Cookie': cookie,
        }
      }
    );
    return response.data;
  }
  


  async function getNotices(cookie, proceedingReqId, pan) {
    const payload = {
      serviceName: 'eProceedingDetailsService',
      proceedingReqId,
      pan,
      header: {
        formName: 'FO-041_PCDNG',
      }
    };
  
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Origin': 'https://eportal.incometax.gov.in',
      'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
      'Cookie': cookie,
      'Connection': 'keep-alive',
    };
  
    const response = await axios.post(
      'https://eportal.incometax.gov.in/iec/returnservicesapi/auth/getEntity',
      payload,
      { headers }
    );
    return response.data;
  }
  


async function getResponses(cookie, pan, headerSeqNo) {
    const payload = {
      serviceName: "itbaResponseService",
      headerSeqNo,
      pan,
      header: {
        formName: "FO-041_PCDNG"
      }
    };
  
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Origin': 'https://eportal.incometax.gov.in',
      'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
      'Cookie': cookie
    };
  
    const response = await axios.post(
      'https://eportal.incometax.gov.in/iec/returnservicesapi/auth/getEntity',
      payload,
      { headers }
    );
    return response.data;
  }
  

async function getDemands(cookie, pan) {
    const response = await axios.post(
      'https://eportal.incometax.gov.in/iec/servicesapi/auth/getEntity',
      {
        pan: pan,
        serviceName: 'outstandingDemand'
      },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Cookie': cookie,
          'Origin': 'https://eportal.incometax.gov.in',
          'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
          'User-Agent': 'Mozilla/5.0',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin'
        }
      }
    );
    return response.data;
  }
  

async function getITRStatus(pan, cookie) {
    const response = await retry(() => axios.post(
      'https://eportal.incometax.gov.in/iec/servicesapi/auth/getEntity',
      {
        header: { formName: 'FO-006-ITRST' },
        serviceName: 'itrStatusService',
        entityNum: pan
      },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Cookie': cookie,
          'Origin': 'https://eportal.incometax.gov.in',
          'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36'
        }
      }
    ), { retries: 3, delayMs: 2000, cookie, pan });
    return response.data;
  }
  

  
async function getAuditForms(pan, cookie) {
    const response1 = await retry(() =>
      axios.post(
        'https://eportal.incometax.gov.in/iec/servicesapi/auth/saveEntity',
        {
          serviceName: 'viewFiledForms',
          entityNum: pan,
          submitUserId: '',
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Cookie': cookie,
            'Origin': 'https://eportal.incometax.gov.in',
            'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
            'User-Agent': 'Mozilla/5.0',
            'Sn': 'viewFiledForms',
          }
        }
      ),
      { cookie, pan }
    );
    return response1.data;
  }
  


  async function getAuditFormDetails(pan, cookie, formCd) {
    const response = await retry(() =>
      axios.post(
        'https://eportal.incometax.gov.in/iec/servicesapi/auth/saveEntity',
        {
          serviceName: 'viewFiledForms',
          entityNum: pan,
          submitUserId: '',
          formTypeCd: formCd,
          currentPage: '0',
          pageSize: '20',
          filterParameterDetails: []
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Cookie': cookie,
            'Origin': 'https://eportal.incometax.gov.in',
            'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
            'User-Agent': 'Mozilla/5.0',
            'Sn': 'viewFiledForms',
          }
        }
      ),
      { cookie, pan }
    );
    return response.data;
  }
  
  // Business logic functions
  


async function syncEProceedingsData(cookie, pan, password, type) {
    try {
      console.log(`🔍 Fetching assessee details for PAN: ${pan}`);
  
      const getNameResp = await getAssesseeDetails(pan, cookie);
  
      if (!getNameResp) {
        throw new Error('Invalid response from getName');
      }
  
      // Upsert Assessee
      const raw = getNameResp;
      let name;
      if (raw.firstNm) {
        name = `${raw.firstNm} ${raw.midNm || ''} ${raw.surname || ''}`.trim();
      } else if (raw.surname) {
        name = raw.surname.trim();
      } else {
        name = 'UNKNOWN';
      }
  
      const assessee = await Assessee.findOneAndUpdate(
        { pan },
        {
          $set: {
            name,
            password: password || null,
            lastSyncedOn: new Date(),
            pan,
          }
        },
        { upsert: true, new: true }
      );
  
      console.log(`✅ Assessee upserted for PAN: ${pan}`);
  
      console.log(`🔍 Fetching proceedings for PAN: ${pan}`);
      const data = await getEProceedings(pan, cookie, type);
  
      let eProceedings = data.eProceedingPaginatedRequests || [];
  
      const existingIds = await EProceeding.find(
        { id: { $in: eProceedings.map(ep => ep.proceedingReqId) } },
        { id: 1 }
      ).lean();
  
      const existingIdSet = new Set(existingIds.map(ep => ep.id));
      const newProceedings = eProceedings.filter(ep => !existingIdSet.has(ep.proceedingReqId));
  
      console.log(`💾 Found ${newProceedings.length} new proceedings to process`);
  
      await fetchAndSave(newProceedings, cookie, pan);
  
      return {
        message: 'Sync completed successfully',
        total: eProceedings.length,
        processed: newProceedings.length,
        skipped: eProceedings.length - newProceedings.length
      };
  
    } catch (error) {
      console.error('❌ Error during sync:', error.message);
      throw error;
    }
  }
  

 
async function syncDemandsData(cookie, pan) {
    try {
      console.log(`🌐 Fetching demands from IT portal for PAN: ${pan}...`);
  
      const response = await getDemands(cookie, pan);
      const demandList = response.demandList || [];
      console.log(`📄 Received ${demandList.length} demand(s) for PAN: ${pan}`);
  
      let assessee = await Assessee.findOne({ pan });
  
      if (!assessee) {
        console.log('👤 Assessee not found. Creating a new one...');
        assessee = new Assessee({ pan });
        await assessee.save();
        console.log(`✅ New Assessee created for PAN: ${pan}`);
      } else {
        console.log(`👤 Assessee found for PAN: ${pan}`);
      }
  
      const savedDemands = [];
  
      for (const item of demandList) {
        const existing = await Demand.findOne({ demandRefNo: item.din });
  
        if (existing) {
          console.log(`🔁 Demand with Ref No ${item.din} already exists. Skipping.`);
          continue;
        }
  
        const demand = new Demand({
          assessmentYear: item.itrAy,
          section: item.sectionCode || '',
          demandRefNo: item.din,
          dateOfDemand: new Date(item.dateOfDemandraised),
          taxOrPenalty: item.orignalOutStDemandAmount || 0,
          interestAmount: item.finalInterest || 0,
          total: (item.orignalOutStDemandAmount || 0) + (item.finalInterest || 0),
          responsePdf: '',
          assessee: assessee._id
        });
  
        await demand.save();
        console.log(`💾 Saved demand with Ref No: ${item.din}`);
        savedDemands.push(demand);
      }
  
      console.log(`✅ All demands processed. ${savedDemands.length} new demand(s) saved.`);
  
      return {
        message: 'Demands fetched and saved successfully.',
        savedCount: savedDemands.length,
        savedDemands
      };
  
    } catch (error) {
      console.error('🔥 Error while fetching/saving demands:', error?.response?.data || error.message);
      throw error;
    }
  }
  
  
  
 async function uploadPdfToS3( key, pdfBuffer) {
  try {
    await s3.putObject({
      Bucket: bucketName,
      Key: key,
      Body: pdfBuffer,
      ContentType: 'application/pdf'
    }).promise();

    console.log(`✅ Uploaded PDF to S3: s3://${bucketName}/${key}`);
    return `s3://${bucketName}/${key}`;
  } catch (error) {
    console.error(`❌ Failed to upload to S3: ${error.message}`);
    throw error;
  }
}

async function fetchPdf(url, payload, cookie) {
  const res = await axios.post(url, payload, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Origin': 'https://eportal.incometax.gov.in',
      'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
      'Cookie': cookie
    },
    responseType: 'arraybuffer' // Get PDF as binary
  });

  return Buffer.from(res.data);
}

// 📝 Fetch Intimation PDF
async function fetchIntimationPdf(refno, year, entityNum, cookie) {
  const res = await axios.post(
    'https://eportal.incometax.gov.in/iec/document/intimation',
    { refno, year, entityNum },
    {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://eportal.incometax.gov.in',
        'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
        'User-Agent': 'Mozilla/5.0',
        'Cookie': cookie,
      },
      responseType: 'arraybuffer',
    }
  );
  return Buffer.from(res.data);
}



// 📝 Main Sync Function

async function syncITRData(pan, cookie, bucketName) {
  try {
    console.log(`🔍 Searching for assessee with PAN: ${pan}`);
    let assessee = await Assessee.findOne({ pan });

    if (!assessee) {
      console.log(`🆕 Creating new assessee for PAN: ${pan}`);
      assessee = await Assessee.create({ pan });
    } else {
      console.log(`✅ Assessee found: ${assessee._id}`);
    }

    console.log('🌐 Fetching ITR status...');
    const data = await getITRStatus(pan, cookie);

    const savedItrs = [];
    let skippedCount = 0;

    console.log(`📑 Retrieved ${data.length} ITR status record(s) for PAN: ${pan}`);

    for (const entry of data) {
      const { assmentYear, ackNum, ackDt, formTypeCd } = entry;

      if (!assmentYear || !ackNum || !formTypeCd || !ackDt) {
        console.warn(`⚠️ Skipping invalid entry`, { assmentYear, ackNum, ackDt });
        continue;
      }

      const existing = await Itr.findOne({ assessee: assessee._id, ackNumber: ackNum });
      if (existing) {
        console.log(`⏭️ Skipping existing ITR for AY ${assmentYear}, ACK ${ackNum}`);
        skippedCount++;
        continue;
      }

      const parsedDate = new Date(ackDt);
      if (isNaN(parsedDate.getTime())) {
        console.warn(`⚠️ Invalid filing date for ACK ${ackNum}:`, ackDt);
        continue;
      }

      console.log(`📄 Downloading PDFs for ACK ${ackNum}, AY ${assmentYear}...`);

      const yearSuffix = String(parseInt(assmentYear) + 1).slice(-2);

      // 1️⃣ Fetch ITR Form PDF
      const itrFormPdf = await fetchPdf(
        'https://eportal.incometax.gov.in/iec/itrweb/auth/v0.1/returns/preview/2024',
        { ackNum, loggedInUserId: pan },
        cookie
      );
      const itrFormKey = `${pan}/itr/itr-form/${assmentYear}-${yearSuffix}.pdf`;
      const itrFormUrl = await uploadPdfToS3(itrFormKey, itrFormPdf, bucketName);

      // 2️⃣ Fetch ITR Acknowledgement PDF
      const itrAckPdf = await fetchPdf(
        'https://eportal.incometax.gov.in/iec/itrweb/auth/v0.1/returns/pdf',
        { ackNum, ay: assmentYear, loggedInUserId: pan },
        cookie
      );
      const itrAckKey = `${pan}/itr/itr-ack-pdf/${assmentYear}-${yearSuffix}.pdf`;
      const itrAckUrl = await uploadPdfToS3(itrAckKey, itrAckPdf, bucketName);

      // 3️⃣ Fetch Intimation PDF (if commRefNo exists)
      let itrIntimUrl = null;
      try {
        let commRefNo = null;
        for (const act of entry.itrPanDetlList || []) {
          if (act.activityTxt) {
            try {
              const parsed = JSON.parse(act.activityTxt);
              if (parsed.commRefNo) {
                commRefNo = parsed.commRefNo;
                break;
              }
            } catch {}
          }
        }
        if (commRefNo) {
          const intimPdf = await fetchIntimationPdf(commRefNo, assmentYear, pan, cookie);
          const intimKey = `${pan}/itr/itr-intim-pdf/${assmentYear}-${yearSuffix}.pdf`;
          itrIntimUrl = await uploadPdfToS3(intimKey, intimPdf, bucketName);
        }
      } catch (err) {
        console.error(`⚠️ Failed to fetch intimation PDF for ACK ${ackNum}: ${err.message}`);
      }

      // 4️⃣ Save in DB
      console.log(`💾 Saving ITR for AY: ${assmentYear}, ACK: ${ackNum}`);
      const itr = new Itr({
        assessee: assessee._id,
        assessmentYear: assmentYear,
        itrForm: itrFormUrl,
        filingDate: parsedDate,
        currentStatus: entry.itrPanDetlList?.[0]?.statusDesc || null,
        returnProcessingStatus: entry.efileStatus || null,
        itrFormPdfUrl: itrFormUrl,
        itrAckPdfUrl: itrAckUrl,
        intimationPdfUrl: itrIntimUrl,
        aisPdfUrl: null,
        form26asPdfUrl: null,
        link: null,
        ackNumber: ackNum,
        filingSection: entry.incmTaxSecCd,
      });

      await itr.save();
      savedItrs.push(itr);
    }

    console.log(`✅ ITR Sync complete. Saved: ${savedItrs.length}, Skipped: ${skippedCount}`);

    return {
      message: 'ITR data synced successfully',
      saved: savedItrs.length,
      skipped: skippedCount,
      itrs: savedItrs,
    };
  } catch (err) {
    console.error('❌ Error syncing ITR:', err.message);
    throw err;
  }
}



function formatDDMonYYYY(dateLike) {
  if (!dateLike) return '';
  const d = new Date(dateLike);
  if (isNaN(d)) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const mon = d.toLocaleString('en-GB', { month: 'short' }); // Jan, Feb, ...
  const yr = d.getFullYear();
  return `${day}-${mon}-${yr}`;
}

// --- helpers
const header = (resp, name) => String(resp?.headers?.[name] || '');
const contentTypeIsPdf = (resp) =>
  /application\/pdf/i.test(header(resp, 'content-type')) ||
  /application\/octet-stream/i.test(header(resp, 'content-type')); // allow mislabels
const contentDispositionHasPdfName = (resp) => {
  const cd = header(resp, 'content-disposition');
  if (!cd) return false;
  const mStar = cd.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
  const m = mStar || cd.match(/filename="?([^";]+)"?/i);
  const name = m ? decodeURIComponent(m[1]).trim().toLowerCase() : '';
  return name.endsWith('.pdf');
};

const isZip = (buf) =>
  buf?.byteLength >= 4 &&
  buf[0] === 0x50 && buf[1] === 0x4B && buf[2] === 0x03 && buf[3] === 0x04;

const isPdf = (buf) =>
  buf?.byteLength >= 4 &&
  buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46;

const findPdfHeader = (buf, maxScanBytes = 65536) => {
  const limit = Math.min(buf.byteLength, maxScanBytes);
  for (let i = 0; i <= limit - 4; i++) {
    if (buf[i] === 0x25 && buf[i+1] === 0x50 && buf[i+2] === 0x44 && buf[i+3] === 0x46) {
      return i;
    }
  }
  return -1;
};

// ZIP extractor
async function extractPdfFromZip(zipBuf) {
  const zip = await JSZip.loadAsync(zipBuf);
  const entries = Object.values(zip.files).filter(f => !f.dir && f.name.toLowerCase().endsWith('.pdf'));
  if (!entries.length) return null;

  // Prefer form-like names
  let chosen = entries.find(f => /(^|\/)(form|3cd|3ca)[^/]*\.pdf$/i.test(f.name));
  if (chosen) {
    const pdfBuf = await chosen.async('nodebuffer');
    return { pdf: pdfBuf, fileName: chosen.name.split('/').pop() || 'form.pdf' };
  }

  // Else pick largest
  const withSizes = await Promise.all(entries.map(async f => {
    const data = await f.async('uint8array');
    return { f, size: data.byteLength };
  }));
  const top = withSizes.sort((a, b) => b.size - a.size)[0].f;
  const pdfBuf = await top.async('nodebuffer');
  return { pdf: pdfBuf, fileName: top.name.split('/').pop() || 'form.pdf' };
}

// --- normalize buffer
async function normalizeAuditBuffer(raw, resp, assessmentYear) {
  if (contentTypeIsPdf(resp) || contentDispositionHasPdfName(resp) || isPdf(raw)) {
    return { buffer: raw, fileName: "form.pdf" };
  } else if (isZip(raw)) {
    const extracted = await extractPdfFromZip(raw);
    if (!extracted) throw new Error("ZIP received but no PDF found inside.");
    return { buffer: extracted.pdf, fileName: extracted.fileName };
  } else {
    const idx = findPdfHeader(raw, 65536);
    if (idx >= 0) {
      console.warn(`⚠️ Mislabelled response for AY ${assessmentYear}: found %PDF at offset ${idx}`);
      return { buffer: raw.subarray(idx), fileName: "form.pdf" };
    }
    console.error("First 200 bytes:", raw.subarray(0, 200).toString("utf8"));
    throw new Error(`Unknown file format from audit form endpoint (AY ${assessmentYear})`);
  }
}

// --- common headers
const buildHeaders = (cookie) => ({
  accept: "application/json, text/plain, */*",
  "content-type": "application/json; charset=UTF-8",
  origin: "https://eportal.incometax.gov.in",
  referer: "https://eportal.incometax.gov.in/iec/foservices/",
  "user-agent": "Mozilla/5.0",
  cookie,
});

const AdmZip = require('adm-zip'); // Make sure to install: npm install adm-zip

// --- 3CA-3CD fetch flow with ZIP handling
async function fetch3CA3CD({ assessmentYear, ackNum, pan, cookie }) {
  const headers = buildHeaders(cookie);

  if (parseInt(assessmentYear, 10) >= 2021) {
    const resp = await axios.post(
      "https://eportal.incometax.gov.in/iec/itfweb/auth/invoke",
      {
        metadata: { sn: "viewFiledFormService", formName: "F3CA-3CD", requestedContentType: "pdf" },
        data: { ackNum, formStatusReject: "N" },
      },
      { headers, responseType: "arraybuffer", timeout: 5000 }
    );

    // For 2021+, response is a ZIP file containing form.pdf
    try {
      const zip = new AdmZip(Buffer.from(resp.data));
      const zipEntries = zip.getEntries();
      
      // Look for form.pdf in the ZIP
      const formPdfEntry = zipEntries.find(entry => 
        entry.entryName.toLowerCase() === 'form.pdf' || 
        entry.entryName.toLowerCase().endsWith('/form.pdf')
      );
      
      if (!formPdfEntry) {
        throw new Error('form.pdf not found in ZIP archive');
      }
      
      // Extract the PDF buffer
      return formPdfEntry.getData();
      
    } catch (zipError) {
      console.error(`❌ ZIP extraction failed for AY ${assessmentYear}: ${zipError.message}`);
      // Fallback: try treating as direct PDF (in case format changes)
      return Buffer.from(resp.data);
    }
    
  } else {
    // For years before 2021, response is direct PDF
    const resp = await axios.post(
      "https://eportal.incometax.gov.in/iec/itrweb/auth/v0.1/forms/pdf",
      { ackNum, loggedInUserId: pan },
      { headers, responseType: "arraybuffer", timeout: 5000 }
    );
    return Buffer.from(resp.data);
  }
}

// --- 10-IC fetch flow
// --- 10-IC fetch flow
async function fetch10IC({ ackNum, pan, cookie, extra }) {
  const headers = buildHeaders(cookie);

  // Step 1
  await axios.post(
    "https://eportal.incometax.gov.in/iec/itrweb/auth/v0.1/forms/pdf",
    { ackNum, loggedInUserId: pan },
    { headers, timeout: 5000 }
  );

  // Step 2
  const resp = await axios.post(
    "https://eportal.incometax.gov.in/iec/pdfweb/pdf",
    {
      formName: "receiptpy",
      attachmentAry: [],
      data: {
        formName: "F10-IC",
        filedDt: extra.filedDt,
        asstYear: extra.asstYear,
      },
      dscJson: extra.dscJson || {},
      formStatus: "Completed",
      submitMode: "Online",
    },
    { headers, responseType: "arraybuffer", timeout: 5000 }
  );

  return Buffer.from(resp.data);
}

// --- Form 35 fetch flow
async function fetch35({ pan, cookie, extra }) {
  const headers = buildHeaders(cookie);

const resp = await axios.post(
  "https://eportal.incometax.gov.in/iec/pdfweb/pdf",
  {
    formName: "F35",
    attachmentAry: extra.attachmentAry || [],
    data: { entityNumber: pan, entityFirstName: extra.entityName },
    dscJson: extra.dscJson,
    formStatus: "Completed",
    submitMode: "Online",
  },
  { headers, responseType: "arraybuffer", timeout: 5000 } // ⏱
);

  return Buffer.from(resp.data);
}

// --- dispatcher
async function getFormPdfBuffer({ formCode, ...args }) {
  switch (formCode) {
    case "3CA-3CD":
      return fetch3CA3CD(args);
    case "10-IC":
      return fetch10IC(args);
    case "35":
      return fetch35(args);
    default:
      throw new Error(`Unsupported formCode: ${formCode}`);
  }
}

// --- acknowledgment fetcher stays separate (arn flow)
async function getAckPdfBuffer({ ackNum, dateOfEfiling, cookie }) {
  const headers = buildHeaders(cookie);
  const resp = await axios.post(
    "https://eportal.incometax.gov.in/iec/pdfweb/pdf",
    {
      formName: "arn",
      attachmentAry: [],
      data: { arn: ackNum, dateOfEfiling },
      submitMode: "Offline",
    },
    { headers, responseType: "arraybuffer" }
  );
  return Buffer.from(resp.data);
}

// --- main
async function fetchAndUploadAuditPDFs({ auditId, pan, cookie, assessmentYear, ackNum, dateOfEfiling, formCode, extra }) {
  try {
    const yearSuffix = String(parseInt(assessmentYear, 10) + 1).slice(-2);

    // form PDF
    const formPdfBuffer = await getFormPdfBuffer({ formCode, assessmentYear, ackNum, pan, cookie, extra });
    const formKey = `${pan}/audits/audit-form-${formCode}/${assessmentYear}-${yearSuffix}.pdf`;
    const auditFormUrl = await uploadPdfToS3(formKey, formPdfBuffer);

    // ack PDF (only for some forms)
    let auditAckUrl = null;
    try {
      const ackBuffer = await getAckPdfBuffer({ ackNum, dateOfEfiling, cookie });
      const ackKey = `${pan}/audits/audit-ack-form-${formCode}/${assessmentYear}-${yearSuffix}.pdf`;
      auditAckUrl = await uploadPdfToS3(ackKey, ackBuffer);
    } catch (err) {
      console.warn(`⚠️ Ack skipped for ${formCode}, AY ${assessmentYear}: ${err.message}`);
    }

    await Audit.findByIdAndUpdate(auditId, { $set: { auditForm: auditFormUrl, acknowledgment: auditAckUrl } });
    return { auditFormUrl, auditAckUrl };
  } catch (err) {
    console.error(`❌ Failed ${formCode}, AY ${assessmentYear}: ${err.message}`);
    throw err;
  }
}


async function syncAuditData(pan, cookie) {
  try {
    const response1 = await getAuditForms(pan, cookie);
    const forms = response1.forms || [];
    console.log(`📄 Total forms fetched for ${pan}: ${forms.length}`);

    const assessee = await Assessee.findOneAndUpdate(
      { pan: pan.toUpperCase() },
      { $setOnInsert: { pan: pan.toUpperCase() } },
      { new: true, upsert: true }
    );

    for (const form of forms) {
      const { formCd, formDesc } = form;

      const response2 = await getAuditFormDetails(pan, cookie, formCd);
      const auditForms = response2.forms || [];
      console.log(`📋 ${auditForms.length} records found for formCd ${formCd}`);

      for (const entry of auditForms) {
        const exists = await Audit.findOne({
          assessee: assessee._id,
          assessmentYear: entry.refYear.toString(),
          acknowledgment: entry.ackNum,
        });

        if (exists) {
          console.log(
            `⚠️ Skipping duplicate for AY ${entry.refYear}, Ack ${entry.ackNum}`
          );
          continue;
        }

        // normalize
        const dateOfEfiling = entry.ackDt
          ? new Date(entry.ackDt).toISOString().split("T")[0]
          : null;
        const formCode = (formDesc || entry.formTypeCd || "")
          .toUpperCase()
          .replace(/^FORM\s+/, "");

        // save
        const audit = new Audit({
          assessee: assessee._id,
          assessmentYear: entry.refYear.toString(),
          returnForm: entry.filingTypeCd || "",
          auditSection: formDesc || "",
          auditStatus: entry.formStatus || "",
          filingDate: dateOfEfiling ? new Date(dateOfEfiling) : null,
          auditForm: entry.formTypeCd || "",
          acknowledgment: entry.ackNum,
          link: `https://eportal.incometax.gov.in/iec/foservices/#/preLogin/viewFiledForms`,
        });

        await audit.save();
        console.log(`✅ Saved audit for AY ${entry.refYear}, Ack ${entry.ackNum}`);

        // fetch/upload PDFs only for supported forms
       if (["3CA-3CD", "10-IC", "35"].includes(formCode)) {
  try {

    let extra = {};
if (formCode === "35") {
  extra = {
    entityName: entry.entityName,
    attachmentAry: entry.attachments,
    dscJson: entry.dscJson,
  };
} else if (formCode === "10-IC") {
  extra = {
    filedDt: entry.filedDt,       // required for receipt
    asstYear: entry.refYear,      // required for receipt
    dscJson: entry.dscJson || {}, // optional
  };
} else if (formCode === "3CA-3CD") {
  // usually no extra needed, but keep empty object
  extra = {};
}


    await fetchAndUploadAuditPDFs({
      auditId: audit._id,
      pan,
      cookie,
      assessmentYear: entry.refYear.toString(),
      ackNum: entry.ackNum,
      dateOfEfiling,
      formCode,
      extra 
    });
  } catch (err) {
    console.error(
      `❌ Skipped Form ${formCode}, AY ${entry.refYear}, Ack ${entry.ackNum}: ${err.message}`
    );
    continue; // move on to next record
  }
}
      }
    }

    return { message: "Audit extraction completed." };
  } catch (err) {
    console.error(`❌ Error in audit processing: ${err.message}`);
    throw err;
  }
}





const extendSession = async (cookie, pan) => {
    try {
      const res = await axios.post(
        'https://eportal.incometax.gov.in/iec/loginapi/auth/extendSession',
        { loggedInUserId: pan },
        {
          headers: { 
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9,bn;q=0.8',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Cookie': cookie,
            'Origin': 'https://eportal.incometax.gov.in',
            'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
            'Sec-Ch-Ua': '"Not.A/Brand";v="99", "Chromium";v="136"',
            'Sec-Ch-Ua-Mobile': '?1',
            'Sec-Ch-Ua-Platform': '"Android"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Sn': 'NA',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
          }
        }
      );
      console.log(`🔄 Session extended for PAN ${pan}:`, res.status);
    } catch (err) {
      console.warn(`⚠️ Failed to extend session: ${err.message}`);
    }
  };
  
  /**
   * Retry wrapper with session extension logic.
   */


  
  
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  

// async function savePdfByDocId(docId, cookie, pan) {
//   const url = `https://eportal.incometax.gov.in/iec/document/${docId}`;
//   const headers = {
//     'Accept': 'application/json, text/plain, */*',
//     'Accept-Encoding': 'gzip, deflate, br, zstd',
//     'Accept-Language': 'en-US,en;q=0.9',
//     'Connection': 'keep-alive',
//     'Content-Type': 'application/json',
//     'Cookie': cookie,
//     'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
//     'Sec-Ch-Ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
//     'Sec-Ch-Ua-Mobile': '?0',
//     'Sec-Ch-Ua-Platform': '"Windows"',
//     'Sec-Fetch-Dest': 'empty',
//     'Sec-Fetch-Mode': 'cors',
//     'Sec-Fetch-Site': 'same-origin',
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
//   };

//   try {
//     const response = await retry(
//       () => axios.get(url, { headers, responseType: 'arraybuffer' }),
//       { cookie, pan } // ← THIS was missing
//     );
    

//     const dirPath = path.join(__dirname, 'naman', 'eproceedings', pan);
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath, { recursive: true });
//     }

//     const filePath = path.join(dirPath, `${docId}.pdf`);
//     fs.writeFileSync(filePath, response.data);
//     console.log(`✅ Saved PDF to: ${filePath}`);
//   } catch (error) {
//     console.error(`❌ Failed to download docId ${docId} for PAN ${pan}:`, error.message);
//   }
// }
 

// Main logic




async function fetchAndSave(eProceedings, cookie, pan) {
  let assessee;

  if (eProceedings.length > 0) {
    assessee = await Assessee.findOneAndUpdate(
      { pan },
      {
        pan,
        name: eProceedings[0].nameOfAssesse,
        lastSyncedOn: new Date()
      },
      { upsert: true, new: true }
    );
  }

  for (const ep of eProceedings) {
    try {
      console.log(`📂 Processing eProceeding: ${ep.proceedingReqId}`);

      const eDoc = await EProceeding.findOneAndUpdate(
        { id: ep.proceedingReqId },
        {
          id: ep.proceedingReqId,
          type: ep.proceedingStatus,
          ay: ep.assessmentYear,
          assesseeId: assessee._id,
          name: ep.proceedingName,
          date: new Date(ep.responseDueDate || Date.now())
        },
        { upsert: true, new: true }
      );

      await delay(3000);

const res = await getNotices(cookie, ep.proceedingReqId, pan);      

      const notices = res || [];
      console.log(`📎 Notices found: ${notices.length}`);
// console.log(JSON.stringify(res, null, 2));
// console.log(Array.isArray(res), res.length);
      for (const n of notices) {
        const noticedocs = [];
        const resdocs = [];

        // === Fetch Responses ===
        if (!n.headerSeqNo) {
          console.warn(`⚠️ Skipping responses for ${ep.proceedingReqId}: Missing headerSeqNo`);
          continue;
        }

        await delay(2000);

        try {
          const response = await getResponses(cookie, pan, n.headerSeqNo)
          

          const attachments = response.data?.respRemrkAttLst?.[0]?.attachmentLst || [];
          for (const att of attachments) {
            if (att?.docId) {
              const docId = att.docId.toString();
              resdocs.push(docId);
              await savePdfByDocId(docId, cookie, pan);
              await delay(1500); // Delay between each PDF download
            }
          }
        } catch (err) {
          console.error(`⚠️ Failed to fetch response with headerSeq ${n.headerSeqNo}:`, 'headerSeq error: ' + err.message);
        }

        await delay(2000);

        // === Fetch Notice PDF ===
        try {
          const noticePdfRes = await retry(
            () => axios.post(
              'https://eportal.incometax.gov.in/iec/returnservicesapi/auth/saveEntity',
              {
                serviceName: 'noticeletterpdf',
                headerSeqNo: n.headerSeqNo,
                procdngReqId: ep.proceedingReqId,
                loggedInUserId: pan,
                header: { formName: 'FO-041_PCDNG' }
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json, text/plain, */*',
                  'Origin': 'https://eportal.incometax.gov.in',
                  'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
                  'User-Agent': 'Mozilla/5.0',
                  'Cookie': cookie
                }
              }
            ),
            { cookie, pan } // ← missing
          );
          

          const satDocId = noticePdfRes.data?.satDocId;
          if (satDocId) {
            noticedocs.push(satDocId.toString());
            await savePdfByDocId(satDocId.toString(), cookie, pan);
          }
        } catch (err) {
          console.error(`⚠️ Failed to fetch notice PDF for ${ep.proceedingReqId}:`, err.message);
        }

        await delay(1500);

        // === Save Notice ===
        try {
          await Notice.findOneAndUpdate(
            { noticeNumber: n.documentReferenceId },
            {
              eProceedingId: eDoc._id,
              us: n.noticeSection || '',
              type: n.description || '',
              noticeNumber: n.documentReferenceId,
              noticeDate: n.issuedOn ? new Date(n.issuedOn) : null,
              dueDate: n.responseDueDate ? new Date(n.responseDueDate) : null,
              status: n.isSubmitted,
              responseStatus: n.respStatus || '',
              responseDate: n.issuedOn ? new Date(n.issuedOn) : null,
              noticeDocs: noticedocs,
              resDocs: resdocs
            },
            { upsert: true, new: true }
          );
          console.log(`✅ Saved notice: ${n.documentReferenceId}`);
        } catch (noticeErr) {
          console.error(`❌ Failed to save notice ${n.documentReferenceId}`, noticeErr.message);
        }
      }
    } catch (err) {
      console.error(`❌ Failed to process eProceeding ${ep.proceedingReqId}`, err.message);
    }

    await delay(3000); // Delay between proceedings
  }
}



  

  module.exports = {
    // Helper functions
    delay,
    retry,
    extendSession,
    
    // API functions
    getAssesseeDetails,
    getEProceedings,
    getNotices,
    getResponses,
    getDemands,
    getITRStatus,
    getAuditForms,
    getAuditFormDetails,
    savePdfByDocId,
    
    // Business logic functions
    fetchAndSave,
    syncEProceedingsData,
    syncDemandsData,
    syncITRData,
    syncAuditData,

    uploadPdfToS3
  };