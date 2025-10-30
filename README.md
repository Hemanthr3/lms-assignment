# 🎓 LMS Assignment — Learning Management System

A full-stack **Learning Management System (LMS)** built with **Next.js**, **Drizzle ORM**, and **PostgreSQL**, designed to provide a production-grade experience for learners to discover, track, and engage with various activities like **courses**, **quizzes**, **assignments**, and **discussions**.

> **Why This Stack?** I chose Next.js for its unified full-stack capabilities, PostgreSQL + Drizzle for type-safe schema management, and React Query for real-time feel — all prioritizing simplicity, speed, and production-ready patterns over over-engineering.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 3. Setup Database

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed

# (Optional) Open Drizzle Studio to view data
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🎯 Problem Statement

The goal was to build a **learning management interface** for learners enrolled in programs like AI, Machine Learning, and Cloud Computing — where users can:

- View and filter learning activities
- Track progress and completion
- Mark favorites and interact with content
- Seamlessly switch between courses, quizzes, assignments, and discussions

I wanted it to feel like a **real production app**, not a mock assignment.

---

## ✨ Features

### Core Functionality

- 📚 **Courses** — lessons, chapters, and progress tracking
- 📝 **Quizzes** — multi-section structure with scoring and pass/fail logic
- 📋 **Assignments** — submission tracking and status updates
- 💬 **Discussions** — threaded comments and topic management
- 🏷️ **Unified Activities** registry to display all content types in one feed

### User Experience

- 🔍 **Smart Filters** — search by type, subject, or instructor
- ⭐ **Favorites** — mark and filter preferred items
- 📊 **Progress Bars** — visual completion indicators
- 🧭 **Breadcrumbs & Sidebar** — for easy navigation
- 📱 **Fully Responsive** — optimized for desktop and mobile
- 💾 **React Query Caching** — for real-time sync and optimistic UI updates
- 🎨 **Theme Support** — dark/light modes with consistent branding

---

## 🧠 Architecture & Thought Process

When I started building this LMS, I wanted it to feel **real** — with working data, CRUD operations, and smooth UI feedback.
Every decision — from schema design to component layout — was about **realism**, **scalability**, and **maintainability**.

---

### 🗃️ Database-First Approach

Initially, I considered a local JSON or mock API but quickly realized it wouldn't deliver the _realtime feel_ I wanted.
So, I went with **PostgreSQL (Neon)** + **Drizzle ORM** — a simple, type-safe, schema-first setup.

I kept the schema minimal by **combining related tables** where possible.
This made CRUD operations straightforward and reduced joins — perfect for an assignment timeframe while keeping production-level structure.

Drizzle's integration with Next.js allowed me to:

- Keep schema and types in sync
- Seed the database easily
- Iterate quickly with migrations

---

### ⚙️ Simplicity in Stack

I didn't want to over-engineer this with GraphQL or a separate backend.
**Next.js App Router** gave me everything: SSR, routing, and backend APIs — all in one place.
It helped me move fast while maintaining best practices for scalability.

**Why Clerk for Authentication?**  
I chose **Clerk** because it gave me production-ready authentication handling out of the box — user management, session handling, protected routes, and middleware integration — all without building custom auth flows. This let me focus on building the LMS features rather than reinventing authentication.

**Next.js also made deployment seamless** — I could deploy and share instantly through **Vercel**, which was ideal for quick iteration and review.

---

### 🎨 Design & User Experience Thinking

Every component was built with the idea of improving the overall learning experience — not just UI for the sake of UI.

**Why Tailwind CSS?**  
I chose **Tailwind** for its utility-first approach that speeds up development while maintaining consistency. It allowed me to rapidly prototype and iterate on designs without switching between files, and the JIT compiler kept bundle sizes minimal.

**Why shadcn/ui?**  
Instead of heavyweight component libraries, I went with **shadcn/ui** because it gives you **full ownership of the components** — they're just copied into your project, not installed as dependencies. This means I could customize everything to fit the LMS aesthetic without fighting against library constraints.

Some highlights:

- 🧭 Collapsible sidebar for mobile
- 🧱 Breadcrumbs for navigation clarity
- 💡 Tooltips for contextual help
- 🔔 Toasters for instant feedback
- ⭐ Animated favorite interactions
- 🧩 Modular and reusable components

