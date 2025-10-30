import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ActivityStatus,
  ActivityType,
  getActivityTypeConfig,
  getTypeColorClass,
} from '@/config/activities.config';
import { Clock, Heart, Star, Users } from 'lucide-react';
import Image from 'next/image';

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

  const actionButton = getActionButton();
  const typeConfig = getActivityTypeConfig(type);
  const TypeIcon = typeConfig.icon;

  return (
    <div className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden flex-shrink-0">
        {thumbnail_url ? (
          <Image
            src={thumbnail_url}
            alt={title}
            fill
            className="object-cover group-hover:scale-[1.05] transition-transform duration-200"
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
            className={`text-xs font-medium px-2 py-1 rounded ${getTypeColorClass(
              type
            )}`}
          >
            {typeConfig.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex flex-col flex-1">
        {/* Type and Subject Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold py-1 rounded ${getTypeColorClass(
              type
            )}`}
          >
            <TypeIcon className="h-3 w-3" />
            {typeConfig.label}
          </span>
          {subject && (
            <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {subject}
            </span>
          )}
        </div>

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
            <div
              className="flex items-center gap-1 font-medium"
              style={{ color: '#d97706' }}
            >
              <Star
                className="h-3 w-3"
                style={{ fill: '#fbbf24', color: '#fbbf24' }}
              />
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
                  value={progress.percentComplete}
                  isCompleted={
                    status === 'COMPLETED' ||
                    progress.percentComplete === 100 ||
                    (type === 'QUIZ' && progress.passed)
                  }
                  className="h-2 flex-1"
                />
                <span
                  className={`text-sm font-semibold min-w-[45px] text-right ml-2 ${
                    status === 'COMPLETED' ||
                    progress.percentComplete === 100 ||
                    (type === 'QUIZ' && progress.passed)
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}
                >
                  {progress.percentComplete}%
                </span>
              </div>
              {type === 'COURSE' && progress.totalChapters && (
                <p
                  className={`text-xs font-medium ${
                    progress.completedChapters === progress.totalChapters
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-muted-foreground'
                  }`}
                >
                  {progress.completedChapters === progress.totalChapters &&
                    '✓ '}
                  {progress.completedChapters}/{progress.totalChapters} chapters
                  completed
                </p>
              )}
              {type === 'QUIZ' && progress.score !== undefined && (
                <p
                  className={`text-xs font-medium ${
                    progress.passed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-muted-foreground'
                  }`}
                >
                  Score: {progress.score}%{progress.passed && ' ✓ Passed'}
                </p>
              )}
            </div>
          )}

        {/* Action Button */}
        <Button
          variant={actionButton.variant}
          className="w-full mt-auto"
          onClick={onAction}
        >
          {actionButton.text}
        </Button>
      </div>
    </div>
  );
}
