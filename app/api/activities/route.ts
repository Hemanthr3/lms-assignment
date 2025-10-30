import {
  createActivity,
  getActivitiesBySubject,
  getActivitiesByType,
  getAllActivities,
} from '@/lib/crud/activities';
import { getAssignmentById } from '@/lib/crud/assignments';
import { getCourseById } from '@/lib/crud/courses';
import { getQuizById } from '@/lib/crud/quizzes';
import {
  calculateAssignmentProgress,
  calculateCourseProgress,
  calculateQuizProgress,
} from '@/lib/utils/progress';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all activities or filter by type/subject
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const subject = searchParams.get('subject');

    let activities;

    if (type) {
      activities = await getActivitiesByType(type as any);
    } else if (subject) {
      activities = await getActivitiesBySubject(subject);
    } else {
      activities = await getAllActivities();
    }

    // Add progress to each activity by fetching the referenced entity
    const activitiesWithProgress = await Promise.all(
      activities.map(async (activity) => {
        let progress = null;

        try {
          switch (activity.type) {
            case 'COURSE': {
              const course = await getCourseById(activity.ref_id);
              if (course) {
                progress = calculateCourseProgress(course);
              }
              break;
            }
            case 'QUIZ': {
              const quiz = await getQuizById(activity.ref_id);
              if (quiz) {
                progress = calculateQuizProgress(quiz);
              }
              break;
            }
            case 'ASSIGNMENT': {
              const assignment = await getAssignmentById(activity.ref_id);
              if (assignment) {
                progress = calculateAssignmentProgress(assignment);
              }
              break;
            }
            case 'DISCUSSION': {
              // Discussions don't have progress
              progress = null;
              break;
            }
          }
        } catch (error) {
          console.error(
            `Error calculating progress for activity ${activity.id}:`,
            error
          );
          progress = null;
        }

        return { ...activity, progress };
      })
    );

    return NextResponse.json(activitiesWithProgress);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST - Create a new activity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const activity = await createActivity(body);
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}
