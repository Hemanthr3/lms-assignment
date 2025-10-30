import {
  createAssignment,
  getAllAssignments,
  getAssignmentsBySubject,
} from '@/lib/crud/assignments';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all assignments or filter by subject
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');

    let assignments;

    if (subject) {
      assignments = await getAssignmentsBySubject(subject);
    } else {
      assignments = await getAllAssignments();
    }

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}

// POST - Create a new assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const assignment = await createAssignment(body);
    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}
