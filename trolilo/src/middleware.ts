import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    // Redirect based on role
    if (profile?.role === 'admin' && req.nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    } else if (profile?.role === 'streamer' && req.nextUrl.pathname !== '/streamer') {
      return NextResponse.redirect(new URL('/streamer', req.url));
    } else if (profile?.role === 'client' && req.nextUrl.pathname !== '/client') {
      return NextResponse.redirect(new URL('/client', req.url));
    }
  } else {
    // Redirect to login if not authenticated
    if (!req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
}

export const config = {
    matcher: ['/', '/admin/:path*', '/streamer/:path*', '/client/:path*'],
  };