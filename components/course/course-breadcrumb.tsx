'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CourseBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function CourseBreadcrumb({ items }: CourseBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
      {/* Home */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors flex-shrink-0"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2 min-w-0">
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors truncate"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`truncate ${
                  isLast ? 'text-foreground font-medium' : ''
                }`}
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
