const Bull = require('bull');
require('dotenv').config();

const webhookQueue = new Bull('webhookQueue', process.env.REDIS_URL);

module.exports = webhookQueue;
