import { ContentSidebarTrigger } from '@/components/layout/content-sidebar-trigger';
import { QuizContentSidebar } from '@/components/quiz/quiz-content-sidebar';
import { ContentSidebarProvider } from '@/contexts/content-sidebar-context';

export default async function QuizDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // Extract the ID from params (server component)
  const { id } = await params;
  const quizId = parseInt(id);

  return (
    <ContentSidebarProvider>
      <div className="flex h-full w-full overflow-hidden relative">
        {/* Sidebar - fetches its own data */}
        <QuizContentSidebar quizId={quizId} />

        {/* Main Content */}
        <div className="flex-1 w-full relative">
          <ContentSidebarTrigger />
          <main className="flex flex-col h-full w-full overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </ContentSidebarProvider>
  );
}
