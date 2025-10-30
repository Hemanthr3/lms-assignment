'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Filter Bar */}
      <div className="border-b bg-background">
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">My Activities</h1>
            <Button variant="outline" size="sm" className="md:hidden">
              Filters
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button variant="default" size="sm">
              All
            </Button>
            <Button variant="outline" size="sm">
              Online Classes
            </Button>
            <Button variant="outline" size="sm">
              Assignments
            </Button>
            <Button variant="outline" size="sm">
              Quizzes
            </Button>
            <Button variant="outline" size="sm">
              Discussions
            </Button>
          </div>
        </div>
      </div>

      {/* Activity List - Full Width */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Activity Cards will go here */}
          <div className="bg-muted/50 rounded-xl p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">ONLINE CLASS</p>
                <h3 className="font-semibold">
                  Introduction to Machine Learning
                </h3>
              </div>
              <div className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">
                Live
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Today at 2:00 PM • 90 mins
            </p>
            <Button className="w-full">Join Class</Button>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">ASSIGNMENT</p>
                <h3 className="font-semibold">Linear Regression Model</h3>
              </div>
              <div className="text-xs bg-orange-500/10 text-orange-600 px-2 py-1 rounded">
                Due Soon
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Due: Dec 15 • 40% Complete
            </p>
            <Button variant="outline" className="w-full">
              Continue
            </Button>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">QUIZ</p>
                <h3 className="font-semibold">Neural Networks Basics</h3>
              </div>
              <div className="text-xs bg-blue-500/10 text-blue-600 px-2 py-1 rounded">
                Available
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              15 Questions • 30 mins
            </p>
            <Button className="w-full">Start Quiz</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
