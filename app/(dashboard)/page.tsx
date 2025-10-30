'use client';

import { ActivityCard } from '@/components/activity-card';
import { ActivityCardSkeleton } from '@/components/activity-card-skeleton';
import { FilterButton } from '@/components/filter-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ActivityStatus,
  ActivityType,
  getAllActivityStatuses,
  getAllActivityTypes,
} from '@/config/activities.config';
import { useActivities } from '@/hooks/use-lms-api';
import { Heart, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ActivityType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | 'ALL'>(
    'ALL'
  );
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
      <div className="border-b bg-background sticky top-0 z-10">
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
          <div className="flex md:flex-row gap-4 md:items-center justify-between w-full">
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
            <div className="w- md:w-auto">
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as ActivityStatus | 'ALL')
                }
              >
                <SelectTrigger
                  size="sm"
                  className="h-9 border rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  {getAllActivityStatuses().map((config) => (
                    <SelectItem key={config.status} value={config.status}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
