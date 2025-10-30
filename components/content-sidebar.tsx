'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useContentSidebar } from '@/contexts/content-sidebar-context';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  FileText,
  LucideIcon,
  MessageSquare,
  PlayCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Generic content types that can appear in any activity
export type ContentType = 'lesson' | 'quiz' | 'assignment' | 'discussion';

// Activity types (top-level)
export type ActivityType = 'course' | 'quiz' | 'assignment' | 'discussion';

// Flexible content item that adapts to different types
export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  duration?: string; // For lessons
  dueDate?: string; // For assignments
  points?: number; // For quizzes/assignments
  completed: boolean;
  locked?: boolean; // For sequential content
  metadata?: Record<string, any>; // Any additional data
}

// Section/Module that groups content
export interface ContentSection {
  id: string;
  title: string;
  type?: 'module' | 'week' | 'chapter' | 'section' | 'part'; // Different grouping types
  items: ContentItem[];
}

// Generic sidebar data structure that works for ANY activity type
export interface SidebarData {
  title: string;
  activityType: ActivityType; // What kind of activity is this?
  sections: ContentSection[];
  sidebarLabel?: string; // Optional label (e.g., "Course Content", "Quiz Sections")
}

interface ContentSidebarProps {
  data: SidebarData;
  baseUrl?: string; // Base URL for navigation (e.g., /courses/123)
}

// Icon mapping based on content type
const CONTENT_ICONS: Record<ContentType, LucideIcon> = {
  lesson: PlayCircle,
  quiz: ClipboardList,
  assignment: FileText,
  discussion: MessageSquare,
};

export function ContentSidebar({ data, baseUrl }: ContentSidebarProps) {
  const searchParams = useSearchParams();
  const currentItemId = searchParams.get('item');
  const { close } = useContentSidebar();
  const isMobile = useIsMobile();

  // Close sidebar only on mobile after clicking
  const handleItemClick = () => {
    if (isMobile) {
      close();
    }
  };

  // Helper to get metadata text based on content type
  const getItemMetadata = (item: ContentItem): string => {
    if (item.duration) return item.duration;
    if (item.dueDate) return `Due: ${item.dueDate}`;
    if (item.points) return `${item.points} pts`;
    return '';
  };

  // Default sidebar label based on activity type
  const getSidebarLabel = (): string => {
    if (data.sidebarLabel) return data.sidebarLabel;

    switch (data.activityType) {
      case 'course':
        return 'Course Content';
      case 'quiz':
        return 'Quiz Sections';
      case 'assignment':
        return 'Assignment Parts';
      case 'discussion':
        return 'Discussion Topics';
      default:
        return 'Content';
    }
  };

  return (
    <div className="h-full w-64 border-r bg-background flex flex-col">
      {/* Header */}
      <div className="border-b px-4 py-3">
        <h2 className="font-semibold text-sm truncate">{data.title}</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            {getSidebarLabel()}
          </p>
          <div className="space-y-1">
            {data.sections.map((section, sectionIndex) => {
              // Check if this section has the active item
              const hasActiveItem = section.items.some(
                (item) => item.id === currentItemId
              );

              return (
                <Collapsible
                  key={section.id}
                  defaultOpen={sectionIndex === 0 || hasActiveItem}
                  className="group/collapsible"
                >
                  <div>
                    <CollapsibleTrigger asChild>
                      <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span className="flex-1 text-left">
                          {section.title}
                        </span>
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6">
                      <div className="space-y-1 py-1">
                        {section.items.map((item) => {
                          const Icon = CONTENT_ICONS[item.type];
                          const isActive = item.id === currentItemId;
                          const metadata = getItemMetadata(item);

                          return (
                            <Link
                              key={item.id}
                              href={`?item=${item.id}&type=${item.type}`}
                              scroll={false}
                              onClick={handleItemClick}
                              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                                isActive
                                  ? 'bg-accent text-accent-foreground'
                                  : ''
                              } ${
                                item.locked
                                  ? 'opacity-50 pointer-events-none'
                                  : ''
                              }`}
                              aria-disabled={item.locked}
                            >
                              <Icon
                                className={`h-3 w-3 flex-shrink-0 ${
                                  item.completed
                                    ? 'text-green-500'
                                    : item.locked
                                    ? 'text-muted-foreground'
                                    : 'text-blue-500'
                                }`}
                              />
                              <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-xs truncate">
                                  {item.title}
                                </span>
                                {metadata && (
                                  <span className="text-[10px] text-muted-foreground">
                                    {metadata}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
