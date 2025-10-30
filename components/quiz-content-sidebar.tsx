'use client';

import { ContentSidebarWrapper } from '@/components/content-sidebar-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuiz } from '@/hooks/use-lms-api';

interface QuizContentSidebarProps {
  quizId: number;
}

export function QuizContentSidebar({ quizId }: QuizContentSidebarProps) {
  // Fetch quiz data using React Query
  const { data: quiz, isLoading } = useQuiz(quizId);

  if (isLoading) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4 space-y-4 h-full">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4 h-full">
        <p className="text-sm text-muted-foreground">Quiz not found</p>
      </div>
    );
  }

  // Transform quiz data to sidebar format
  // Quiz has: title, sections (array)
  // Each section has: title, questions (array)
  // Each question has: question (text), type, points
  const sidebarData = {
    title: quiz.title,
    activityType: 'quiz' as const,
    sidebarLabel: 'Quiz Sections',
    sections: (quiz.sections || []).map(
      (section: any, sectionIndex: number) => ({
        id: `section-${sectionIndex}`,
        title: section.title,
        type: 'chapter' as const,
        items: (section.questions || []).map(
          (question: any, questionIndex: number) => ({
            id: `${sectionIndex + 1}-${questionIndex + 1}`,
            type: 'quiz' as const,
            title: `Question ${questionIndex + 1}`,
            points: question.points,
            completed: false,
          })
        ),
      })
    ),
  };

  return (
    <ContentSidebarWrapper data={sidebarData} baseUrl={`/quizzes/${quizId}`} />
  );
}
