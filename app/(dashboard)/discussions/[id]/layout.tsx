import { ContentSidebarTrigger } from '@/components/content-sidebar-trigger';
import { DiscussionContentSidebar } from '@/components/discussion-content-sidebar';
import { ContentSidebarProvider } from '@/contexts/content-sidebar-context';

export default async function DiscussionDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // Extract the ID from params (server component)
  const { id } = await params;
  const discussionId = parseInt(id);

  return (
    <ContentSidebarProvider>
      <div className="flex h-full w-full overflow-hidden relative">
        {/* Sidebar - fetches its own data */}
        <DiscussionContentSidebar discussionId={discussionId} />

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
