import 'dotenv/config';
import db from '../config/db';
import {
  activities,
  assignments,
  courses,
  discussions,
  quizzes,
  type NewActivity,
  type NewAssignment,
  type NewCourse,
  type NewDiscussion,
  type NewQuiz,
} from '../config/schema';

// -----------------------------------------------------
// SEED DATA
// -----------------------------------------------------

const seedCourses: NewCourse[] = [
  {
    id: 1,
    title: 'Deep Learning Foundations',
    subject: 'Artificial Intelligence',
    overview: 'Master the fundamentals of neural networks and deep learning.',
    instructor_name: 'Dr. Priya Sharma',
    instructor_bio:
      'AI researcher with 10+ years of experience in neural network design.',
    instructor_avatar_url: '/images/instructors/priya.png',
    thumbnail_url: '/images/courses/deep-learning.jpg',
    trailer_url: 'https://youtube.com/example',
    duration: '8h 30m',
    level: 'INTERMEDIATE',
    category: 'AI & Machine Learning',
    tags: ['AI', 'Neural Networks', 'Deep Learning'],
    requirements: ['Basic Python', 'Linear Algebra'],
    learning_outcomes: [
      'Build CNNs',
      'Train RNNs',
      'Understand backpropagation',
    ],
    rating: 5,
    total_lessons: 3,
    total_chapters: 6,
    lessons: [
      {
        id: 1,
        title: 'Introduction to Neural Networks',
        completed: true,
        order_index: 1,
        chapters: [
          { id: 1, title: 'What is AI?', completed: true },
          { id: 2, title: 'History of Neural Nets', completed: true },
        ],
      },
      {
        id: 2,
        title: 'CNNs and Image Recognition',
        completed: false,
        order_index: 2,
        chapters: [
          { id: 3, title: 'Convolution Basics', completed: false },
          { id: 4, title: 'Building a CNN', completed: false },
        ],
      },
      {
        id: 3,
        title: 'Advanced Topics',
        completed: false,
        order_index: 3,
        chapters: [
          { id: 5, title: 'Transfer Learning', completed: false },
          { id: 6, title: 'GANs Introduction', completed: false },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    subject: 'Computer Science',
    overview: 'Learn full-stack web development from scratch.',
    instructor_name: 'John Martinez',
    instructor_bio:
      'Senior Full Stack Developer with 8 years of industry experience.',
    instructor_avatar_url: '/images/instructors/john.png',
    thumbnail_url: '/images/courses/web-dev.jpg',
    trailer_url: 'https://youtube.com/example2',
    duration: '12h 45m',
    level: 'BEGINNER',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    requirements: ['Basic computer skills'],
    learning_outcomes: [
      'Build responsive websites',
      'Create REST APIs',
      'Deploy web applications',
    ],
    rating: 4,
    total_lessons: 4,
    total_chapters: 8,
    lessons: [
      {
        id: 1,
        title: 'HTML & CSS Basics',
        completed: false,
        order_index: 1,
        chapters: [
          { id: 1, title: 'HTML Structure', completed: false },
          { id: 2, title: 'CSS Styling', completed: false },
        ],
      },
      {
        id: 2,
        title: 'JavaScript Fundamentals',
        completed: false,
        order_index: 2,
        chapters: [
          { id: 3, title: 'Variables and Types', completed: false },
          { id: 4, title: 'Functions and Loops', completed: false },
        ],
      },
      {
        id: 3,
        title: 'React Framework',
        completed: false,
        order_index: 3,
        chapters: [
          { id: 5, title: 'Components', completed: false },
          { id: 6, title: 'State Management', completed: false },
        ],
      },
      {
        id: 4,
        title: 'Backend with Node.js',
        completed: false,
        order_index: 4,
        chapters: [
          { id: 7, title: 'Express.js', completed: false },
          { id: 8, title: 'Database Integration', completed: false },
        ],
      },
    ],
  },
];

const seedQuizzes: NewQuiz[] = [
  {
    id: 1,
    title: 'Deep Learning Fundamentals Quiz',
    subject: 'Artificial Intelligence',
    description: 'Test your understanding of neural networks.',
    total_questions: 3,
    passing_score: 60,
    duration: '20m',
    difficulty: 'MEDIUM',
    sections: [
      {
        id: 1,
        title: 'Basics',
        questions: [
          {
            id: 1,
            question: 'What is a neuron in a neural network?',
            type: 'MCQ',
            options: ['A cell', 'A function', 'A weight', 'A node'],
            correct_answer: 'A node',
            marked_answer: 'A node',
            is_correct: true,
          },
          {
            id: 2,
            question: 'Which activation function is non-linear?',
            type: 'MCQ',
            options: ['ReLU', 'Linear', 'Identity'],
            correct_answer: 'ReLU',
            marked_answer: 'Linear',
            is_correct: false,
          },
          {
            id: 3,
            question: 'Deep learning is a subset of machine learning.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            correct_answer: 'True',
            marked_answer: 'True',
            is_correct: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'JavaScript Basics Quiz',
    subject: 'Computer Science',
    description: 'Test your JavaScript fundamentals knowledge.',
    total_questions: 4,
    passing_score: 70,
    duration: '15m',
    difficulty: 'EASY',
    sections: [
      {
        id: 1,
        title: 'Variables and Types',
        questions: [
          {
            id: 1,
            question:
              'Which keyword is used to declare a constant in JavaScript?',
            type: 'MCQ',
            options: ['var', 'let', 'const', 'constant'],
            correct_answer: 'const',
          },
          {
            id: 2,
            question: 'What does NaN stand for?',
            type: 'MCQ',
            options: [
              'Not a Number',
              'Null and Nil',
              'No Available Number',
              'New Array Notation',
            ],
            correct_answer: 'Not a Number',
          },
        ],
      },
      {
        id: 2,
        title: 'Functions',
        questions: [
          {
            id: 3,
            question: 'Arrow functions can be used as constructors.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            correct_answer: 'False',
          },
          {
            id: 4,
            question: 'JavaScript is a statically typed language.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            correct_answer: 'False',
          },
        ],
      },
    ],
  },
];

const seedAssignments: NewAssignment[] = [
  {
    id: 1,
    title: 'CNN Implementation',
    subject: 'Artificial Intelligence',
    description: 'Implement a CNN for image classification.',
    instructions: 'Use TensorFlow or PyTorch. Submit your notebook link.',
    total_marks: 100,
    submission_deadline: new Date('2025-11-05'),
    resources: ['dataset.zip', 'example.ipynb'],
    sections: [
      {
        id: 1,
        title: 'Data Preprocessing',
        description: 'Clean and prepare the dataset',
        file_requirements: ['notebook', 'csv'],
      },
      {
        id: 2,
        title: 'Model Implementation',
        description: 'Build and train your CNN model',
        file_requirements: ['notebook', 'model weights'],
      },
    ],
  },
  {
    id: 2,
    title: 'Build a Portfolio Website',
    subject: 'Computer Science',
    description:
      'Create a responsive portfolio website using HTML, CSS, and JavaScript.',
    instructions:
      'Include at least 3 pages: Home, About, Projects. Deploy to Netlify or Vercel.',
    total_marks: 100,
    submission_deadline: new Date('2025-11-10'),
    resources: ['design-mockup.fig', 'color-palette.pdf'],
    sections: [
      {
        id: 1,
        title: 'HTML Structure',
        description: 'Create semantic HTML structure',
        file_requirements: ['html files'],
      },
      {
        id: 2,
        title: 'CSS Styling',
        description: 'Style your website with modern CSS',
        file_requirements: ['css files'],
      },
      {
        id: 3,
        title: 'JavaScript Interactivity',
        description: 'Add interactive elements',
        file_requirements: ['js files'],
      },
    ],
  },
];

const seedDiscussions: NewDiscussion[] = [
  {
    id: 1,
    topic: 'Best practices for tuning CNN hyperparameters',
    subject: 'Artificial Intelligence',
    description: 'Share your experience tuning learning rate and batch size.',
    participants: 12,
    replies_count: 4,
    last_activity_at: new Date(),
    posts: [
      {
        id: 1,
        author: { name: 'Ankit Kumar', avatar_url: '/avatars/ankit.png' },
        content: 'Try reducing learning rate to 0.001 for stability.',
        created_at: new Date().toISOString(),
        likes: 3,
        replies: [
          {
            id: 1,
            author: { name: 'Dr. Priya Sharma' },
            content: "Yes, and don't forget to use a scheduler!",
            created_at: new Date().toISOString(),
            likes: 2,
          },
        ],
      },
      {
        id: 2,
        author: { name: 'Sarah Chen', avatar_url: '/avatars/sarah.png' },
        content:
          'I found that using batch size of 32 works well for most cases.',
        created_at: new Date().toISOString(),
        likes: 5,
        replies: [
          {
            id: 1,
            author: { name: 'Ankit Kumar', avatar_url: '/avatars/ankit.png' },
            content: 'Agreed! Also depends on your GPU memory.',
            created_at: new Date().toISOString(),
            likes: 1,
          },
          {
            id: 2,
            author: { name: 'Mike Johnson' },
            content:
              'For larger models, I use gradient accumulation with smaller batches.',
            created_at: new Date().toISOString(),
            likes: 3,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    topic: 'React vs Vue: Which is better for beginners?',
    subject: 'Computer Science',
    description: 'Discussion about the best frontend framework for newcomers.',
    participants: 8,
    replies_count: 3,
    last_activity_at: new Date(),
    posts: [
      {
        id: 1,
        author: { name: 'John Martinez', avatar_url: '/avatars/john.png' },
        content:
          "I'd recommend React because of its larger ecosystem and job market demand.",
        created_at: new Date().toISOString(),
        likes: 7,
        replies: [
          {
            id: 1,
            author: { name: 'Emma Davis' },
            content: 'True, but Vue has a gentler learning curve!',
            created_at: new Date().toISOString(),
            likes: 4,
          },
        ],
      },
      {
        id: 2,
        author: { name: 'Alex Thompson' },
        content:
          'Both are great! Choose based on what companies in your area use.',
        created_at: new Date().toISOString(),
        likes: 6,
        replies: [
          {
            id: 1,
            author: { name: 'John Martinez', avatar_url: '/avatars/john.png' },
            content: 'Excellent advice! Research your local job market first.',
            created_at: new Date().toISOString(),
            likes: 2,
          },
        ],
      },
    ],
  },
];

const seedActivities: NewActivity[] = [
  {
    id: 1,
    type: 'COURSE',
    ref_id: 1,
    title: 'Deep Learning Foundations',
    subject: 'Artificial Intelligence',
    description: 'Master the fundamentals of neural networks.',
    thumbnail_url: '/images/courses/deep-learning.jpg',
    instructor_name: 'Dr. Priya Sharma',
    duration: '8h 30m',
    status: 'IN_PROGRESS',
    rating: 5,
    students_enrolled: 1200,
    purchased: true,
    is_favourite: true,
  },
  {
    id: 2,
    type: 'QUIZ',
    ref_id: 1,
    title: 'Deep Learning Fundamentals Quiz',
    subject: 'Artificial Intelligence',
    description: 'Test your understanding of deep learning basics.',
    thumbnail_url: '/images/quizzes/deep-learning.jpg',
    instructor_name: 'Dr. Priya Sharma',
    duration: '20m',
    status: 'COMPLETED',
    rating: 4,
    students_enrolled: 1200,
    purchased: true,
    is_favourite: false,
  },
  {
    id: 3,
    type: 'ASSIGNMENT',
    ref_id: 1,
    title: 'CNN Implementation',
    subject: 'Artificial Intelligence',
    description: 'Implement CNN and submit your notebook.',
    thumbnail_url: '/images/assignments/cnn.jpg',
    instructor_name: 'Dr. Priya Sharma',
    duration: '3 days left',
    status: 'NOT_STARTED',
    rating: 4,
    students_enrolled: 1200,
    purchased: true,
  },
  {
    id: 4,
    type: 'DISCUSSION',
    ref_id: 1,
    title: 'Tuning CNN Hyperparameters',
    subject: 'Artificial Intelligence',
    description: 'Learn and share CNN tuning tricks.',
    thumbnail_url: '/images/discussions/cnn.jpg',
    instructor_name: 'Community',
    duration: '—',
    status: 'IN_PROGRESS',
    rating: 5,
    students_enrolled: 500,
    purchased: true,
  },
  {
    id: 5,
    type: 'COURSE',
    ref_id: 2,
    title: 'Web Development Bootcamp',
    subject: 'Computer Science',
    description: 'Learn full-stack web development from scratch.',
    thumbnail_url: '/images/courses/web-dev.jpg',
    instructor_name: 'John Martinez',
    duration: '12h 45m',
    status: 'NOT_STARTED',
    rating: 4,
    students_enrolled: 850,
    purchased: true,
    is_favourite: false,
  },
  {
    id: 6,
    type: 'QUIZ',
    ref_id: 2,
    title: 'JavaScript Basics Quiz',
    subject: 'Computer Science',
    description: 'Test your JavaScript fundamentals knowledge.',
    thumbnail_url: '/images/quizzes/javascript.jpg',
    instructor_name: 'John Martinez',
    duration: '15m',
    status: 'NOT_STARTED',
    rating: 4,
    students_enrolled: 850,
    purchased: true,
  },
  {
    id: 7,
    type: 'ASSIGNMENT',
    ref_id: 2,
    title: 'Build a Portfolio Website',
    subject: 'Computer Science',
    description: 'Create a responsive portfolio website.',
    thumbnail_url: '/images/assignments/portfolio.jpg',
    instructor_name: 'John Martinez',
    duration: '5 days left',
    status: 'NOT_STARTED',
    rating: 5,
    students_enrolled: 850,
    purchased: true,
  },
  {
    id: 8,
    type: 'DISCUSSION',
    ref_id: 2,
    title: 'React vs Vue: Which is better for beginners?',
    subject: 'Computer Science',
    description: 'Discussion about the best frontend framework.',
    thumbnail_url: '/images/discussions/frameworks.jpg',
    instructor_name: 'Community',
    duration: '—',
    status: 'NOT_STARTED',
    rating: 4,
    students_enrolled: 300,
    purchased: true,
  },
];

// -----------------------------------------------------
// SEED FUNCTION
// -----------------------------------------------------

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Seed Courses
    console.log('📚 Seeding courses...');
    for (const course of seedCourses) {
      await db.insert(courses).values(course);
      console.log(`  ✓ Created course: ${course.title}`);
    }

    // Seed Quizzes
    console.log('\n📝 Seeding quizzes...');
    for (const quiz of seedQuizzes) {
      await db.insert(quizzes).values(quiz);
      console.log(`  ✓ Created quiz: ${quiz.title}`);
    }

    // Seed Assignments
    console.log('\n📋 Seeding assignments...');
    for (const assignment of seedAssignments) {
      await db.insert(assignments).values(assignment);
      console.log(`  ✓ Created assignment: ${assignment.title}`);
    }

    // Seed Discussions
    console.log('\n💬 Seeding discussions...');
    for (const discussion of seedDiscussions) {
      await db.insert(discussions).values(discussion);
      console.log(`  ✓ Created discussion: ${discussion.topic}`);
    }

    // Seed Activities
    console.log('\n🎯 Seeding activities...');
    for (const activity of seedActivities) {
      await db.insert(activities).values(activity);
      console.log(`  ✓ Created activity: ${activity.title}`);
    }

    console.log('\n✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();
