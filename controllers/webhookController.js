const Webhook = require('../models/Webhook');
const { dispatchWebhook } = require('../services/webhookDispatcher');

// Register a webhook
const registerWebhook = async (req, res) => {
  try {
    const { url, event } = req.body;

    if (!url || !event) {
      return res.status(400).json({ message: 'URL and event are required.' });
    }

    const newWebhook = await Webhook.create({ url, event });
    res.status(201).json({ message: 'Webhook registered.', webhook: newWebhook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register webhook.', error: error.message });
  }
};

// Trigger an event (notify all matching webhooks)
const triggerEvent = async (req, res) => {
  try {
    const { event, payload } = req.body;

    if (!event) {
      return res.status(400).json({ message: 'Event is required.' });
    }

    const webhooks = await Webhook.find({ event });

    if (!webhooks.length) {
      return res.status(404).json({ message: 'No webhooks found for this event.' });
    }

    for (const hook of webhooks) {
      await dispatchWebhook(hook.url, payload);
    }

    res.status(200).json({ message: `Event triggered for ${webhooks.length} webhooks.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to trigger event.', error: error.message });
  }
};

module.exports = { registerWebhook, triggerEvent };
