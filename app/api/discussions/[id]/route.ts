import {
  deleteDiscussion,
  getDiscussionById,
  updateDiscussion,
} from '@/lib/crud/discussions';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch discussion by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const discussion = await getDiscussionById(parseInt(id));

    if (!discussion) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(discussion);
  } catch (error) {
    console.error('Error fetching discussion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussion' },
      { status: 500 }
    );
  }
}

// PATCH - Update discussion
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const discussion = await updateDiscussion(parseInt(id), body);
    return NextResponse.json(discussion);
  } catch (error) {
    console.error('Error updating discussion:', error);
    return NextResponse.json(
      { error: 'Failed to update discussion' },
      { status: 500 }
    );
  }
}

// DELETE - Delete discussion
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteDiscussion(parseInt(id));
    return NextResponse.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    return NextResponse.json(
      { error: 'Failed to delete discussion' },
      { status: 500 }
    );
  }
}
