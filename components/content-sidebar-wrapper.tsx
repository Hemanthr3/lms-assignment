'use client';

import { ContentSidebar, SidebarData } from '@/components/content-sidebar';
import { useContentSidebar } from '@/contexts/content-sidebar-context';

interface ContentSidebarWrapperProps {
  data: SidebarData;
  baseUrl?: string; // Optional base URL for navigation
}

export function ContentSidebarWrapper({
  data,
  baseUrl,
}: ContentSidebarWrapperProps) {
  const { isOpen, close } = useContentSidebar();
  console.log('data', data);

  return (
    <>
      {/* Overlay backdrop when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar - Absolute on mobile, takes layout space on desktop */}
      <aside
        className={`h-full bg-background transition-all duration-300 ease-in-out absolute md:relative left-0 top-0 z-50 md:z-auto ${
          isOpen
            ? 'translate-x-0 md:w-64'
            : '-translate-x-full md:translate-x-0 md:w-0'
        }`}
      >
        <div className="w-64 h-full">
          <ContentSidebar data={data} baseUrl={baseUrl} />
        </div>
      </aside>
    </>
  );
}
