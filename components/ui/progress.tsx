'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  isCompleted?: boolean;
}

function Progress({
  className,
  value = 0,
  isCompleted = false,
  ...props
}: ProgressProps) {
  // Brighter, more vibrant green for completed/passed
  const completedGradient =
    'linear-gradient(90deg, rgb(74, 222, 128) 0%, rgb(34, 197, 94) 100%)';
  // Regular green for in-progress
  const progressGradient =
    'linear-gradient(90deg, rgb(34, 197, 94) 0%, rgb(22, 163, 74) 100%)';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full flex-1 mr-2',
        className
      )}
      style={{
        height: '8px',
        minHeight: '8px',
        width: '100%',
      }}
      {...props}
    >
      <div
        className="absolute top-0 left-0 rounded-full transition-all duration-500 ease-out"
        style={{
          height: '100%',
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: isCompleted ? completedGradient : progressGradient,
          boxShadow: isCompleted ? '0 0 8px rgba(34, 197, 94, 0.4)' : 'none',
        }}
      />
    </div>
  );
}

export { Progress };
