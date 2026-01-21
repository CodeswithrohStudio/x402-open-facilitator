# x402-open Facilitator

A simple facilitator server for the x402 payment protocol, enabling micropayments for API endpoints on Base Sepolia testnet.

## Overview

This project implements a facilitator server that handles payment verification and settlement for x402-protected API endpoints. It uses the `x402-open` library to provide a standardized payment gateway for your APIs.

## Features

- **EVM Support**: Handles payments on Base Sepolia network
- **Express Integration**: Easy-to-use Express.js adapter
- **Payment Verification**: Validates payment signatures and requirements
- **Payment Settlement**: Processes on-chain payment settlements
- **USDC Payments**: Supports USDC token payments

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A private key for the facilitator wallet
- Base Sepolia testnet USDC tokens

## Installation

```bash
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Add your private key to `.env`:
```
PRIVATE_KEY=0x...
```

**Important**: The private key must correspond to the `payTo` address you configure in your payment middleware.

## Usage

Start the facilitator server:

```bash
npm start
```

The server will run on `http://localhost:4101` and expose the following endpoints:

- `GET /facilitator/supported` - Returns supported payment networks
- `POST /facilitator/verify` - Verifies payment signatures
- `POST /facilitator/settle` - Settles payments on-chain

## Integration

To protect your API endpoints with x402 payments, use the `paymentMiddleware` from `x402-open`:

```typescript
import { paymentMiddleware } from 'x402-open';

const x402Middleware = paymentMiddleware(
  '0x96e6256466ACe66B16EF1c9D8cD262E41e5B0823', // payTo address
  {
    'GET /your-endpoint': {
      price: '$0.0001',
      network: 'base-sepolia',
    },
  },
  {
    url: 'http://localhost:4101/facilitator',
  }
);

app.use(x402Middleware);
```

## How It Works

1. Client requests a protected endpoint
2. Server responds with 402 Payment Required and payment details
3. Client signs and submits payment
4. Facilitator verifies the payment signature
5. Facilitator settles the payment on-chain
6. Server grants access to the protected resource

## Development

The project uses TypeScript with ts-node for development. The main application file is `app.ts`.