I customized and extended **shadcn/ui** components to make them more dynamic and consistent with the design language of an LMS.

---

### 📱 Platform-Agnostic Code

Even though this was a web-focused project, I structured it so that the **business logic is separate from the UI layer** — making it easy to extend to React Native or Expo later.

I have some experience in React Native, but given time constraints, I chose **Next.js** for its maturity and unified development experience.

---

### 🔄 Data Handling & Real-Time Feel

For data handling:

- **Axios** → clean promise & error handling
- **React Query (TanStack)** → caching, background refetch, and optimistic UI

This gave me near real-time sync with the database and a smooth experience.

**Realtime Features in Action:**

- ⭐ **Favorites** — click the star, and it instantly updates across the UI (activity cards, detail pages) with optimistic updates
- ✅ **Course/Chapter Completion** — mark a chapter as complete, and the progress bar updates immediately without page reload
- 🔄 **Filter Changes** — switch between "All", "In Progress", "Completed", or "Favorites" with instant UI response

No waiting, no spinners, no page reloads — just a smooth, app-like experience powered by React Query's intelligent caching and optimistic updates.

---

### 🧱 Architecture Overview

Each domain (`courses`, `quizzes`, `assignments`, `discussions`) has:

- Its own schema in Drizzle
- Its own API routes under `/api`
- Modular and reusable components under `/components`

All of these are tied together via a **unified `activities` table**, which acts as a registry to show every item in a single feed.

Adding new activity types is simple — just extend the schema, add a new config, and plug it into the same flow.

---

### ⚡ Performance & Code Practices

I kept performance and maintainability in mind:

- ✅ Server Components for SSR & smaller bundles
- ✅ Skeleton Loaders for perceived speed
- ✅ Optimistic UI updates
- ✅ Centralized API logic (`/lib/api`)
- ✅ Consistent type-safety with Drizzle & TypeScript

If I had more time, I'd focus on:

- Measuring **Web Vitals** and optimizing Core Web Metrics
- Code splitting & lazy loading for detail pages
- Moving more logic to the **server** for faster client rendering
- Implementing **real-time updates** (WebSockets or Supabase channels)
- Writing **unit & integration tests** — which I couldn't complete due to time constraints

---

## 🧩 Tech Stack

| Category         | Technology           |
| ---------------- | -------------------- |
| Framework        | Next.js (App Router) |
| Database         | PostgreSQL (Neon)    |
| ORM              | Drizzle ORM          |
| Styling          | Tailwind CSS         |
| UI Components    | Shadcn / Radix UI    |
| State Management | TanStack Query       |
| HTTP Client      | Axios                |
| Auth             | Clerk                |
| Deployment       | Vercel               |

---

## 🧪 Testing

Due to time constraints, I couldn't implement automated test cases — but I structured the project to easily allow:

- Unit tests for hooks and utils
- Integration tests for API routes

## 📁 Project Structure

```
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Dashboard pages
│   │   ├── assignments/
│   │   ├── courses/
│   │   ├── discussions/
│   │   └── quizzes/
│   └── api/                 # API routes
│       ├── activities/
│       ├── assignments/
│       ├── courses/
│       ├── discussions/
│       ├── quizzes/
│       └── user/
├── components/
│   ├── activity-card/
│   ├── assignment/
│   ├── course/
│   ├── discussion/
│   ├── quiz/
│   └── ui/
├── config/
│   ├── activities.config.ts
│   ├── api-config.ts
│   ├── db.ts
│   └── schema.ts
├── hooks/
│   ├── use-lms-api.ts
│   └── use-mobile.ts
├── lib/
│   ├── api/
│   ├── crud/
│   ├── utils/
│   └── navigation.ts
├── providers/
├── scripts/
│   ├── seed.ts
│   └── reset.ts
└── types/
```

---

## 🌐 Deployment

Deployed on **Vercel** — which worked seamlessly with Next.js for automatic builds and previews.

---

## 🧠 Reflection

This project was not just about implementing features — it was about **thinking like a product engineer**.
From schema design to micro-interactions, every decision had trade-offs I consciously made based on:

- Time constraints
- Experience level
- Desired product feel

I didn't want it to look like a demo — I wanted it to **behave like a real LMS**.

It's clean, fast, and scalable — and most importantly, it reflects **how I think about building user-centric products**.

---

_— Built with ❤️ and caffeine by Hemanth_
