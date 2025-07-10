## 📧 Email Service Mock Provider

A simulated email sending service built with Node.js to demonstrate:

* ✅ Retry mechanism
* 🔄 Fallback between providers (ProviderA → ProviderB)
* 🔒 Idempotency
* ⚡ Rate Limiting
* 🧠 Circuit Breaker pattern
* 📊 Status tracking
* 🧪 Unit Testing with Jest

---

## 🛠️ Features

### ✅ 1. Retry Mechanism

If an email provider fails temporarily, the system will retry sending the email a few times before giving up.

### 🔄 2. Fallback to Backup Provider

If ProviderA fails permanently or is in **OPEN** circuit state, the system tries **ProviderB** automatically.

### 🔒 3. Idempotency

Duplicate requests (same content + idempotency key) won't resend emails.

### ⚡ 4. Rate Limiting

Limits how many email requests a client (IP) can make per minute to prevent abuse.

### 💥 5. Circuit Breaker

Automatically prevents calling a failing provider after repeated failures, allowing it to cool down before retrying.

### 📊 6. Status Tracking

Tracks and retrieves the status of each email via a unique `idempotencyKey`.

---

## 🚀 API Endpoints

### `POST /send-email`

Sends an email.

#### Request Body:

```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "body": "This is the email content"
}
```

#### Example:

```bash
curl -X POST http://localhost:3000/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"user@example.com","subject":"Hello","body":"Testing"}'
```

#### Response:

```json
{
  "message": "Email sent or queued",
  "idempotencyKey": "22e37899c94ecd934e61fc1532f1d87ab9c12e185ddbb9079e802fe37c28fae1"
}
```

---

### `GET /status/:idempotencyKey`

Returns the status of the email (e.g. `SENT_PROVIDER_A`, `SENT_PROVIDER_B`, `FAILED`, `DUPLICATE`)

#### Example:

```bash
curl http://localhost:3000/status/<idempotencyKey>
```

---

## 🧪 Running Tests

Tests include:

* Retry logic
* Circuit breaker
* Rate limiting
* Idempotency
* Fallback logic

### To run tests:

```bash
npm install
npm test
```

---

## 🗂️ Project Structure

```
EmailServiceMockProvider/
├── src/
│   ├── app.js                # Express app and routes
│   ├── core/
│   │   ├── emailService.js   # Email sending logic
│   │   ├── retryStrategy.js  # Retry logic
│   │   ├── circuitBreaker.js # Circuit breaker
│   │   ├── statusTracker.js  # Status store
│   │   ├── rateLimiter.js    # Rate limiting
│   │   ├── idempotencyStore.js
│   └── providers/
│       ├── mockProviderA.js  # Mock with simulated failure
│       └── mockProviderB.js  # Always succeeds
│
├── tests/
│   └── emailService.test.js  # Unit tests
│
├── package.json
└── README.md
```

---

## 🧠 Concepts to Know

| Concept         | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| Retry           | Retries on temporary failure using exponential backoff or delay. |
| Circuit Breaker | Blocks further requests to a failing provider to avoid overload. |
| Fallback        | Switches from ProviderA to ProviderB if A fails.                 |
| Idempotency     | Prevents duplicate email sends using hash of email content.      |
| Rate Limiting   | Limits email requests per IP address.                            |
| Status Tracking | Remembers status (`SENT`, `FAILED`, etc.) via `idempotencyKey`.  |

---

## 👨‍💻 Author

**Shantanu Chavhan**
📧 [shantanuchavhan002@gmail.com](mailto:shantanuchavhan002@gmail.com)
🌐 [linkinlegal.com](https://www.linkinlegal.com)

