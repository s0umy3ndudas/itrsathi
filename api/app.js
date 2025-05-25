const express = require('express');
const cors = require('cors');
const axios = require('axios');
const automationRoutes = require('./routes/automation');
 const path = require('path');

 
const app = express();

 const {Assessee,EProceeding,Notice,Demand,Itr,Audit} = require('./models/models');


// Middleware setup
app.use(cors());
app.use(express.json());  // for parsing application/json

require('dotenv').config();


// Serve static files under /naman/* from the api/naman directory
app.use('/naman', express.static(path.join(__dirname, 'naman')));

// Optional: default route
app.get('/', (req, res) => {
  res.send('PDF server running...');
});


let cookie = process.env.COOKIE;

// Remove leading/trailing single quotes if they exist
if (cookie?.startsWith("'") && cookie?.endsWith("'")) {
  cookie = cookie.slice(1, -1);
}


// Attach the automation routes
app.use('/api/automation', automationRoutes);

const fs = require('fs');
 // Ensure the directory exists
const downloadDir = path.join(__dirname, 'responseDocs');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}




//
app.post('/eproceedings', async (req, res) => {
  const { cookie, pan, pageNo = 1, type } = req.body;

  try {
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
          'Cookie': cookie, // Passed in via POST body
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch eProceedings' });
  }
});



// POST /notices
// POST /notices




// reponse
app.post('/responses', async (req, res) => {
  try {
    const { cookie, pan, headerSeqNo } = req.body;

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

    res.json(response.data);

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});



//download file

app.post('/docs', async (req, res) => {
  try {
    const { docId, cookie } = req.body;
    if (!docId || !cookie) {
      return res.status(400).json({ error: 'docId and cookie are required' });
    }

    const url = `https://eportal.incometax.gov.in/iec/document/${docId}`;

    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://eportal.incometax.gov.in/iec/foservices/',
        'Origin': 'https://eportal.incometax.gov.in',
        'Accept': '*/*'
      }
    });

    const filePath = path.join(downloadDir, `${docId}.pdf`);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      res.json({ message: 'Document downloaded successfully', path: filePath });
    });

    writer.on('error', (err) => {
      console.error('File write error:', err);
      res.status(500).json({ error: 'Failed to save document' });
    });

  } catch (error) {
    console.error('Download error:', error.message);
    res.status(500).json({ error: 'Failed to download document' });
  }
});




/// demand
 
/// 🚀 POST /demands - Fetch & Save Outstanding Demands
/// 🚀 POST /demands - Fetch & Save Outstanding Demands

//-------------------------------demands

app.post('/demands', async (req, res) => {
  const { cookie, pan } = req.body;

  // 🔍 Validate request body
  if (!cookie || !pan) {
    console.log('⚠️  Missing cookie or PAN in request body.');
    return res.status(400).json({ error: 'Both "cookie" and "pan" are required in the body.' });
  }

  try {
    console.log(`🌐 Fetching demands from IT portal for PAN: ${pan}...`);

    // 🌐 Send request to Income Tax e-portal to fetch outstanding demands
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

    const demandList = response.data?.demandList || [];
    console.log(`📄 Received ${demandList.length} demand(s) for PAN: ${pan}`);

    // 🧾 Check if assessee exists, else create a new one
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

    // 💾 Loop through and save each demand to DB
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
        responsePdf: '', // 📎 Optional: Attach PDF file path if available
        assessee: assessee._id
      });

      await demand.save();
      console.log(`💾 Saved demand with Ref No: ${item.din}`);
      savedDemands.push(demand);
    }

    console.log(`✅ All demands processed. ${savedDemands.length} new demand(s) saved.`);

    // ✅ Success response
    res.json({
      message: 'Demands fetched and saved successfully.',
      savedCount: savedDemands.length,
      savedDemands
    });

  } catch (error) {
    // ❌ Error handling
    console.error('🔥 Error while fetching/saving demands:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch or save demands',
      details: error?.response?.data || error.message
    });
  }
});


app.get('/demands', async (req, res) => {
  try {
    const { pan } = req.query;

    let filter = {};

    if (pan) {
      // Find the Assessee with that PAN
      const assessee = await Assessee.findOne({ pan });
      if (!assessee) {
        return res.status(404).json({ error: 'Assessee not found for the provided PAN.' });
      }
      filter.assessee = assessee._id;
    }

    // Populate Assessee details in the response
    const demands = await Demand.find(filter).populate('assessee');

    res.json({ count: demands.length, demands });

  } catch (error) {
    console.error('Error fetching demands:', error.message);
    res.status(500).json({
      error: 'Failed to fetch demands',
      details: error.message
    });
  }
});


