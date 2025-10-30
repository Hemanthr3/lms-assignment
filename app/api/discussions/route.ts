import {
  createDiscussion,
  getAllDiscussions,
  getDiscussionsBySubject,
} from '@/lib/crud/discussions';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all discussions or filter by subject
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');

    let discussions;

    if (subject) {
      discussions = await getDiscussionsBySubject(subject);
    } else {
      discussions = await getAllDiscussions();
    }

    return NextResponse.json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}

// POST - Create a new discussion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const discussion = await createDiscussion(body);
    return NextResponse.json(discussion, { status: 201 });
  } catch (error) {
    console.error('Error creating discussion:', error);
    return NextResponse.json(
      { error: 'Failed to create discussion' },
      { status: 500 }
    );
  }
}
