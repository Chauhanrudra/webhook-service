const express = require('express');
const router = express.Router();
const { registerWebhook, triggerEvent } = require('../controllers/webhookController');

router.post('/register', registerWebhook);
router.post('/trigger', triggerEvent);

module.exports = router;
