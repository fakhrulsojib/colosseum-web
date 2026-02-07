# Upcoming Features - Web (Frontend)

## 1. Project Overview
**Repo Name:** `colosseum-web`
**Role:** The Unified User Interface.
**Responsibility:**
- Provides the "Shell" (Navigation, Auth, Profile) for the entire platform.
- Loads specific "Modules" for different sports (starting with Pool).
- Talks to the Backend Gateway (Nginx) to fetch data from Core and Pool services.
- Handles "Data Stitching" (Merging Match data from Pool with User Profiles from Core).
**Philosophy:** "One App, Many Faces." The user logs in once, but the interface adapts based on the active sport (e.g., `/app/pool` vs `/app/cricket`).

---

## 2. Technology Stack
- **Framework:** React 19+
- **Build Tool:** Vite (Fast, Modern)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Utility-first)
- **Routing:** React Router DOM v6
- **State Management:** React Context (for Auth), React Query (optional, for caching)
- **HTTP Client:** Axios
- **Deployment:** Docker (Multi-stage: Node Build -> Nginx Serve)

---

## 3. Architecture & Directory Structure
The project is split into **Core** (Global) and **Modules** (Sport-Specific).

```text
/colosseum-web
├── Dockerfile                  # Multi-stage: Build (Node) -> Serve (Nginx)
├── nginx.conf                  # Config for the static file server
├── package.json
├── vite.config.ts
├── /src
│   ├── App.tsx                 # Main Router setup
│   ├── main.tsx                # Entry point
│   ├── /assets                 # Images, Fonts
│   ├── /core                   # THE SHELL (Global features)
│   │   ├── /auth               # AuthContext, LoginButton
│   │   ├── /layout             # Sidebar, Topbar, MobileNav
│   │   ├── /components         # Shared UI (Button, Card, Avatar, Modal)
│   │   └── /api                # Axios instance (Interceptors)
│   ├── /modules                # THE SPORTS (Feature sets)
│   │   ├── /pool
│   │   │   ├── /components     # PoolLeaderboard, MatchForm
│   │   │   ├── /hooks          # usePoolStats, useSubmitMatch
│   │   │   └── routes.tsx      # Sub-routes for Pool
│   │   └── /cricket            # (Future Placeholder)
│   ├── /pages                  # Top-level pages
│   │   ├── Landing.tsx         # Public Home
│   │   ├── LoginCallback.tsx   # Handles Google Redirect
│   │   └── Profile.tsx         # Universal User Profile
│   └── /types                  # Global TS Interfaces (User, Match)

```

---

## 4. Key Features & Implementation Logic

### A. Authentication (Google OAuth)

* **Login:** Redirects user to `${API_URL}/api/auth/login`.
* **Callback:** Catches the JWT from the URL query params (e.g., `?token=xyz`).
* **Storage:** Stores JWT in `localStorage` (or HTTP-only cookie if configured).
* **Interceptor:** Axios adds `Authorization: Bearer <token>` to every request.

### B. The "Data Stitching" Pattern

*Problem:* The Pool Service returns a Leaderboard with `user_id` (UUID), not names.
*Solution:* The Frontend acts as the glue.

1. **Fetch Leaderboard:** `GET /api/pool/leaderboard` -> Returns `[{user_id: "u1", elo: 1200}, ...]`.
2. **Extract IDs:** Collect all unique UUIDs from the list.
3. **Fetch Profiles:** `POST /api/auth/users/batch` -> Returns `[{id: "u1", name: "John", avatar: "..."}]`.
4. **Merge:** Stitch them together to render the table.

### C. The Module Switcher

* **Route:** `/app/pool/*` loads the Pool Module.
* **Context:** The `ActiveSportContext` updates to "POOL".
* **UI:** The Sidebar highlights the Pool icon. The "New Match" button launches the Pool-specific form.

---

## 5. UI/UX Specifications

### 1. The Layout (Shell)

* **Desktop:** Left vertical sidebar (collapsed icon mode).
* **Mobile:** Bottom navigation bar.
* **Topbar:** Shows "Colosseum" logo and current Page Title. User Avatar on right.

### 2. The Pool Dashboard (`/app/pool`)

* **Top Cards:** "My Rank", "My Elo", "Season End Date".
* **Leaderboard:**
* Columns: Rank (#), Player (Avatar + Name), Elo, Win Rate (%), Streak (Fire/Ice icon).
* Row Click: Opens User Profile.

### 3. Match Submission (Modal)

* **Step 1:** Select Opponent (Searchable Dropdown of users).
* **Step 2:** Select Winner (Me or Them).
* **Step 3:** Validation (e.g., "Are you sure?").
* **Step 4:** Success Animation (+Elo gain shown).

### 4. User Profile (`/app/profile/:id`)

* **Header:** Big Avatar, Name, Department.
* **Stats Grid:**
* "Nemesis" (Worst matchup).
* "Bunny" (Best matchup).
* "Current Form" (Sparkline graph of last 10 games).