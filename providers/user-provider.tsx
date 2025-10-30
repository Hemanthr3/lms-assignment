'use client';
import api from '@/config/api-config';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  const { mutateAsync: createUser } = useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      api.post('/api/user', data).then((res) => res.data),
  });

  useEffect(() => {
    if (isLoaded && user) {
      createUser(
        {
          name: user.fullName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
        },
        {
          onSuccess: (data) => {
            console.log('User saved successfully:', data);
          },
          onError: (error) => {
            console.error('Error saving user:', error);
          },
        }
      );
    }
  }, [isLoaded, user?.id]); // Use user.id to avoid re-triggering on user object changes

  return <>{children}</>;
};

export default UserProvider;
