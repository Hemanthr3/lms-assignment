'use client';

import { CourseBreadcrumb } from '@/components/course/course-breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useDiscussion } from '@/hooks/use-lms-api';
import { MessageSquare, Send, ThumbsUp, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export default function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const discussionId = parseInt(id);
  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('item');

  // Fetch discussion data using React Query
  const { data: discussion, isLoading } = useDiscussion(discussionId);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Discussion not found</p>
      </div>
    );
  }

  const showOverview = !selectedItemId || selectedItemId === 'overview';

  // Parse post index from URL (format: "post-1", "post-2", etc.)
  const postIndex = selectedItemId?.startsWith('post-')
    ? parseInt(selectedItemId.split('-')[1]) - 1
    : null;

  const currentPost =
    postIndex !== null ? discussion?.posts?.[postIndex] : null;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      {/* Breadcrumb */}
      <CourseBreadcrumb
        items={[
          { label: discussion.topic, href: `/discussions/${discussionId}` },
          {
            label: showOverview
              ? 'Overview'
              : currentPost
              ? `Post by ${currentPost.author?.name || 'Unknown'}`
              : 'Discussion',
          },
        ]}
      />

      {/* Discussion Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{discussion.topic}</h1>
        <p className="text-muted-foreground">{discussion.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{discussion.posts?.length || 0} posts</span>
          </div>
          <span>•</span>
          <span>
            Created: {new Date(discussion.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {showOverview && (
        <>
          {/* Discussion Guidelines */}
          <div className="border rounded-lg p-6 space-y-4 bg-card">
            <h2 className="text-xl font-semibold">Discussion Guidelines</h2>
            <div className="prose dark:prose-invert max-w-none">
              <ul>
                <li>Be respectful and constructive in your responses</li>
                <li>
                  Stay on topic and contribute meaningfully to the discussion
                </li>
                <li>Support your arguments with evidence or examples</li>
                <li>Ask questions if you need clarification</li>
              </ul>
            </div>
          </div>

          {/* Start Discussion Button */}
          <Button size="lg" className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Participating
          </Button>
        </>
      )}

      {currentPost && (
        <>
          {/* Single Post View */}
          <div className="border rounded-lg p-6 space-y-4 bg-card">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">
                    {currentPost.author?.name || 'Unknown'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {currentPost.timestamp
                      ? new Date(currentPost.timestamp).toLocaleDateString()
                      : 'Recently'}
                  </span>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>{currentPost.content}</p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reply Input */}
          <div className="border rounded-lg p-4 space-y-3 bg-card">
            <h3 className="font-semibold">Reply to this post</h3>
            <textarea
              placeholder="Share your thoughts..."
              className="w-full min-h-[100px] p-3 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end">
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Post Reply
              </Button>
            </div>
          </div>
        </>
      )}

      {!showOverview && !currentPost && (
        <>
          {/* New Post Input */}
          <div className="border rounded-lg p-4 space-y-3 bg-card">
            <textarea
              placeholder="Share your thoughts..."
              className="w-full min-h-[100px] p-3 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end">
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Post Reply
              </Button>
            </div>
          </div>

          {/* Discussion Posts (Mock) */}
          <div className="space-y-4">
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className="border rounded-lg p-6 space-y-4 bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Student {post}</span>
                      <span className="text-sm text-muted-foreground">
                        2 hours ago
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      This is a mock discussion post. In a real application,
                      this would contain the actual post content from the
                      database.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Discussion Metadata */}
      <div className="border-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Subject</p>
          <p className="font-medium">{discussion.subject || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium capitalize">
            {discussion.status || 'Active'}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Due Date</p>
          <p className="font-medium">
            {discussion.due_date
              ? new Date(discussion.due_date).toLocaleDateString()
              : 'No deadline'}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Points</p>
          <p className="font-medium">{discussion.points || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
