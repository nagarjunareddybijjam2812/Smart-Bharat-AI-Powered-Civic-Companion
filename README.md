<div align="center">
  <h1>🏛️ CitizenAI</h1>
  <p><strong>Production-grade AI-powered Civic Platform</strong></p>
  <p>Governance, Reimagined.</p>
  
  [![CI](https://github.com/your-org/citizen-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/citizen-ai/actions)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
</div>

---

## Overview

CitizenAI is a production-grade, AI-powered government digital platform built for central, state, and municipal governments. It brings together every government service into one intelligent.

## Architecture

```
citizen-ai/
├── apps/
│   ├── web/          # Next.js 15 Citizen App (React, Tailwind, Framer Motion)
│   ├── api/          # NestJS 10 API (REST + WebSocket)
│   ├── admin/        # Next.js Admin Dashboard
│   └── officer/      # Next.js Officer Portal
├── packages/
│   ├── ui/           # Shared component library (Glassmorphism design)
│   ├── config/       # Tailwind preset (Stitch design tokens)
│   ├── database/     # Prisma ORM (PostgreSQL + pgvector)
│   └── types/        # Shared TypeScript types
├── k8s/              # Kubernetes deployment manifests
└── .github/          # CI/CD pipeline
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | NestJS 10, TypeScript, Passport, BullMQ |
| **AI** | Google Gemini 2.0 Flash (Chat, RAG, OCR, Embeddings) |
| **Database** | PostgreSQL 16 + pgvector, Prisma ORM |
| **Cache** | Redis (sessions, BullMQ queues) |
| **Storage** | MinIO / Google Cloud Storage |
| **Auth** | JWT + Refresh Tokens, Google OAuth, OTP |
| **Real-time** | Socket.io (complaint tracking, notifications) |
| **DevOps** | Docker, Kubernetes, GitHub Actions CI/CD |

## Quick Start

```bash
# Prerequisites: Node 20+, pnpm 9+, Docker

# 1. Clone and install
git clone https://github.com/your-org/citizen-ai
cd citizen-ai
pnpm install

# 2. Start infrastructure
cp .env.example .env
# Fill in GEMINI_API_KEY and other required values
docker compose up -d

# 3. Setup database
pnpm --filter @citizen-ai/database db:push
pnpm --filter @citizen-ai/database db:generate

# 4. Start all apps
pnpm dev
```

**Apps will be available at:**
- 🌐 **Citizen Web**: http://localhost:3000
- ⚡ **API + Swagger**: http://localhost:4000/api/docs
- 👑 **Admin Portal**: http://localhost:3001
- 👮 **Officer Portal**: http://localhost:3002

## Environment Variables

See `.env.example` for all required configuration. Key variables:

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key (required for AI features) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret (min 32 chars) |
| `GOOGLE_CLIENT_ID` | Google OAuth App ID |

## Key Features

- 🤖 **AI Assistant** — RAG-powered chat with Gemini 2.0 Flash, citeable sources, 22 languages
- 📋 **Service Portal** — 500+ government services, eligibility checking, online applications
- 🚨 **Complaint System** — Real-time tracking, WebSocket updates, file uploads
- 📄 **Document Vault** — AI-powered OCR, DigiLocker integration, secure storage
- 🗺️ **Smart Map** — Nearby offices, real-time service tracking
- 🔔 **Push Notifications** — FCM + in-app, smart reminders
- 👑 **Admin Dashboard** — Analytics, complaint management, AI monitoring
- 👮 **Officer Portal** — Case management, AI-assisted approvals

## License

MIT — Built for India's Digital Transformation Journey.
