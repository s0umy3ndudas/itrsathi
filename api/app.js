const express = require('express');
const cors = require('cors');
const axios = require('axios');
const automationRoutes = require('./routes/automation');
 const path = require('path');
 const fs = require('fs');
 const {automateLoginAndScrape} = require('./services/puppeteerService')
const app = express();

const userRoutes = require("./routes/user.route.js");
const assesseeRoutes = require("./routes/assessee.route.js");

 const {Assessee,EProceeding,Notice,Demand,Itr,Audit} = require('./models/models');

 const AWS = require('aws-sdk');

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// MongoDB connection string for local setup
const mongoose = require('mongoose');

// Replace with your actual MongoDB Atlas connection URI
const mongoURI = 'mongodb+srv://somdas1509:372595130@cluster0.gywlqhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('❌ Error connecting to MongoDB Atlas:', err);
});


// Middleware setup
app.use(cors());
app.use(express.json());  // for parsing application/json

require('dotenv').config();


const multer = require('multer');
const csv = require('csv-parser');
 



const upload = multer({ dest: 'uploads/' });




/////redis----------------------------------------------

// const { createClient } = require('redis');



// const redis = createClient();
 

const { Redis } = require('@upstash/redis');

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});




const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const bodyParser = require('body-parser');
const createQueueRoutes = require('./routes/queue.route.js');

app.use(bodyParser.json());

// Redis client



// // POST /api/check-pans
// app.get('/api/assessee/pans', async (req, res) => {
//   try {
//     const assessees = await Assessee.find({}, { pan: 1, _id: 0 });

//     const pans = assessees.map(a => a.pan);

//     res.status(200).json({
//       count: pans.length,
//       pans
//     });
//   } catch (error) {
//     console.error('Error fetching PANs:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// app.post('/api/clear-queue', async (req, res) => {
//   try {
//     const keys = await redis.keys('job:*');

//     if (keys.length === 0) {
//       return res.status(200).json({ message: 'Queue is already empty.' });
//     }

//     await redis.del(...keys);

//     return res.status(200).json({
//       message: `Cleared ${keys.length} jobs from the queue.`,
//       deletedKeys: keys
//     });
//   } catch (err) {
//     console.error('Error clearing queue:', err);
//     return res.status(500).json({ error: 'Failed to clear queue' });
//   }
// });


// app.post('/api/upload-pan-json', async (req, res) => {
//   const panList = req.body;
//   if (!Array.isArray(panList)) {
//     return res.status(400).json({ error: 'Expected an array of PAN-password pairs' });
//   }

//   const cleaned = panList.filter(entry => entry.pan && entry.password)
//     .map(entry => ({
//       pan: entry.pan.trim().toUpperCase(),
//       password: entry.password.trim()
//     }));

//   const added = [], skipped = [];

//   for (const { pan, password } of cleaned) {
//     const jobId = `job:${pan}`;
//     const exists = await redis.exists(jobId);

//     if (!exists) {
//       await redis.hset(jobId, { pan, password, status: 'in_queue' });
//       added.push(pan);
//     } else {
//       const status = await redis.hget(jobId, 'status');
      
//       if (['in_queue', 'processing', 'retry'].includes(status)) {
//         skipped.push(pan);
//       } else if (status === 'success' || status === 'wrong_password') {
//         await redis.hset(jobId, { pan, password, status: 'in_queue' });
//         added.push(pan);
//       } else {
//         skipped.push(pan); // just in case for any unexpected status
//       }
//     }
//   }

//   return res.status(200).json({
//     message: 'PAN list processed successfully',
//     addedCount: added.length,
//     skippedCount: skipped.length,
//     added,
//     skipped
//   });
// });


// app.post('/api/addPan', async (req, res) => {
//   const { pan, password } = req.body;

//   if (!pan || !password) {
//     return res.status(400).json({ error: 'pan and password are required' });
//   }

//   const cleanPan = pan.trim().toUpperCase();
//   const cleanPassword = password.trim();
//   const jobId = `job:${cleanPan}`;

//   try {
//     const exists = await redis.exists(jobId);

//     if (!exists) {
//       await redis.hset(jobId, {
//         pan: cleanPan,
//         password: cleanPassword,
//         status: 'in_queue'
//       });
//       return res.status(200).json({ message: 'New PAN added to queue' });
//     }

//     const status = await redis.hget(jobId, 'status');

