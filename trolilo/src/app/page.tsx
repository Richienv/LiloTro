// src/app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function HomePage() {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const checkUser = async () => {
      if (!session) {
        // User is not logged in, redirect to login page
        router.push('/login');
      } else {
        // User is logged in, fetch profile to determine role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
          // Handle error (e.g., redirect to error page)
        } else {
          // Redirect user based on their role
          if (profile.role === 'admin') {
            router.push('/admin');
          } else if (profile.role === 'streamer') {
            router.push('/streamer');
          } else if (profile.role === 'client') {
            router.push('/client');
          } else {
            // Handle unknown role
            console.error('Unknown user role:', profile.role);
            // Optionally sign out the user or redirect to a default page
            await supabase.auth.signOut();
            router.push('/login');
          }
        }
      }
    };

    checkUser();
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}