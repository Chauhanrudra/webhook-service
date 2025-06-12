# Webhook Service (Node.js + Express + MongoDB + Redis)

This is a simple, production-style backend service to register and trigger webhooks for real-time event notifications. It allows external services to subscribe to events by registering a webhook URL, and they will receive data when those events are triggered.

---

## Features

- Register webhook URLs for specific event types
- Trigger events with custom payloads
- Uses Redis + Bull queue to handle async dispatching
- Retries failed webhook deliveries
- Clean REST API (no frontend)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis (Bull queue)
- Axios (for outbound webhook requests)
- dotenv

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Git](https://git-scm.com/)

---

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Chauhanrudra/webhook-service.git
cd webhook-service
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment variables:**

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/webhook_service
REDIS_URL=redis://127.0.0.1:6379
```

4. **Start Redis and MongoDB locally.**

5. **Start the server:**

```bash
npm run dev
```

---

## API Endpoints

### 1. Register Webhook

**POST** `/api/webhooks/register`

**Body:**
```json
{
  "url": "http://example.com/receive",
  "event": "price_drop"
}
```

---

### 2. Trigger Event

**POST** `/api/webhooks/trigger`

**Body:**
```json
{
  "event": "price_drop",
  "payload": {
    "product": "iPhone 15",
    "newPrice": "₹74,999"
  }
}
```

---

### 3. Health Check

**GET** `/`  
Returns: `Webhook Service is Running`

---

## Project Structure

```
webhook-service/
├── config/             # MongoDB config
├── controllers/        # Controller logic
├── models/             # Mongoose schemas
├── queues/             # Bull queue instance
├── routes/             # Express routes
├── services/           # Webhook dispatch logic
├── app.js              # Express app setup
├── server.js           # Entry point
├── .env                # Environment variables
├── .gitignore
└── README.md
```

---

## Possible Enhancements

- Authentication for webhook registration
- Delivery status logs per webhook
- Admin dashboard (if frontend is added)
- Retry strategy with exponential backoff

---

## License

This project is open-source and available under the MIT License.