//     if (['in_queue', 'processing', 'retry'].includes(status)) {
//       return res.status(200).json({ message: `PAN exists with status "${status}", skipped`, skipped: true });
//     }

//     if (status === 'success' || status === 'wrong_password') {
//       await redis.hset(jobId, {
//         pan: cleanPan,
//         password: cleanPassword,
//         status: 'in_queue'
//       });
//       return res.status(200).json({ message: 'PAN re-queued with status "in_queue"' });
//     }

//     // For unexpected status
//     return res.status(200).json({ message: `PAN exists with unknown status "${status}", skipped`, skipped: true });

//   } catch (error) {
//     console.error('Error processing PAN:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Delete job by PAN - using direct key lookup
// app.post('/api/terminatePan', async (req, res) => {
//   const { pan } = req.body;
  
//   try {
//     // Create job key directly from PAN
//     const jobKey = `job:${pan}`;
    
//     // Check if job exists
//     const exists = await redis.exists(jobKey);
    
//     if (!exists) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     // Delete the job
//     await redis.del(jobKey);
    
//     res.json({
//       success: true,
//       message: 'Job deleted successfully',
//       pan: pan
//     });
    
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting job',
//       error: error.message
//     });
//   }
// });


// app.post('/api/addBacktoQueue', async (req, res) => {
//   const { pan } = req.body;
  
//   try {
//     // Create job key directly from PAN
//     const jobKey = `job:${pan}`;
    
//     // Check if job exists
//     const exists = await redis.exists(jobKey);
    
//     if (!exists) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     // Update job status to "in_queue"
//     await redis.hset(jobKey, {
//       status: 'in_queue',
//      });
    
//     res.json({
//       success: true,
//       message: 'Job added back to queue successfully',
//       pan: pan,
//       status: 'in_queue'
//     });
    
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating job status',
//       error: error.message
//     });
//   }
// });

// app.get('/api/getQueue', async (req, res) => {
//   try {
//     const keys = await redis.keys('job:*');
//     const queue = [];

//     for (const key of keys) {
//       const job = await redis.hgetall(key);
//       queue.push({
//         jobId: key,
//         ...job
//       });
//     }

//     res.status(200).json({
//       total: queue.length,
//       queue
//     });

//   } catch (error) {
//     console.error('Error fetching queue:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.use("/api/queues", createQueueRoutes(redis));  
app.use("/api/users", userRoutes);
app.use("/api/assessees", assesseeRoutes);


// worker/queueWorker.js
const MAX_PARALLEL_USERS = 5;          // tune as you like
const GLOBAL_LOCK_KEY = "lock:worker"; // optional global lock per cycle
const GLOBAL_LOCK_TTL = 25_000;        // ms
const USER_LOCK_TTL = 120_000;         // ms — should exceed typical job runtime

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Extract userId from key: job:<userId>:<PAN>
function parseUserId(jobKey) {
  // job:<userId>:<PAN>
  const parts = jobKey.split(":");
  // ["job", "<userId>", "<PAN>"]
  return parts.length >= 3 ? parts[1] : null;
}

// Get 1 job we can process for a user (in_queue first, else retry)
async function selectJobForUser(redis, userId) {
  const keys = await redis.keys(`job:${userId}:*`);
  if (!keys.length) return null;

  // If ANY job is already processing for this user, skip
  for (const key of keys) {
    const job = await redis.hgetall(key);
    if (job && job.status === "processing") {
      return null;
    }
  }

  // Priority 1: in_queue
  for (const key of keys) {
    const job = await redis.hgetall(key);
    if (job && job.status === "in_queue") return { key, job };
  }

  // Priority 2: retry
  for (const key of keys) {
    const job = await redis.hgetall(key);
    if (job && job.status === "retry") return { key, job };
  }

  return null;
}

