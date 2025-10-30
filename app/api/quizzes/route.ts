import {
  createQuiz,
  getAllQuizzes,
  getQuizzesByDifficulty,
  getQuizzesBySubject,
} from '@/lib/crud/quizzes';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all quizzes or filter by subject/difficulty
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');
    const difficulty = searchParams.get('difficulty');

    let quizzes;

    if (subject) {
      quizzes = await getQuizzesBySubject(subject);
    } else if (difficulty) {
      quizzes = await getQuizzesByDifficulty(difficulty);
    } else {
      quizzes = await getAllQuizzes();
    }

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}

// POST - Create a new quiz
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const quiz = await createQuiz(body);
    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}
