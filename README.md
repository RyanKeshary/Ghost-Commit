<p align="center">
  <img src="public/favicon.png" alt="GhostCommit Logo" width="80" height="80" />
</p>

<h1 align="center">GhostCommit</h1>

<p align="center">
  <strong>The campus team finder that actually works.</strong><br/>
  Discover developers, match instantly, build together.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/Auth.js-5_beta-purple?logo=auth0&logoColor=white" alt="NextAuth v5" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/Three.js-r183-black?logo=three.js&logoColor=white" alt="Three.js" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
  - [Directory Structure](#directory-structure)
  - [Application Flow](#application-flow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
  - [Entity Relationship Overview](#entity-relationship-overview)
  - [Model Details](#model-details)
- [Authentication](#authentication)
- [API Reference](#api-reference)
  - [Auth](#auth-endpoints)
  - [Profile](#profile-endpoints)
  - [Discovery](#discovery-endpoints)
  - [Developers](#developer-endpoints)
  - [User Safety](#user-safety-endpoints)
- [Pages & Routes](#pages--routes)
- [Components](#components)
  - [Layout & Providers](#layout--providers)
  - [Landing Page Components](#landing-page-components)
  - [Feature Components](#feature-components)
  - [UX & Visual Components](#ux--visual-components)
- [Styling & Design System](#styling--design-system)
  - [Color Palette](#color-palette)
  - [Glass Morphism](#glass-morphism)
  - [Animations](#animations)
  - [Custom CSS Utilities](#custom-css-utilities)
- [State Management](#state-management)
- [Configuration Files](#configuration-files)
- [Seed Data](#seed-data)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**GhostCommit** is a Tinder-style teammate discovery platform built for university campuses. It solves the perennial problem of finding the right people to build projects with — whether you're looking for a hackathon partner, a co-founder, or just someone who shares your tech stack.

Students sign in with Google or GitHub, build rich developer profiles (skills, roles, availability, GitHub stats), and discover each other through a swipe-based discovery interface or a filterable grid view. The platform computes match scores based on complementary skills, shared interests, and department overlap.

Built as a hackathon project, GhostCommit emphasizes **speed**, **visual polish**, and a **delightful UX** — featuring a custom animated cursor with orbiting hearts, Three.js particle backgrounds, Framer Motion page transitions, smooth scrolling via Lenis, and a comprehensive glassmorphism design system.

---

## Features

### Core

| Feature                     | Description                                                                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OAuth Authentication**    | Google + GitHub sign-in via Auth.js v5 (NextAuth) with Prisma database sessions                                                                                         |
| **Rich Developer Profiles** | Name, headline, bio, department, semester, roles, skills (with 1–5 star proficiency), interests, availability (hrs/week), social links with per-link visibility toggles |
| **GitHub Integration**      | One-click verification fetches public repos count, followers, following, and top 3 starred repositories from the GitHub API                                             |
| **Discovery Grid**          | Paginated, filterable grid of all public profiles with real-time search by name, skill, or headline                                                                     |
| **Smart Matching**          | "Best Match" sort algorithm scores users based on complementary roles, shared interests, department overlap, and availability                                           |
| **Swipe Discovery**         | Tinder-style drag-to-swipe card stack with NOPE/MATCH indicators and spring physics                                                                                     |
| **Profile Privacy**         | Per-profile public/private toggle, per-link visibility controls, and blocked-user filtering in discovery                                                                |
| **Block & Report**          | Users can block (removes matches + hides from feed) or report (with categorized reasons) any profile                                                                    |
| **Project Board**           | Create and browse campus projects with required skills and application tracking                                                                                         |
| **Match Inbox**             | Messaging UI skeleton for matched users                                                                                                                                 |

### UX & Visual

| Feature                    | Description                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Custom Animated Cursor** | Canvas-rendered cursor with warm gradient trail, orbiting mini-hearts, click particle bursts (hearts + sparkles), and hover state scaling |
| **Three.js Background**    | Animated 3D particle field using `@react-three/fiber` and `@react-three/drei`                                                             |
| **Smooth Scrolling**       | Lenis (`@studio-freight/lenis`) integration for buttery-smooth page scrolling                                                             |
| **Framer Motion**          | Page transitions, layout animations, `AnimatePresence` for list changes, spring-physics swipe cards                                       |
| **GSAP**                   | Available for complex timeline animations                                                                                                 |
| **Glassmorphism Design**   | Two-tier glass system (`glass` / `glass-strong`) with backdrop blur, warm glows, and gradient borders                                     |
| **Dark Theme**             | Full dark-mode-first design with CSS custom properties                                                                                    |
| **Tech Marquee**           | Infinite scrolling ticker of technology logos                                                                                             |
| **Ghost Toast**            | Themed notification system                                                                                                                |
| **Language Switcher**      | i18n-ready language toggle component                                                                                                      |
| **Responsive**             | Fully mobile-responsive across all pages                                                                                                  |

---

## Tech Stack

### Frontend

| Technology                                                                                           | Version | Purpose                                      |
| ---------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| [Next.js](https://nextjs.org/)                                                                       | 15.x    | React meta-framework (App Router)            |
| [React](https://react.dev/)                                                                          | 18.x    | UI library                                   |
| [TypeScript](https://www.typescriptlang.org/)                                                        | 5.x     | Type safety                                  |
| [Tailwind CSS](https://tailwindcss.com/)                                                             | 4.x     | Utility-first CSS                            |
| [Framer Motion](https://www.framer.com/motion/)                                                      | 12.x    | Animations & gestures                        |
| [Three.js](https://threejs.org/)                                                                     | r183    | 3D particle background                       |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)                                         | 9.x     | React renderer for Three.js                  |
| [@react-three/drei](https://github.com/pmndrs/drei)                                                  | 10.x    | Three.js helpers                             |
| [GSAP](https://gsap.com/)                                                                            | 3.x     | Advanced animations                          |
| [Lenis](https://github.com/studio-freight/lenis)                                                     | 1.x     | Smooth scrolling                             |
| [Lucide React](https://lucide.dev/)                                                                  | 0.575   | Icon library                                 |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | —       | Conditional class merging via `cn()` utility |

### Backend

| Technology                                                                                         | Version     | Purpose                             |
| -------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 15.x        | Server-side REST endpoints          |
| [Auth.js (NextAuth v5)](https://authjs.dev/)                                                       | 5.0-beta.30 | OAuth authentication                |
| [Prisma ORM](https://www.prisma.io/)                                                               | 7.x         | Database ORM with type-safe queries |
| [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)                                       | 12.x        | Embedded SQLite database            |
| [@prisma/adapter-better-sqlite3](https://www.prisma.io/docs/orm/overview/databases/sqlite)         | 7.x         | Prisma driver adapter for SQLite    |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)                                                   | 3.x         | Password hashing                    |
| [jose](https://github.com/panva/jose)                                                              | 6.x         | JWT utilities                       |

### Tooling

| Tool                             | Purpose                                                         |
| -------------------------------- | --------------------------------------------------------------- |
| ESLint                           | Linting with `next/core-web-vitals` + `next/typescript` configs |
| PostCSS + `@tailwindcss/postcss` | CSS processing pipeline                                         |
| tsx                              | TypeScript execution for seed scripts                           |

---

## Architecture

### Directory Structure

```
ghostcommit/
├── prisma/
│   ├── schema.prisma          # Database schema (10 models)
│   ├── seed.ts                # Demo data seeder
│   ├── migrations/            # SQL migration history
│   └── prisma.config.ts       # Prisma datasource config
├── public/                    # Static assets (favicon, images)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fonts, providers, navbar)
│   │   ├── page.tsx           # Landing page (home)
│   │   ├── globals.css        # Design system (360 lines)
│   │   ├── auth/page.tsx      # OAuth sign-in page
│   │   ├── discover/page.tsx  # Discovery grid with filters
│   │   ├── swipe/page.tsx     # Tinder-style swipe cards
│   │   ├── profile/page.tsx   # Profile editor (1062 lines)
│   │   ├── matches/page.tsx   # Match inbox placeholder
│   │   ├── teammates/page.tsx # Teammate CRUD management
│   │   ├── u/[id]/page.tsx    # Public profile view
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts  # Auth.js handler
│   │       ├── discovery/route.ts           # User discovery + matching
│   │       ├── profile/route.ts             # Profile CRUD (GET/PUT)
│   │       ├── profile/[id]/route.ts        # Public profile (GET)
│   │       ├── developers/route.ts          # Developer CRUD (GET/POST)
│   │       ├── developers/[id]/route.ts     # Developer DELETE
│   │       ├── user/block/route.ts          # Block user (POST)
│   │       └── user/report/route.ts         # Report user (POST)
│   ├── components/            # 17 React components
│   ├── lib/
│   │   ├── auth.ts            # Auth.js configuration
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── utils.ts           # cn() utility
│   │   └── DevelopersContext.tsx  # Global developer state
│   └── types/
│       └── next-auth.d.ts     # Session type augmentation
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

### Application Flow

```
┌──────────────┐     OAuth      ┌──────────────┐
│   /auth      │ ──────────────►│  Google/      │
│  Sign-in UI  │◄──────────────│  GitHub       │
└──────┬───────┘   Callback     └──────────────┘
       │
       ▼
┌──────────────┐  PUT /api/profile  ┌──────────────┐
│  /profile    │ ──────────────────►│   SQLite DB  │
│  Edit Form   │◄──────────────────│   (Prisma)   │
└──────┬───────┘  GET /api/profile  └──────┬───────┘
       │                                    │
       ▼                                    │
┌──────────────┐  GET /api/discovery  ┌─────┴────────┐
│  /discover   │ ◄───────────────────│  Matching     │
│  Grid View   │   filtered + scored  │  Algorithm   │
└──────┬───────┘                      └──────────────┘
       │
       ▼
┌──────────────┐
│  /swipe      │   Drag gestures ──► match / nope
│  Card Stack  │
└──────┬───────┘
       │
       ▼
┌──────────────┐  POST /api/user/block
│  /u/[id]     │  POST /api/user/report
│  Public View │──────────────────────►  Safety API
└──────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or pnpm/yarn)
- A **Google Cloud** OAuth 2.0 Client ID (for Google sign-in)
- A **GitHub** OAuth App (for GitHub sign-in)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ghostcommit.git
cd ghostcommit

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# ─── Database ───────────────────────────────────────
DATABASE_URL="file:./dev.db"

# ─── Auth.js ────────────────────────────────────────
AUTH_SECRET="your-random-secret-string-here"

# ─── Google OAuth ───────────────────────────────────
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ─── GitHub OAuth ───────────────────────────────────
GITHUB_ID="your-github-app-client-id"
GITHUB_SECRET="your-github-app-client-secret"

# ─── Next.js ────────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
```

> **Tip:** Generate `AUTH_SECRET` with `openssl rand -base64 32`

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates SQLite database)
npx prisma migrate dev

# (Optional) Seed with demo data
npx prisma db seed
```

### Running the Application

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

The app will be available at **http://localhost:3000**.

---

## Database Schema

### Entity Relationship Overview

```
User ─────┬──── Account (OAuth providers)
          ├──── Session (database sessions)
          ├──── Project ──── Application
          ├──── Match (bidirectional)
          ├──── Message (sender ↔ receiver)
          ├──── Block (blocker → blocked)
          └──── Report (reporter → reported)

Developer (standalone, for demo/seed data)
VerificationToken (passwordless auth)
```

### Model Details

#### `User`

The central entity. Stores authentication data alongside a comprehensive developer profile.

| Field               | Type              | Description                                                                  |
| ------------------- | ----------------- | ---------------------------------------------------------------------------- |
| `id`                | `String` (CUID)   | Primary key                                                                  |
| `name`              | `String?`         | Display name                                                                 |
| `email`             | `String` (unique) | Email address                                                                |
| `emailVerified`     | `DateTime?`       | Email verification timestamp                                                 |
| `image`             | `String?`         | Avatar URL                                                                   |
| `passwordHash`      | `String?`         | Bcrypt password hash (for credential auth)                                   |
| `headline`          | `String?`         | One-liner description (e.g., "Full-stack dev · Sem 5 CSE")                   |
| `bio`               | `String?`         | Short biography (max 300 chars in UI)                                        |
| `semester`          | `Int?`            | Current semester (1–8)                                                       |
| `department`        | `String?`         | Academic department                                                          |
| `roles`             | `String?`         | JSON-serialized string array (e.g., `["Frontend", "UI/UX"]`)                 |
| `availability`      | `Int?`            | Hours per week available for collaboration                                   |
| `lookingFor`        | `String?`         | One of: `"teammates"`, `"project"`, `"both"`                                 |
| `interests`         | `String?`         | JSON-serialized string array                                                 |
| `skills`            | `String?`         | JSON-serialized array of `{name, level}` objects                             |
| `socialLinks`       | `String?`         | JSON object with keys: `github`, `linkedin`, `twitter`, `portfolio`, `other` |
| `linkVisibility`    | `String?`         | JSON object controlling per-link visibility on public profile                |
| `profileVisibility` | `String`          | `"public"` (default) or `"private"`                                          |
| `isFounding`        | `Boolean`         | Badge: founding member flag                                                  |
| `githubData`        | `String?`         | JSON with `repos_count`, `followers`, `following`, `top_repos[]`             |
| `createdAt`         | `DateTime`        | Account creation timestamp                                                   |
| `updatedAt`         | `DateTime`        | Last profile update                                                          |

**Relations:** `accounts[]`, `sessions[]`, `ownedProjects[]`, `applications[]`, `matchesInitiated[]`, `matchesReceived[]`, `messagesSent[]`, `messagesReceived[]`, `blocksGiven[]`, `blocksReceived[]`, `reportsSent[]`, `reportsReceived[]`

#### `Account`

Stores OAuth provider data (managed by Auth.js adapter).

| Field               | Type      | Description                |
| ------------------- | --------- | -------------------------- |
| `provider`          | `String`  | `"google"` or `"github"`   |
| `providerAccountId` | `String`  | Provider-specific user ID  |
| `access_token`      | `String?` | OAuth access token         |
| `refresh_token`     | `String?` | OAuth refresh token        |
| `expires_at`        | `Int?`    | Token expiration timestamp |

**Unique constraint:** `(provider, providerAccountId)`

#### `Session`

Database-backed sessions (Auth.js uses DB strategy, not JWT).

| Field          | Type              | Description        |
| -------------- | ----------------- | ------------------ |
| `sessionToken` | `String` (unique) | Session identifier |
| `userId`       | `String`          | FK → User          |
| `expires`      | `DateTime`        | Session expiry     |

#### `Project`

User-created campus projects seeking collaborators.

| Field            | Type     | Description                          |
| ---------------- | -------- | ------------------------------------ |
| `title`          | `String` | Project name                         |
| `description`    | `String` | Project description                  |
| `requiredSkills` | `String` | Comma-separated required skills      |
| `status`         | `String` | `"Open"` (default), `"Closed"`, etc. |
| `ownerId`        | `String` | FK → User                            |

#### `Application`

Join requests from users to projects.

| Field       | Type     | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| `status`    | `String` | `"Pending"` (default), `"Accepted"`, `"Rejected"` |
| `projectId` | `String` | FK → Project                                      |
| `userId`    | `String` | FK → User                                         |

**Unique constraint:** `(projectId, userId)` — one application per user per project.

#### `Match`

Bidirectional match between two users.

| Field     | Type     | Description         |
| --------- | -------- | ------------------- |
| `user1Id` | `String` | Initiator FK → User |
| `user2Id` | `String` | Receiver FK → User  |

**Unique constraint:** `(user1Id, user2Id)`

#### `Message`

Direct messages between matched users.

| Field        | Type     | Description  |
| ------------ | -------- | ------------ |
| `content`    | `String` | Message body |
| `senderId`   | `String` | FK → User    |
| `receiverId` | `String` | FK → User    |

#### `Block`

User blocking for safety.

| Field       | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| `blockerId` | `String` | FK → User (who blocked)     |
| `blockedId` | `String` | FK → User (who was blocked) |

**Unique constraint:** `(blockerId, blockedId)` — prevents duplicate blocks. On block, existing matches are automatically deleted.

#### `Report`

User reporting with categorized reasons.

| Field         | Type      | Description                                                                                 |
| ------------- | --------- | ------------------------------------------------------------------------------------------- |
| `reporterId`  | `String`  | FK → User                                                                                   |
| `reportedId`  | `String`  | FK → User                                                                                   |
| `reason`      | `String`  | Category: "False or Misleading Information", "Impersonation", "Harassment", "Spam", "Other" |
| `description` | `String?` | Optional additional details                                                                 |
| `status`      | `String`  | `"Pending"` → `"Resolved"` / `"Dismissed"`                                                  |

#### `Developer`

Standalone demo entity for seeded developer cards (not linked to auth users).

| Field        | Type     | Description            |
| ------------ | -------- | ---------------------- |
| `name`       | `String` | Full name              |
| `semester`   | `Int`    | Current semester       |
| `department` | `String` | Academic department    |
| `role`       | `String` | Primary role           |
| `skills`     | `String` | Comma-separated skills |
| `bio`        | `String` | Short biography        |

#### `VerificationToken`

Used by Auth.js for passwordless/magic-link authentication.

---

## Authentication

GhostCommit uses **Auth.js v5 (NextAuth)** with the **Prisma Adapter** and **database session strategy**.

### Providers

| Provider   | Configuration                                             |
| ---------- | --------------------------------------------------------- |
| **Google** | OAuth 2.0 via `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` |
| **GitHub** | OAuth App via `GITHUB_ID` / `GITHUB_SECRET`               |

### Session Strategy

- **Database sessions** (not JWT) — sessions are stored in the `Session` table
- Session data includes `user.id` via a custom callback
- Session provider wraps the entire app via `AuthProvider` component

### Auth Flow

1. User clicks "Continue with Google/GitHub" on `/auth`
2. Auth.js redirects to the OAuth provider
3. On callback, Auth.js creates/updates `Account` + `User` + `Session` records
4. User is redirected to `/profile` with an active session
5. Subsequent API requests use `auth()` server-side to validate sessions

### Type Augmentation

The session type is extended in `src/types/next-auth.d.ts` to include `user.id`:

```typescript
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
```

---

## API Reference

All endpoints are Next.js Route Handlers located under `src/app/api/`.

### Auth Endpoints

#### `GET|POST /api/auth/[...nextauth]`

Auth.js catch-all handler. Manages OAuth flows, session management, CSRF protection.

---

### Profile Endpoints

#### `GET /api/profile`

Returns the authenticated user's complete profile data.

- **Auth:** Required
- **Response:** Full user object with all profile fields
- **Error:** `401` if unauthorized, `404` if user not found

#### `PUT /api/profile`

Updates the authenticated user's profile. Only whitelisted fields are accepted.

- **Auth:** Required
- **Allowed Fields:** `name`, `image`, `headline`, `bio`, `semester`, `department`, `roles`, `availability`, `lookingFor`, `interests`, `skills`, `socialLinks`, `linkVisibility`, `profileVisibility`, `isFounding`, `githubData`
- **Body:** JSON with any subset of allowed fields
- **Response:** Updated user object

#### `GET /api/profile/[id]`

Returns a public profile by user ID. Respects privacy settings.

- **Auth:** Not required
- **Privacy:**
  - Returns `403` if profile is set to `"private"`
  - Filters out social links where `linkVisibility[key] === false`
  - Strips `linkVisibility` from response
- **Response:** Filtered user object

---

### Discovery Endpoints

#### `GET /api/discovery`

The core discovery API. Returns a list of public user profiles with filtering, sorting, and match scoring.

- **Auth:** Optional (enables "Best Match" scoring and block filtering)

**Query Parameters:**

| Parameter      | Type     | Description                                                |
| -------------- | -------- | ---------------------------------------------------------- |
| `semester`     | `int`    | Filter by exact semester                                   |
| `department`   | `string` | Filter by exact department                                 |
| `role`         | `string` | Filter by role (post-query, case-insensitive)              |
| `skill`        | `string` | Filter by skill name (post-query, partial match)           |
| `availability` | `int`    | Minimum availability hours                                 |
| `sort`         | `string` | `"recent"` (default), `"best"`, `"availability"`, `"name"` |

**Filtering Logic:**

1. Database-level: `profileVisibility = "public"`, excludes current user, excludes blocked users (bidirectional)
2. Post-query: role and skill filters applied in-memory for JSON field compatibility
3. **Best Match Algorithm** (when `sort=best` and user is authenticated):
   - +5 points for same department
   - +2 points per shared interest
   - +3 points per complementary role (roles the current user doesn't have)
   - +availability/10 points
   - Normalized to 0–99% match score

**Response:**

```json
[
  {
    "id": "cuid...",
    "name": "Alice Chen",
    "image": "https://...",
    "headline": "Full-stack dev",
    "roles": ["Frontend", "Backend"],
    "skills": [{"name": "React", "level": 4}],
    "interests": ["AI", "Web3"],
    "availability": 20,
    "matchScore": 85,
    ...
  }
]
```

---

### Developer Endpoints

#### `GET /api/developers`

Lists all entries from the standalone `Developer` model (used for the demo feed and swipe cards).

- **Auth:** Not required
- **Response:** Array of developers with skills parsed from comma-separated to array

#### `POST /api/developers`

Creates a new developer entry.

- **Auth:** Not required
- **Required Fields:** `name`, `semester`, `department`, `role`, `skills`, `bio`
- **Response:** `201` with created developer

#### `DELETE /api/developers/[id]`

Deletes a developer entry by ID.

- **Auth:** Not required
- **Response:** `{ success: true }` or `404`

---

### User Safety Endpoints

#### `POST /api/user/block`

Blocks another user. Automatically deletes any existing matches between the two users.

- **Auth:** Required
- **Body:** `{ "blockedId": "user-cuid" }`
- **Validation:** Cannot block yourself, duplicate blocks return `400`
- **Side Effects:** Deletes all `Match` records between blocker and blocked user
- **Response:** `{ success: true, message: "User blocked successfully" }`

#### `POST /api/user/report`

Reports a user with a categorized reason.

- **Auth:** Required
- **Body:**
  ```json
  {
    "reportedId": "user-cuid",
    "reason": "Impersonation (Fake Profile)",
    "description": "Optional details..."
  }
  ```
- **Response:** `{ success: true, reportId: "cuid..." }`

---

## Pages & Routes

| Route        | Type      | Description                                                                                                                                                         |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`          | Public    | Landing page — Hero, Tech Marquee, How It Works, Discovery Feed, Testimonials, Match Inbox, Project Board, Profile Form, CTA Footer                                 |
| `/auth`      | Public    | OAuth sign-in page (Google + GitHub). Auto-redirects to `/profile` if already authenticated                                                                         |
| `/profile`   | Protected | Full profile editor with edit/preview toggle, completeness meter, shareable URL, skill search with autocomplete, per-link visibility toggles, privacy controls      |
| `/discover`  | Public    | Filterable discover grid with search, multi-parameter filtering (semester, department, role, availability), sort modes (Best Match, Recent, Availability, Name A-Z) |
| `/swipe`     | Public    | Tinder-style swipe interface with drag physics, NOPE/MATCH indicators, report/block modal, stack reset                                                              |
| `/matches`   | Public    | Match inbox placeholder with links to swipe/discover                                                                                                                |
| `/teammates` | Public    | Developer CRUD management page for adding/removing demo teammate profiles                                                                                           |
| `/u/[id]`    | Public    | Public profile view with GitHub repos, skill ratings, social links, report/block functionality                                                                      |

---

## Components

### Layout & Providers

| Component              | File                        | Description                                                                                                                                           |
| ---------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AuthProvider**       | `AuthProvider.tsx`          | Wraps the app with NextAuth's `SessionProvider` for client-side session access via `useSession()`                                                     |
| **DevelopersProvider** | `lib/DevelopersContext.tsx` | React Context providing global developer list with `useDevelopers()` hook. Fetches from `/api/discovery` on mount with `refresh()` method             |
| **Navbar**             | `Navbar.tsx`                | Fixed top navigation bar with logo, nav links (Discover, Swipe, Matches), auth status, and user avatar. Uses `useSession()` for conditional rendering |
| **SmoothScroll**       | `SmoothScroll.tsx`          | Lenis smooth scroll wrapper. Initializes `@studio-freight/lenis` with RAF integration for native-feeling scroll physics                               |

### Landing Page Components

| Component        | File               | Description                                                                                                                                                                                           |
| ---------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**         | `Hero.tsx`         | Full-viewport hero section with animated headline, gradient text, typewriter effects, and call-to-action buttons                                                                                      |
| **TechMarquee**  | `TechMarquee.tsx`  | Infinite horizontal ticker displaying technology logos/names. Uses CSS animation for seamless looping                                                                                                 |
| **HowItWorks**   | `HowItWorks.tsx`   | Step-by-step guide section explaining the platform flow with animated cards                                                                                                                           |
| **Feed**         | `Feed.tsx`         | Discovery feed section embedded on the landing page. Features skill search, department/semester/role filters, active filter badges, skeleton loading states, and developer cards with connect buttons |
| **Testimonials** | `Testimonials.tsx` | Social proof section with user testimonial cards                                                                                                                                                      |
| **ProjectBoard** | `ProjectBoard.tsx` | Interactive project listing board where users can browse campus projects, view required skills, and apply                                                                                             |
| **ProfileForm**  | `ProfileForm.tsx`  | Inline profile creation form on the landing page                                                                                                                                                      |
| **MatchInbox**   | `MatchInbox.tsx`   | Message inbox component for viewing and managing matched conversations                                                                                                                                |
| **Footer**       | `Footer.tsx`       | Site footer with navigation links, social icons, and copyright                                                                                                                                        |

### Feature Components

| Component            | File                   | Description                                                               |
| -------------------- | ---------------------- | ------------------------------------------------------------------------- |
| **Logo**             | `Logo.tsx`             | Reusable GhostCommit logo component with size variants (`sm`, `md`, `lg`) |
| **GhostToast**       | `GhostToast.tsx`       | Custom notification/toast system with themed styling                      |
| **LanguageSwitcher** | `LanguageSwitcher.tsx` | i18n-ready language toggle component                                      |

### UX & Visual Components

| Component           | File                  | Description                                                                                                                                                                                                                                                                                                           |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CustomCursor**    | `CustomCursor.tsx`    | Canvas-based custom cursor (330+ lines). Features: spring-physics following, warm coral-to-orange gradient trail (24 segments), 3 orbiting mini-hearts, radial glow, multi-layered particle system (hearts, circles, sparkles on click), speed-reactive sparkle trail, hover state detection for interactive elements |
| **ThreeBackground** | `ThreeBackground.tsx` | 3D animated background using `@react-three/fiber` Canvas with particle field. Renders behind all page content                                                                                                                                                                                                         |

---

## Styling & Design System

The entire design system is defined in `src/app/globals.css` (360 lines) using Tailwind CSS v4's `@theme` directive and custom CSS classes.

### Color Palette

| Token                   | Hex       | Usage                                 |
| ----------------------- | --------- | ------------------------------------- |
| `--color-tinder-coral`  | `#fe3c72` | Primary accent, buttons, links, glows |
| `--color-tinder-orange` | `#ff6b4a` | Secondary accent, gradients           |
| `--color-tinder-pink`   | `#ff85a2` | Tertiary accent, soft tones           |
| `--color-tinder-gold`   | `#ffd700` | Gold badges, skill stars              |
| `--color-warm-rose`     | `#ff4458` | Hover states, emphasis                |
| `--background` (dark)   | `#121212` | Page background                       |
| `--foreground` (dark)   | `#ffffff` | Primary text                          |

### Glass Morphism

Two tiers of glassmorphism effects:

```css
/* Standard glass */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Strong glass (modals, prominent cards) */
.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Animations

| Class                     | Keyframe         | Duration  | Description                          |
| ------------------------- | ---------------- | --------- | ------------------------------------ |
| `.animate-float`          | `float`          | 6s ease   | Gentle vertical floating             |
| `.animate-pulse-slow`     | `pulse-slow`     | 4s ease   | Slow opacity pulsing (0.4–0.8)       |
| `.animate-shimmer`        | `shimmer`        | 3s linear | Background position shimmer          |
| `.animate-gradient`       | `gradient-shift` | 8s ease   | Background gradient cycling          |
| `.animate-slide-up`       | `slide-up`       | 0.6s ease | Opacity + translateY entrance        |
| `.animate-fade-in`        | `fade-in`        | 0.8s ease | Opacity entrance                     |
| `.animate-glow-pulse`     | `glow-pulse`     | 3s ease   | Box-shadow intensity pulsing         |
| `.animate-border-shimmer` | `border-shimmer` | 6s linear | Border color cycling through palette |

### Custom CSS Utilities

| Class                                         | Description                                                      |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `.gradient-text`                              | Coral → orange → pink text gradient via `background-clip: text`  |
| `.gradient-text-subtle`                       | White to semi-transparent text gradient                          |
| `.glow-coral` / `.glow-orange` / `.glow-gold` | Colored box-shadow glows                                         |
| `.section-line`                               | Gradient horizontal divider                                      |
| `.gradient-border`                            | Animated gradient border via `::before` pseudo-element with mask |
| `.card-hover`                                 | 3D lift + shadow on hover with cubic-bezier easing               |
| `.badge`                                      | Pill-shaped badge with micro typography                          |
| `.section-header`                             | Responsive section title styling (clamp-based font size)         |
| `.no-scrollbar`                               | Hides scrollbar across all browsers                              |

### Custom Scrollbar

WebKit scrollbar styled with the coral → orange gradient thumb on a dark track.

### Selection & Focus

- `::selection` — Coral-tinted highlight
- `:focus-visible` — 2px coral outline with offset

---

## State Management

GhostCommit uses a lightweight state architecture without external state libraries:

| Layer            | Mechanism                                        | Scope                                               |
| ---------------- | ------------------------------------------------ | --------------------------------------------------- |
| **Server State** | Auth.js sessions (database)                      | Authentication persisted across requests            |
| **Client Auth**  | `useSession()` from `next-auth/react`            | Session data in all client components               |
| **Global State** | `DevelopersContext` (React Context + `useState`) | Developer list shared across Feed, Swipe, Teammates |
| **Local State**  | `useState` / `useCallback` per page              | Form data, filters, UI toggles                      |
| **URL State**    | Query parameters (discovery API)                 | Filters passed to API via URLSearchParams           |

### DevelopersContext

```typescript
type DevelopersContextType = {
  developers: Developer[]; // Full developer list from /api/discovery
  loading: boolean; // Fetch status
  refresh: () => Promise<void>; // Manual refresh trigger
};
```

- Fetches from `/api/discovery` on mount
- Consumed by `Feed.tsx`, swipe page, teammates page
- Provides `useDevelopers()` hook with runtime guard

---

## Configuration Files

| File                 | Purpose                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next.config.ts`     | Configures allowed image domains: `lh3.googleusercontent.com` (Google avatars), `avatars.githubusercontent.com` (GitHub avatars), `images.unsplash.com` (stock photos) |
| `tsconfig.json`      | TypeScript config with `ES2017` target, `bundler` module resolution, path alias `@/*` → `./src/*`, strict mode enabled                                                 |
| `eslint.config.mjs`  | ESLint flat config extending `next/core-web-vitals` and `next/typescript`                                                                                              |
| `postcss.config.mjs` | PostCSS with `@tailwindcss/postcss` plugin (Tailwind v4)                                                                                                               |
| `prisma.config.ts`   | Prisma config pointing to `prisma/schema.prisma` with `DATABASE_URL` from env                                                                                          |

---

## Seed Data

The seed script (`prisma/seed.ts`) populates the database with demo data for development:

### Seeded Developers (6)

| Name         | Semester | Department             | Role                 | Key Skills                                   |
| ------------ | -------- | ---------------------- | -------------------- | -------------------------------------------- |
| Alice Chen   | 4        | Computer Science       | Full Stack Developer | React, TypeScript, Node.js, Python, Next.js  |
| Bob Patel    | 6        | Electronic Engineering | Backend Developer    | Python, TensorFlow, PyTorch, Docker, FastAPI |
| Carol Liu    | 5        | Design                 | UI/UX Designer       | Figma, React, CSS, Framer Motion             |
| Dave Nguyen  | 7        | Information Technology | Full Stack Developer | React Native, Flutter, TypeScript, Firebase  |
| Eva Martinez | 8        | Computer Science       | Backend Developer    | AWS, Docker, Kubernetes, Terraform, Go       |
| Frank Kim    | 3        | Mathematics            | Data Scientist       | Python, R, SQL, Tableau, Pandas              |

### Seeded Users (2)

| Name       | Email             | Department             | Looking For |
| ---------- | ----------------- | ---------------------- | ----------- |
| Alice Chen | alice@college.edu | Computer Science       | Teammates   |
| Bob Patel  | bob@college.edu   | Electronic Engineering | Both        |

### Seeded Projects (2)

| Title             | Owner | Required Skills                   | Status |
| ----------------- | ----- | --------------------------------- | ------ |
| Campus Ride Share | Alice | React Native, Node.js, PostgreSQL | Open   |
| AI Study Buddy    | Bob   | Python, React, TensorFlow         | Open   |

Run the seed:

```bash
npx prisma db seed
```

---

## Roadmap

- [ ] **Real-time Chat** — WebSocket-based messaging between matched users
- [ ] **Mutual Matching** — Require both users to swipe right before creating a match
- [ ] **Email Notifications** — Notify users of new matches and messages
- [ ] **Project Applications** — Full CRUD for project join requests with accept/reject flow
- [ ] **Bookmarks** — Save interesting profiles for later
- [ ] **Leaderboard** — Gamified ranking based on profile completeness and activity
- [ ] **Admin Dashboard** — Review and resolve user reports
- [ ] **Advanced Search** — Full-text search across bios and project descriptions
- [ ] **PWA Support** — Installable progressive web app with push notifications
- [ ] **i18n** — Multi-language support (Language Switcher component is already in place)
- [ ] **Dark/Light Theme Toggle** — Light mode support (CSS variables already defined)

---

## Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please follow the existing code style and ensure `npm run lint` passes before submitting.

---

## License

This project was built for a hackathon. All rights reserved by the original authors.

---

## Contact

**GitHub:** [@RyanKeshary](https://github.com/RyanKeshary)  
**Email:** [ryankeshary@gmail.com](mailto:ryankeshary@gmail.com)

[🔝 Back to Top](#table-of-contents)
