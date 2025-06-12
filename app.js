const express = require('express');
const app = express();
const webhookRoutes = require('./routes/webhookRoutes');

app.use(express.json());

// Routes
app.use('/api/webhooks', webhookRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('✅ Webhook Service is Running');
});

module.exports = app;
