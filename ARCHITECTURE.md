# Colosseum Web - Architecture & Design Specs

The `colosseum-web` service is the **Unified User Interface** for the Colosseum platform. It serves as the "Shell" that loads specific sport modules (like Pool) and handles the presentation layer for user identity and competitive data.

## 1. Role & Responsibility
- **The Shell**: Provides the global navigation, authentication state, and user profile management.
- **Module Orchestrator**: Dynamically loads and switches between sport-specific modules (e.g., `/app/pool`).
- **Data Stitching**: Acts as the "glue" layer, merging raw match data from sport services (e.g., `colosseum-pool`) with rich user profiles from `colosseum-core`.
- **Visual Presentation**: Enforces the "Premium, Glassmorphic" design language across all modules.

---

## 2. Technology Stack
- **Framework:** React 19+
- **Build Tool:** Vite (Fast, Modern)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Utility-first)
- **Routing:** React Router DOM v6
- **State Management:** React Context (Global Auth), React Query (Data Fetching & Caching)
- **HTTP Client:** Axios (with Interceptors)
- **Deployment:** Docker (Multi-stage: Node Build -> Nginx Serve)

---

## 3. Directory Structure & Modular Architecture

The project follows a **Modular Monolith** pattern on the frontend.

```text
src/
├── App.tsx                 # Main Router & Layout definition
├── main.tsx                # Entry point & Provider wrapping
├── modules/                # Domain-specific logic
│   ├── core/               # Global features (Auth, Navigation, Profiles)
│   │   ├── api/            # Axios setup & Interceptors
│   │   ├── auth/           # AuthContext, Login/Logout logic
│   │   ├── components/     # Shared UI (Button, Card, Modal, Input)
│   │   └── layout/         # Sidebar, Topbar, MobileNav
│   ├── pool/               # Pool Sport Module
│   │   ├── components/     # LeaderboardTable, MatchForm
│   │   ├── hooks/          # usePoolStats, useSubmitMatch
│   │   └── pages/          # Pool Dashboard, History
│   └── common/             # Utilities shared across modules
└── pages/                  # Top-level Route Pages
    ├── Landing.tsx         # Public Marketing Page
    ├── LoginCallback.tsx   # OAuth Redirect Handler
    └── Profile.tsx         # Universal User Profile View
```

---

## 4. Key Design Patterns

### A. Authentication Flow (Client-Side)
1.  **Login**: User clicks "Login with Google". Application redirects to `${API_URL}/api/v1/auth/login`.
2.  **Redirect**: After successful auth, Backend redirects to `/auth/callback?token=<JWT>`.
3.  **Capture**: `LoginCallback.tsx` extracts the token from URL parameters.
4.  **Storage**: Token is stored in `localStorage` (persisted session).
5.  **Usage**: Axios interceptor (`modules/core/api`) automatically attaches `Authorization: Bearer <token>` to all outgoing requests.

### B. The "Data Stitching" Pattern
*Problem:* The Pool Service returns leaderboards with generic `user_id` UUIDs, but no names or avatars.
*Solution:* The Frontend aggregates data.

1.  **Fetch Data**: `GET /api/pool/leaderboard` -> Returns `[{user_id: "u1", elo: 1200}, ...]`.
2.  **Extract IDs**: Collect unique User IDs from the response.
3.  **hydrate Profiles**: `POST /api/auth/users/batch` -> Returns `[{id: "u1", name: "John", avatar: "..."}]`.
4.  **Merge**: Combine the datasets on the client side to render the rich Leaderboard table.

### C. The Module Switcher
- **Routing**: Routes like `/app/pool/*` activate the Pool Module.
- **Context**: An active "Sport Context" can be used to switch themes or reliable sub-navigation.
- **Isolation**: Modules should ideally not depend on each other, only on `modules/core`.

---

## 5. UI/UX Specifications

### 1. The Layout (Shell)
- **Desktop**: Vertical Sidebar (collapsible). Glassmorphism effect on background.
- **Mobile**: Bottom Navigation Bar for quick access to primary tabs.
- **Header**: Contains Page Title and User Avatar/Profile menu.

### 2. The Pool Dashboard
- **Top Cards**: Personalized stats (My Rank, My Elo, Season End).
- **Leaderboard**:
    - **Rank**: Numeric position.
    - **Player**: Avatar + Name.
    - **Elo**: Rating points.
    - **Streak**: Visual indicators (Fire for wins, Ice for losses).
- **Match Submission**: A modal flow for entering match results (Select Opponent -> Select Winner -> Confirm).

### 3. User Profile
- **Hero Section**: Large Avatar, Name, and Role.
- **Stats Grid**: "Nemesis" (Worst matchup), "Bunny" (Best matchup), "Current Form" (Sparkline).
