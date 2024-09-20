// src/components/SupabaseProvider.tsx
'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabaseClient = createClientComponentClient();

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}