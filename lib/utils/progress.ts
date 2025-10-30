/**
 * Progress calculation utilities for courses, quizzes, assignments
 */

import type { Assignment, Course, Quiz } from '@/types/database';

// ==================== COURSE PROGRESS ====================
export interface CourseProgress {
  totalLessons: number;
  completedLessons: number;
  totalChapters: number;
  completedChapters: number;
  percentComplete: number;
}

export function calculateCourseProgress(course: Course): CourseProgress {
  if (!course.lessons || course.lessons.length === 0) {
    return {
      totalLessons: 0,
      completedLessons: 0,
      totalChapters: 0,
      completedChapters: 0,
      percentComplete: 0,
    };
  }

  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter((l) => l.completed).length;

  const totalChapters = course.lessons.reduce(
    (acc, lesson) => acc + lesson.chapters.length,
    0
  );

  const completedChapters = course.lessons.reduce(
    (acc, lesson) => acc + lesson.chapters.filter((ch) => ch.completed).length,
    0
  );

  const percentComplete =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  return {
    totalLessons,
    completedLessons,
    totalChapters,
    completedChapters,
    percentComplete,
  };
}

// ==================== QUIZ PROGRESS ====================
export interface QuizProgress {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  percentComplete: number;
  score: number;
  passed: boolean;
}

export function calculateQuizProgress(quiz: Quiz): QuizProgress {
  if (!quiz.sections || quiz.sections.length === 0) {
    return {
      totalQuestions: 0,
      answeredQuestions: 0,
      correctAnswers: 0,
      percentComplete: 0,
      score: 0,
      passed: false,
    };
  }

  let totalQuestions = 0;
  let answeredQuestions = 0;
  let correctAnswers = 0;

  quiz.sections.forEach((section) => {
    section.questions.forEach((question) => {
      totalQuestions++;
      if (question.marked_answer) {
        answeredQuestions++;
        if (question.is_correct) {
          correctAnswers++;
        }
      }
    });
  });

  const percentComplete =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const passed = quiz.passing_score ? score >= quiz.passing_score : false;

  return {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    percentComplete,
    score,
    passed,
  };
}

// ==================== ASSIGNMENT PROGRESS ====================
export interface AssignmentProgress {
  submitted: boolean;
  graded: boolean;
  overdue: boolean;
  daysUntilDue: number | null;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded' | 'overdue';
}

export function calculateAssignmentProgress(
  assignment: Assignment
): AssignmentProgress {
  const now = new Date();
  const deadline = assignment.submission_deadline
    ? new Date(assignment.submission_deadline)
    : null;

  const overdue = deadline ? now > deadline && !assignment.submitted : false;

  const daysUntilDue = deadline
    ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  let status: AssignmentProgress['status'] = 'not_started';
  if (assignment.graded) {
    status = 'graded';
  } else if (assignment.submitted) {
    status = 'submitted';
  } else if (overdue) {
    status = 'overdue';
  } else if (assignment.submission_link) {
    status = 'in_progress';
  }

  return {
    submitted: assignment.submitted || false,
    graded: assignment.graded || false,
    overdue,
    daysUntilDue,
    status,
  };
}

// ==================== COMBINED ACTIVITY PROGRESS ====================
export type ActivityProgress =
  | { type: 'COURSE'; progress: CourseProgress }
  | { type: 'QUIZ'; progress: QuizProgress }
  | { type: 'ASSIGNMENT'; progress: AssignmentProgress }
  | { type: 'DISCUSSION'; progress: null };

/**
 * Get progress for any activity type
 * Used when you have the full entity data from ref_id lookup
 */
export function getActivityProgress(
  activityType: 'COURSE' | 'QUIZ' | 'ASSIGNMENT' | 'DISCUSSION',
  entity: Course | Quiz | Assignment | null
): ActivityProgress {
  switch (activityType) {
    case 'COURSE':
      return {
        type: 'COURSE',
        progress: entity ? calculateCourseProgress(entity as Course) : null!,
      };
    case 'QUIZ':
      return {
        type: 'QUIZ',
        progress: entity ? calculateQuizProgress(entity as Quiz) : null!,
      };
    case 'ASSIGNMENT':
      return {
        type: 'ASSIGNMENT',
        progress: entity
          ? calculateAssignmentProgress(entity as Assignment)
          : null!,
      };
    case 'DISCUSSION':
      return { type: 'DISCUSSION', progress: null };
    default:
      return { type: 'DISCUSSION', progress: null };
  }
}
