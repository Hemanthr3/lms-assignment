import db from '@/config/db';
import { quizzes, type NewQuiz, type Quiz } from '@/config/schema';
import { eq } from 'drizzle-orm';

// Create
export async function createQuiz(data: NewQuiz) {
  const [quiz] = await db.insert(quizzes).values(data).returning();
  return quiz;
}

// Read All
export async function getAllQuizzes(): Promise<Quiz[]> {
  return await db.select().from(quizzes);
}

// Read by ID
export async function getQuizById(id: number): Promise<Quiz | undefined> {
  const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
  return quiz;
}

// Read by Subject
export async function getQuizzesBySubject(subject: string): Promise<Quiz[]> {
  return await db.select().from(quizzes).where(eq(quizzes.subject, subject));
}

// Read by Difficulty
export async function getQuizzesByDifficulty(
  difficulty: string
): Promise<Quiz[]> {
  return await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.difficulty, difficulty));
}

// Update
export async function updateQuiz(id: number, data: Partial<NewQuiz>) {
  const [quiz] = await db
    .update(quizzes)
    .set(data)
    .where(eq(quizzes.id, id))
    .returning();
  return quiz;
}

// Delete
export async function deleteQuiz(id: number) {
  await db.delete(quizzes).where(eq(quizzes.id, id));
}

// Submit Answer
export async function submitQuizAnswer(
  quizId: number,
  sectionId: number,
  questionId: number,
  markedAnswer: string
) {
  const quiz = await getQuizById(quizId);
  if (!quiz || !quiz.sections) throw new Error('Quiz not found');

  const updatedSections = quiz.sections.map((section) => {
    if (section.id === sectionId) {
      return {
        ...section,
        questions: section.questions.map((question) => {
          if (question.id === questionId) {
            const isCorrect = question.correct_answer === markedAnswer;
            return {
              ...question,
              marked_answer: markedAnswer,
              is_correct: isCorrect,
            };
          }
          return question;
        }),
      };
    }
    return section;
  });

  return await updateQuiz(quizId, { sections: updatedSections });
}

// Calculate Score
export async function calculateQuizScore(quizId: number) {
  const quiz = await getQuizById(quizId);
  if (!quiz || !quiz.sections) throw new Error('Quiz not found');

  let correctAnswers = 0;
  let totalQuestions = 0;

  quiz.sections.forEach((section) => {
    section.questions.forEach((question) => {
      totalQuestions++;
      if (question.is_correct) correctAnswers++;
    });
  });

  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = quiz.passing_score ? score >= quiz.passing_score : false;

  return await updateQuiz(quizId, { score, passed });
}
