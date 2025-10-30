'use client';

import { Button } from '@/components/ui/button';
import { useContentSidebar } from '@/contexts/content-sidebar-context';
import { PanelLeft } from 'lucide-react';

export function ContentSidebarTrigger() {
  const { isOpen, toggle } = useContentSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className={`fixed top-[5.5rem] md:top-24 z-50 h-10 w-8 rounded-r-lg border border-l-0 bg-background shadow-md hover:bg-accent transition-all hover:shadow-lg ${
        isOpen ? 'left-64' : 'left-0'
      }`}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
}
