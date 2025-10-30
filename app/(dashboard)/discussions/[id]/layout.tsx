import { SidebarData } from '@/components/content-sidebar';
import { ContentSidebarTrigger } from '@/components/content-sidebar-trigger';
import { ContentSidebarWrapper } from '@/components/content-sidebar-wrapper';
import { ContentSidebarProvider } from '@/contexts/content-sidebar-context';

// Example: Discussion with topics and threads
const getDiscussionData = async (
  discussionId: string
): Promise<SidebarData> => {
  // In a real app: await fetch(`/api/discussions/${discussionId}`)
  return {
    title: 'ML Fundamentals Discussion',
    activityType: 'discussion',
    sidebarLabel: 'Discussion Topics',
    sections: [
      {
        id: 'general',
        title: 'General Topics',
        type: 'section',
        items: [
          {
            id: 'intro',
            type: 'discussion',
            title: 'Introduce Yourself',
            completed: true,
          },
          {
            id: 'questions',
            type: 'discussion',
            title: 'Course Questions',
            completed: false,
          },
          {
            id: 'resources',
            type: 'discussion',
            title: 'Helpful Resources',
            completed: false,
          },
        ],
      },
      {
        id: 'week-1',
        title: 'Week 1 Discussions',
        type: 'week',
        items: [
          {
            id: 'w1-topic1',
            type: 'discussion',
            title: 'What is Machine Learning?',
            completed: true,
          },
          {
            id: 'w1-topic2',
            type: 'discussion',
            title: 'Types of ML Algorithms',
            completed: true,
          },
        ],
      },
      {
        id: 'week-2',
        title: 'Week 2 Discussions',
        type: 'week',
        items: [
          {
            id: 'w2-topic1',
            type: 'discussion',
            title: 'Linear Regression Deep Dive',
            completed: false,
          },
          {
            id: 'w2-topic2',
            type: 'discussion',
            title: 'Gradient Descent Explained',
            completed: false,
          },
          {
            id: 'w2-quiz',
            type: 'quiz',
            title: 'Week 2 Quiz Discussion',
            points: 10,
            completed: false,
          },
        ],
      },
    ],
  };
};

export default async function DiscussionDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const sidebarData = await getDiscussionData(params.id);
  const baseUrl = `/dashboard/discussions/${params.id}`;

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
