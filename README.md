# Colosseum Web

The Frontend for Colosseum—the premium digital arena for your competitive matches.

Built with React, TypeScript, and Tailwind CSS for a fast, responsive, and visually stunning user experience.

## 🏗 Structure

```text
colosseum-web/
├── Dockerfile                # Multi-stage build (Node -> Nginx).
├── package.json              # Frontend dependencies.
├── vite.config.ts            # Vite configuration.
├── /src
│   ├── App.tsx               # Main router and layout.
│   ├── /modules              # Modular architecture
│   │   ├── /core             # Identity & Auth (Shell)
│   │   │   ├── /components   # Shared UI (Cards, Buttons)
│   │   │   └── /api          # Axios setup
│   │   ├── /pool             # Game Engine logic
│   │   │   ├── /components   # Leaderboard, MatchForm
│   │   │   └── /pages        # Pool specific routes
│   │   └── /common           # Utilities
│   └── main.tsx
```

## ⚡ Quick Start

This service is part of the larger Colosseum ecosystem. To get it running quickly:

1.  **Clone the Infrastructure Repo**: This project is orchestrated by `colosseum-infra`.
2.  **Run via Docker**:
    ```bash
    # From the colosseum-infra directory
    make dev
    ```
    This will start the frontend on port `3000` (or configured port) along with the backend services.

## 🚀 Features

-   **Live Leaderboard**: Real-time ranking of players.
-   **Match Submission**: Quick form to settle arguments with data.
-   **Player Profiles**: Personal stats, win streaks, and nemesis tracking.
-   **Premium Design**: Modern, glassmorphic UI with vibrant aesthetics.

## 🛠 Tech Stack

Detailed architecture and technical specifications can be found in [ARCHITECTURE.md](./ARCHITECTURE.md).

-   **Framework**: React 19 (Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Deployment**: Nginx (Dockerized)

## 📦 Local Development

To run the frontend in isolation (mocking the backend or pointing to a local instance):

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```
