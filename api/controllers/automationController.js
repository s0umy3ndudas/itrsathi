const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const { automateLoginAndScrape } = require('../services/puppeteerService');

async function runAutomation(req, res) {
  const { pan, password } = req.body;

  try {
    const result = await automateLoginAndScrape(pan, password);

    res.json({ message: result?.message || '' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Automation failed', details: err.message });
  }
}


module.exports = { runAutomation };
