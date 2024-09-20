'use client';

import { useUser } from '@supabase/auth-helpers-react';

export default function AdminDashboard() {
  const user = useUser();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
}