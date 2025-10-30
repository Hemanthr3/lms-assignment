'use client';

import { CourseBreadcrumb } from '@/components/course/course-breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCourse, useUpdateCourse } from '@/hooks/use-lms-api';
import { Check, Clock, PlayCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';
import { toast } from 'sonner';

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const courseId = parseInt(id);
  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('item');

  // Fetch course data using React Query (cached with sidebar)
  const { data: course, isLoading } = useCourse(courseId);
  const updateCourse = useUpdateCourse(courseId);

  // Parse selected item from URL (format: "lessonIndex-chapterIndex" e.g., "1-2")
  const [lessonIndex, chapterIndex] = selectedItemId
    ? selectedItemId.split('-').map((n) => parseInt(n) - 1)
    : [0, 0];

  // Get current lesson and chapter
  const currentLessonData = course?.lessons?.[lessonIndex];
  const currentChapter = currentLessonData?.chapters?.[chapterIndex];

  const handleToggleCompletion = async () => {
    if (!course || !currentChapter) return;

    const newCompletedStatus = !currentChapter.completed;

    try {
      const updatedLessons = course.lessons.map(
        (lesson: any, lesIdx: number) => {
          if (lesIdx === lessonIndex) {
            return {
              ...lesson,
              chapters: lesson.chapters.map((chapter: any, chapIdx: number) => {
                if (chapIdx === chapterIndex) {
                  return { ...chapter, completed: newCompletedStatus };
                }
                return chapter;
              }),
            };
          }
          return lesson;
        }
      );

      await updateCourse.mutateAsync({
        lessons: updatedLessons,
      });

      toast.success(
        newCompletedStatus
          ? `Marked "${currentChapter.title}" as complete!`
          : `Marked "${currentChapter.title}" as incomplete`
      );
    } catch (error) {
      toast.error('Failed to update lesson status');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (!course || !currentChapter || !currentLessonData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          {!course
            ? 'Course not found'
            : 'Please select a chapter from the sidebar'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      {/* Breadcrumb */}
      <CourseBreadcrumb
        items={[
          { label: course.title, href: `/courses/${courseId}` },
          { label: currentLessonData.title },
          { label: currentChapter.title },
        ]}
      />

      {/* Chapter Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{currentChapter.title}</h1>
          {currentChapter.duration && (
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {currentChapter.duration}
            </p>
          )}
        </div>
        <Button
          onClick={handleToggleCompletion}
          variant={currentChapter.completed ? 'outline' : 'default'}
          size="lg"
          className={`flex-shrink-0 ${
            currentChapter.completed
              ? 'border-green-500 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-950'
              : ''
          }`}
          disabled={updateCourse.isPending}
        >
          {currentChapter.completed ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </Button>
      </div>

      {/* Video Player Mock */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer hover:bg-black/90 transition-colors">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-20 w-20 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
        </div>
        <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded">
          Mock Video Player
        </div>
      </div>

      {/* Chapter Description */}
      <div className="prose dark:prose-invert max-w-none">
        <h3>About this chapter</h3>
        <p>
          This is a placeholder description for{' '}
          <strong>{currentChapter.title}</strong>. In a real application, this
          would contain detailed information about what the learner will learn
          in this chapter, including:
        </p>
        <ul>
          <li>Learning objectives</li>
          <li>Key concepts covered</li>
          <li>Prerequisites</li>
          <li>Additional resources</li>
        </ul>
      </div>

      {/* Course Metadata */}
      <div className="border-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Instructor</p>
          <p className="font-medium">{course.instructor_name || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Level</p>
          <p className="font-medium capitalize">{course.level || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Subject</p>
          <p className="font-medium">{course.subject || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Rating</p>
          <p className="font-medium">
            {course.rating ? `${course.rating} ⭐` : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
