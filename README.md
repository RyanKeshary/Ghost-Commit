<p align="center">
  <img src="public/favicon.png" alt="GhostCommit Logo" width="120" height="120" />
</p>

# 👻 GHOSTCOMMIT

### _Pulse of Devs — Find Your Next Teammate Just Like That._

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FE3C72?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

**GhostCommit** is a premium, Tinder-style teammate discovery platform built for university campuses and hackathon junkies. It’s designed to solve the struggle of finding the right people to build projects with—whether you need a backend wizard, a UI/UX expert, or just a ghostly companion for late-night coding.

---

## ✨ Premium Features

### 🌪️ Ghost Protocol Discovery

- **Swipe Interface**: A high-end drag-to-swipe card stack with spring physics, NOPE/MATCH indicators, and reactive glows.
- **Smart Matching**: Algorithm-driven scoring based on complementary skills, roles, and campus departments.
- **Discovery Grid**: Real-time filtering by tech stack, semester, and availability with instant skeleton loading.

### 🎭 Visual Excellence

- **Ghost Protocol Loader**: A custom, "fun" loading experience with randomized status messages like _"Summoning ghost commits..."_ and _"Rebasing reality..."_.
- **Interactive Refresher**: Reusable data-sync overlay with flipping icons and protocol resync animations.
- **Custom Cursor**: Canvas-rendered cursor with heartbeat ripples and orbital particles that react to your mouse movements.
- **3D Backdrop**: Responsive Three.js particle field that creates a deep, atmospheric "dev afterlife" aesthetic.

### 🛠️ Developer-First Core

- **OAuth Integration**: Secure Google & GitHub sign-in via Auth.js v5.
- **GitHub Sync**: One-click verification that pulls your real public stats and top-starred repositories.
- **Profile Privacy**: Granular control over visibility—keep your portfolio public but your social links private.
- **User Safety**: Built-in block and report systems to maintain a clean campus environment.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/) (with custom design system)
- **Animations**: [Framer Motion 12](https://framer.com/motion) & [GSAP](https://gsap.com/)
- **Database**: [Prisma 7](https://prisma.io) (PostgreSQL/SQLite compatible)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/)

---

## 📦 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/RyanKeshary/Ghost-Commit.git
cd Ghost-Commit
npm install
```

### 2. Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="file:./dev.db" # Or your Neon/Supabase PostgreSQL URL
AUTH_SECRET="your-secret-here"
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxx"
GITHUB_ID="xxx"
GITHUB_SECRET="xxx"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Initialize Database

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed # Optional: Add demo developers
```

### 4. Run Development

```bash
npm run dev
```

---

## 🌐 Deployment (Vercel)

To deploy **GhostCommit** to Vercel, follow these essential steps:

1.  **Cloud Database**: Use [Neon.tech](https://neon.tech/) to get a free PostgreSQL URL.
2.  **Update Schema**: Change `provider = "sqlite"` to `"postgresql"` in `prisma/schema.prisma`.
3.  **Build Script**: Ensure `package.json` includes `"postinstall": "prisma generate"`.
4.  **Vercel Dashboard**:
    - Connect your GitHub repo.
    - Add all keys from your `.env` to the Environment Variables settings.
    - Set `NEXTAUTH_URL` to your production domain name.

---

## 👻 The Branding

GhostCommit uses a signature **High-Contrast Dark Theme**:

- **Primary**: `#FE3C72` (Tinder Coral)
- **Accent**: `#FF6B4A` (Ghost Orange)
- **Glass**: Custom `blur-2xl` glassmorphism system with gradient borders.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to add a feature, feel free to open a Pull Request. Don't forget to star the repo if you like the ghostly vibes! 🌟

---

<p align="center">
  <em>Built with ❤️ for the Dev Afterlife.</em>
</p>
