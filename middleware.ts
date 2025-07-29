// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Dashboard erişimi için kontrol
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Eğer kullanıcı giriş yapmışsa ve auth sayfalarına erişmeye çalışıyorsa
    if (session && (req.nextUrl.pathname.startsWith('/auth/') || req.nextUrl.pathname === '/auth')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/auth'],
};