// Process a single user's next job (with per-user lock)
async function processOneUser(redis, userId, automateLoginAndScrape) {
  const userLockKey = `lock:user:${userId}`;

  // Acquire per-user lock
  const gotLock = await redis.set(userLockKey, "locked", { NX: true, PX: USER_LOCK_TTL });
  if (!gotLock) {
    console.log(`⏭️  User ${userId}: lock held by another worker, skipping`);
    return;
  }

  try {
    // Clean invalid jobs for this user
    const keys = await redis.keys(`job:${userId}:*`);
    for (const key of keys) {
      const job = await redis.hgetall(key);
      if (!job?.pan || !job?.password) {
        console.log(`🗑️  Removing invalid job ${key} (missing pan/password)`);
        await redis.del(key);
      }
    }

    // Re-select one eligible job
    const selected = await selectJobForUser(redis, userId);
    if (!selected) {
      console.log(`📭 User ${userId}: no eligible jobs (in_queue/retry) or already processing`);
      return;
    }

    const { key, job } = selected;

    // Mark processing
    await redis.hset(key, {
      status: "processing",
      processingAt: Date.now().toString(),
    });
    console.log(`🟡 ${key} → processing`);

    let result = {};
    try {
      result = await automateLoginAndScrape(job.pan, job.password);
      console.log(`📝 ${key} result:`, result);
    } catch (e) {
      console.log(`❌ ${key} thrown error: ${e.message}`);
      result = { success: false, message: e.message };
    }

    // Decide final status
    if (result?.success && result?.message === "Login and scrape successful") {
      await redis.hset(key, { status: "success", finishedAt: Date.now().toString() });
      console.log(`✅ ${key} → success`);
    } else if (
      result?.message === "wrong password" ||
      result?.message === "Login verification failed (no error message detected)"
    ) {
      await redis.hset(key, { status: "wrong_password", finishedAt: Date.now().toString() });
      console.log(`❌ ${key} → wrong_password`);
    } else {
      await redis.hset(key, { status: "retry", finishedAt: Date.now().toString() });
      console.log(`🔁 ${key} → retry`);
    }
  } finally {
    // Always release per-user lock
    await redis.del(userLockKey);
  }
}

// Simple concurrency limiter for per-user tasks
async function runWithConcurrency(tasks, limit = MAX_PARALLEL_USERS) {
  const queue = [...tasks];
  const running = new Set();

  async function runNext() {
    if (queue.length === 0) return;
    const fn = queue.shift();
    const p = fn().finally(() => running.delete(p));
    running.add(p);
    if (running.size >= limit) {
      await Promise.race(running);
    }
    return runNext();
  }

  const starters = Array(Math.min(limit, queue.length)).fill(0).map(runNext);
  await Promise.all(starters);
  // Wait any stragglers
  await Promise.allSettled(Array.from(running));
}

async function processQueueMultiUser() {
  console.log("====================================");
  console.log("🕐 Queue polling started at", new Date().toLocaleTimeString());
  console.log("====================================");

  // (Optional) prevent overlapping cycles of THIS process
  const globalLock = await redis.set(GLOBAL_LOCK_KEY, "locked", { NX: true, PX: GLOBAL_LOCK_TTL });
  if (!globalLock) {
    console.log("⏳ Another cycle is already running in this worker. Skipping...\n");
    return;
  }

  try {
    // 1) Gather all jobs
    const allKeys = await redis.keys("job:*");
    if (!allKeys.length) {
      console.log("📭 No jobs in queue.");
      return;
    }

    // 2) Group keys by userId
    const users = new Map(); // userId -> array of keys
    for (const key of allKeys) {
      const userId = parseUserId(key);
      if (!userId) continue;
      if (!users.has(userId)) users.set(userId, []);
      users.get(userId).push(key);
    }

    if (users.size === 0) {
      console.log("📭 No parsable user jobs.");
      return;
    }

    console.log(`👥 Found ${users.size} user(s) with jobs`);

    // 3) For each user, create a task that processes ONE job (with per-user lock)
    const tasks = [];
    for (const userId of users.keys()) {
      tasks.push(async () => {
        await processOneUser(redis, userId, automateLoginAndScrape);
      });
    }

    // 4) Run per-user tasks with limited concurrency
    await runWithConcurrency(tasks, MAX_PARALLEL_USERS);

    console.log("✅ Multi-user polling cycle completed.\n");
  } catch (err) {
    console.error("❌ Error in multi-user cycle:", err);
  } finally {
    await redis.del(GLOBAL_LOCK_KEY);
  }
}

// Run every 30 seconds
setInterval(processQueueMultiUser, 30_000);




 


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


 // Ensure the directory exists
const downloadDir = path.join(__dirname, 'responseDocs');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}



///// sync endpoint and functions

