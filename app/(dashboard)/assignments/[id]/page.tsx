'use client';

import { CourseBreadcrumb } from '@/components/course/course-breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAssignment } from '@/hooks/use-lms-api';
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Trophy,
  Upload,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export default function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const assignmentId = parseInt(id);
  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('item');

  // Fetch assignment data using React Query
  const { data: assignment, isLoading } = useAssignment(assignmentId);

  // Parse selected item from URL (format: "sectionIndex-details" e.g., "1-details")
  const [sectionIndex] = selectedItemId
    ? selectedItemId.split('-').map((n) => parseInt(n) - 1)
    : [0];

  // Get current section
  const currentSection = assignment?.sections?.[sectionIndex];

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

  if (!assignment) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Assignment not found</p>
      </div>
    );
  }

  const showInstructions = !selectedItemId || selectedItemId === 'instructions';
  const showSubmission = selectedItemId === 'submission';
  const showRubric = selectedItemId === 'rubric';

  const dueDate = assignment.due_date ? new Date(assignment.due_date) : null;
  const isOverdue = dueDate && dueDate < new Date();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      {/* Breadcrumb */}
      <CourseBreadcrumb
        items={[
          { label: assignment.title, href: `/assignments/${assignmentId}` },
          {
            label: showInstructions
              ? 'Instructions'
              : showSubmission
              ? 'Submit Work'
              : 'Grading Rubric',
          },
        ]}
      />

      {/* Assignment Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground mt-2">
              {assignment.description}
            </p>
          </div>
          {assignment.status === 'SUBMITTED' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">Submitted</span>
            </div>
          )}
        </div>

        {/* Assignment Stats */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>{assignment.total_points || 100} points</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              Due:{' '}
              {dueDate ? (
                <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                  {dueDate.toLocaleDateString()}
                </span>
              ) : (
                'No deadline'
              )}
            </span>
          </div>
          {assignment.time_limit && (
            <>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Time limit: {assignment.time_limit}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {showInstructions && (
        <>
          {/* Instructions */}
          <div className="border rounded-lg p-6 space-y-4 bg-card">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Assignment Instructions
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                This is a placeholder for assignment instructions. In a real
                application, this would contain detailed instructions from the
                database.
              </p>
              <h3>Requirements:</h3>
              <ul>
                <li>Complete all parts of the assignment</li>
                <li>Submit before the deadline</li>
                <li>Follow the formatting guidelines</li>
                <li>Include all required files</li>
              </ul>
              <h3>Deliverables:</h3>
              <ul>
                <li>Written report (PDF format)</li>
                <li>Source code (if applicable)</li>
                <li>Supporting documentation</li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Submit Assignment
            </Button>
            <Button size="lg" variant="outline">
              View Rubric
            </Button>
          </div>
        </>
      )}

      {showSubmission && (
        <>
          {/* Submission Area */}
          <div className="border rounded-lg p-6 space-y-4 bg-card">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Submit Your Work
            </h2>

            {/* File Upload Area */}
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 hover:border-primary transition-colors cursor-pointer">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">
                  PDF, DOC, DOCX, ZIP (max 50MB)
                </p>
              </div>
            </div>

            {/* Submission Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Submission Notes (Optional)
              </label>
              <textarea
                placeholder="Add any notes or comments about your submission..."
                className="w-full min-h-[100px] p-3 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button size="lg" className="w-full">
              Submit Assignment
            </Button>
          </div>

          {/* Previous Submissions */}
          <div className="border rounded-lg p-6 space-y-4 bg-card">
            <h3 className="font-semibold">Previous Submissions</h3>
            <p className="text-sm text-muted-foreground">
              No previous submissions
            </p>
          </div>
        </>
      )}

      {showRubric && (
        <>
          {/* Grading Rubric */}
          <div className="border rounded-lg p-6 space-y-4 bg-card">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Grading Rubric
            </h2>

            <div className="space-y-4">
              {/* Rubric Items (Mock) */}
              {[
                {
                  criteria: 'Content Quality',
                  points: 40,
                  description: 'Depth and accuracy of content',
                },
                {
                  criteria: 'Organization',
                  points: 20,
                  description: 'Structure and flow of the assignment',
                },
                {
                  criteria: 'Research',
                  points: 20,
                  description: 'Quality and relevance of sources',
                },
                {
                  criteria: 'Writing Quality',
                  points: 20,
                  description: 'Grammar, spelling, and clarity',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 space-y-2 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{item.criteria}</h4>
                    <span className="text-sm font-medium text-primary">
                      {item.points} points
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex items-center justify-between">
              <span className="font-semibold">Total Points</span>
              <span className="text-lg font-bold text-primary">
                {assignment.total_points || 100}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Assignment Metadata */}
      <div className="border-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Subject</p>
          <p className="font-medium">{assignment.subject || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <p className="font-medium capitalize">
            {assignment.difficulty || 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium capitalize">
            {assignment.status || 'Not Started'}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Submission Type</p>
          <p className="font-medium">
            {assignment.submission_type || 'File Upload'}
          </p>
        </div>
      </div>
    </div>
  );
}
