'use client';

import { ContentSidebarWrapper } from '@/components/content-sidebar-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { useDiscussion } from '@/hooks/use-lms-api';

interface DiscussionContentSidebarProps {
  discussionId: number;
}

export function DiscussionContentSidebar({
  discussionId,
}: DiscussionContentSidebarProps) {
  // Fetch discussion data using React Query
  const { data: discussion, isLoading } = useDiscussion(discussionId);

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

  if (!discussion) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4 h-full">
        <p className="text-sm text-muted-foreground">Discussion not found</p>
      </div>
    );
  }

  // Transform discussion data to sidebar format
  // Discussion has: topic (title), posts (array)
  // Each post has: id, author, content, timestamp
  const posts = discussion.posts || [];

  const sidebarData = {
    title: discussion.topic,
    activityType: 'discussion' as const,
    sidebarLabel: 'Discussion',
    sections: [
      {
        id: 'main',
        title: 'Discussion',
        type: 'chapter' as const,
        items: [
          {
            id: 'overview',
            type: 'discussion' as const,
            title: 'Overview',
            completed: false,
          },
          ...posts.map((post: any, index: number) => ({
            id: `post-${index + 1}`,
            type: 'discussion' as const,
            title: `Post by ${post.author?.name || 'Unknown'}`,
            completed: false,
          })),
        ],
      },
    ],
  };

  return (
    <ContentSidebarWrapper
      data={sidebarData}
      baseUrl={`/discussions/${discussionId}`}
    />
  );
}
