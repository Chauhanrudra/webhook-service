const axios = require('axios');
const webhookQueue = require('../queues/webhookQueue');

// Process jobs from the queue
webhookQueue.process(async (job) => {
  const { url, payload } = job.data;
  const currentAttempt = job.attemptsMade + 1;
  const maxAttempts = job.opts.attempts || 1;

  try {
    const response = await axios.post(url, payload);
    console.log(
      `✅ Webhook sent to ${url} | Status: ${response.status} | Attempt ${currentAttempt}/${maxAttempts}`
    );
  } catch (error) {
    console.error(
      `❌ Error sending to ${url} | Attempt ${currentAttempt}/${maxAttempts}: ${error.message}`
    );
    throw error;
  }
});

webhookQueue.on('failed', (job) => {
  const maxAttempts = job.opts.attempts || 1;

  if (job.attemptsMade < maxAttempts) {
    console.warn(
      `↻ Retrying webhook to ${job.data.url} | Next attempt ${job.attemptsMade + 1}/${maxAttempts}`
    );
    return;
  }

  console.error(`✖ Webhook to ${job.data.url} failed after ${maxAttempts} attempts.`);
});

// Function to add jobs to queue
const dispatchWebhook = async (url, payload) => {
  await webhookQueue.add({ url, payload });
};

module.exports = { dispatchWebhook };
