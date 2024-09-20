// src/app/client/page.tsx
'use client';

import { useEffect } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function ClientDashboard() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  // Existing useEffect to check the user's role
  useEffect(() => {
    const checkRole = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single();
      if (profile?.role !== 'client') {
        router.replace('/login');
      }
    };
    if (user) {
      checkRole();
    }
  }, [user]);

  // Add the logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}