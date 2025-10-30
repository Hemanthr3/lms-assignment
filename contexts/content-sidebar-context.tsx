'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ContentSidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const ContentSidebarContext = createContext<
  ContentSidebarContextType | undefined
>(undefined);

export function ContentSidebarProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(isMobile ? false : true);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ContentSidebarContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </ContentSidebarContext.Provider>
  );
}

export function useContentSidebar() {
  const context = useContext(ContentSidebarContext);
  if (!context) {
    throw new Error(
      'useContentSidebar must be used within ContentSidebarProvider'
    );
  }
  return context;
}
