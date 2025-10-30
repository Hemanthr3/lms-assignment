import { SidebarData } from '@/components/content-sidebar';
import { ContentSidebarTrigger } from '@/components/content-sidebar-trigger';
import { ContentSidebarWrapper } from '@/components/content-sidebar-wrapper';
import { ContentSidebarProvider } from '@/contexts/content-sidebar-context';

// Example: Assignment with multiple parts and resources
const getAssignmentData = async (
  assignmentId: string
): Promise<SidebarData> => {
  // In a real app: await fetch(`/api/assignments/${assignmentId}`)
  return {
    title: 'Linear Regression Assignment',
    activityType: 'assignment',
    sidebarLabel: 'Assignment Parts',
    sections: [
      {
        id: 'instructions',
        title: 'Getting Started',
        type: 'section',
        items: [
          {
            id: 'inst-1',
            type: 'lesson',
            title: 'Assignment Overview',
            duration: '5 min',
            completed: true,
          },
          {
            id: 'inst-2',
            type: 'lesson',
            title: 'Setup Instructions',
            duration: '10 min',
            completed: true,
          },
        ],
      },
      {
        id: 'tasks',
        title: 'Tasks',
        type: 'part',
        items: [
          {
            id: 'task-1',
            type: 'assignment',
            title: 'Part 1: Data Preprocessing',
            points: 20,
            completed: true,
          },
          {
            id: 'task-2',
            type: 'assignment',
            title: 'Part 2: Model Training',
            points: 30,
            completed: false,
          },
          {
            id: 'task-3',
            type: 'assignment',
            title: 'Part 3: Evaluation',
            points: 25,
            completed: false,
            locked: true,
          },
        ],
      },
      {
        id: 'submission',
        title: 'Submission',
        type: 'section',
        items: [
          {
            id: 'submit-1',
            type: 'assignment',
            title: 'Submit Your Work',
            points: 25,
            dueDate: 'Nov 5, 2025',
            completed: false,
            locked: true,
          },
          {
            id: 'peer-review',
            type: 'discussion',
            title: 'Peer Review',
            completed: false,
            locked: true,
          },
        ],
      },
    ],
  };
};

export default async function AssignmentDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const sidebarData = await getAssignmentData(params.id);
  const baseUrl = `/dashboard/assignments/${params.id}`;

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
