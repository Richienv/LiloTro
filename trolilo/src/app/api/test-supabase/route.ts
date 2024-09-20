// trolilo/src/app/api/test-supabase/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabaseClient';

export async function GET() {
  try {
    const { data } = await supabase.from('test').select('*')
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}