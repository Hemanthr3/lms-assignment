import { SidebarData } from '@/components/content-sidebar';
import { ContentSidebarTrigger } from '@/components/content-sidebar-trigger';
import { ContentSidebarWrapper } from '@/components/content-sidebar-wrapper';
import { ContentSidebarProvider } from '@/contexts/content-sidebar-context';

// Example: Quiz with multiple sections
const getQuizData = async (quizId: string): Promise<SidebarData> => {
  // In a real app: await fetch(`/api/quizzes/${quizId}`)
  return {
    title: 'Machine Learning Quiz - Week 2',
    activityType: 'quiz',
    sidebarLabel: 'Quiz Sections',
    sections: [
      {
        id: 'section-1',
        title: 'Multiple Choice',
        type: 'section',
        items: [
          {
            id: 'q1',
            type: 'quiz',
            title: 'Question 1: Linear Regression',
            points: 5,
            completed: true,
          },
          {
            id: 'q2',
            type: 'quiz',
            title: 'Question 2: Gradient Descent',
            points: 5,
            completed: true,
          },
          {
            id: 'q3',
            type: 'quiz',
            title: 'Question 3: Cost Function',
            points: 5,
            completed: false,
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Short Answer',
        type: 'section',
        items: [
          {
            id: 'q4',
            type: 'quiz',
            title: 'Question 4: Explain Overfitting',
            points: 10,
            completed: false,
          },
          {
            id: 'q5',
            type: 'quiz',
            title: 'Question 5: Apply ML Algorithm',
            points: 15,
            completed: false,
          },
        ],
      },
    ],
  };
};

export default async function QuizDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const sidebarData = await getQuizData(params.id);
  const baseUrl = `/dashboard/quizzes/${params.id}`;

  return (
    <ContentSidebarProvider>
      <div className="flex h-full w-full overflow-hidden relative">
        <ContentSidebarWrapper data={sidebarData} baseUrl={baseUrl} />

        {/* Main Content */}
        <div className="flex-1 w-full relative">
          <ContentSidebarTrigger />
          <main className="flex flex-col h-full w-full overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ContentSidebarProvider>
  );
}
