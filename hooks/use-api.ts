/* eslint-disable react-hooks/rules-of-hooks */
import api from '@/config/api-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useApi() {
  const queryClient = useQueryClient();

  const invalidateQueries = (queryKey: string[]) => {
    if (queryKey) {
      queryKey.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    }
  };

  const get = (url: string | null, queryKey: string[]) =>
    useQuery({
      queryKey,
      queryFn: () => api.get(url!).then((res) => res.data),
      retry: false,
      enabled: !!url,
    });

  const post = <T>(url: string, queryKey: string[], invalidateKey?: string[]) =>
    useMutation({
      mutationFn: (data: T) => api.post(url, data).then((res) => res.data),
      onSuccess: () => {
        if (invalidateKey) invalidateQueries(invalidateKey);
      },

      onError: (error) => console.error('Error posting data:', error),
    });

  const put = <T>(url: string, queryKey: string[], invalidateKey?: string[]) =>
    useMutation({
      mutationFn: (data: T) => api.put(url, data).then((res) => res.data),
      onSuccess: () => {
        if (invalidateKey) invalidateQueries(invalidateKey);
      },

      onError: (error) => console.error('Error updating data:', error),
    });

  const patch = <T>(
    url: string,
    queryKey: string[],
    invalidateKey?: string[]
  ) =>
    useMutation({
      mutationFn: (data: T) => api.patch(url, data).then((res) => res.data),
      onSuccess: () => {
        if (invalidateKey) invalidateQueries(invalidateKey);
      },

      onError: (error) => console.error('Error updating data:', error),
    });

  const del = (url: string, queryKey: string[], invalidateKey?: string[]) =>
    useMutation({
      mutationFn: () => api.delete(url).then((res) => res.data),
      onSuccess: () => {
        if (invalidateKey) invalidateQueries(invalidateKey);
      },

      onError: (error) => console.error('Error deleting data:', error),
    });

  return { get, post, put, del, patch };
}
