'use client';

import { CourseBreadcrumb } from '@/components/course-breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuiz } from '@/hooks/use-lms-api';
import { Clock, Trophy } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export default function QuizDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const quizId = parseInt(id);
  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('item');

  // Fetch quiz data using React Query
  const { data: quiz, isLoading } = useQuiz(quizId);

  // Parse selected item from URL (format: "sectionIndex-questionIndex" e.g., "1-2")
  const [sectionIndex, questionIndex] = selectedItemId
    ? selectedItemId.split('-').map((n) => parseInt(n) - 1)
    : [0, 0];

  // Get current section and question
  const currentSection = quiz?.sections?.[sectionIndex];
  const currentQuestion = currentSection?.questions?.[questionIndex];

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (!quiz || !currentSection || !currentQuestion) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          {!quiz
            ? 'Quiz not found'
            : 'Please select a question from the sidebar'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      {/* Breadcrumb */}
      <CourseBreadcrumb
        items={[
          { label: quiz.title, href: `/quizzes/${quizId}` },
          { label: currentSection.title },
          { label: `Question ${questionIndex + 1}` },
        ]}
      />

      {/* Quiz Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Time Limit: {quiz.time_limit || 'No limit'}</span>
          <span className="mx-2">•</span>
          <Trophy className="h-4 w-4" />
          <span>Total Points: {quiz.total_points || 'N/A'}</span>
        </div>
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <p className="text-muted-foreground">{quiz.description}</p>
      </div>

      {/* Question Card */}
      <div className="border rounded-lg p-6 space-y-6 bg-card">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Question {questionIndex + 1} of{' '}
                {currentSection.questions.length}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm font-medium text-primary">
                {currentQuestion.points} points
              </span>
            </div>
            <h2 className="text-xl font-semibold">
              {currentQuestion.question}
            </h2>
          </div>
        </div>

        {/* Question Type Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {currentQuestion.type}
        </div>

        {/* Answer Options (Mock) */}
        <div className="space-y-3">
          {['Option A', 'Option B', 'Option C', 'Option D'].map(
            (option, idx) => (
              <button
                key={idx}
                className="w-full text-left p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-accent transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  <span>{option}</span>
                </div>
              </button>
            )
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            disabled={sectionIndex === 0 && questionIndex === 0}
          >
            Previous Question
          </Button>
          <Button>Next Question</Button>
        </div>
      </div>

      {/* Quiz Metadata */}
      <div className="border-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <p className="font-medium capitalize">{quiz.difficulty || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Subject</p>
          <p className="font-medium">{quiz.subject || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Passing Score</p>
          <p className="font-medium">{quiz.passing_score || 'N/A'}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Attempts</p>
          <p className="font-medium">{quiz.attempts_allowed || 'Unlimited'}</p>
        </div>
      </div>
    </div>
  );
}
