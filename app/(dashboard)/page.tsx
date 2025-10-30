'use client';

import { ActivityCard } from '@/components/activity-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActivities } from '@/hooks/use-lms-api';
import { Heart, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type ActivityType = 'COURSE' | 'QUIZ' | 'ASSIGNMENT' | 'DISCUSSION' | 'ALL';
type ActivityStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING'
  | 'ALL';

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ActivityType>('ALL');
  const [statusFilter, setStatusFilter] = useState<ActivityStatus>('ALL');
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  const { data: activities, isLoading } = useActivities();

  // Filter activities based on search and filters
  const filteredActivities = useMemo(() => {
    if (!activities) return [];

    return activities.filter((activity: any) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        activity.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.instructor_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType = typeFilter === 'ALL' || activity.type === typeFilter;

      // Status filter
      const matchesStatus =
        statusFilter === 'ALL' || activity.status === statusFilter;

      // Favourites filter
      const matchesFavourite =
        !showFavouritesOnly || activity.is_favourite === true;

      return matchesSearch && matchesType && matchesStatus && matchesFavourite;
    });
  }, [activities, searchQuery, typeFilter, statusFilter, showFavouritesOnly]);

  // Get unique subjects for filter
  const subjects = useMemo(() => {
    if (!activities) return [];
    const subjectSet = new Set(
      activities.map((a: any) => a.subject).filter(Boolean)
    );
    return Array.from(subjectSet);
  }, [activities]);

  return (
    <div className="flex flex-col h-full">
      {/* Filter Bar */}
      <div className="border-b bg-background">
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Activities</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredActivities.length} activities found
              </p>
            </div>
            <Button
              variant={showFavouritesOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${
                  showFavouritesOnly ? 'fill-current' : ''
                }`}
              />
              Favourites
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, subject, instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filters */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Type
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={typeFilter === 'ALL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('ALL')}
              >
                All
              </Button>
              <Button
                variant={typeFilter === 'COURSE' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('COURSE')}
              >
                Courses
              </Button>
              <Button
                variant={typeFilter === 'QUIZ' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('QUIZ')}
              >
                Quizzes
              </Button>
              <Button
                variant={typeFilter === 'ASSIGNMENT' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('ASSIGNMENT')}
              >
                Assignments
              </Button>
              <Button
                variant={typeFilter === 'DISCUSSION' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('DISCUSSION')}
              >
                Discussions
              </Button>
            </div>
          </div>

          {/* Status Filters */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Status
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={statusFilter === 'ALL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('ALL')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'NOT_STARTED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('NOT_STARTED')}
              >
                Not Started
              </Button>
              <Button
                variant={statusFilter === 'IN_PROGRESS' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('IN_PROGRESS')}
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter === 'COMPLETED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('COMPLETED')}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === 'UPCOMING' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('UPCOMING')}
              >
                Upcoming
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading activities...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No activities found matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity: any) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onAction={() => {
                  console.log('Action clicked for:', activity.title);
                  // TODO: Navigate to detail page
                }}
                onToggleFavourite={() => {
                  console.log('Toggle favourite:', activity.title);
                  // TODO: Call update API
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
