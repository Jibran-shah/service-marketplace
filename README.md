# Service Marketplace

A full-stack MERN marketplace platform connecting customers with service providers. Users can discover services, communicate in real time, and make secure payments.

## Features

- User authentication and authorization
- Customer and service provider accounts
- Service discovery and listings
- Service provider profiles
- Real-time messaging and chat
- Secure payment integration
- Responsive user interface

## Tech Stack

**Frontend**
- React.js
- Material UI
- Redux Toolkit
- TanStack Query

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Apache Kafka
- Redis

**Other Tools**
- JWT Authentication
- Safepay Payment Gateway
- Git & GitHub

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jibran-shah/service-marketplace.git
cd service-marketplace
```

### 2. Install dependencies

Install dependencies separately in the frontend and backend directories.

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure environment variables

Create `.env` files in the required directories.

Refer to `.env.example` files for the required environment variables.

### 4. Run the application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

## Project Structure

```text
service-marketplace/
├── backend/
├── frontend/
└── README.md
```

## License & Copyright

Copyright (c) 2026 Jibran Shah.

All Rights Reserved.

This project is provided for viewing and educational purposes only. No permission is granted to copy, modify, distribute, or use this code without prior written permission from the copyright owner.
