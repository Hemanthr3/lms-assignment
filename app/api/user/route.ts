import db from '@/config/db';
import { usersTable } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length === 0) {
      const user = await db
        .insert(usersTable)
        .values({ name, email })
        .returning();
      return NextResponse.json(user[0]);
    }

    return NextResponse.json(existingUser[0]);
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: (error as Error).message },
      { status: 500 }
    );
  }
}
