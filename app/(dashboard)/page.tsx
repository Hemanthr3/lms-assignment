'use client';

import { ActivityCard } from '@/components/activity-card';
import { ActivityCardSkeleton } from '@/components/activity-card-skeleton';
import { FilterButton } from '@/components/filter-button';
import { Button } from '@/components/ui/button';
import { CustomSelect } from '@/components/ui/custom-select';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ActivityStatus,
  ActivityType,
  getAllActivityStatuses,
  getAllActivityTypes,
} from '@/config/activities.config';
import { useActivities, useUpdateActivity } from '@/hooks/use-lms-api';
import { Heart, Search } from 'lucide-react';
import { useMemo, useOptimistic, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ActivityType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | 'ALL'>(
    'ALL'
  );
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  const { data: activities = [], isLoading } = useActivities();
  const updateActivity = useUpdateActivity();
  const [isPending, startTransition] = useTransition();

  // Optimistic updates for immediate UI feedback
  const [optimisticActivities, setOptimisticActivities] = useOptimistic(
    activities,
    (
      state: any[],
      { id, is_favourite }: { id: number; is_favourite: boolean }
    ) =>
      state.map((activity: any) =>
        activity.id === id ? { ...activity, is_favourite } : activity
      )
  );

  // Handle favourite toggle with optimistic update
  const handleToggleFavourite = async (
    activityId: number,
    currentFavourite: boolean,
    activityTitle: string
  ) => {
    const newFavouriteState = !currentFavourite;

    // Optimistically update UI immediately in a transition
    startTransition(() => {
      setOptimisticActivities({
        id: activityId,
        is_favourite: newFavouriteState,
      });
    });

    try {
      // Make API call in background
      await updateActivity.mutateAsync({
        id: activityId,
        data: { is_favourite: newFavouriteState },
      });

      // Show success toast
      toast.success(
        currentFavourite
          ? `Removed "${activityTitle}" from favourites`
          : `Added "${activityTitle}" to favourites`
      );
    } catch (error) {
      // On error, show error toast
      toast.error('Failed to update favourite status');
    }
  };

  // Filter activities based on search and filters
  const filteredActivities = useMemo(() => {
    if (!optimisticActivities || optimisticActivities.length === 0) return [];

    // Sort by ID to maintain consistent order
    const sortedActivities = [...optimisticActivities].sort(
      (a: any, b: any) => a.id - b.id
    );

    return sortedActivities.filter((activity: any) => {
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
      <div className="border-b bg-background sticky top-0 z-10 overflow-visible">
        <div className="flex flex-col gap-4 p-4 md:p-6 overflow-visible">
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
          <div className="flex md:flex-row gap-4 md:items-center justify-between w-full overflow-visible">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, subject, instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Status Dropdown */}
            {isLoading ? (
              <Skeleton className="h-9 w-[140px] rounded-md" />
            ) : (
              <CustomSelect
                value={statusFilter}
                onChange={(value) =>
                  setStatusFilter(value as ActivityStatus | 'ALL')
                }
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  ...getAllActivityStatuses().map((config) => ({
                    value: config.status,
                    label: config.label,
                  })),
                ]}
                placeholder="Status"
                className="w-[140px] "
              />
            )}
          </div>

          {/* Filters Row - Responsive */}
          <div className="flex md:flex-row gap-4 md:items-center justify-between w-full">
            {/* Type Filters */}
            <div className="flex-1">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <FilterButton
                  label="All"
                  isActive={typeFilter === 'ALL'}
                  onClick={() => setTypeFilter('ALL')}
                />
                {getAllActivityTypes().map((config) => (
                  <FilterButton
                    key={config.type}
                    label={config.label + 's'}
                    isActive={typeFilter === config.type}
                    onClick={() => setTypeFilter(config.type)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <ActivityCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No activities found matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr w-full">
            {filteredActivities.map((activity: any) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onAction={() => {
                  console.log('Action clicked for:', activity.title);
                  // TODO: Navigate to detail page
                }}
                onToggleFavourite={() => {
                  handleToggleFavourite(
                    activity.id,
                    activity.is_favourite,
                    activity.title
                  );
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
