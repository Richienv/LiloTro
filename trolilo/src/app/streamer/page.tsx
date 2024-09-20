'use client';

import { useUser } from '@supabase/auth-helpers-react';

export default function StreamerDashboard() {
  const user = useUser();

  return (
    <div>
      <h1>Streamer Dashboard</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
}