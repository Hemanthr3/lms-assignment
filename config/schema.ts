import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// -----------------------------------------------------
// USERS
// -----------------------------------------------------
export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// -----------------------------------------------------
// ENUMS
// -----------------------------------------------------
export const ACTIVITY_TYPE = pgEnum('activity_type', [
  'COURSE',
  'QUIZ',
  'ASSIGNMENT',
  'DISCUSSION',
]);

export const ACTIVITY_STATUS = pgEnum('activity_status', [
  'NOT_STARTED',
  'IN_PROGRESS',
  'COMPLETED',
  'UPCOMING',
]);

// -----------------------------------------------------
// ACTIVITIES (Registry Table)
// -----------------------------------------------------
export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  type: ACTIVITY_TYPE('type').notNull(),
  ref_id: integer('ref_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  subject: text('subject'), // Common field across all activities
  thumbnail_url: text('thumbnail_url'),
  instructor_name: text('instructor_name'),
  duration: text('duration'),
  status: ACTIVITY_STATUS('status').default('NOT_STARTED'),
  rating: integer('rating'),
  students_enrolled: integer('students_enrolled'),
  purchased: boolean('purchased').default(true),
  is_favourite: boolean('is_favourite').default(false),
  created_at: timestamp('created_at').defaultNow(),
});

// -----------------------------------------------------
// COURSES
// -----------------------------------------------------
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subject: text('subject'), // Added subject field
  overview: text('overview'),
  instructor_name: text('instructor_name'),
  instructor_bio: text('instructor_bio'),
  instructor_avatar_url: text('instructor_avatar_url'),
  thumbnail_url: text('thumbnail_url'),
  trailer_url: text('trailer_url'),
  duration: text('duration'),
  level: text('level'), // BEGINNER / INTERMEDIATE / ADVANCED
  category: text('category'),
  tags: jsonb('tags').$type<string[]>(),
  requirements: jsonb('requirements').$type<string[]>(),
  learning_outcomes: jsonb('learning_outcomes').$type<string[]>(),
  rating: integer('rating'),
  total_lessons: integer('total_lessons').default(0),
  total_chapters: integer('total_chapters').default(0),
  lessons: jsonb('lessons').$type<
    {
      id: number;
      title: string;
      description?: string;
      duration?: string;
      completed: boolean;
      order_index: number;
      video_url?: string;
      chapters: {
        id: number;
        title: string;
        description?: string;
        video_url?: string;
        duration?: string;
        resources?: string[];
        completed: boolean;
      }[];
    }[]
  >(),
  created_at: timestamp('created_at').defaultNow(),
});

// -----------------------------------------------------
// QUIZZES
// -----------------------------------------------------
export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subject: text('subject'), // Added subject field
  description: text('description'),
  total_questions: integer('total_questions'),
  passing_score: integer('passing_score'),
  duration: text('duration'),
  difficulty: text('difficulty'), // EASY / MEDIUM / HARD
  score: integer('score'),
  passed: boolean('passed').default(false),
  sections: jsonb('sections').$type<
    {
      id: number;
      title?: string;
      order_index?: number;
      questions: {
        id: number;
        question: string;
        type: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER';
        options?: string[];
        correct_answer: string;
        marked_answer?: string;
        is_correct?: boolean;
        explanation?: string;
      }[];
    }[]
  >(),
  created_at: timestamp('created_at').defaultNow(),
});

// -----------------------------------------------------
// ASSIGNMENTS
// -----------------------------------------------------
export const assignments = pgTable('assignments', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subject: text('subject'), // Added subject field
  description: text('description'),
  instructions: text('instructions'),
  total_marks: integer('total_marks'),
  submission_deadline: timestamp('submission_deadline'),
  submission_link: text('submission_link'),
  submitted: boolean('submitted').default(false),
  graded: boolean('graded').default(false),
  grade: text('grade'),
  feedback: text('feedback'),
  resources: jsonb('resources').$type<string[]>(),
  sections: jsonb('sections').$type<
    {
      id: number;
      title?: string;
      description?: string;
      file_requirements?: string[];
    }[]
  >(),
  created_at: timestamp('created_at').defaultNow(),
});

// -----------------------------------------------------
// DISCUSSIONS
// -----------------------------------------------------
export const discussions = pgTable('discussions', {
  id: serial('id').primaryKey(),
  topic: text('topic').notNull(),
  subject: text('subject'), // Added subject field
  description: text('description'),
  participants: integer('participants').default(0),
  replies_count: integer('replies_count').default(0),
  last_activity_at: timestamp('last_activity_at'),
  posts: jsonb('posts').$type<
    {
      id: number;
      author: {
        name: string;
        avatar_url?: string;
      };
      content: string;
      created_at: string;
      likes: number;
      replies: {
        id: number;
        author: {
          name: string;
          avatar_url?: string;
        };
        content: string;
        created_at: string;
        likes: number;
      }[];
    }[]
  >(),
  created_at: timestamp('created_at').defaultNow(),
});

// -----------------------------------------------------
// TYPE EXPORTS
// -----------------------------------------------------
export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;

export type Quiz = typeof quizzes.$inferSelect;
export type NewQuiz = typeof quizzes.$inferInsert;

export type Assignment = typeof assignments.$inferSelect;
export type NewAssignment = typeof assignments.$inferInsert;

export type Discussion = typeof discussions.$inferSelect;
export type NewDiscussion = typeof discussions.$inferInsert;