// === sync Endpoint ===
app.post('/sync', async (req, res) => {
  const { cookie, pan,password, type } = req.body;
  const baseUrl = process.env.API_URL;
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

// notice
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






//////#################################################



//////#################################################


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





 
 
 


  
 
// Delay utility
 








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


const bucketName = 'playwright-docs';


/// delete assesse
app.delete('/delAssessee/:pan', async (req, res) => {
  const { pan } = req.params;

  try {
    // Step 1: Find assessee by PAN
    const assessee = await Assessee.findOne({ pan });
    if (!assessee) {
      return res.status(404).json({ message: 'Assessee not found' });
    }

    const assesseeId = assessee._id;

    // Step 2: Find all EProceedings for this assessee
    const eProceedings = await EProceeding.find({ assesseeId });
    const eProceedingIds = eProceedings.map(e => e._id);

    // Step 3: Delete all related DB records
    const [
      deletedNotices,
      deletedEProceedings,
      deletedDemands,
      deletedItrs,
      deletedAudits
    ] = await Promise.all([
      Notice.deleteMany({ eProceedingId: { $in: eProceedingIds } }),
      EProceeding.deleteMany({ assesseeId }),
      Demand.deleteMany({ assessee: assesseeId }),
      Itr.deleteMany({ assessee: assesseeId }),
      Audit.deleteMany({ assessee: assesseeId })
    ]);

    // Step 4: Delete S3 documents under the pan folder
    const listParams = {
      Bucket: bucketName,
      Prefix: `${pan}/`
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: listedObjects.Contents.map(obj => ({ Key: obj.Key }))
        }
      };

      await s3.deleteObjects(deleteParams).promise();
      console.log(`🗑️ Deleted ${listedObjects.Contents.length} object(s) from S3 path: ${pan}/`);
    }

    // Step 5: Delete the Assessee
    await Assessee.deleteOne({ _id: assesseeId });

    // Step 6: Send response
    res.status(200).json({
      message: `Deleted assessee ${pan} and related records.`,
      deleted: {
        notices: deletedNotices.deletedCount,
        eProceedings: deletedEProceedings.deletedCount,
        demands: deletedDemands.deletedCount,
        itrs: deletedItrs.deletedCount,
        audits: deletedAudits.deletedCount,
        s3Files: listedObjects.Contents.length
      }
    });
  } catch (error) {
    console.error('❌ Error deleting assessee and related data:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// DELETE all data in all collections
app.delete('/delete-all-data', async (req, res) => {
  try {
    await Promise.all([
      Assessee.deleteMany({}),
      EProceeding.deleteMany({}),
      Notice.deleteMany({}),
      Demand.deleteMany({}),
      Itr.deleteMany({}),
      Audit.deleteMany({})
    ]);

    res.status(200).json({ message: 'All data deleted from all collections.' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Failed to delete data', error: error.message });
  }
});



app.get('/assessee-details', async (req, res) => {
  try {
    // Find all Assessees
    const assessees = await Assessee.find().lean();

    // For each assessee, fetch related data and attach
    const detailedData = await Promise.all(assessees.map(async (assessee) => {
      
      // Fetch EProceedings related to this assessee
      const eProceedings = await EProceeding.find({ assesseeId: assessee._id }).lean();

      // For each EProceeding, fetch related Notices
      const eProceedingsWithNotices = await Promise.all(eProceedings.map(async (ep) => {
        const notices = await Notice.find({ eProceedingId: ep._id }).lean();
        return { ...ep, notices };
      }));

      // Fetch Demands related to this assessee
      const demands = await Demand.find({ assessee: assessee._id }).lean();

      // Fetch ITRs related to this assessee
      const itrs = await Itr.find({ assessee: assessee._id }).lean();

      // Fetch Audits related to this assessee
      const audits = await Audit.find({ assessee: assessee._id }).lean();

      return {
        ...assessee,
        eProceedings: eProceedingsWithNotices,
        demands,
        itrs,
        audits
      };
    }));

    res.json({ success: true, data: detailedData });
  } catch (error) {
    console.error('Error fetching detailed assessee data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/all-data', async (req, res) => {
  try {
    const [assessees, eProceedings, notices, demands, itrs, audits] = await Promise.all([
      Assessee.find().lean(),
      EProceeding.find().lean(),
      Notice.find().lean(),
      Demand.find().lean(),
      Itr.find().lean(),
      Audit.find().lean(),
    ]);

    res.json({
      success: true,
      data: {
        assessees,
        eProceedings,
        notices,
        demands,
        itrs,
        audits
      }
    });
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Export the app for use in index.js
module.exports = app;
