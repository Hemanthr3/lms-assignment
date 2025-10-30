'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  return (
    <div
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700',
        className
      )}
      {...props}
    >
      <div
        className="absolute top-0 left-0 h-full rounded-full bg-orange-500 transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export { Progress };
