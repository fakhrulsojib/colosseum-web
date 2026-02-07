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
│   │   ├── /core             # Identity & Auth
│   │   │   ├── /pages        # Login, Profile
│   │   │   └── /services     # Auth logic
│   │   ├── /pool             # Game Engine logic
│   │   │   ├── /pages        # Leaderboard, MatchEntry
│   │   │   └── /components   # Result forms, rank tables
│   │   └── /common           # Shared resources
│   │       ├── /components   # Buttons, Modals, Cards
│   │       └── /services     # Shared API client
│   └── main.tsx
```

## 🚀 Features

- **Live Leaderboard**: Real-time ranking of players.
- **Match Submission**: Quick form to settle arguments with data.
- **Player Profiles**: Personal stats, win streaks, and nemesis tracking.
- **Premium Design**: Modern, glassmorphic UI with vibrant aesthetics.

## 🛠 Tech Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Nginx (Dockerized)

## 📦 Development

This service is part of the Colosseum multi-repo architecture and is orchestrated via `colosseum-infra`.

```bash
# To run locally (requires node)
npm install
npm run dev
```
