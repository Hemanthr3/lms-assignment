/**
 * LMS-specific API helpers with proper React Query hooks
 * This provides type-safe, convenient wrappers with proper cache invalidation
 *
 * Query Key Structure:
 * - ['activities'] - all activities list
 * - ['activities', id] - single activity
 * - ['activities', 'type', type] - activities by type
 * - ['activities', 'subject', subject] - activities by subject
 *
 * Cascade Invalidation:
 * - When a course updates → invalidate courses + activities (activities reference courses)
 * - When a quiz/assignment updates → invalidate that entity + activities
 * - Activities are the "registry" so they get invalidated often
 */

import api from '@/config/api-config';
import type {
  Activity,
  Assignment,
  Course,
  Discussion,
  Quiz,
} from '@/types/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ==================== ACTIVITIES ====================
export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => api.get('/api/activities').then((res) => res.data),
  });
}

export function useActivity(id: number) {
  return useQuery({
    queryKey: ['activities', String(id)],
    queryFn: () => api.get(`/api/activities/${id}`).then((res) => res.data),
    enabled: !!id,
  });
}

export function useActivitiesByType(type: string) {
  return useQuery({
    queryKey: ['activities', 'type', type],
    queryFn: () =>
      api.get(`/api/activities?type=${type}`).then((res) => res.data),
    enabled: !!type,
  });
}

export function useActivitiesBySubject(subject: string) {
  return useQuery({
    queryKey: ['activities', 'subject', subject],
    queryFn: () =>
      api
        .get(`/api/activities?subject=${encodeURIComponent(subject)}`)
        .then((res) => res.data),
    enabled: !!subject,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Activity) =>
      api.post('/api/activities', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

export function useUpdateActivity(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Activity>) =>
      api.patch(`/api/activities/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

export function useDeleteActivity(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api.delete(`/api/activities/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

// ==================== COURSES ====================
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/api/courses').then((res) => res.data),
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: ['courses', String(id)],
    queryFn: () => api.get(`/api/courses/${id}`).then((res) => res.data),
    enabled: !!id,
  });
}

export function useCoursesBySubject(subject: string) {
  return useQuery({
    queryKey: ['courses', 'subject', subject],
    queryFn: () =>
      api
        .get(`/api/courses?subject=${encodeURIComponent(subject)}`)
        .then((res) => res.data),
    enabled: !!subject,
  });
}

export function useCoursesByLevel(level: string) {
  return useQuery({
    queryKey: ['courses', 'level', level],
    queryFn: () =>
      api.get(`/api/courses?level=${level}`).then((res) => res.data),
    enabled: !!level,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Course) =>
      api.post('/api/courses', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

export function useUpdateCourse(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Course>) =>
      api.patch(`/api/courses/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

export function useDeleteCourse(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete(`/api/courses/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

// ==================== QUIZZES ====================
export function useQuizzes() {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: () => api.get('/api/quizzes').then((res) => res.data),
  });
}

export function useQuiz(id: number) {
  return useQuery({
    queryKey: ['quizzes', String(id)],
    queryFn: () => api.get(`/api/quizzes/${id}`).then((res) => res.data),
    enabled: !!id,
  });
}

export function useUpdateQuiz(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Quiz>) =>
      api.patch(`/api/quizzes/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

// ==================== ASSIGNMENTS ====================
export function useAssignments() {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: () => api.get('/api/assignments').then((res) => res.data),
  });
}

export function useAssignment(id: number) {
  return useQuery({
    queryKey: ['assignments', String(id)],
    queryFn: () => api.get(`/api/assignments/${id}`).then((res) => res.data),
    enabled: !!id,
  });
}

export function useUpdateAssignment(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Assignment>) =>
      api.patch(`/api/assignments/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

// ==================== DISCUSSIONS ====================
export function useDiscussions() {
  return useQuery({
    queryKey: ['discussions'],
    queryFn: () => api.get('/api/discussions').then((res) => res.data),
  });
}

export function useDiscussion(id: number) {
  return useQuery({
    queryKey: ['discussions', String(id)],
    queryFn: () => api.get(`/api/discussions/${id}`).then((res) => res.data),
    enabled: !!id,
  });
}

export function useUpdateDiscussion(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Discussion>) =>
      api.patch(`/api/discussions/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}
