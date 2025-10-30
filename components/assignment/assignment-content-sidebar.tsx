'use client';

import { ContentSidebarWrapper } from '@/components/layout/content-sidebar-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { useAssignment } from '@/hooks/use-lms-api';

interface AssignmentContentSidebarProps {
  assignmentId: number;
}

export function AssignmentContentSidebar({
  assignmentId,
}: AssignmentContentSidebarProps) {
  // Fetch assignment data using React Query
  const { data: assignment, isLoading } = useAssignment(assignmentId);

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

  if (!assignment) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4 h-full">
        <p className="text-sm text-muted-foreground">Assignment not found</p>
      </div>
    );
  }

  // Transform assignment data to sidebar format
  // Assignment has: title, sections (array)
  // Each section has: id, title, description, file_requirements
  const sidebarData = {
    title: assignment.title,
    activityType: 'assignment' as const,
    sidebarLabel: 'Assignment Sections',
    sections: (assignment.sections || []).map(
      (section: any, sectionIndex: number) => ({
        id: `section-${sectionIndex}`,
        title: section.title || `Section ${sectionIndex + 1}`,
        type: 'chapter' as const,
        items: [
          {
            id: `${sectionIndex + 1}-details`,
            type: 'assignment' as const,
            title: 'Details',
            completed: false,
          },
        ],
      })
    ),
  };

  return (
    <ContentSidebarWrapper
      data={sidebarData}
      baseUrl={`/assignments/${assignmentId}`}
    />
  );
}
