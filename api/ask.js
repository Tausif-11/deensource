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

    // demo: echo back and pretend to queue
    const payload = {
      id: Date.now(),
      contact,
      question,
      receivedAt: new Date().toISOString()
    };

    // In a real function, you'd store `payload` to a DB or send an email/DM.

    res.status(200).json({ ok: true, payload, message: 'Received — demo mode only' });
  } catch (err) {
    console.error('api/ask error', err);
    res.status(500).json({ error: 'internal_error' });
  }
};
