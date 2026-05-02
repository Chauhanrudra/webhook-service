const Bull = require('bull');
require('dotenv').config();

const parsePositiveInt = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
};

const retryAttempts = parsePositiveInt(process.env.WEBHOOK_RETRY_ATTEMPTS, 5);
const retryDelayMs = parsePositiveInt(process.env.WEBHOOK_RETRY_DELAY_MS, 1000);

const webhookQueue = new Bull('webhookQueue', process.env.REDIS_URL, {
  defaultJobOptions: {
    attempts: retryAttempts,
    backoff: {
      type: 'exponential',
      delay: retryDelayMs,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

module.exports = webhookQueue;
