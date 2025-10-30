import db from '@/config/db';
import {
  assignments,
  type Assignment,
  type NewAssignment,
} from '@/config/schema';
import { eq } from 'drizzle-orm';

// Create
export async function createAssignment(data: NewAssignment) {
  const [assignment] = await db.insert(assignments).values(data).returning();
  return assignment;
}

// Read All
export async function getAllAssignments(): Promise<Assignment[]> {
  return await db.select().from(assignments);
}

// Read by ID
export async function getAssignmentById(
  id: number
): Promise<Assignment | undefined> {
  const [assignment] = await db
    .select()
    .from(assignments)
    .where(eq(assignments.id, id));
  return assignment;
}

// Read by Subject
export async function getAssignmentsBySubject(
  subject: string
): Promise<Assignment[]> {
  return await db
    .select()
    .from(assignments)
    .where(eq(assignments.subject, subject));
}

// Update
export async function updateAssignment(
  id: number,
  data: Partial<NewAssignment>
) {
  const [assignment] = await db
    .update(assignments)
    .set(data)
    .where(eq(assignments.id, id))
    .returning();
  return assignment;
}

// Delete
export async function deleteAssignment(id: number) {
  await db.delete(assignments).where(eq(assignments.id, id));
}

// Submit Assignment
export async function submitAssignment(id: number, submissionLink: string) {
  return await updateAssignment(id, {
    submission_link: submissionLink,
    submitted: true,
  });
}

// Grade Assignment
export async function gradeAssignment(
  id: number,
  grade: string,
  feedback?: string
) {
  return await updateAssignment(id, {
    grade,
    feedback,
    graded: true,
  });
}

// Check if Overdue
export async function isAssignmentOverdue(id: number): Promise<boolean> {
  const assignment = await getAssignmentById(id);
  if (!assignment || !assignment.submission_deadline) return false;

  return new Date() > new Date(assignment.submission_deadline);
}
