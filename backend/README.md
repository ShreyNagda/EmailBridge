# Secure Email Microservice

A secure Node.js + TypeScript backend microservice that receives contact form data and emails it to a specified client using Nodemailer (Gmail SMTP Secure).

## Features

- **Secure**: Uses Helmet for security headers and CORS restricted to trusted origins.
- **Validation**: Zod schema validation for all inputs.
- **Rate Limiting**: Limits requests to 3 per hour per IP.
- **Dynamic Routing**: Sends emails to different clients based on `clientId`.
- **Sanitization**: Prevents XSS by sanitizing inputs.

## Setup

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Copy `.env.example` to `.env` and fill in the values.

    ```bash
    cp .env.example .env
    ```

    - `EMAIL_USER`: Your Gmail address.
    - `EMAIL_APP_PASSWORD`: Your Gmail App Password.
    - `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins (e.g., `http://localhost:3000,https://mysite.com`).
    - `PORT`: Server port (default 3000).

4.  **Run Locally**:

    ```bash
    npm run dev
    ```

5.  **Build & Start**:
    ```bash
    npm run build
    npm start
    ```

## API Endpoint

**POST** `/send-email`

**Headers**:

- `Content-Type`: `application/json`

**Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890", // Optional
  "message": "Hello, I would like to inquire...",
  "clientId": "finance-site" // Must match a key in src/config/email.ts
}
```

**Response**:

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Auth API

**POST** `/auth/register`

- Registers a new client.
- Body: `{ "email": "...", "password": "...", "targetEmail": "...", "clientId": "..." }`

**POST** `/auth/login`

- Logs in a client.
- Body: `{ "email": "...", "password": "..." }`
- Returns: `{ "token": "...", ... }`

**GET** `/auth/me`

- Get current client info.
- Headers: `Authorization: Bearer <token>`

## Configuration

### Client Email Mapping

Modify `src/config/email.ts` to add or update client email mappings.

```typescript
export const CLIENT_EMAILS: Record<string, string> = {
  "finance-site": "finance.consult@gmail.com",
  "real-estate": "homeseller.agent@gmail.com",
};
```

## Gmail App Password Guide

To use Gmail SMTP, you need an App Password:

1.  Go to your [Google Account](https://myaccount.google.com/).
2.  Select **Security**.
3.  Under "Signing in to Google", select **2-Step Verification** (enable it if not already).
4.  At the bottom of the 2-Step Verification page, select **App passwords**.
5.  Select **Mail** and **Other (Custom name)**, name it "Email Service", and click **Generate**.
6.  Copy the 16-character password and paste it into `EMAIL_APP_PASSWORD` in your `.env` file.

## Deployment Guide

### Render / Railway / Vercel

1.  **Push to GitHub**.
2.  **Connect Repository** to your hosting provider.
3.  **Set Environment Variables** in the dashboard (`EMAIL_USER`, `EMAIL_APP_PASSWORD`, `ALLOWED_ORIGINS`).
4.  **Build Command**: `npm install && npm run build`
5.  **Start Command**: `npm start`

## Testing with Postman

1.  Create a new POST request to `http://localhost:3000/send-email`.
2.  Set Header `Content-Type` to `application/json`.
3.  In the Body (raw JSON), paste the example payload.
4.  Ensure `clientId` matches one in your config.
5.  Send and check the response.
