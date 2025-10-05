const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// enable CORS for FCC testing environment
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Timestamp Microservice - see /api/:date');
});

// Route for current time (no date parameter)
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

// Route for specific date
app.get('/api/:date', (req, res) => {
  const { date } = req.params;

  // If numeric string, treat as milliseconds
  if (/^-?\d+$/.test(date)) {
    const ms = Number(date);
    const parsed = new Date(ms);
    if (parsed.toString() === 'Invalid Date') return res.json({ error: 'Invalid Date' });
    return res.json({ unix: parsed.getTime(), utc: parsed.toUTCString() });
  }

  // Otherwise parse as date string
  const parsed = new Date(date);
  if (parsed.toString() === 'Invalid Date') return res.json({ error: 'Invalid Date' });
  res.json({ unix: parsed.getTime(), utc: parsed.toUTCString() });
});

app.listen(PORT, () => {
  console.log(`Timestamp Microservice listening on port ${PORT}`);
});
