import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Clock, Heart, Star, Users } from 'lucide-react';

type ActivityType = 'COURSE' | 'QUIZ' | 'ASSIGNMENT' | 'DISCUSSION';
type ActivityStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'UPCOMING';

interface ActivityProgress {
  totalChapters?: number;
  completedChapters?: number;
  percentComplete?: number;
  totalQuestions?: number;
  score?: number;
  passed?: boolean;
  status?: string;
  daysUntilDue?: number | null;
}

interface ActivityCardProps {
  id: number;
  type: ActivityType;
  title: string;
  description?: string;
  subject?: string;
  thumbnail_url?: string;
  instructor_name?: string;
  duration?: string;
  status: ActivityStatus;
  rating?: number;
  students_enrolled?: number;
  is_favourite?: boolean;
  progress?: ActivityProgress;
  onAction?: () => void;
  onToggleFavourite?: () => void;
}

export function ActivityCard({
  type,
  title,
  description,
  subject,
  thumbnail_url,
  instructor_name,
  duration,
  status,
  rating,
  students_enrolled,
  is_favourite,
  progress,
  onAction,
  onToggleFavourite,
}: ActivityCardProps) {
  // Determine action button text and variant based on status
  const getActionButton = () => {
    switch (status) {
      case 'NOT_STARTED':
        return { text: 'Start', variant: 'default' as const };
      case 'IN_PROGRESS':
        return { text: 'Continue', variant: 'default' as const };
      case 'COMPLETED':
        return { text: 'Review', variant: 'outline' as const };
      case 'UPCOMING':
        return { text: 'View Details', variant: 'outline' as const };
      default:
        return { text: 'View', variant: 'outline' as const };
    }
  };

  // Get type-specific details
  const getTypeDetails = () => {
    switch (type) {
      case 'COURSE':
        return {
          label: 'Course',
          icon: BookOpen,
          color: 'text-blue-600 bg-blue-50 dark:bg-blue-950',
          details: progress
            ? `${progress.completedChapters || 0}/${
                progress.totalChapters || 0
              } chapters`
            : null,
        };
      case 'QUIZ':
        return {
          label: 'Quiz',
          icon: BookOpen,
          color: 'text-purple-600 bg-purple-50 dark:bg-purple-950',
          details: progress
            ? `${progress.totalQuestions || 0} questions • Score: ${
                progress.score || 0
              }%`
            : null,
        };
      case 'ASSIGNMENT':
        return {
          label: 'Assignment',
          icon: Calendar,
          color: 'text-orange-600 bg-orange-50 dark:bg-orange-950',
          details: progress?.daysUntilDue
            ? `Due in ${progress.daysUntilDue} days`
            : null,
        };
      case 'DISCUSSION':
        return {
          label: 'Discussion',
          icon: Users,
          color: 'text-green-600 bg-green-50 dark:bg-green-950',
          details: null,
        };
    }
  };

  const actionButton = getActionButton();
  const typeDetails = getTypeDetails();
  const TypeIcon = typeDetails.icon;

  return (
    <div className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {thumbnail_url ? (
          <img
            src={thumbnail_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <TypeIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        {/* Favorite Badge */}
        {is_favourite && (
          <button
            onClick={onToggleFavourite}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black transition-colors"
          >
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          </button>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${typeDetails.color}`}
          >
            {typeDetails.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Subject Tag */}
        {subject && (
          <span className="inline-block text-xs font-medium text-primary">
            {subject}
          </span>
        )}

        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {/* Instructor */}
        {instructor_name && (
          <p className="text-sm text-muted-foreground">👨‍🏫 {instructor_name}</p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {duration}
            </div>
          )}
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              {rating}/5
            </div>
          )}
          {students_enrolled && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {students_enrolled}
            </div>
          )}
        </div>

        {/* Progress Bar for Courses and Quizzes (only if started) */}
        {progress &&
          progress.percentComplete !== undefined &&
          status !== 'NOT_STARTED' &&
          progress.percentComplete > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Progress
                  value={50}
                  className="h-2 flex-1"
                />
                <span className="text-sm font-semibold text-orange-600 min-w-[45px] text-right">
                  {progress.percentComplete}%
                </span>
              </div>
              {type === 'COURSE' && progress.totalChapters && (
                <p className="text-xs text-muted-foreground">
                  {progress.completedChapters}/{progress.totalChapters} chapters
                  completed
                </p>
              )}
              {type === 'QUIZ' && progress.score !== undefined && (
                <p className="text-xs text-muted-foreground">
                  Score: {progress.score}%{progress.passed && ' ✓ Passed'}
                </p>
              )}
            </div>
          )}

        {/* Type-specific Details (for Assignment/Discussion) */}
        {typeDetails.details && !progress?.percentComplete && (
          <p className="text-xs text-muted-foreground font-medium">
            {typeDetails.details}
          </p>
        )}

        {/* Action Button */}
        <Button
          variant={actionButton.variant}
          className="w-full"
          onClick={onAction}
        >
          {actionButton.text}
        </Button>
      </div>
    </div>
  );
}