//------------------------------------itrs
app.post('/itr', async (req, res) => {
  const { pan, cookie } = req.body;

  if (!pan || !cookie) {
    console.warn('❌ Missing PAN or Cookie');
    return res.status(400).json({ error: 'PAN and Cookie are required' });
  }

  try {
    console.log(`🔍 Searching for assessee with PAN: ${pan}`);
    let assessee = await Assessee.findOne({ pan });

    if (!assessee) {
      console.log(`🆕 Assessee not found. Creating new entry for PAN: ${pan}`);
      assessee = await Assessee.create({ pan });
    } else {
      console.log(`✅ Assessee found: ${assessee._id}`);
    }

    console.log('🌐 Sending request to Income Tax API for ITR status...');

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

    const data = response.data || [];
    console.log(`📦 Received ${data.length} ITR entries from API`);

    const savedItrs = [];
    let skippedCount = 0;

   for (const entry of data) {
  const { assmentYear, ackNum, formTypeCd, ackDt } = entry;

  if (!assmentYear || !ackNum || !formTypeCd || !ackDt) {
    console.warn(`⚠️ Skipping invalid entry: missing required fields`, { assmentYear, ackNum, formTypeCd, ackDt });
    continue;
  }

  const existing = await Itr.findOne({ assessee: assessee._id, ackNumber: ackNum });

  if (existing) {
    console.log(`⏭️ Skipping existing ITR for AY: ${assmentYear}, ACK: ${ackNum}`);
    skippedCount++;
    continue;
  }

  const parsedDate = new Date(ackDt);
  if (isNaN(parsedDate.getTime())) {
    console.warn(`⚠️ Invalid filing date for ACK ${ackNum}:`, ackDt);
    continue;
  }
console.log('🔎 Raw ITR entry:', entry);

  console.log(`💾 Saving ITR for AY: ${assmentYear}, ACK: ${ackNum}`);

  const itr = new Itr({
    assessee: assessee._id,
    assessmentYear: assmentYear,
    itrForm: formTypeCd,
    filingDate: parsedDate,
    currentStatus: entry.itrPanDetlList?.[0]?.statusDesc || null,
    returnProcessingStatus: entry.efileStatus || null,
    itrAckPdfUrl: null,
    itrFormPdfUrl: null,
    intimationPdfUrl: null,
    aisPdfUrl: null,
    form26asPdfUrl: null,
    link: null,
    ackNumber: ackNum,
    filingSection: entry.incmTaxSecCd
  });

  await itr.save();
  savedItrs.push(itr);
}


    console.log(`✅ ITR Sync complete. Saved: ${savedItrs.length}, Skipped: ${skippedCount}`);

    return res.status(200).json({
      message: 'ITR data synced successfully',
      saved: savedItrs.length,
      skipped: skippedCount,
      itrs: savedItrs
    });

  } catch (err) {
    console.error('❌ Error syncing ITR:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/itr/:pan', async (req, res) => {
  const { pan } = req.params;

  try {
    // Find assessee by PAN
    const assessee = await Assessee.findOne({ pan });

    if (!assessee) {
      return res.status(404).json({ error: 'Assessee not found' });
    }

    // Find all ITRs linked to the assessee
    const itrs = await Itr.find({ assessee: assessee._id }).sort({ assessmentYear: -1 });

    return res.status(200).json({
      message: `Found ${itrs.length} ITR(s) for PAN ${pan}`,
      itrs
    });
  } catch (err) {
    console.error('Error fetching ITRs:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/itr', async (req, res) => {
  try {
    const result = await Itr.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} ITR entries`);
    res.status(200).json({ message: 'All ITR entries deleted', count: result.deletedCount });
  } catch (err) {
    console.error('❌ Error deleting ITR entries:', err.message);
    res.status(500).json({ error: 'Failed to delete ITR entries' });
  }
});



//sync 
// Utility sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



//----------------------------------------------------------------

// Function to save proceedings data to database
// Function to save proceedings data to database




// Function to save proceedings data to database
  

///-------------------------------




// MongoDB connection string for local setup
const mongoose = require('mongoose');

// Replace with your actual MongoDB Atlas connection URI
const mongoURI = 'mongodb+srv://somdas1509:372595130@cluster0.gywlqhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('❌ Error connecting to MongoDB Atlas:', err);
});



app.post('/notices', async (req, res) => {
  try {
    const { cookie, proceedingReqId, pan } = req.body; // accept cookie from frontend

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
      'Cookie': cookie, // ← PASS from request, not env
      'Connection': 'keep-alive',
    };
     


    const response = await axios.post(
      'https://eportal.incometax.gov.in/iec/returnservicesapi/auth/getEntity',
      payload,
      { headers }
    );

    res.json(response.data);

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


 
 
 


  
 
// Delay utility
 


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



// get account details
app.post('/getName', async (req, res) => {
  const { pan, cookie } = req.body;

  if (!pan || !cookie) {
    return res.status(400).json({ error: 'PAN and Cookie are required' });
  }

  console.log('📩 Received PAN and Cookie for PAN Details fetch');
  console.log('➡️ PAN:', pan);

  try {
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

    console.log('✅ PAN details fetched successfully');
    return res.status(200).json({
      message: 'PAN details fetched successfully',
      data: response.data
    });
  } catch (err) {
    console.error('❌ Error fetching PAN details:', err.message);
    return res.status(500).json({ error: 'Failed to fetch PAN details' });
  }
});



/**
 * Downloads a PDF by docId from the e-portal and stores it under naman/eproceedings/<PAN>.
 * @param {string} docId - The document ID.
 * @param {string} cookie - Cookie header string (from browser session).
 * @param {string} pan - PAN number used for directory structure.
 */
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
      { cookie, pan } // ← THIS was missing
    );
    

    const dirPath = path.join(__dirname, 'naman', 'eproceedings', pan);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${docId}.pdf`);
    fs.writeFileSync(filePath, response.data);
    console.log(`✅ Saved PDF to: ${filePath}`);
  } catch (error) {
    console.error(`❌ Failed to download docId ${docId} for PAN ${pan}:`, error.message);
  }
}
 






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

      const res = await retry(
        () => axios.post('http://localhost:5000/notices', { cookie, proceedingReqId: ep.proceedingReqId, pan }),
        { cookie, pan } // ← missing
      );
      

      const notices = res.data || [];
      console.log(`📎 Notices found: ${notices.length}`);

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
          const response = await retry(
            () => axios.post('http://localhost:5000/responses', { cookie, headerSeqNo: n.headerSeqNo, pan }),
            { cookie, pan } // ← missing
          );
          

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

// === Express Endpoint ===
  app.post('/sync', async (req, res) => {
    const { cookie, pan,password, type } = req.body;
    const baseUrl = 'http://localhost:5000';
    const downloadDir = path.join(__dirname, 'downloads');

    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
    }

    try {
      console.log(`🔍 Fetching assessee details for PAN: ${pan}`);

      const { data: getNameResp } = await axios.post(`${baseUrl}/getName`, {
        pan,
        cookie
      });

      if (!getNameResp || !getNameResp.data ) {
        throw new Error('Invalid response from /getName');
      }

     // 🔁 UPSERT Assessee
const raw = getNameResp.data;
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
      const { data } = await axios.post(`${baseUrl}/eproceedings`, {
        cookie,
        pan,
        type
      });

      let eProceedings = data.eProceedingPaginatedRequests || [];

      const existingIds = await EProceeding.find(
        { id: { $in: eProceedings.map(ep => ep.proceedingReqId) } },
        { id: 1 }
      ).lean();

      const existingIdSet = new Set(existingIds.map(ep => ep.id));
      const newProceedings = eProceedings.filter(ep => !existingIdSet.has(ep.proceedingReqId));

      console.log(`💾 Found ${newProceedings.length} new proceedings to process`);

      await fetchAndSave(newProceedings, cookie, pan);

      res.status(200).json({
        message: 'Sync completed successfully',
        total: eProceedings.length,
        processed: newProceedings.length,
        skipped: eProceedings.length - newProceedings.length
      });

    } catch (error) {
      console.error('❌ Error during sync:', error.message);
      res.status(500).json({ message: 'Sync failed', error: error.message });
    }
  });

 
app.get('/assessee/:pan/details', async (req, res) => {
  try {
    const pan = req.params.pan;

    const assesseeData = await Assessee.findOne({ pan });

    if (!assesseeData) return res.status(404).json({ error: "Assessee not found" });

    const proceedings = await EProceeding.find({ assesseeId: assesseeData._id }).lean();

    // Attach notices to each proceeding
    for (let ep of proceedings) {
      ep.notices = await Notice.find({ eProceedingId: ep._id }).lean();
    }

    res.json({
      assessee: assesseeData,
      proceedings: proceedings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get('/api/assessee', async (req, res) => {
  const { pan } = req.query;

  if (!pan) return res.status(400).json({ error: 'PAN is required' });

  try {
    const assessee = await Assessee.findOne({ pan });
    if (!assessee) return res.status(404).json({ error: 'Assessee not found' });

    const proceedings = await EProceeding.find({ assesseeId: assessee._id });

    return res.json({
      assessee,
      proceedings
    });
  } catch (err) {
    console.error('❌ Error fetching assessee:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Create Assessee and EProceedings
app.post('/assessee-with-proceedings', async (req, res) => {
  const { pan, name, lastSyncedOn, proceedings } = req.body;

  if (!pan || !Array.isArray(proceedings)) {
    return res.status(400).json({ error: 'PAN and proceedings are required.' });
  }

  try {
    // Check if Assessee exists, else create one
    let assessee = await Assessee.findOne({ pan });
    if (!assessee) {
      assessee = await Assessee.create({ pan, name, lastSyncedOn });
    }

    // Insert each proceeding linked to assesseeId
    const createdProceedings = [];
    for (const p of proceedings) {
      if (!p.type || !p.ay) continue;
      const newP = await EProceeding.create({
        type: p.type,
        ay: p.ay,
        assesseeId: assessee._id,
      });
      createdProceedings.push(newP);
    }

    return res.status(201).json({
      message: 'Assessee and proceedings created',
      assessee,
      proceedings: createdProceedings,
    });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
});


//----------------
app.get('/assessees', async (req, res) => {
  try {
    const assessees = await Assessee.find().sort({ name: 1 }); // sorted alphabetically by name
    res.status(200).json(assessees);
  } catch (error) {
    console.error('❌ Failed to fetch assessees:', error.message);
    res.status(500).json({ message: 'Failed to fetch assessees', error: error.message });
  }
});



///--------audit

app.post('/audit', async (req, res) => {
  const { pan, cookie } = req.body;

  if (!pan || !cookie) return res.status(400).json({ error: 'PAN and Cookie are required' });

  try {
    // 🔍 Step 1: Get filed forms
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

    const forms = response1.data.forms || [];
    console.log(`📄 Total forms fetched for ${pan}: ${forms.length}`);

    const assessee = await Assessee.findOne({ pan: pan.toUpperCase() });
    if (!assessee) {
      console.warn(`❗ No assessee found for PAN ${pan}`);
      return res.status(404).json({ error: 'Assessee not found' });
    }

    // 📦 Step 2: Process each form
    for (const form of forms) {
      const { formCd, formDesc, refYearType } = form;

      const response2 = await retry(() =>
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

      const auditForms = response2.data.forms || [];
      console.log(`📋 ${auditForms.length} records found for formCd ${formCd}`);

      for (const entry of auditForms) {
        const exists = await Audit.findOne({
          assessee: assessee._id,
          assessmentYear: entry.refYear.toString(),
          acknowledgment: entry.ackNum
        });

        if (exists) {
          console.log(`⚠️ Skipping duplicate for AY ${entry.refYear}, Ack ${entry.ackNum}`);
          continue;
        }

        const audit = new Audit({
          assessee: assessee._id,
          assessmentYear: entry.refYear.toString(),
          returnForm: entry.filingTypeCd || '',
          auditSection: formDesc || '',
          auditStatus: entry.formStatus || '',
          filingDate: new Date(entry.ackDt.split('-').reverse().join('-')),
          auditForm: entry.formTypeCd || '',
          acknowledgment: entry.ackNum,
          link: `https://eportal.incometax.gov.in/iec/foservices/#/preLogin/viewFiledForms`
        });

        await audit.save();
        console.log(`✅ Saved audit for AY ${entry.refYear}, Ack ${entry.ackNum}`);
      }
    }

    res.status(200).json({ message: 'Audit extraction completed.' });

  } catch (err) {
    console.error(`❌ Error in audit processing: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all audits for a specific PAN
app.get('/audit/:pan', async (req, res) => {
  try {
    const { pan } = req.params;

    // Find assessee by PAN
    const assessee = await Assessee.findOne({ pan: pan.toUpperCase() }); // case-insensitive match
    if (!assessee) {
      return res.status(404).json({ error: 'Assessee not found for this PAN' });
    }

    // Find audits linked to this assessee
    const audits = await Audit.find({ assessee: assessee._id }).populate('assessee');
    res.status(200).json(audits);

  } catch (err) {
    console.error('❌ Failed to fetch audits for PAN:', err.message);
    res.status(500).json({ error: 'Failed to fetch audits for this PAN' });
  }
});



// Export the app for use in index.js
module.exports = app;
