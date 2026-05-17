import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getHtmlLang, resolveLanguage } from '@/lib/seo';

const HTML_LANGUAGE_HEADER = 'x-globallift-lang';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const queryLanguage = searchParams.get('lang');

  if (pathname === '/' && resolveLanguage(queryLanguage) === 'en') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/en';
    redirectUrl.searchParams.delete('lang');
    return NextResponse.redirect(redirectUrl, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    HTML_LANGUAGE_HEADER,
    getHtmlLang(pathname.startsWith('/en') ? 'en' : 'es'),
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/', '/en', '/en/:path*'],
};
