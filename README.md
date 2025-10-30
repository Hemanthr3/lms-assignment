# LMS Assignment - Learning Management System

A full-stack Learning Management System built with Next.js, Drizzle ORM, and PostgreSQL.

## Features

- 📚 **Courses** with lessons and chapters
- 📝 **Quizzes** with multiple question types
- 📋 **Assignments** with submission tracking
- 💬 **Discussions** with posts and replies
- 🎯 **Activities** registry for all learning content
- 🏷️ **Subject-based** organization across all content types

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: TanStack Query
- **Auth**: Clerk

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

| Script                | Description                    |
| --------------------- | ------------------------------ |
| `npm run dev`         | Start development server       |
| `npm run build`       | Build for production           |
| `npm run start`       | Start production server        |
| `npm run lint`        | Run ESLint                     |
| `npm run db:generate` | Generate migration files       |
| `npm run db:push`     | Push schema to database        |
| `npm run db:studio`   | Open Drizzle Studio            |
| `npm run db:seed`     | Seed database with sample data |
| `npm run db:reset`    | Clear all database data        |

## Project Structure

```
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Dashboard pages
│   │   ├── assignments/     # Assignment detail pages
│   │   ├── courses/         # Course detail pages
│   │   ├── discussions/     # Discussion detail pages
│   │   └── quizzes/         # Quiz detail pages
│   └── api/                 # API routes
│       ├── activities/
│       ├── assignments/
│       ├── courses/
│       ├── discussions/
│       ├── quizzes/
│       └── user/
├── components/
│   ├── assignment/          # Assignment components
│   ├── course/              # Course components
│   ├── discussion/          # Discussion components
│   ├── layout/              # Layout components
│   ├── quiz/                # Quiz components
│   └── ui/                  # UI components (Shadcn)
├── config/
│   ├── activities.config.ts # Activity configuration
│   ├── api-config.ts        # API configuration
│   ├── db.ts                # Database connection
│   └── schema.ts            # Database schema (Drizzle)
├── contexts/                # React contexts
├── hooks/
│   ├── use-lms-api.ts       # LMS API hooks (React Query)
│   └── use-mobile.ts        # Mobile detection
├── lib/
│   ├── api/                 # API utilities
│   ├── crud/                # CRUD operations
│   ├── utils/               # Utility functions
│   └── navigation.ts        # Navigation utilities
├── providers/               # Context providers
├── scripts/
│   ├── seed.ts              # Database seeding
│   └── reset.ts             # Database reset
└── types/                   # TypeScript types
```

## API Endpoints

All entities support RESTful operations:

- **GET** `/api/{entity}` - Get all items (with optional filters)
- **GET** `/api/{entity}/[id]` - Get single item
- **POST** `/api/{entity}` - Create new item
- **PATCH** `/api/{entity}/[id]` - Update item
- **DELETE** `/api/{entity}/[id]` - Delete item

Entities: `activities`, `courses`, `quizzes`, `assignments`, `discussions`

### Example Filters

```
GET /api/activities?type=COURSE
GET /api/activities?subject=Artificial Intelligence
GET /api/courses?level=BEGINNER
GET /api/quizzes?difficulty=EASY
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
