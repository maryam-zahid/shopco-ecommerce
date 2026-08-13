import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow all admin routes
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Redirect everything else to admin dashboard
  return NextResponse.redirect(
    new URL("/admin", request.url),
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};