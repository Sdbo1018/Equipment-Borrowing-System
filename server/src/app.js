const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

// ROUTES: each ticket adds exactly ONE app.use(...) line below this comment.

// ERROR HANDLERS: added by VAL-BE-04 — keep them at the bottom.

module.exports = app;