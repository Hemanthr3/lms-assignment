'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserButton, useUser } from '@clerk/nextjs';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b ">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-[140px]">
            <Image
              src="/images/logo.svg"
              alt="Great Learning"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="cursor-pointer"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" />
          </Button>

          <div className="h-7 w-7 flex items-center justify-center">
            {!isLoaded ? (
              <Skeleton className="h-7 w-7 rounded-full" />
            ) : (
              <UserButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
