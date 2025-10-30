import type { LucideIcon } from 'lucide-react';
import { BookOpen, Calendar, MessageSquare } from 'lucide-react';

export type ActivityType = 'COURSE' | 'QUIZ' | 'ASSIGNMENT' | 'DISCUSSION';
export type ActivityStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING';

export interface ActivityTypeConfig {
  type: ActivityType;
  label: string;
  icon: LucideIcon;
  color: {
    text: string;
    bg: string;
    darkBg: string;
  };
}

export interface ActivityStatusConfig {
  status: ActivityStatus;
  label: string;
  color?: string;
}

// Activity Types Configuration
export const ACTIVITY_TYPES: Record<ActivityType, ActivityTypeConfig> = {
  COURSE: {
    type: 'COURSE',
    label: 'Course',
    icon: BookOpen,
    color: {
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      darkBg: 'dark:bg-blue-950',
    },
  },
  QUIZ: {
    type: 'QUIZ',
    label: 'Quiz',
    icon: BookOpen,
    color: {
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      darkBg: 'dark:bg-purple-950',
    },
  },
  ASSIGNMENT: {
    type: 'ASSIGNMENT',
    label: 'Assignment',
    icon: Calendar,
    color: {
      text: 'text-orange-600',
      bg: 'bg-orange-50',
      darkBg: 'dark:bg-orange-950',
    },
  },
  DISCUSSION: {
    type: 'DISCUSSION',
    label: 'Discussion',
    icon: MessageSquare,
    color: {
      text: 'text-green-600',
      bg: 'bg-green-50',
      darkBg: 'dark:bg-green-950',
    },
  },
};

// Activity Statuses Configuration
export const ACTIVITY_STATUSES: Record<ActivityStatus, ActivityStatusConfig> = {
  NOT_STARTED: {
    status: 'NOT_STARTED',
    label: 'Not Started',
  },
  IN_PROGRESS: {
    status: 'IN_PROGRESS',
    label: 'In Progress',
  },
  COMPLETED: {
    status: 'COMPLETED',
    label: 'Completed',
    color: 'text-green-600',
  },
  UPCOMING: {
    status: 'UPCOMING',
    label: 'Upcoming',
  },
};

// Helper to get all types as array
export const getAllActivityTypes = (): ActivityTypeConfig[] =>
  Object.values(ACTIVITY_TYPES);

// Helper to get all statuses as array
export const getAllActivityStatuses = (): ActivityStatusConfig[] =>
  Object.values(ACTIVITY_STATUSES);

// Helper to get type config
export const getActivityTypeConfig = (type: ActivityType): ActivityTypeConfig =>
  ACTIVITY_TYPES[type];

// Helper to get status config
export const getActivityStatusConfig = (
  status: ActivityStatus
): ActivityStatusConfig => ACTIVITY_STATUSES[status];

// Helper to get combined color class string
export const getTypeColorClass = (type: ActivityType): string => {
  const config = ACTIVITY_TYPES[type];
  return `${config.color.text} ${config.color.bg} ${config.color.darkBg}`;
};
