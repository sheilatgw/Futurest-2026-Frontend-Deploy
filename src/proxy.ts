import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  // return NextResponse.redirect(new URL('/coming-soon', request.url))
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
