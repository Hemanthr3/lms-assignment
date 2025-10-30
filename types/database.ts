// Re-export database types for frontend use
export type {
  Activity,
  Assignment,
  Course,
  Discussion,
  NewActivity,
  NewAssignment,
  NewCourse,
  NewDiscussion,
  NewQuiz,
  Quiz,
} from '@/config/schema';

// Additional utility types for frontend
export type ActivityType = 'COURSE' | 'QUIZ' | 'ASSIGNMENT' | 'DISCUSSION';
export type ActivityStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING';
export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type QuizDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER';
