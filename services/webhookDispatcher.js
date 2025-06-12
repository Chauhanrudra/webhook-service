const axios = require('axios');
const webhookQueue = require('../queues/webhookQueue');

// Process jobs from the queue
webhookQueue.process(async (job, done) => {
  const { url, payload } = job.data;

  try {
    const response = await axios.post(url, payload);
    console.log(`✅ Webhook sent to ${url} | Status: ${response.status}`);
    done();
  } catch (error) {
    console.error(`❌ Error sending to ${url}:`, error.message);
    done(new Error(error.message));
  }
});

// Function to add jobs to queue
const dispatchWebhook = async (url, payload) => {
  await webhookQueue.add({ url, payload });
};

module.exports = { dispatchWebhook };
