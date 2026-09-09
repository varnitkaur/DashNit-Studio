# DashNit Artisan Studio & Operations

> A production-grade direct-to-consumer (D2C) artisanal operations platform and e-commerce concierge for **DashNit Crochet & Candle** (Jaipur Craft House Unit 02).

---

## 🏗️ Architecture & Project Structure

The project is organized as a decoupled monorepo with completely separated **`frontend/`** and **`backend/`** subfolders:

```text
DashNit-Studio/
├── frontend/                     # Client application (React 19 + Tailwind CSS v4 + Vite 6)
│   ├── public/                   # Static assets & icons
│   ├── src/
│   │   ├── components/           # UI views (CraftingBoard, CustomStudio, Modals, etc.)
│   │   ├── data/                 # mockData.ts
│   │   ├── services/             # geminiService.ts (API client with heuristic fallback)
│   │   ├── utils/                # storage.ts, scannerListener.ts
│   │   ├── types.ts              # Frontend domain models & interfaces
│   │   ├── App.tsx               # Root view orchestrator
│   │   ├── main.tsx              # Application entry point
│   │   └── index.css             # Tailwind v4 theme & print styles
│   ├── index.html                # HTML entry point
│   ├── vite.config.ts            # Vite config with path alias (@) & /api proxy to backend
│   ├── tsconfig.json             # Frontend TypeScript configuration
│   ├── package.json              # Frontend dependencies & scripts
│   └── .env.example              # Frontend environment variables
│
├── backend/                      # Microservice API server (Express + Node.js + TypeScript)
│   ├── src/
│   │   ├── index.ts              # Express server with Gemini 2.5 Flash Concierge & /api/v1/health
│   │   └── types.ts              # Backend data contracts (AICommissionParseResult, CraftType)
│   ├── tsconfig.json             # Backend TypeScript configuration
│   ├── package.json              # Backend dependencies & scripts
│   └── .env.example              # Backend environment variables
│
├── package.json                  # Root monorepo orchestrator (npm workspaces)
├── README.md                     # This documentation
└── .gitignore                    # Git ignore rules for monorepo
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later

---

### 1. Install Dependencies

You can install all dependencies for both frontend and backend in one command from the project root using npm workspaces:

```bash
# From project root:
npm install
```

Alternatively, you can install dependencies independently in each subfolder:

```bash
# Frontend only:
cd frontend
npm install

# Backend only:
cd ../backend
npm install
```

---

### 2. Configure Environment Variables

Create the `.env` files in their respective folders:

#### Backend (`backend/.env`):
```ini
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If no key is configured, the backend automatically engages the zero-config heuristic fallback parser).*

#### Frontend (`frontend/.env`):
```ini
VITE_API_URL=http://localhost:3001
```

---

### 3. Starting the Applications

#### Option A: Run from Project Root (Recommended)

| Command | Action | URL |
| :--- | :--- | :--- |
| `npm run dev` or `npm run dev:frontend` | Starts Vite Frontend | [http://localhost:3000](http://localhost:3000) |
| `npm run dev:backend` or `npm run server` | Starts Express Backend | [http://localhost:3001](http://localhost:3001) |
| `npm run build` | Builds Frontend for Production | `frontend/dist/` |
| `npm run lint` | Typechecks both Frontend & Backend | — |

#### Option B: Run in Separate Terminals

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Express server listening on http://localhost:3001
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Vite dev server running at http://localhost:3000
```

---

## 📡 API Endpoints & Communication

The frontend communicates with the backend through the Vite reverse proxy configured in `frontend/vite.config.ts`:

- Any request to `/api/*` on `http://localhost:3000` is automatically proxied to `http://localhost:3001/api/*`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Health check, atelier status, and Gemini key verification. |
| `POST` | `/api/v1/ai/parse-commission` | Ingests unstructured customer text inquiries and extracts structured commission parameters with Gemini 2.5 Flash (with client/server fallback). |

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS v4 (`@tailwindcss/vite`), Vite 6, Lucide React, Motion, TypeScript.
- **Backend**: Express 4, `@google/genai` (Gemini 2.5 Flash), `tsx`, `dotenv`, TypeScript.
- **Tooling**: npm workspaces monorepo architecture.
