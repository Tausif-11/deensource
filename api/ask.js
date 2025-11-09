// Simple Vercel serverless function to accept Ask submissions (demo)
// This function validates payload and returns a success response.
// Note: writing to the filesystem in serverless is ephemeral; for real persistence use a DB or external storage.

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const contact = (body.contact || '').trim();
    const question = (body.question || '').trim();

    if (!contact || !question) {
      res.status(400).json({ error: 'contact and question are required' });
      return;
    }

    // For demo persistence, append to a local JSON file under src/data/asks.json
    // NOTE: On serverless hosts this file may not persist across invocations; this is only a demo.
    const fs = require('fs');
    const path = require('path');
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    const filePath = path.join(dataDir, 'asks.json');

    // ensure data directory exists
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    } catch (e) {
      console.warn('could not create data dir', e);
    }

    let existing = [];
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        existing = JSON.parse(raw || '[]');
      }
    } catch (e) {
      console.warn('could not read existing asks.json', e);
      existing = [];
    }

    const payload = {
      id: Date.now(),
      contact,
      question,
      receivedAt: new Date().toISOString()
    };

    existing.push(payload);
    try {
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
    } catch (e) {
      console.warn('could not write asks.json', e);
    }

    res.status(200).json({ ok: true, payload, message: 'Received — stored to src/data/asks.json (demo)' });
  } catch (err) {
    console.error('api/ask error', err);
    res.status(500).json({ error: 'internal_error' });
  }
};
