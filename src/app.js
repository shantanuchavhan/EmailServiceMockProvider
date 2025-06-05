const express = require('express');
const { sendEmail, getStatus } = require('./core/emailService');
const isRateLimited = require('./core/rateLimiter');
const crypto = require('crypto');

const app = express();
app.use(express.json());

function generateKey(email) {
  return crypto.createHash('sha256').update(email.to + email.subject + email.body).digest('hex');
}

app.post('/send-email', async (req, res) => {
  const email = req.body;
  const ip = req.ip;
  const key = generateKey(email);

  if (isRateLimited(ip)) return res.status(429).json({ message: 'Rate limited' });

  try {
    await sendEmail(email, key);
    res.json({ message: 'Email sent or queued', idempotencyKey: key });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/status/:key', (req, res) => {
  const status = getStatus(req.params.key);
  if (!status) return res.status(404).json({ error: 'Not found' });
  res.json({ status });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Email service running on port ${PORT}`));
