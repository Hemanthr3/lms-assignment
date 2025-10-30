import type { ActivityType } from '@/config/activities.config';

/**
 * Get the detail page route for a given activity type and reference ID
 * @param type - The activity type (COURSE, QUIZ, ASSIGNMENT, DISCUSSION)
 * @param refId - The reference ID of the actual content
 * @returns The route path to navigate to
 */
export function getActivityDetailRoute(
  type: ActivityType,
  refId: number
): string {
  const routeMap: Record<ActivityType, string> = {
    COURSE: `/courses/${refId}`,
    QUIZ: `/quizzes/${refId}`,
    ASSIGNMENT: `/assignments/${refId}`,
    DISCUSSION: `/discussions/${refId}`,
  };

  return routeMap[type];
}

/**
 * Navigate to an activity's detail page
 * @param router - Next.js router instance
 * @param type - The activity type
 * @param refId - The reference ID
 */
export function navigateToActivityDetail(
  router: { push: (url: string) => void },
  type: ActivityType,
  refId: number | null
): void {
  if (!refId) return;

  const route = getActivityDetailRoute(type, refId);
  router.push(route);
}
