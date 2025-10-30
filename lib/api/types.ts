/**
 * API Request and Response Types
 * Centralized type definitions for all API calls
 */

import type {
  Activity,
  Assignment,
  Course,
  Discussion,
  Quiz,
} from '@/types/database';

// ==================== ACTIVITIES ====================
export namespace ActivityAPI {
  export type GetAllResponse = Activity[];
  export type GetByIdResponse = Activity;
  export type GetByTypeResponse = Activity[];
  export type GetBySubjectResponse = Activity[];

  export type CreateRequest = Omit<Activity, 'id' | 'created_at'>;
  export type CreateResponse = Activity;

  export type UpdateRequest = Partial<Omit<Activity, 'id' | 'created_at'>>;
  export type UpdateResponse = Activity;

  export type DeleteResponse = { message: string };
}

// ==================== COURSES ====================
export namespace CourseAPI {
  export type GetAllResponse = Course[];
  export type GetByIdResponse = Course;
  export type GetBySubjectResponse = Course[];
  export type GetByLevelResponse = Course[];

  export type CreateRequest = Omit<Course, 'id' | 'created_at'>;
  export type CreateResponse = Course;

  export type UpdateRequest = Partial<Omit<Course, 'id' | 'created_at'>>;
  export type UpdateResponse = Course;

  export type DeleteResponse = { message: string };
}

// ==================== QUIZZES ====================
export namespace QuizAPI {
  export type GetAllResponse = Quiz[];
  export type GetByIdResponse = Quiz;
  export type GetBySubjectResponse = Quiz[];
  export type GetByDifficultyResponse = Quiz[];

  export type CreateRequest = Omit<Quiz, 'id' | 'created_at'>;
  export type CreateResponse = Quiz;

  export type UpdateRequest = Partial<Omit<Quiz, 'id' | 'created_at'>>;
  export type UpdateResponse = Quiz;

  export type SubmitAnswerRequest = {
    sectionId: number;
    questionId: number;
    answer: string;
  };

  export type DeleteResponse = { message: string };
}

// ==================== ASSIGNMENTS ====================
export namespace AssignmentAPI {
  export type GetAllResponse = Assignment[];
  export type GetByIdResponse = Assignment & { overdue?: boolean };
  export type GetBySubjectResponse = Assignment[];

  export type CreateRequest = Omit<Assignment, 'id' | 'created_at'>;
  export type CreateResponse = Assignment;

  export type UpdateRequest = Partial<Omit<Assignment, 'id' | 'created_at'>>;
  export type UpdateResponse = Assignment;

  export type SubmitRequest = {
    submission_link: string;
  };

  export type GradeRequest = {
    grade: string;
    feedback?: string;
  };

  export type DeleteResponse = { message: string };
}

// ==================== DISCUSSIONS ====================
export namespace DiscussionAPI {
  export type GetAllResponse = Discussion[];
  export type GetByIdResponse = Discussion;
  export type GetBySubjectResponse = Discussion[];

  export type CreateRequest = Omit<Discussion, 'id' | 'created_at'>;
  export type CreateResponse = Discussion;

  export type UpdateRequest = Partial<Omit<Discussion, 'id' | 'created_at'>>;
  export type UpdateResponse = Discussion;

  export type AddPostRequest = {
    author: {
      name: string;
      avatar_url?: string;
    };
    content: string;
  };

  export type AddReplyRequest = {
    postId: number;
    author: {
      name: string;
      avatar_url?: string;
    };
    content: string;
  };

  export type DeleteResponse = { message: string };
}

