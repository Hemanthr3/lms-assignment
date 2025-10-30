'use client';

import { ContentSidebarWrapper } from '@/components/content-sidebar-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { useCourse } from '@/hooks/use-lms-api';

interface CourseContentSidebarProps {
  courseId: number;
}

export function CourseContentSidebar({ courseId }: CourseContentSidebarProps) {
  // Fetch course data using React Query
  const { data: course, isLoading } = useCourse(courseId);
  console.log('course', course);

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

  if (!course) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4 h-full">
        <p className="text-sm text-muted-foreground">Course not found</p>
      </div>
    );
  }

  // Transform course data to sidebar format
  // Course has: title, lessons (array)
  // Each lesson has: chapter (name), lessons (array of actual lessons)
  // Each actual lesson has: title, duration, completed
  const sidebarData = {
    title: course.title,
    activityType: 'course' as const,
    sidebarLabel: 'Course Content',
    sections: (course.lessons || []).map(
      (lesson: any, lessonIndex: number) => ({
        id: `${lessonIndex + 1}`,
        title: lesson.title, // This is the chapter name
        type: 'chapter' as const,
        items: (lesson.chapters || []).map(
          (chapter: any, chapterIndex: number) => ({
            id: `${lessonIndex + 1}-${chapterIndex + 1}`,
            type: 'lesson' as const,
            title: chapter.title,
            duration: chapter.duration,
            completed: chapter.completed || false,
          })
        ),
      })
    ),
  };

  return (
    <ContentSidebarWrapper
      data={sidebarData}
      baseUrl={`/courses/${courseId}`}
    />
  );
}
