import { SidebarData } from '@/components/content-sidebar';
import { ContentSidebarTrigger } from '@/components/content-sidebar-trigger';
import { ContentSidebarWrapper } from '@/components/content-sidebar-wrapper';
import { ContentSidebarProvider } from '@/contexts/content-sidebar-context';

// This would typically come from an API/database
// For now, using mock data with different content types
const getCourseData = async (courseId: string): Promise<SidebarData> => {
  // In a real app: await fetch(`/api/courses/${courseId}`)
  return {
    title: 'Machine Learning Course',
    activityType: 'course',
    sidebarLabel: 'Course Content',
    sections: [
      {
        id: '1',
        title: 'Introduction',
        type: 'module',
        items: [
          {
            id: '1-1',
            type: 'lesson',
            title: 'Course Overview',
            duration: '10 min',
            completed: true,
          },
          {
            id: '1-2',
            type: 'lesson',
            title: 'Setup Environment',
            duration: '15 min',
            completed: true,
          },
          {
            id: '1-3',
            type: 'quiz',
            title: 'Prerequisites Quiz',
            points: 10,
            completed: true,
          },
        ],
      },
      {
        id: '2',
        title: 'Linear Regression',
        type: 'module',
        items: [
          {
            id: '2-1',
            type: 'lesson',
            title: 'Understanding Linear Models',
            duration: '20 min',
            completed: true,
          },
          {
            id: '2-2',
            type: 'lesson',
            title: 'Gradient Descent',
            duration: '25 min',
            completed: false,
          },
          {
            id: '2-3',
            type: 'discussion',
            title: 'Linear Regression Discussion',
            completed: false,
          },
          {
            id: '2-4',
            type: 'assignment',
            title: 'Practice Assignment',
            dueDate: 'Nov 5, 2025',
            points: 100,
            completed: false,
          },
        ],
      },
      {
        id: '3',
        title: 'Neural Networks',
        type: 'module',
        items: [
          {
            id: '3-1',
            type: 'lesson',
            title: 'Introduction to NNs',
            duration: '22 min',
            completed: false,
            locked: true, // Example of locked content
          },
          {
            id: '3-2',
            type: 'lesson',
            title: 'Activation Functions',
            duration: '20 min',
            completed: false,
            locked: true,
          },
          {
            id: '3-3',
            type: 'quiz',
            title: 'Neural Networks Quiz',
            points: 50,
            completed: false,
            locked: true,
          },
        ],
      },
    ],
  };
};

export default async function CourseDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sidebarData = await getCourseData(id);
  const baseUrl = `/dashboard/courses/${id}`;

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
