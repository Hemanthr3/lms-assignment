import {
  createCourse,
  getAllCourses,
  getCoursesByLevel,
  getCoursesBySubject,
} from '@/lib/crud/courses';
import { calculateCourseProgress } from '@/lib/utils/progress';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all courses or filter by subject/level
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');
    const level = searchParams.get('level');

    let courses;

    if (subject) {
      courses = await getCoursesBySubject(subject);
    } else if (level) {
      courses = await getCoursesByLevel(level);
    } else {
      courses = await getAllCourses();
    }

    // Add progress to each course
    const coursesWithProgress = courses.map((course) => ({
      ...course,
      progress: calculateCourseProgress(course),
    }));

    return NextResponse.json(coursesWithProgress);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const course = await createCourse(body);
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
