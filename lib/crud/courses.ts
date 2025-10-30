import db from '@/config/db';
import { courses, type Course, type NewCourse } from '@/config/schema';
import { eq } from 'drizzle-orm';

// Create
export async function createCourse(data: NewCourse) {
  const [course] = await db.insert(courses).values(data).returning();
  return course;
}

// Read All
export async function getAllCourses(): Promise<Course[]> {
  return await db.select().from(courses);
}

// Read by ID
export async function getCourseById(id: number): Promise<Course | undefined> {
  const [course] = await db.select().from(courses).where(eq(courses.id, id));
  return course;
}

// Read by Subject
export async function getCoursesBySubject(subject: string): Promise<Course[]> {
  return await db.select().from(courses).where(eq(courses.subject, subject));
}

// Read by Level
export async function getCoursesByLevel(level: string): Promise<Course[]> {
  return await db.select().from(courses).where(eq(courses.level, level));
}

// Update
export async function updateCourse(id: number, data: Partial<NewCourse>) {
  const [course] = await db
    .update(courses)
    .set(data)
    .where(eq(courses.id, id))
    .returning();
  return course;
}

// Delete
export async function deleteCourse(id: number) {
  await db.delete(courses).where(eq(courses.id, id));
}

// Mark Chapter as Complete
export async function markChapterComplete(
  courseId: number,
  lessonId: number,
  chapterId: number
) {
  const course = await getCourseById(courseId);
  if (!course || !course.lessons) throw new Error('Course not found');

  const updatedLessons = course.lessons.map((lesson) => {
    if (lesson.id === lessonId) {
      return {
        ...lesson,
        chapters: lesson.chapters.map((chapter) =>
          chapter.id === chapterId ? { ...chapter, completed: true } : chapter
        ),
      };
    }
    return lesson;
  });

  return await updateCourse(courseId, { lessons: updatedLessons });
}

// Mark Lesson as Complete
export async function markLessonComplete(courseId: number, lessonId: number) {
  const course = await getCourseById(courseId);
  if (!course || !course.lessons) throw new Error('Course not found');

  const updatedLessons = course.lessons.map((lesson) => {
    if (lesson.id === lessonId) {
      return {
        ...lesson,
        completed: true,
        chapters: lesson.chapters.map((chapter) => ({
          ...chapter,
          completed: true,
        })),
      };
    }
    return lesson;
  });

  return await updateCourse(courseId, { lessons: updatedLessons });
}
