'use client';

import {
  useActivities,
  useActivitiesBySubject,
  useCourse,
  useCourses,
  useUpdateActivity,
  useUpdateCourse,
} from '@/hooks/use-lms-api';
import { Course } from '@/types/database';
import { useState } from 'react';

export default function TestDatabasePage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  // Fetch data
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: course1, isLoading: course1Loading } = useCourse(1);
  const { data: aiActivities, isLoading: aiLoading } = useActivitiesBySubject(
    'Artificial Intelligence'
  );

  // Mutations
  const updateCourse = useUpdateCourse(1);
  const updateActivity = useUpdateActivity(1);

  const addResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  const testUpdateCourse = () => {
    addResult('🔄 Updating course rating to 4...');
    updateCourse.mutate(
      { rating: 4 },
      {
        onSuccess: () => {
          addResult('✅ Course updated! Check if data refreshed above.');
        },
        onError: (error) => {
          addResult(`❌ Error: ${error}`);
        },
      }
    );
  };

  const testUpdateCourseBack = () => {
    addResult('🔄 Updating course rating back to 5...');
    updateCourse.mutate(
      { rating: 5 },
      {
        onSuccess: () => {
          addResult('✅ Course updated back! Check if data refreshed above.');
        },
        onError: (error) => {
          addResult(`❌ Error: ${error}`);
        },
      }
    );
  };

  const testToggleFavorite = () => {
    if (!activities?.[0]) return;
    const currentFav = activities[0].is_favourite;
    addResult(`🔄 Toggling favorite to ${!currentFav}...`);

    updateActivity.mutate(
      { is_favourite: !currentFav },
      {
        onSuccess: () => {
          addResult('✅ Favorite toggled! Check if data refreshed above.');
        },
        onError: (error) => {
          addResult(`❌ Error: ${error}`);
        },
      }
    );
  };

  if (activitiesLoading || coursesLoading || course1Loading || aiLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">🔄 Loading test data...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🧪 Database Test Page</h1>

      {/* Test Controls */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Cache Invalidation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Click these buttons and watch the data above update automatically!
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={testUpdateCourse}
            disabled={updateCourse.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {updateCourse.isPending
              ? 'Updating...'
              : 'Update Course Rating → 4'}
          </button>
          <button
            onClick={testUpdateCourseBack}
            disabled={updateCourse.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {updateCourse.isPending
              ? 'Updating...'
              : 'Update Course Rating → 5'}
          </button>
          <button
            onClick={testToggleFavorite}
            disabled={updateActivity.isPending}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {updateActivity.isPending
              ? 'Toggling...'
              : 'Toggle Activity Favorite'}
          </button>
        </div>
      </div>

      {/* Test Results Log */}
      {testResults.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">📋 Test Log</h2>
          <div className="space-y-1 font-mono text-sm">
            {testResults.map((result, idx) => (
              <div key={idx} className="text-gray-700 dark:text-gray-300">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* All Activities */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            📋 All Activities ({activities?.length})
          </h2>
          <p className="text-sm text-gray-500 mb-4">Hook: useActivities()</p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {activities?.map((activity: any) => (
              <div
                key={activity.id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded"
              >
                <div className="font-medium flex items-center gap-2">
                  {activity.is_favourite && '⭐'}
                  {activity.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Type: {activity.type} | Status: {activity.status}
                </div>
                {activity.rating && (
                  <div className="text-sm text-yellow-600">
                    {'★'.repeat(activity.rating)}
                  </div>
                )}
                {/* Show progress if available */}
                {activity.progress && (
                  <div className="mt-2">
                    {activity.type === 'COURSE' && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{
                                width: `${activity.progress.percentComplete}%`,
                              }}
                            />
                          </div>
                          <span className="text-gray-500 min-w-[40px]">
                            {activity.progress.percentComplete}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {activity.progress.completedChapters}/
                          {activity.progress.totalChapters} chapters
                        </div>
                      </div>
                    )}
                    {activity.type === 'QUIZ' && (
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">
                          Score: {activity.progress.score}%
                          {activity.progress.passed && ' ✓'}
                        </div>
                      </div>
                    )}
                    {activity.type === 'ASSIGNMENT' && (
                      <div className="text-xs text-gray-500">
                        Status: {activity.progress.status}
                        {activity.progress.daysUntilDue !== null && (
                          <span> ({activity.progress.daysUntilDue} days)</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            📚 All Courses ({courses?.length})
          </h2>
          <p className="text-sm text-gray-500 mb-4">Hook: useCourses()</p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {courses?.map((course: Course) => (
              <div
                key={course.id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded"
              >
                <div className="font-medium">{course.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Subject: {course.subject}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Level: {course.level} | Duration: {course.duration}
                </div>
                {course.rating && (
                  <div className="text-sm text-yellow-600">
                    Rating: {'★'.repeat(course.rating)} ({course.rating}/5)
                  </div>
                )}
                {/* Show progress if available */}
                {(course as any).progress && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-600 h-1.5 rounded-full"
                          style={{
                            width: `${
                              (course as any).progress.percentComplete
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {(course as any).progress.percentComplete}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Specific Course */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Course #1 Details</h2>
          <p className="text-sm text-gray-500 mb-4">Hook: useCourse(1)</p>
          {course1 && (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Title:</span> {course1.title}
              </div>
              <div>
                <span className="font-medium">Subject:</span> {course1.subject}
              </div>
              <div>
                <span className="font-medium">Level:</span> {course1.level}
              </div>
              <div>
                <span className="font-medium">Rating:</span>{' '}
                {course1.rating && '★'.repeat(course1.rating)} ({course1.rating}
                /5)
              </div>
              <div>
                <span className="font-medium">Duration:</span>{' '}
                {course1.duration}
              </div>
              <div>
                <span className="font-medium">Instructor:</span>{' '}
                {course1.instructor_name}
              </div>
              <div>
                <span className="font-medium">Lessons:</span>{' '}
                {course1.total_lessons} lessons, {course1.total_chapters}{' '}
                chapters
              </div>
              {/* Progress Section */}
              {(course1 as any).progress && (
                <div className="mt-4 pt-4 border-t">
                  <div className="font-medium mb-2">📊 Progress:</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Chapters:</span>
                        <span>
                          {(course1 as any).progress.completedChapters} /{' '}
                          {(course1 as any).progress.totalChapters}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              (course1 as any).progress.percentComplete
                            }%`,
                          }}
                        />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {(course1 as any).progress.percentComplete}% complete
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Lessons: {(course1 as any).progress.completedLessons} /{' '}
                      {(course1 as any).progress.totalLessons} complete
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Activities */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            🤖 AI Activities ({aiActivities?.length})
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Hook: useActivitiesBySubject("Artificial Intelligence")
          </p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {aiActivities?.map((activity: any) => (
              <div
                key={activity.id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded"
              >
                <div className="font-medium flex items-center gap-2">
                  {activity.is_favourite && '⭐'}
                  {activity.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Type: {activity.type} | Status: {activity.status}
                </div>
                {/* Show progress */}
                {activity.progress && activity.type === 'COURSE' && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{
                            width: `${activity.progress.percentComplete}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-500">
                        {activity.progress.percentComplete}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">✅ What to Test</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Click "Update Course Rating → 4" and watch:
            <ul className="list-disc list-inside ml-6 mt-1 text-sm">
              <li>All Courses section updates</li>
              <li>Course #1 Details updates</li>
              <li>
                All Activities section updates (course activity shows new
                rating)
              </li>
              <li>AI Activities updates (if course is AI-related)</li>
            </ul>
          </li>
          <li>
            Click "Toggle Activity Favorite" and watch:
            <ul className="list-disc list-inside ml-6 mt-1 text-sm">
              <li>All Activities section updates (star appears/disappears)</li>
              <li>AI Activities updates (if it's an AI activity)</li>
            </ul>
          </li>
          <li>All updates happen automatically via cache invalidation!</li>
        </ol>
      </div>
    </div>
  );
}
