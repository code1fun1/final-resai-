import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  // -------------------HANDLE LOCAEL IN REACTIVE RESUME START-----------------
  if (req.nextUrl.pathname.includes('/rr')) {
    // Get the current locale dynamically
    const currentLocale = req.nextUrl.locale;
    req.nextUrl.pathname.replace(`^\/${currentLocale}\/`, '/');
    // req.nextUrl.pathname.replace(/^\/(en|hi|es)\//, '');
    return;
  }
  // -------------------HANDLE LOCAEL IN REACTIVE RESUME END-----------------
  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}
