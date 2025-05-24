const express = require('express');
const router = express.Router();
const { runAutomation } = require('../controllers/automationController');

router.post('/run', runAutomation);

module.exports = router;
