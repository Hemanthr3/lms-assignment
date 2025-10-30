import 'dotenv/config';
import db from '../config/db';
import {
  activities,
  assignments,
  courses,
  discussions,
  quizzes,
} from '../config/schema';

async function reset() {
  console.log('🗑️  Resetting database...\n');

  try {
    // Drop tables (in reverse order of dependencies)
    console.log('Dropping tables...');
    await db.delete(activities);
    await db.delete(discussions);
    await db.delete(assignments);
    await db.delete(quizzes);
    await db.delete(courses);
    console.log('  ✓ All data cleared\n');

    console.log('✨ Database reset completed!');
    console.log("\n💡 Run 'npm run db:seed' to populate with sample data");
  } catch (error) {
    console.error('\n❌ Error resetting database:', error);
    process.exit(1);
  }
}

// Run the reset function
reset();
