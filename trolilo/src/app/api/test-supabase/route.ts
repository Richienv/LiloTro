// trolilo/src/app/api/test-supabase/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/app/utils/supabaseClient';

export async function GET(request: NextRequest) {
  const { data, error } = await supabase.from('test_table').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}