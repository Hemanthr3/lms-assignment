import { Skeleton } from '@/components/ui/skeleton';

export function ActivityCardSkeleton() {
  return (
    <div className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video bg-muted overflow-hidden flex-shrink-0">
        <Skeleton className="w-full h-full rounded-none" />

        {/* Status and Favourite Badges */}
        <div className="absolute top-2 left-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-3/4 rounded-md" />

        {/* Description */}
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />

        {/* Instructor */}
        <Skeleton className="h-4 w-1/2 rounded-md" />

        {/* Meta Info (Duration, Rating, Students) */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Skeleton className="h-4 w-10 rounded" />
          <Skeleton className="h-4 w-8 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-2 flex-1 rounded-full" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
          <Skeleton className="h-3 w-3/4 rounded" />
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-full rounded-md mt-auto" />
      </div>
    </div>
  );
}
