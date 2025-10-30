import db from '@/config/db';
import { activities, type Activity, type NewActivity } from '@/config/schema';
import { eq } from 'drizzle-orm';

// Create
export async function createActivity(data: NewActivity) {
  const [activity] = await db.insert(activities).values(data).returning();
  return activity;
}

// Read All
export async function getAllActivities(): Promise<Activity[]> {
  return await db.select().from(activities);
}

// Read by ID
export async function getActivityById(
  id: number
): Promise<Activity | undefined> {
  const [activity] = await db
    .select()
    .from(activities)
    .where(eq(activities.id, id));
  return activity;
}

// Read by Type
export async function getActivitiesByType(
  type: 'COURSE' | 'QUIZ' | 'ASSIGNMENT' | 'DISCUSSION'
): Promise<Activity[]> {
  return await db.select().from(activities).where(eq(activities.type, type));
}

// Read by Subject
export async function getActivitiesBySubject(
  subject: string
): Promise<Activity[]> {
  return await db
    .select()
    .from(activities)
    .where(eq(activities.subject, subject));
}

// Update
export async function updateActivity(id: number, data: Partial<NewActivity>) {
  const [activity] = await db
    .update(activities)
    .set(data)
    .where(eq(activities.id, id))
    .returning();
  return activity;
}

// Delete
export async function deleteActivity(id: number) {
  await db.delete(activities).where(eq(activities.id, id));
}

// Toggle Favourite
export async function toggleFavourite(id: number) {
  const activity = await getActivityById(id);
  if (!activity) throw new Error('Activity not found');

  return await updateActivity(id, { is_favourite: !activity.is_favourite });
}

// Update Status
export async function updateActivityStatus(
  id: number,
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'UPCOMING'
) {
  return await updateActivity(id, { status });
}
