'use client';
import { useApi } from '@/hooks/use-api';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { post } = useApi();

  const { mutateAsync: createUser } = post('/api/user', ['user']);

  useEffect(() => {
    if (isLoaded && user) {
      console.log(
        'Creating/checking user:',
        user.primaryEmailAddress?.emailAddress
      );
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
