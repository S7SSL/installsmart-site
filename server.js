/**
 * InstallSmart Website Packages API Server
 * Handles Stripe checkout and discount code management
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const checkout = require('./api/checkout');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('.'));

// Routes
app.post('/api/checkout', checkout.createCheckoutSession);
app.get('/api/validate-code', checkout.validateCode);
app.post('/api/add-discount-code', checkout.addDiscountCode);
app.post('/api/webhook/stripe', bodyParser.raw({ type: 'application/json' }), checkout.handleWebhook);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'installsmart-website-packages' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ InstallSmart Website Packages API listening on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔐 Stripe Keys: ${process.env.STRIPE_SECRET_KEY ? '✅' : '❌'}`);
});
