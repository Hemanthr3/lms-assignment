'use client';

import { useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

// Example: Fetching content based on query params
async function fetchContentItem(
  courseId: string,
  itemId: string,
  itemType: string
) {
  // In a real app: await fetch(`/api/courses/${courseId}/items/${itemId}?type=${itemType}`)
  // Mock data for demonstration
  await new Promise((resolve) => setTimeout(resolve, 0)); // Simulate network delay

  return {
    id: itemId,
    type: itemType,
    title: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)}: ${itemId}`,
    content: `This is the content for ${itemType} with ID ${itemId}`,
  };
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params); // Unwrap params Promise
  const searchParams = useSearchParams();
  const itemId = searchParams.get('item');
  const itemType = searchParams.get('type');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemId && itemType) {
      setLoading(true);
      fetchContentItem(courseId, itemId, itemType)
        .then(setContent)
        .finally(() => setLoading(false));
    } else {
      // No item selected, show course overview
      setContent(null);
    }
  }, [itemId, itemType, courseId]);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
          </div>
          <div className="aspect-video bg-muted rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!itemId || !itemType) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Introduction to Machine Learning
          </h1>
          <p className="text-muted-foreground">
            Welcome to the course! Select a lesson from the sidebar to get
            started.
          </p>
        </div>

        <div className="bg-muted/50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Course Overview</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              This course covers Machine Learning fundamentals including linear
              regression, neural networks, and advanced techniques.
            </p>
            <h3>What You'll Learn</h3>
            <ul>
              <li>Understand core ML concepts and algorithms</li>
              <li>Build and train machine learning models</li>
              <li>Apply ML to real-world problems</li>
              <li>Evaluate and optimize model performance</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {content?.type}
        </span>
        <h1 className="text-3xl font-bold">{content?.title}</h1>
        <p className="text-muted-foreground">Course ID: {courseId}</p>
      </div>

      {/* Different rendering based on content type */}
      {content?.type === 'lesson' && (
        <>
          {/* Video Player Area */}
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-lg">Video Player Area</p>
              <p className="text-xs text-muted-foreground">Item ID: {itemId}</p>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="prose dark:prose-invert max-w-none">
            <h2>Learning Objectives</h2>
            <ul>
              <li>Understand linear regression concepts</li>
              <li>Learn to train models with gradient descent</li>
              <li>Apply techniques to real-world datasets</li>
            </ul>
            <p>{content?.content}</p>
          </div>
        </>
      )}

      {content?.type === 'quiz' && (
        <div className="bg-muted/50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Quiz Interface</h2>
          <p className="text-muted-foreground">
            Quiz questions and submission interface would be rendered here.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium">Example Question:</p>
            <div className="bg-background rounded-lg p-4 space-y-2">
              <p className="text-sm">
                What is the purpose of gradient descent?
              </p>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="q1" />
                  <span>To minimize the cost function</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="q1" />
                  <span>To maximize accuracy</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {content?.type === 'assignment' && (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">Assignment Instructions</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>{content?.content}</p>
              <h3>Requirements:</h3>
              <ul>
                <li>Complete all parts of the assignment</li>
                <li>Submit before the deadline</li>
                <li>Follow the coding guidelines</li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Submission</h3>
            <p className="text-sm text-muted-foreground">
              Upload your completed assignment here.
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Upload File
            </button>
          </div>
        </div>
      )}

      {content?.type === 'discussion' && (
        <div className="bg-muted/50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Discussion Thread</h2>
          <p className="text-muted-foreground">
            Discussion forum interface would be rendered here.
          </p>
          <div className="space-y-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Post your thoughts:</p>
              <textarea
                className="w-full min-h-[100px] p-2 rounded border bg-background"
                placeholder="Share your insights..."
              />
              <button className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Post Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
